import { test, expect } from '@playwright/test';
import { flows } from '../../src/data/simulator';

test('initial content, hydration, anchors and responsive layout', async ({page}) => {
  const errors: string[] = [];
  page.on('pageerror',error=>errors.push(error.message));
  page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});
  await page.goto('./');
  await expect(page.getByRole('heading',{level:1})).toBeVisible();
  await expect(page.getByRole('complementary',{name:'Contato rápido'})).toBeHidden();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link',{name:'Pular para o conteúdo'})).toBeFocused();
  await page.getByRole('link',{name:'Conheça nossas soluções'}).click();
  await expect(page).toHaveURL(/#produtos$/);
  await expect(page.getByRole('tab',{name:'Pipizão'})).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.locator('#tecnologia').scrollIntoViewIfNeeded();
  await expect(page.locator('[data-layer="1"]')).toHaveCSS('opacity','1');
  await page.locator('#contato').scrollIntoViewIfNeeded();
  await expect(page.getByRole('heading',{name:'Qual é o seu interesse?'})).toBeVisible();
  await expect.poll(()=>page.locator('img:visible').evaluateAll(imgs=>imgs.every(img=>(img as HTMLImageElement).complete && (img as HTMLImageElement).naturalWidth>0))).toBe(true);
  expect(errors).toEqual([]);
});

test('all products/packages, footer links and medium size select the correct variant',async({page})=>{
  await page.goto('./#produtos');
  for (const name of ['Pipizão','Fofuxão','Xixicão']) {
    await page.getByRole('tab',{name}).click();
    const panel=page.getByRole('tabpanel');
    for (const units of [30,7]) {
      await panel.getByLabel(new RegExp(`${units} unidades`)).check();
      const link=panel.getByRole('link',{name:`Conhecer o ${name}`});
      const message=new URL((await link.getAttribute('href'))!).searchParams.get('text');
      expect(message).toContain(`${units} unidades`);
      expect(message).toContain(name);
      if(name==='Fofuxão')expect(message).toContain(units===30?'70 × 60 cm':'60 × 55 cm');
    }
  }
  await page.locator('footer').getByRole('link',{name:'Xixicão',exact:true}).click();
  await expect(page.getByRole('tab',{name:'Xixicão'})).toHaveAttribute('aria-selected','true');
  await page.getByRole('button',{name:/^Médio porte/}).click();
  await page.getByRole('link',{name:'Ver produto neste tamanho'}).click();
  await expect(page.getByRole('tab',{name:'Fofuxão'})).toHaveAttribute('aria-selected','true');
  await expect(page.getByRole('tabpanel').getByLabel(/30 unidades/)).toBeChecked();
  await page.locator('footer').getByRole('link',{name:'Terceirização de tapetes'}).click();
  await expect(page.getByRole('button',{name:/Quero terceirizar/})).toHaveAttribute('aria-pressed','true');
});

for(const flow of ['comprar','revendedor','distribuidor','representante','terceirizar']) test(`simulator ${flow}: advances on selection, back and restart`,async({page})=>{
  await page.goto('./#contato');
  const form=page.getByRole('form',{name:'Simulador de atendimento Kelka'});
  await expect(form.getByRole('button',{name:'Continuar',exact:true})).toHaveCount(0);
  const interest=flow==='comprar'?'Quero comprar':flow==='terceirizar'?'Quero terceirizar':'Quero revender';
  await form.getByRole('button',{name:new RegExp(interest)}).click();
  if(!['comprar','terceirizar'].includes(flow)) {
    await expect(form.getByRole('heading',{name:'Qual é o seu perfil?'})).toBeFocused();
    const profile=flow==='revendedor'?'Tenho uma loja':flow==='distribuidor'?'Quero ser distribuidor':'Quero ser representante';
    await form.getByRole('button',{name:new RegExp(profile)}).click();
  }
  const flowId=flow==='comprar'?'consumidor':flow==='terceirizar'?'marca_propria':flow;
  const steps=flows.find(item=>item.id===flowId)!.steps;
  const selected: string[]=[];
  for(const step of steps){
    await expect(form.getByRole('heading',{name:step.question,exact:true})).toBeFocused();
    await expect(form.getByRole('button',{name:'Continuar',exact:true})).toHaveCount(0);
    selected.push(step.options[0].label);
    if(step.multiSelect){
      const confirm=form.getByRole('button',{name:'Ver resumo'});
      await expect(confirm).toBeDisabled();
      await form.getByRole('checkbox',{name:step.options[0].label,exact:true}).locator('..').click();
      await form.getByRole('checkbox',{name:step.options[1].label,exact:true}).locator('..').click();
      selected.push(step.options[1].label);
      await expect(form.getByRole('heading',{name:step.question,exact:true})).toBeVisible();
      await confirm.click();
    }else{
      await form.getByRole('button',{name:step.options[0].label,exact:true}).click();
    }
  }
  await expect(form.getByRole('heading',{name:'Vamos conversar?'})).toBeFocused();
  const href=await form.getByRole('link',{name:/Falar no WhatsApp/}).getAttribute('href');
  const message=new URL(href!).searchParams.get('text');
  for(const answer of selected)expect(message).toContain(answer);
  await form.getByRole('button',{name:'Voltar',exact:true}).click();
  const last=steps[steps.length-1];
  await expect(form.getByRole('heading',{name:last.question,exact:true})).toBeFocused();
  if(last.multiSelect){
    await expect(form.getByRole('checkbox',{name:last.options[0].label,exact:true})).toBeChecked();
    await expect(form.getByRole('checkbox',{name:last.options[1].label,exact:true})).toBeChecked();
    await form.getByRole('button',{name:'Ver resumo'}).click();
  }else{
    const previous=form.getByRole('button',{name:last.options[0].label,exact:true});
    await expect(previous).toHaveAttribute('aria-pressed','true');
    await previous.click();
  }
  await expect(form.getByRole('heading',{name:'Vamos conversar?'})).toBeFocused();
  await form.getByRole('button',{name:'Recomeçar'}).click();
  await expect(form.getByRole('heading',{name:'Qual é o seu interesse?'})).toBeFocused();
  await expect(form.getByRole('button',{name:'Continuar',exact:true})).toHaveCount(0);
});

