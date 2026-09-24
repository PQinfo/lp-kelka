# Levantamento técnico da landing page Kelka

Data: **22/09/2026**. Escopo: diagnóstico para uma futura refatoração. **Nenhuma correção foi aplicada ao código, às imagens, às dependências ou à configuração da página.** Este documento é o único arquivo novo do projeto criado pela auditoria.

**Conclusão principal**

A prioridade é corrigir a configuração de publicação e os endereços de SEO, melhorar a apresentação inicial do hero no mobile e reduzir o peso das imagens. Depois, organizar os dados, os estilos e a lógica das interações, com verificações que preservem o layout aprovado.

Há boas bases: TypeScript estrito, componentes por seção, fontes locais, imagens WebP em parte da página, links reais, foco visível e vários cuidados de acessibilidade. A refatoração pode ser incremental e manter a composição visual atual.

**Escopo, evidências e limites**

- Leitura dos componentes ativos, dados, CSS, configuração de build, HTML, dependências e regras do Apache.
- Build de produção gerado exclusivamente em `/tmp/kelka-audit-20260922/dist`; o `dist` existente no projeto foi preservado.
- TypeScript com `tsc --noEmit` e lint direcionado a `src` e `vite.config.ts` passaram.
- Lighthouse **12.8.2**, com Chromium headless, sobre `http://127.0.0.1/lp-kelka2/`, servido pelo Apache local. Três execuções mobile com o perfil padrão e uma desktop com o perfil oficial de desktop.
- Mobile Lighthouse: 412 × 823, DPR 1,75, simulação de rede de aproximadamente 1,6 Mbps e CPU 4× mais lenta. Desktop: 1350 × 940, DPR 1, perfil de rede de aproximadamente 10 Mbps.
- Verificação adicional de layout em 320 × 700, 390 × 844, 768 × 1024, 1024 × 768, 1366 × 768, 1920 × 1080 e 844 × 390. Nenhuma rolagem horizontal da página ou imagem carregada com erro foi encontrada nessa varredura.
- Axe-core **4.10.3** em 390 e 1366 px; revisão manual das capturas para distinguir alertas automáticos de problemas reais.
- Interações verificadas no mobile: abrir/fechar menu com Escape e retorno do foco; CTA do hero; três linhas × duas embalagens com imagem e mensagem correspondentes; três portes; navegação pelos cinco depoimentos; seis perguntas da FAQ; cinco caminhos do simulador, incluindo múltipla seleção e retenção das respostas ao voltar. As mensagens foram inspecionadas sem enviá-las. Nenhum erro de JavaScript foi registrado nessa execução.
- Consulta ao `npm audit` e checagem dos cabeçalhos/respostas HTTP locais.
- Não foi informada a URL pública definitiva durante o levantamento. Indexação real, Search Console, CrUX, HTTPS/CDN e desempenho dos visitantes permanecem pendentes de verificação em produção.
- A inspeção de navegador foi feita em Chromium. Safari/iOS, Firefox, leitor de tela real e zoom de texto ainda precisam de validação específica.

As medições abaixo são **de laboratório local**, não resultados dos visitantes em produção. A pontuação Lighthouse varia e não substitui a medição em campo. [Metodologia do Lighthouse](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring).

**Resultado das medições**

| Indicador | Mobile: mediana de 3 execuções | Desktop: 1 execução |
| --- | ---: | ---: |
| Desempenho Lighthouse | **73/100**; intervalo 69–75 | **98/100** |
| LCP: maior conteúdo visível | **5,37 s**; intervalo 5,33–5,40 s | **1,05 s** |
| FCP: primeiro conteúdo | 2,10 s | 0,44 s |
| TBT: bloqueio da thread principal | 231 ms; intervalo 192–378 ms | 12 ms |
| CLS: instabilidade no carregamento | **0,0134** | **0** |
| Acessibilidade automática | 94/100 | 94/100 |
| Boas práticas automáticas | 96/100 | 96/100 |
| SEO automático | 100/100 | 100/100 |
| Transferência registrada pelo Lighthouse | 2,08 MB | 6,25 MB |

