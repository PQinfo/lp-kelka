# Kelka — landing page

React 19, TypeScript, Vite e CSS Modules/Tailwind. O build entrega HTML pré-renderizado e hidrata as interações no navegador. Nenhum servidor Node é necessário na hospedagem.

## Desenvolvimento e verificações

Use Node 22 (`.nvmrc`) e npm 10 ou superior.

```sh
npm ci
npm run dev
npm run check
npx playwright install --with-deps chromium
npm run test:e2e
```

`check` executa lint, testes de catálogo/simulador, validação TypeScript da aplicação e dos testes, geração de imagens e build com limites de tamanho. Os testes de navegador iniciam `vite preview` e cobrem desktop e celular. Para testar um servidor existente, configure `TEST_BASE_URL`. `PLAYWRIGHT_EXECUTABLE_PATH` permite usar um Chromium já instalado.

O workflow `.github/workflows/quality.yml` repete as verificações em push/PR; ele não publica o site. O funcionamento desse workflow no serviço depende de o repositório estar no GitHub.

## Build e publicação

Copie `.env.example` para `.env.local` e preencha `SITE_URL` com a URL pública definitiva, incluindo a subpasta, se houver. Não use um endereço de exemplo na publicação.

```sh
npm run build:release
npm run smoke -- https://ENDERECO-REAL/
```

O build de release exige HTTPS e `SITE_URL`. Canonical, Open Graph, Organization, sitemap e robots são gerados dessa mesma configuração. O HTML e os assets funcionam na raiz ou em subpasta, mas canonical/sitemap devem corresponder ao endereço escolhido: refaça o build se a URL pública mudar.

`npm run build` sem `SITE_URL` gera uma prévia com `noindex, nofollow`, robots bloqueando rastreamento e sem canonical/sitemap fictícios. Isso é intencional; não publique a prévia como versão indexável.

Publique **somente o conteúdo de `dist/`**, inclusive `.htaccess`. Configure o DocumentRoot nessa pasta. Nunca exponha a raiz do repositório, arquivos `.env`, fontes, dependências ou documentos internos.

Para Apache, `deploy/dist.htaccess` define 404 reais, tipos MIME, compressão e cabeçalhos. É necessário permitir `.htaccess` e habilitar `rewrite`, `headers`, `mime`, `filter` e `deflate`. Sem `headers`, o Apache ignora o bloco de cache/CSP: confirme com o smoke test. A configuração local de workspace, que encaminha apenas arquivos publicados, fica em `deploy/workspace.htaccess`; copie-a para `.htaccess` somente no ambiente que serve a raiz deste projeto.

O cache é de um ano com `immutable` para assets com hash; HTML/robots/sitemap exigem revalidação; favicon/logo/arte social usam um dia. A CSP permite os recursos próprios e estilos inline necessários às animações. Serviços externos futuros exigem revisão dessa política. HTTPS, redirecionamento de domínio, HSTS e CDN dependem do host real.

`npm run smoke -- URL` confere conteúdo inicial, metadados, assets, MIME, 404, proteção de fontes, CSP e cache. `--skip-headers` serve apenas para diagnóstico em um servidor local sem esses módulos; não é critério de aceite para produção.

Gere o artefato no CI a partir de uma revisão identificada. Faça upload para uma pasta de release nova, teste e então altere o apontamento público de forma atômica. Conserve a release anterior completa para rollback e os assets antigos pelo prazo necessário às abas abertas. Evite sobrescrever/remover o diretório público durante o upload. `dist` já era versionado neste repositório; arquivos gerados não devem ser editados manualmente nem usados como fonte do próximo build.

## Conteúdo e imagens

- `src/data/catalog.ts`: linhas, seis embalagens e relação com o guia. Fofuxão de 7 unidades: 60 × 55 cm; Fofuxão de 30: **70 × 60 cm**. Links do guia/rodapé selecionam a variante correta.
- `src/data/content.ts`: FAQ, depoimentos e números institucionais.
- `src/data/site.ts`: contatos e textos compartilhados.
- `src/data/simulator.ts`: perguntas, opções e mensagens. `src/lib/simulator.ts` valida as transições; respostas usam IDs, convertidos em rótulos ao exibir/enviar.
- `src/sections/`: seções ativas. `archive/` preserva seções retiradas e dados históricos, fora do build e da varredura de CSS.

Os originais em `src/assets/` e `public/` são arquivos de trabalho. `static/` é a pasta copiada para publicação. `npm run images` gera WebP em múltiplas larguras, dimensões, `srcSet`, favicon e arte social. Edite `scripts/generate-images.mjs`, não os arquivos de `src/generated/`. As lâminas 1/2 são exportadas na proporção da composição aprovada. O hero tem prioridade alta; imagens inferiores são carregadas sob demanda. Não envie originais novos para `static/` sem necessidade.

Limites atuais: JS total gzip 155 kB, CSS gzip 20 kB, cada imagem publicada 250 kB e distribuição total 6,5 MB. O build falha quando excedidos. Investigue regressões antes de aumentar os limites.

A identidade clara é fixa, com o hero azul-marinho. As animações respeitam a preferência de movimento reduzido. Há navegação por teclado, atalho para conteúdo, FAQ no HTML inicial e alternativas de contato sem JavaScript.

## Métricas opcionais

Por padrão, **nenhum dado de analytics é enviado**. Eventos internos `kelka:metric` identificam seleção de linha/embalagem/porte, etapas do simulador e cliques de contato. Clique não comprova envio da mensagem ou venda.

Para coletar métricas, implemente primeiro um endpoint próprio de mesma origem, defina política de retenção/acesso e informação de privacidade, depois configure `VITE_METRICS_ENDPOINT` e `VITE_METRICS_SAMPLE_RATE` no build. Não há backend de coleta neste projeto. O adaptador respeita DNT/GPC, amostra sessões e pode enviar LCP/INP/CLS e tipos de erro. Ele não envia respostas do formulário, mensagens do WhatsApp, nomes, telefone digitado, query string ou stack traces. Nenhum cookie/identificador persistente é criado pelo adaptador. A política de privacidade depende também dos logs e serviços que o host habilitar.

Acompanhe métricas reais em p75, separadas por dispositivo, após volume suficiente de visitas. Lighthouse é um teste de laboratório e não comprova os Core Web Vitals de campo.

## Pendências externas

URL definitiva, validação comercial dos depoimentos/alegações/números, Search Console, monitoramento de disponibilidade e configuração do host são decisões da publicação. Novas páginas por produto exigem conteúdo e estratégia próprios; não foram criadas páginas repetidas apenas para palavras-chave. Privacidade/termos devem descrever as práticas reais da empresa, sem textos legais inventados.

A auditoria original está em `LEVANTAMENTO_TECNICO_2026-09-22.md`; a implementação e os resultados, em `IMPLEMENTACAO_MELHORIAS_2026-09-24.md`.
