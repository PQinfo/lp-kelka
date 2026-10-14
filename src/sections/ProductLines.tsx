import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { CaretRight, PawPrint } from '@phosphor-icons/react';
import { m as motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { defaultSizeFor, formatSize, formatSizeId, getVariant, lines, parseProductSelection, sizesFor, variants, type LineId, type PackageUnits, type ProductLine, type SizeId } from '../data/catalog';
import { images } from '../generated/images';
import { imageProps } from '../lib/image';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useLocationSearch } from '../hooks/useLocationSearch';
import { track } from '../lib/telemetry';
import { whatsappUrl } from '../data/site';
import styles from './ProductLines.module.css';

function lineColors(line: ProductLine): CSSProperties {
  return { '--line-accent': line.accent, '--line-bright': line.bright, '--line-tint': line.tint } as CSSProperties;
}
export default function ProductLines() {
  const [selectedLine, setSelectedLine] = useState<LineId>('pipizao');
  const [selectedSize, setSelectedSize] = useState<SizeId>(defaultSizeFor('pipizao'));
  const [selectedUnits, setSelectedUnits] = useState<PackageUnits>(7);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const interacted = useRef(false);
  const reduceMotion = useReducedMotion();
  const horizontalTabs = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const search = useLocationSearch();
  useEffect(() => {
    const selection = parseProductSelection(search);
    if (selection) { setSelectedLine(selection.lineId); setSelectedSize(selection.sizeId); setSelectedUnits(selection.units); }
  }, [search]);
  const line = lines.find(item => item.id === selectedLine) ?? lines[0];
  // Cada linha oferece os seus proprios tamanhos: ao trocar de linha, um tamanho
  // que nao existe nela cai no primeiro disponivel em vez de quebrar a busca.
  const sizeFor = (lineId: LineId) => (sizesFor(lineId).includes(selectedSize) ? selectedSize : defaultSizeFor(lineId));
  const product = getVariant(line.id, sizeFor(line.id), selectedUnits);
  function selectLine(index: number, focusTab = false) {
    interacted.current = true;
    const nextLine = lines[index].id;
    setSelectedLine(nextLine);
    setSelectedSize(sizeFor(nextLine));
    track('product_select', {line: nextLine, units: selectedUnits});
    if (focusTab) tabs.current[index]?.focus({preventScroll:true});
  }
  function handleTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = event.key === 'ArrowDown' || event.key === 'ArrowRight' ? (index+1)%lines.length
      : event.key === 'ArrowUp' || event.key === 'ArrowLeft' ? (index+lines.length-1)%lines.length
      : event.key === 'Home' ? 0 : event.key === 'End' ? lines.length-1 : null;
    if (next === null) return;
    event.preventDefault(); selectLine(next,true);
  }
  return (
    <section id="produtos" className={styles.section} aria-labelledby="product-lines-title">
      <div className={styles.container} style={lineColors(line)}>
        <div className={styles.showcase}>
          <header className={styles.intro}>
            <p className={styles.eyebrow}>Nossas linhas</p>
            <h2 id="product-lines-title" tabIndex={-1} className={styles.title}>Uma linha para <br />cada rotina.</h2>
            <p className={styles.introText}>Nossas linhas foram criadas para atender diferentes necessidades e estilos de vida, sempre com o cuidado e a qualidade que seu pet merece no dia a dia.</p>
          </header>
          <div className={styles.tabs} role="tablist" aria-label="Linhas de tapetes higiênicos" aria-orientation={horizontalTabs ? 'horizontal' : 'vertical'}>
            {lines.map((item,index) => (
              <button key={item.id} ref={element => {tabs.current[index]=element;}} type="button" role="tab" id={`tab-${item.id}`}
                aria-selected={line.id===item.id} aria-controls={`product-${item.id}`} tabIndex={line.id===item.id?0:-1}
                className={styles.tab} style={lineColors(item)} onClick={()=>selectLine(index)} onKeyDown={event=>handleTabKey(event,index)}>
                <PawPrint weight="fill" aria-hidden="true" /><span>{item.name}</span><CaretRight className={styles.tabArrow} aria-hidden="true" />
              </button>
            ))}
          </div>
          {lines.map(item => {
            const itemSize = sizeFor(item.id);
            const selected = getVariant(item.id,itemSize,selectedUnits);
            return <div key={item.id} className={styles.details} id={`product-${item.id}`} role="tabpanel" aria-labelledby={`tab-${item.id}`} tabIndex={0} hidden={item.id!==line.id}>
              <h3 className={styles.productName}>{item.name}</h3>
              <p className={styles.description}>{item.description}</p>
              <fieldset className={styles.packages}>
                <legend>Tamanho</legend>
                <div className={styles.packageOptions}>
                  {sizesFor(item.id).map(size=>(
                    <label key={size} className={styles.packageOption}>
                      <input type="radio" name={`size-${item.id}`} value={size} checked={size===itemSize}
                        onChange={()=>{interacted.current=true;setSelectedSize(size);track('size_select',{line:item.id,size});}} />
                      <span>{formatSizeId(size)}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <fieldset className={styles.packages}>
                <legend>Opções de embalagem</legend>
                <div className={styles.packageOptions}>
                  {variants.filter(variant=>variant.lineId===item.id&&variant.sizeId===itemSize).map(variant=>(
                    <label key={variant.id} className={styles.packageOption}>
                      <input type="radio" name={`package-${item.id}`} value={variant.units} checked={variant.units===selectedUnits}
                        onChange={()=>{interacted.current=true;setSelectedUnits(variant.units);track('package_select',{line:item.id,units:variant.units});}} />
                      <span>{variant.units} unidades</span>
                      <span className="sr-only">, {formatSize(variant)}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <noscript><ul>{variants.filter(variant => variant.lineId === item.id).map(variant => <li key={variant.id}><a href={whatsappUrl(`Olá! Gostaria de conhecer o ${item.name}, tamanho ${formatSize(variant)}, com ${variant.units} unidades.`)}>{formatSize(variant)} — {variant.units} unidades</a></li>)}</ul></noscript>
              <a className={styles.cta} href={whatsappUrl(`Olá! Gostaria de conhecer o ${item.name}, tamanho ${formatSize(selected)}, com ${selected.units} unidades.`)}
                target="_blank" rel="noopener noreferrer" onClick={()=>track('contact_click',{source:'product',line:item.id,units:selected.units})}>
                <PawPrint size={28} weight="fill" aria-hidden="true" /><span>Conhecer o {item.name}</span><CaretRight size={20} aria-hidden="true" />
              </a>
            </div>;
          })}
          <figure className={styles.visual} aria-label={`${line.name}, ${product.units} unidades`}>
            <div className={styles.productArt} aria-hidden="true"><span className={styles.petalBlue}/><span className={styles.petalMint}/><span className={styles.petalBase}/></div>
            <motion.img key={product.id} {...imageProps(images[product.image], 'auto, (max-width: 767px) 65vw, (max-width: 1023px) 55vw, 50vw')}
              alt={`Embalagem do tapete higiênico ${line.name}, ${product.units} unidades, ${formatSize(product)}`} className={styles.productImage} data-format={product.format}
              loading="lazy" decoding="async" initial={!interacted.current||reduceMotion?false:{opacity:0,x:35,rotate:2}}
              animate={{opacity:1,x:0,rotate:0}} transition={{duration:reduceMotion?0:0.35,ease:[0.22,1,0.36,1]}} />
          </figure>
        </div>
      </div>
    </section>
  );
}