test('simulator supports keyboard activation and ignores double clicks during a transition',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('./#contato');
  const form=page.getByRole('form',{name:'Simulador de atendimento Kelka'});
  const choice=form.getByRole('button',{name:/Quero comprar/});
  await choice.focus();await page.keyboard.press('Enter');
  await expect(form.getByRole('heading',{name:'Onde você mora?'})).toBeFocused();
  await page.emulateMedia({reducedMotion:'no-preference'});
  await form.getByRole('button',{name:'Santa Catarina',exact:true}).dblclick();
  await expect(form.getByRole('heading',{name:'Qual é o porte do seu cão?'})).toBeFocused();
  await form.getByRole('button',{name:'Voltar',exact:true}).click();
  await expect(form.getByRole('heading',{name:'Onde você mora?'})).toBeFocused();
  await expect(form.getByRole('button',{name:'Santa Catarina',exact:true})).toHaveAttribute('aria-pressed','true');
});

test('keyboard navigation, FAQ and minimal review controls',async({page,isMobile})=>{
  await page.goto('./');
  if(isMobile){
    const trigger=page.getByRole('button',{name:'Abrir menu'});
    await trigger.click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('link',{name:'Fale com a nossa equipe'})).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(trigger).toBeFocused();
    await expect(page.getByRole('dialog')).toHaveCount(0);
  }
  const first=page.getByRole('tab',{name:'Pipizão'});
  await first.focus();await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('tab',{name:'Fofuxão'})).toBeFocused();
  await page.keyboard.press('End');
  await expect(page.getByRole('tab',{name:'Xixicão'})).toHaveAttribute('aria-selected','true');
  const faq=page.locator('#faq button').last();await faq.click();
  const id=await faq.getAttribute('aria-controls');
  await expect(page.locator(`[id="${id}"]`)).toBeVisible();
  await faq.click();await expect(page.locator(`[id="${id}"]`)).toBeHidden();
  await page.getByRole('button',{name:'Próxima avaliação'}).click();
  await expect(page.getByRole('group',{name:/^Avaliação 2 de / })).toBeVisible();
  const dot=page.getByRole('button',{name:/Ver avaliação de/}).first();
  const box=await dot.boundingBox();expect(box!.width).toBeGreaterThanOrEqual(24);
});

test('prerender works without JavaScript and includes all product and FAQ text',async({browser,baseURL})=>{
  const context=await browser.newContext({javaScriptEnabled:false});
  const page=await context.newPage();await page.goto(baseURL!);
  await expect(page.getByRole('heading',{level:1})).toBeVisible();
  await expect(page.getByRole('heading',{name:'Fofuxão',exact:true})).toBeVisible();
  await expect(page.locator('[data-faq-answer]:visible')).toHaveCount(6);
  await expect(page.locator('#contato').getByRole('link',{name:'Falar no WhatsApp'})).toBeVisible();
  await context.close();
});

test('reduced motion and system dark preference preserve approved light layout',async({page})=>{
  const errors: string[]=[];
  page.on('pageerror',error=>errors.push(error.message));
  page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});
  await page.emulateMedia({reducedMotion:'reduce',colorScheme:'dark'});
  await page.goto('./');
  await expect(page.locator('html')).toHaveCSS('color-scheme','light');
  await page.evaluate(()=>window.scrollTo(0,200));
  await expect(page.locator('#hero h1')).toHaveCSS('opacity','1');
  await expect(page.locator('#hero h1')).toHaveCSS('transform','none');
  await page.locator('#tecnologia').scrollIntoViewIfNeeded();
  await expect(page.locator('[data-layer="1"]')).toHaveCSS('transform','none');
  expect(errors).toEqual([]);
});