As medianas são calculadas por indicador. O resultado mobile de 73 corresponde à mediana das notas, não a uma execução escolhida por ser a melhor.

O **LCP mobile é o principal problema mensurado**. A imagem `K-hero.webp` foi identificada como o elemento de LCP. O trace aponta atraso relevante entre o recurso estar disponível e a exibição do elemento. O código também coloca a arte inicialmente transparente, com atraso de 680 ms e transição de 1,25 s; a descoberta da imagem depende da execução do React. Essas são frentes concretas de investigação/otimização, sem atribuir todo o atraso a uma única causa antes de testar as mudanças.

Os objetivos de Core Web Vitals em produção são **LCP ≤ 2,5 s, INP ≤ 200 ms e CLS ≤ 0,1, no percentil 75**, separados por mobile e desktop. **INP não foi medido**: o TBT acima é uma métrica de laboratório e não permite afirmar que o INP passou ou falhou. O CLS baixo no carregamento também não garante estabilidade em todas as interações. [Referência oficial de Core Web Vitals](https://web.dev/articles/vitals).

O SEO automático marcou 100 mesmo com `SEU-DOMINIO.COM.BR` nos metadados. Isso mostra por que a revisão manual é necessária: a ferramenta verifica requisitos técnicos limitados, sem saber qual é o domínio correto da empresa.

**Prioridades e esforço**

- **P0:** corrigir antes de publicar com a configuração atual.
- **P1:** alto impacto; primeira rodada de melhorias.
- **P2:** manutenção, qualidade e melhorias de experiência na sequência.
- **P3:** evolução opcional, conforme estratégia comercial e dados.

Esforço **P/M/G** indica pequeno/médio/grande relativamente às demais tarefas. Não é uma estimativa de prazo.

**SEO, conteúdo e indexação**

| ID | Prioridade / esforço | Evidência e problema | Melhoria proposta e validação |
| --- | --- | --- | --- |
| S01 | P0 / P | `index.html:11`: canonical, `og:url`, imagem social e URL da organização usam `https://SEU-DOMINIO.COM.BR/`. | Definir a URL definitiva e gerar os endereços consistentemente. Conferir o HTML servido e os destinos de todos os metadados. |
| S02 | P1 / M–G | `index.html` entrega apenas `#root` vazio no corpo; `src/main.tsx` usa `createRoot`. Todo o conteúdo principal depende de JavaScript. | Avaliar pré-renderização estática da landing, com hidratação das interações. Verificar que títulos, produtos, FAQ e contato estão no HTML inicial. Não há justificativa, por esse achado isolado, para impor migração de framework. |
| S03 | P1 / M | `ProductLines.tsx` monta apenas os detalhes do produto selecionado; `FAQ.tsx` desmonta respostas fechadas. A primeira renderização não contém todo o conteúdo editorial da página. | Manter conteúdo relevante renderizado, controlando sua visibilidade de forma acessível, ou oferecer páginas próprias para os produtos. Validar o HTML renderizado sem clicar nas abas/perguntas. |
| S04 | P1 / P | Não existem `robots.txt` e `sitemap.xml` em `public`. Na configuração local, os caminhos correspondentes dentro da aplicação retornam HTML com status 200. | Publicar sitemap válido e definir o robots na raiz do domínio. Testar tipo de conteúdo, URLs e status HTTP. Ausência de robots, por si só, não impede indexação. |
| S05 | P1 / P–M | `.htaccess` faz fallback para a landing em qualquer rota. Duas URLs inexistentes testadas retornaram 200. | Retornar 404 para URLs realmente inexistentes e preservar as âncoras válidas. Conferir também URLs aninhadas, pois a base relativa pode resolver assets para o diretório errado. |
| S06 | P2 / P–M | A imagem social aponta para um arquivo de hero antigo e para o domínio de exemplo; não há uma arte específica de compartilhamento. | Definir imagem social coerente com a página atual, URLs absolutas, texto alternativo e metadados de compartilhamento. Testar a prévia real em mensageiros/redes. |
| S07 | P2 / P | O JSON-LD de Organization existe, mas não centraliza a identidade com `site.ts` e não informa logo/identificador estável. | Consolidar a identidade da empresa, URL e logo. Acrescentar somente informações verificadas. Validar sintaxe e coerência com o conteúdo visível. |
| S08 | P2 / P | As seis perguntas/respostas estão duplicadas manualmente entre `src/data/content.ts` e `index.html`. | Ter uma fonte única, caso a marcação seja mantida. Não tratar FAQPage como oportunidade atual de rich result no Google. |
| S09 | P2 / M | O H1 e a introdução do hero são institucionais e genéricos; produto e público comercial ficam claros mais abaixo. | Tornar a descrição inicial mais explícita sobre tapetes higiênicos e a oferta da Kelka, preservando o título aprovado. Definir prioridade entre consumidor, lojista e terceirização antes de ampliar conteúdo. |
| S10 | P3 / G | Todas as linhas e intenções comerciais disputam uma única URL; abas não criam páginas indexáveis independentes. | Se busca orgânica por produto/terceirização for estratégica, planejar páginas específicas com conteúdo útil e links reais. Evitar criar páginas repetitivas apenas para palavras-chave. |

O Google executa JavaScript, mas recomenda pré-renderização/renderização no servidor para tornar o conteúdo mais prontamente disponível. Isso fundamenta S02; não significa que uma página React seja automaticamente impossível de indexar. [Google: fundamentos de SEO com JavaScript](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics).

Conteúdo relevante não deve depender de cliques para ser descoberto: o Google não interage com a página como um visitante. Essa é a preocupação de S03. [Google: conteúdo carregado sob demanda](https://developers.google.com/search/docs/crawling-indexing/javascript/lazy-loading).

**Atualização importante:** o Google deixou de exibir o rich result de FAQ em **7 de maio de 2026**. A FAQ continua útil para visitantes, mas adicionar ou ampliar FAQPage não deve ser vendido como ganho desse destaque na busca. [Atualizações oficiais do Google Search](https://developers.google.com/search/updates).

**Desempenho, imagens e Core Web Vitals**

| ID | Prioridade / esforço | Evidência e problema | Melhoria proposta e validação |
| --- | --- | --- | --- |
| P01 | P1 / M | Hero é o LCP mobile; arte e textos começam invisíveis e dependem da montagem/animação. `Hero.tsx:19–26,87–105`. | Exibir o conteúdo essencial mais cedo; ajustar a entrada do hero e tornar o recurso prioritário descobrível no HTML/pré-carregamento. Manter a animação das lâminas da seção Tecnologia. Medir novamente com o mesmo perfil. |
| P02 | P1 / P–M | Três cachorros e fundo do simulador somam 5,21 MB em PNG. | Gerar WebP/AVIF conforme qualidade, transparência e compatibilidade. Conferir contornos, textura e aparência em tamanhos reais antes de substituir. |
| P03 | P1 / M | As imagens têm uma única resolução. Cachorros de 1254 px, embalagens de até 1500 px e lâminas de 1448 px são usados também no celular. | Criar variantes e `srcset`/`sizes`, com dimensões adequadas ao layout e DPR. O objetivo é reduzir transferência/decodificação mantendo nitidez. |
| P04 | P1 / P–M | `CTA.module.css:17–23` usa o PNG do simulador em `::before`; o desktop baixa esse fundo antes da seção entrar na tela. O `<img loading="lazy">` não adia esse uso em CSS. | Controlar o carregamento da decoração do desktop e manter a composição do fundo aprovada. Confirmar no waterfall que o recurso só é solicitado quando necessário. O navegador pode reutilizar a mesma resposta entre CSS e `<img>`; não são necessariamente dois downloads. |
| P05 | P1 / P | Respostas locais de JS, CSS e imagens não têm `Cache-Control`/`Expires`; Lighthouse aponta 15 recursos sem TTL explícito no mobile. | Cache longo com `immutable` para assets com hash, revalidação do HTML e política própria para arquivos de nome fixo em `public`. Testar primeira visita, revisita e publicação de nova versão. |
| P06 | P2 / M | Bundle JS total: 467,8 KB sem compressão; estimativa gzip de 144,7 KB. Motion representa 140,8 KB/46,2 KB gzip. Todas as seções são importadas no início. | Avaliar redução do código necessário na abertura, imports de animação mais econômicos e divisão das partes interativas mais pesadas. Medir benefício antes de adicionar fragmentação; conteúdo editorial deve continuar acessível aos buscadores. |
| P07 | P2 / P | `src/index.css:8–9` importa Swiper mesmo com a seção antiga Products desativada; restam estilos de parceiros e animações não usadas. | Remover imports do caminho ativo e isolar o legado da varredura de CSS. Verificar o CSS final e a preservação das seções arquivadas. O JavaScript de Swiper não foi emitido no build atual. |
| P08 | P2 / P | Logo de 3000 × 757, 60 KB, para exibição de aproximadamente 143 × 36 no header. | Usar SVG oficial ou versões raster adequadas. Preservar identidade e legibilidade; não redesenhar a marca. |
| P09 | P2 / M | Lighthouse apontou trabalho de layout forçado associado ao bundle de animação. Tecnologia também mede várias posições em `useLayoutEffect`/`ResizeObserver`. | Investigar com profiling; agrupar leituras, evitar atualizações de estado idênticas e trabalho desnecessário no mobile. Não há evidência para atribuir todo o custo às linhas conectoras. |
| P10 | P2 / M | Sombras/filtros sobre várias lâminas, máscaras e blur exigem composição; ainda não houve profiling em celular físico. | Medir durante rolagem e transição. Simplificar apenas os efeitos que forem gargalos, preservando o visual solicitado. |
| P11 | P2 / P–M | O build copia 34,47 MB em 55 arquivos; `public/parceiros` sozinho tem 12,54 MB, apesar de a seção não estar ativa. | Separar originais/arquivos de referência dos assets publicados; remover duplicatas da distribuição. Tamanho do deploy não equivale a bytes baixados na abertura. |
| P12 | P2 / M | Sem coleta de métricas reais de LCP/INP/CLS ou orçamento automatizado de desempenho no repositório. | Criar uma linha de base, orçamentos para JS/imagens e monitoramento de campo com amostragem. Comparar p75 e falhas por dispositivo após publicação. |

Detalhamento da experiência em memória, usando Sharp com WebP qualidade 82, sem salvar alterações nos assets:

| Arquivo | Original | WebP experimental | Redução aproximada |
| --- | ---: | ---: | ---: |
| `img dog pequeno.png` | 1.041.744 bytes | 135.916 bytes | 87,0% |
| `img dog medio.png` | 1.304.452 bytes | 156.564 bytes | 88,0% |
| `img dog grande.png` | 1.434.252 bytes | 174.752 bytes | 87,8% |
| `bg-simulador.png` | 1.427.667 bytes | 40.500 bytes | 97,2% |
| **Total** | **5.208.115 bytes** | **507.732 bytes** | **90,3%** |

Esse resultado é uma oportunidade de redução de arquivos, não promessa de 90% de redução no tempo de carregamento. Qualidade visual ainda precisa ser aprovada. O navegador já evita baixar alguns cachorros ocultos no mobile; os quatro arquivos não são todos transferidos de imediato em todo dispositivo.

Na navegação adicional em 390 px, com cache inicialmente vazio, os recursos somaram aproximadamente 2,08 MB na abertura e 3,51 MB após visitar todas as seções, mantendo o cachorro pequeno selecionado. Outros produtos e cachorros são solicitados conforme interação. Nas demais larguras dessa varredura havia cache reaproveitado; esses valores não foram usados para comparar desempenho entre dispositivos.

O Apache local **já comprime HTML, JavaScript e CSS com gzip**. A melhoria de cache é confirmada; alegar ausência total de compressão seria incorreto. Brotli/CDN podem ser avaliados no ambiente final. [Orientação sobre cache de recursos](https://developer.chrome.com/docs/lighthouse/performance/uses-long-cache-ttl).

A otimização do LCP deve observar descoberta, transferência e exibição do elemento; apenas reduzir a imagem não resolve necessariamente o atraso da apresentação. [Guia oficial de otimização de LCP](https://web.dev/articles/optimize-lcp).

**Acessibilidade e experiência**

| ID | Prioridade / esforço | Evidência e problema | Melhoria proposta e validação |
| --- | --- | --- | --- |
| A01 | P1 / P | CTA do hero usa texto branco sobre gradiente claro; o próprio código registra contraste insuficiente. A opção selecionada do guia de tamanhos foi medida em 4,31:1 para texto pequeno. | Ajustar cores de texto/fundo dentro da identidade da marca e verificar contraste em todos os estados. Manter posição, tamanho e intenção dos controles. |
| A02 | P1 / P | Paginação de avaliações: botões de 20 × 32 px com intervalo de 1 px. Lighthouse e axe confirmaram alvos insuficientes. | Aumentar a área clicável e/ou espaçamento mantendo os pontos visualmente pequenos, como solicitado. Validar alvo mínimo e teclado. |
| A03 | P1 / P–M | O WhatsApp flutuante cobre parte do texto inferior direito da faixa de benefícios do hero em 390 × 844, confirmado na captura. | Garantir espaço para o controle fixo e revisar sobreposições ao longo da página, incluindo áreas seguras do celular. |
| A04 | P2 / P | `useReducedMotion` desativa várias entradas, mas o hero ainda associa deslocamento e opacidade ao scroll em `Hero.tsx:19–21`. Confirmado no navegador com movimento reduzido: ao rolar 200 px, o conteúdo deslocou 14 px e a opacidade caiu de 1 para 0,684. | Desativar também parallax/fade por rolagem quando o usuário pede redução de movimento. Revisar as transições restantes da FAQ e do menu. |
| A05 | P2 / P | Não existe atalho para pular a navegação; aba de produto tem orientação implícita horizontal em layouts verticais. | Adicionar “Pular para o conteúdo” e semântica de orientação coerente com o layout das abas. Revalidar fluxo de foco. |
| A06 | P2 / P–M | Controles laterais no mobile usam texto de 10–12 px em alguns tamanhos; textos secundários do simulador chegam a 11 px. | Avaliar legibilidade com zoom/texto ampliado e aparelhos reais, mantendo a solução lateral aprovada. Tamanho pequeno isoladamente não equivale a reprovação WCAG. |
| A07 | P2 / P–M | Tema global segue o sistema, mas Tecnologia, Produtos, Guia, Avaliações e Simulador forçam tema claro. FAQ/rodapé mudam de tema. | Definir uma política de tema para a página. A implementação pode fixar a identidade clara ou completar o suporte ao modo escuro, conforme decisão visual. |
| A08 | P2 / P | Links Pipizão/Fofuxão/Xixicão no footer levam ao mesmo `#produtos`, sem selecionar a linha; Terceirização não seleciona esse interesse no simulador. | Fazer a navegação refletir a opção clicada, preservando histórico/foco e comportamento previsível. |
| A09 | P2 / M | Troca de produto substitui a imagem e o texto; troca de avaliação usa `AnimatePresence mode="wait"`. Alturas variam conforme conteúdo. | Medir estabilidade durante as trocas, prever espaço suficiente e, se necessário, preparar a próxima imagem após intenção do usuário. Não assumir que CLS baixo na abertura cobre esses estados. |
| A10 | P2 / P | Lâminas 1 e 2 são exibidas com proporções 1,6 e 1,45 embora os arquivos sejam 4:3. Lighthouse sinalizou deformação. | Conferir visualmente a intenção. Se melhorar, ajustar recorte/exportação preservando a composição aprovada; não normalizar as proporções automaticamente. |
| A11 | P3 / P | Axe apontou o WhatsApp flutuante fora de landmarks; badges numéricos têm contraste visual baixo no mobile. | Melhorar a organização semântica e a leitura desses detalhes. Os números são redundantes e `aria-hidden`, portanto têm prioridade menor que textos e controles essenciais. |

O mínimo de alvo de toque possui exceções por espaçamento. Neste caso os pontos falharam também no espaçamento, por isso o achado é concreto. É possível preservar o desenho minimalista e ampliar apenas a área interativa. [WCAG 2.2: tamanho mínimo do alvo](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).

**Cuidado com falsos positivos:** os relatórios automáticos calcularam parte do contraste dos títulos do hero e da navegação contra o fundo claro do elemento pai. A captura mostra esses textos sobre camadas azul-marinho. Esses alertas específicos precisam de revisão manual e não foram tratados como falhas comprovadas de texto branco sobre branco. Já o gradiente do CTA, o contraste do estado selecionado no guia e os alvos dos pontos são achados separados e válidos.

**Refatoração e manutenção**

| ID | Prioridade / esforço | Evidência e problema | Melhoria proposta e validação |
| --- | --- | --- | --- |
| R01 | P1 / M | `package.json` executa somente `vite build`; não existe validação de tipos nesse comando nem pipeline de testes no repositório. | Automatizar typecheck, lint e build; criar testes dos comportamentos importantes e regressões visuais nos tamanhos críticos. |
| R02 | P2 / M | `ProductLines.tsx:49–50` encontra variantes pelo nome exibido e unidades como texto. `SizeGuide.tsx:17` usa IDs numéricos e `find(...)!`. | Criar catálogo tipado com IDs estáveis, unidades numéricas, dimensões estruturadas e relações explícitas entre linha/variante/guia. Preservar M = **70 × 60 cm**, conforme confirmado pelo usuário. |
| R03 | P2 / M | `CTA.tsx` concentra navegação, respostas, animação, resumo e montagem das telas; `Selections` aceita qualquer chave/texto. | Extrair a lógica para um hook/reducer tipado e componentes pequenos por estado, quando isso simplificar a leitura. Testar voltar, recomeçar, mudança de perfil e múltipla seleção. |
| R04 | P2 / M | Respostas do simulador são salvas pelos rótulos, embora as opções tenham `value`. | Salvar valores estáveis e traduzir para rótulos ao renderizar/gerar mensagem. Evitar que revisão de texto altere a identidade das respostas. |
| R05 | P2 / M | Altura do header, offsets de âncora, cores, espaçamentos e tipografia aparecem em Tailwind, CSS Modules e estilos inline, com muitos ajustes sucessivos por largura/altura. | Centralizar tokens úteis e consolidar regras por seção/breakpoint. Comparar screenshots de desktop e mobile a cada etapa. Evitar um componente genérico tão rígido que elimine diferenças intencionais das seções. |
| R06 | P2 / P–M | Benefits, Products, HowItWorks e Partners permanecem no projeto, com dados/imports próprios e estilos antigos. | Separar claramente código ativo e arquivo histórico. As seções foram desativadas a pedido do usuário; preservação/remoção deve ser deliberada. |
| R07 | P2 / P | `README.md` ainda é o template; `ANALISE_DO_PROJETO.md` descreve GSAP/AOS e outras condições antigas. Comentários no código também narram etapas que já mudaram. | Documentar execução, build, publicação em raiz/subpasta, catálogo, imagens e verificações. Marcar a análise anterior como histórica e manter comentários sobre intenção atual. |
| R08 | P2 / P–M | `dist` é versionado; há alterações simultâneas de fonte e bundles gerados. `.htaccess` é ignorado pelo Git. | Definir publicação reproduzível com artefatos gerados do mesmo commit e configuração de servidor rastreável por modelo. Manter rollback da versão completa e publicação atômica. |
| R09 | P2 / P | Ferramentas de build como Tailwind/Vite plugin aparecem em dependências de produção. Não há versão de Node/npm documentada no projeto. | Classificar dependências por uso e fixar ambiente de build. Isso melhora manutenção; não implica que todo pacote instalado esteja no JavaScript entregue ao visitante. |

Os testes a automatizar devem proteger comportamentos, como seleção correta da variante/mensagem, navegação, foco, estados do simulador e layout. Não é necessário criar testes que apenas reproduzam classes CSS ou cada detalhe interno dos componentes.

**Publicação e dependências**

| ID | Prioridade / esforço | Evidência e problema | Melhoria proposta e validação |
| --- | --- | --- | --- |
| I01 | P0 / P–M | Apache local responde 200 para `/lp-kelka2/package.json` e `/lp-kelka2/src/main.tsx`. `.htaccess` libera arquivos fisicamente existentes; a raiz servida contém o projeto inteiro. | Configurar a raiz pública para os arquivos distribuíveis ou publicar exclusivamente o conteúdo de `dist`. Testar bloqueio de arquivos internos. Exposição em produção não foi verificada; não houve leitura de segredos nem evidência de exploração. |
| I02 | P1 / P–M | `npm audit` identificou 3 pacotes com alertas de gravidade alta e correções disponíveis: Nano ID 3.3.15, PostCSS 8.5.15 e Sharp 0.35.3. | Atualizar a cadeia de ferramentas com revisão do lockfile, audit, typecheck e build. Avaliar condições de exploração; esses pacotes são usados no desenvolvimento/processamento/build desta landing, sem endpoint público de upload/processamento identificado. |
| I03 | P2 / P–M | Respostas HTTP locais não têm CSP, `X-Content-Type-Options`, Referrer-Policy ou proteção explícita de enquadramento. | Definir cabeçalhos adequados no host final; testar CSP inicialmente em modo de relatório e compatibilidade com estilos inline/animações. Verificar HTTPS e redirecionamentos em produção antes de configurar HSTS. |
| I04 | P2 / M | Sem rotina documentada para conferir a página após publicação ou identificar erro de carregamento de bundle. | Criar smoke test pós-deploy, monitoramento de erros e acompanhamento de disponibilidade. Definir como reverter uma versão quebrada. |

Os alertas foram consultados em 22/09/2026 e não foram corrigidos neste levantamento. Nano ID e PostCSS vêm pela cadeia do Vite; Sharp é dependência de desenvolvimento. O enquadramento npm de dependência de produção não é equivalente a código executado no navegador. Fontes dos alertas: [Sharp](https://github.com/lovell/sharp/security/advisories/GHSA-rgj7-g3m4-5g8c), [PostCSS](https://github.com/postcss/postcss/security/advisories/GHSA-r28c-9q8g-f849) e [Nano ID](https://github.com/advisories/GHSA-2v37-7h3g-55p8).

**Medição comercial e qualidade do conteúdo**

| ID | Prioridade / esforço | Evidência e problema | Melhoria proposta e validação |
| --- | --- | --- | --- |
| C01 | P2 / M | Não há eventos de conversão/analytics no código inspecionado. Mensagens de WhatsApp indicam contexto, mas não medem abandono do simulador. | Planejar eventos enxutos: seleção de linha/embalagem, início/conclusão do simulador e clique de contato. Clique no WhatsApp não equivale a mensagem enviada ou venda. Evitar registrar o conteúdo completo das respostas em analytics. |
| C02 | P2 / P | Depoimentos, quantidade produzida, anos de mercado, áreas de cobertura e alegações de desempenho são dados fixos no código. | Validar com a empresa a origem e a atualização dessas informações antes de publicá-las ou usá-las em dados estruturados. A auditoria não verificou sua procedência comercial. |
| C03 | P2 / P–M | O guia indica portes/tamanhos, mas não encaminha diretamente à variante correspondente. O simulador qualifica o contato, sem calcular resultado numérico. | Avaliar um vínculo claro guia → produto/embalagem e a clareza do nome/apresentação do atendimento. Mudanças de jornada dependem da intenção comercial e não são correções obrigatórias. |
| C04 | P3 / M | Não há privacidade/termos publicados; também não foram identificados trackers externos no carregamento auditado. | Se forem adicionados analytics, publicidade ou coleta própria de dados, definir informação de privacidade e preferências conforme o uso real. A ausência de um banner de cookies isoladamente não foi classificada como defeito técnico. |

**O que preservar**

- Layout aprovado, animação das lâminas, fundos das seções e escolhas feitas nas revisões de desktop/mobile.
- Fontes Manrope locais, `font-display: swap` e ausência de carregamento via Google Fonts.
- `fetchPriority="high"` na imagem do hero e lazy loading de imagens secundárias, com os ajustes específicos já descritos.
- Menu móvel com Escape, controle de foco e bloqueio de rolagem; botões reais e links com destino.
- Estrutura semântica com um H1, títulos de seção, formulários, labels, fieldsets e atributos de estado.
- Contatos centralizados em `site.ts`, URLs de WhatsApp codificadas e `noopener noreferrer` em links externos.
- CLS inicial baixo; qualquer otimização deve preservar esse resultado.
- Separação atual por seções e TypeScript estrito, que já ajudam a fazer mudanças graduais.

**Ordem recomendada de aplicação futura**

1. **Publicação e SEO básico:** domínio, canonical/compartilhamento, raiz pública, 404, arquivos de rastreamento e atualização das dependências sinalizadas.
2. **Desempenho mensurado:** apresentação e descoberta do hero; compressão/variantes de imagens; fundo do simulador; cache. Registrar antes/depois no mesmo perfil de teste.
3. **Acessibilidade e sobreposições:** contraste dos controles, área de toque dos pontos, WhatsApp flutuante, redução de movimento e navegação por teclado.
4. **Refatoração com proteção visual:** catálogo tipado, lógica do simulador, consolidação de CSS, isolamento do legado e verificações automatizadas.
5. **Conteúdo e medição:** pré-renderização, disponibilidade das informações sem cliques, estratégia de páginas e métricas reais/comerciais.

A pré-renderização pode ser antecipada se os primeiros testes mostrarem que a dependência do JavaScript continua dominando o LCP; sua posição depende do custo/benefício medido.

**Critérios para aceitar a futura refatoração**

- Metadados apontam para URLs públicas reais e a publicação não serve arquivos internos do projeto.
- URLs inexistentes retornam o status adequado; sitemap/robots têm conteúdo e localização corretos.
- Hero melhora no mesmo teste mobile, sem introduzir regressão de CLS; depois validar p75 em campo.
- Troca de produto/embalagem e todos os caminhos do simulador geram mensagens corretas, sem envio automático.
- Desktop e mobile preservam a composição visual e não apresentam sobreposição de controles essenciais.
- Conteúdo relevante é acessível sem depender de cliques do robô de busca.
- Typecheck, lint, build e verificações dos comportamentos críticos passam antes da publicação.
- Relatórios automáticos são revisados manualmente; uma nota 100 não é o único critério de aceite.

**Artefatos de apoio desta execução**

Os relatórios completos de Lighthouse, axe, capturas e scripts de inspeção estão em `/tmp/kelka-audit-20260922`. Essa pasta é temporária. Este documento conserva as medições e os achados para a próxima etapa. Relatórios principais: `lighthouse-mobile-1/2/3.{json,html}`, `lighthouse-desktop-1.{json,html}`, `browser.json`, `assets.json`, `npm-audit.json` e `axe-390.json`/`axe-1366.json`.

A comparação final dos hashes dos 212 arquivos existentes registrados no início não apontou alterações. Foi acrescentado apenas `LEVANTAMENTO_TECNICO_2026-09-22.md`.
