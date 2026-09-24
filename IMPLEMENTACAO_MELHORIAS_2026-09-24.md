# Implementação das melhorias — concluída em 24/09/2026

Aplicação do levantamento `LEVANTAMENTO_TECNICO_2026-09-22.md`, preservando a composição aprovada, a entrada das lâminas, as seções removidas e o tamanho M de 70 × 60 cm. Este documento distingue alterações concluídas no código de configurações e decisões externas ainda necessárias.

## Validação

- Testes de lógica: 9 aprovados, cobrindo medidas, variantes, links, cinco fluxos, respostas obrigatórias, voltar/recomeçar, troca de perfil e múltipla seleção.
- Playwright: 20 aprovados, em desktop e mobile, contra Apache com CSP/cache. Incluem seis embalagens, guia/rodapé, cinco percursos completos, teclado/menu/FAQ/carrossel, ausência de erros de hidratação, movimento reduzido e conteúdo sem JavaScript.
- TypeScript da aplicação, configuração e testes; lint; build; orçamentos de assets: aprovados.
- Capturas e inspeção em 320 × 740, 390 × 844, 768 × 1024, 1024 × 768, 1366 × 768, 1920 × 1080 e 844 × 390. Sem rolagem horizontal. Hero, lâminas, produtos, cachorros e fundo do simulador conferidos visualmente.
- Smoke HTTP confere 404 reais, bloqueio de arquivos internos, tipos MIME, conteúdo inicial, cache e CSP. Servidor isolado com os módulos necessários passou. Na instalação principal do Apache local, o bloqueio de fontes está ativo, mas o módulo `headers` não está habilitado. Sua ativação exigiu senha de administrador e não foi realizada.
- `npm audit`: nenhuma vulnerabilidade encontrada após atualizar PostCSS, Nano ID e Sharp.
- Modo de release testado em cópia isolada: recusa publicação sem URL, gera canonical/Organization/sitemap coerentes e passa no smoke HTTP. O endereço `example.test` existe somente nessa cópia de teste, não em `dist/`.
- Telemetria opcional testada nessa cópia com interceptação local das requisições: payload contém somente IDs/medidas controlados; DNT bloqueia o envio. A distribuição normal continua sem endpoint de coleta.

Os relatórios detalhados, capturas e resultados de laboratório desta execução ficam em `.cache/validation/`; essa pasta não é publicada nem versionada. `playwright-report/` contém a execução dos testes. Os resultados resumidos abaixo permanecem neste documento.

## Resultados medidos

Lighthouse local de 24/09/2026, com três execuções mobile e uma desktop. Valores mobile abaixo são medianas por indicador, comparados ao levantamento de 22/09. Os perfis simulam rede e CPU; não são métricas de usuários em produção.

| Indicador | Antes | Depois |
| --- | --- | --- |
| Desempenho mobile | 73/100 (69–75) | **92/100 nas três execuções** |
| Desempenho desktop | 98/100 | **100/100** |
| FCP mobile | 2,10 s | 1,80 s |
| LCP mobile | 5,37 s | **3,23 s** (3,15–3,23 s) |
| TBT mobile | 231 ms | **18 ms** |
| CLS no carregamento mobile | 0,0134 | **0** |
| LCP desktop | 1,05 s | 0,75 s |
| Acessibilidade automatizada | 94/100 | 100/100 |
| Boas práticas Lighthouse | 96/100 | 100/100 |
| Distribuição completa | 34,47 MB | **3,85 MB**, cerca de 89% menor |
| Alertas do npm audit | 3 de gravidade alta | **0** |

O desktop também registrou TBT e CLS iguais a zero. A inspeção com axe não encontrou violações nas sete resoluções verificadas; isso não substitui avaliação manual e em aparelhos físicos.

O JavaScript completo soma 144.901 bytes gzip e o CSS 15.656 bytes gzip, dentro dos orçamentos. O total de JavaScript continua próximo à linha de base: parte das animações passou para um arquivo separado. A redução de 89% se refere ao tamanho da distribuição, não ao download inicial da página. Os arquivos originais foram preservados fora da distribuição.

**Limites e SEO de publicação:** o LCP mobile melhorou cerca de 40%, mas 3,23 s ainda está acima do objetivo de 2,5 s. Não foi medido INP de campo, e não se pode declarar aprovação dos Core Web Vitals em produção sem dados reais no percentil 75. O Lighthouse de SEO da prévia ficou em 66 porque ela contém `noindex` e bloqueia rastreamento deliberadamente enquanto falta o domínio oficial. A geração de canonical, sitemap, robots e Organization foi validada separadamente no modo release; a nota SEO do domínio publicado ainda precisa ser medida.

## Correção visual após a validação técnica

Após revisão do usuário, foram restauradas as superfícies azul-marinho da FAQ e do rodapé. A animação do hero foi recuperada do histórico anterior à refatoração: K entra da direita (80 px, escala 0,96, sem rotação), com atraso de 0,68 s e duração de 1,25 s; textos entram na sequência original e o conjunto acompanha a rolagem. A flutuação criada na primeira tentativa de restauração foi removida.

A FAQ recuperou o deslizamento de abertura/fechamento das respostas (0,28 s, curva original) e a entrada do título. As respostas continuam no HTML, com altura e visibilidade controladas por CSS. A alternativa sem JavaScript e a preferência por movimento reduzido foram preservadas.

Build, TypeScript, lint e oito testes existentes de navegador passaram após esta correção. Uma verificação adicional capturou quadros da entrada do K, confirmou ausência de rotação/flutuação, deslocamento com a rolagem e alturas intermediárias durante abertura e fechamento da FAQ, em desktop e mobile, sem erros de execução. Os artefatos ficam em `.cache/validation/original-motion-results.json`.

As métricas Lighthouse acima pertencem à rodada anterior a essas correções visuais. A entrada original do hero altera o tempo de exibição e exige nova medição; as notas anteriores não representam uma validação da animação restaurada. Os orçamentos do build atual passaram: JavaScript 147.985 bytes gzip, CSS 15.795 bytes gzip e distribuição de 3.857.952 bytes.

## Situação dos 50 itens

“Pronto/configurar” significa implementação disponível, com ativação dependente do domínio/servidor/serviço. Não significa publicação externa realizada.

| Item | Situação | Implementação ou dependência |
| --- | --- | --- |
| S01 | Pronto/configurar | `SITE_URL` centraliza canonical e URLs. Release bloqueada sem endereço definitivo/HTTPS. A URL real ainda precisa ser informada. |
| S02 | Aplicado | HTML estático completo no build, hidratado com React. Hero disponível antes de executar JavaScript. |
| S03 | Aplicado | Todas as linhas e respostas da FAQ estão no HTML inicial; visibilidade/teclado mantidos. Alternativas de leitura e contato sem JS. |
| S04 | Pronto/configurar | Robots/sitemap gerados com URL real. Prévia sem URL usa noindex e Disallow. Se publicado em subpasta, integrar a política de robots na raiz do domínio. |
| S05 | Aplicado | Modelos Apache retornam 404 para caminhos inexistentes; sem fallback indiscriminado para a landing. |
| S06 | Pronto/configurar | Arte social 1200 × 630, textos alternativos e metadados. URLs absolutas no release; validar prévia nos serviços após publicação. |
| S07 | Pronto/configurar | Organization usa identidade/contatos de `site.ts`, URL, logo e identificador estável. Sem avaliações/números comerciais inventados no schema. |
| S08 | Aplicado | Removida duplicação de FAQ em JSON-LD; perguntas mantidas em uma fonte de dados. |
| S09 | Aplicado | Introdução do hero explicita “Tapetes higiênicos”; H1 aprovado preservado. |
| S10 | Decisão comercial | Não foram criadas páginas repetitivas de SEO. Páginas próprias precisam de estratégia, conteúdo e URLs aprovados. |
| P01 | Aplicado | Imagem prioritária e responsiva no HTML. Animação original de entrada/rolagem restaurada por solicitação do usuário; sem rotação/flutuação. Movimento reduzido e alternativa sem JavaScript preservados. Nova medição de desempenho pendente após restauração. |
| P02 | Aplicado | Cachorros e simulador convertidos de PNG para WebP, preservando originais/transparência. |
| P03 | Aplicado | Dezesseis conjuntos responsivos com `srcSet`, `sizes` e dimensões; `sizes="auto"` nas imagens lazy usa a largura efetiva, com fallback para outros navegadores. |
| P04 | Aplicado | Fundo eager de CSS substituído por imagens lazy, mantendo contenção/preenchimento aprovados. |
| P05 | Pronto/configurar | Cache longo de arquivos com hash e revalidação de HTML testados em Apache isolado. Habilitar `headers` no servidor usado. |
| P06 | Aplicado | `LazyMotion`/`m` com recursos de animação em chunk separado; removidos atrasos e contagem animada desnecessária para SSR. Conteúdo editorial não foi adiado. |
| P07 | Aplicado | Swiper e CSS/animações legadas retirados do caminho ativo. Arquivo histórico fora da varredura. |
| P08 | Aplicado | Logo responsivo de 192/384 px, com dimensões e máscara reutilizando o mesmo recurso. |
| P09 | Aplicado | Conectores medidos em lote via animation frame, somente no desktop, evitando estados iguais e observação desnecessária. |
| P10 | Avaliado/preservado | Sombras/máscaras preservadas para manter as lâminas legíveis. Testes em Chromium não substituem profiling em celulares físicos; não há base para simplificação visual indiscriminada. |
| P11 | Aplicado | Somente `static/` e assets utilizados são publicados; imagens originais/arquivos de parceiros ficam fora de `dist`. |
| P12 | Aplicado/parcial externo | Orçamentos automáticos e linha de base. Adaptador RUM pronto, desativado sem endpoint próprio; p75 de campo depende de publicação e tráfego. |
| A01 | Aplicado | Texto escuro no CTA do hero e contraste do porte selecionado corrigidos; ajustes pontuais nos números das lâminas e legenda do simulador. |
| A02 | Aplicado | Pontos continuam pequenos, com área clicável de 28 × 32 px e maior separação. |
| A03 | Aplicado | Contato flutuante aparece após sair do hero, com respeito à área segura. |
| A04 | Aplicado | Movimento reduzido cobre transições/parallax; hook compatível com SSR evita divergência de hidratação. |
| A05 | Aplicado | Atalho para conteúdo, orientação correta das abas e foco nos destinos da navegação contextual. |
| A06 | Aplicado/validar físico | Aumentados textos pequenos do guia/simulador onde cabem; solução lateral preservada, revisada desde 320 px. Validação em aparelhos físicos ainda é recomendada. |
| A07 | Aplicado | Base clara com hero, FAQ e rodapé azul-marinho. Tokens locais preservam texto, bordas e foco legíveis, independentemente do tema do sistema. |
| A08 | Aplicado | Rodapé seleciona linha/embalagem; terceirização seleciona o interesse correto. Links são utilizáveis como URLs diretas e preservam navegação de histórico. |
| A09 | Verificado | Alturas da seção de produtos e avaliações estáveis nas trocas verificadas no desktop; imagens com espaço reservado e controles testados no mobile. |
| A10 | Aplicado | Exportações das lâminas 1/2 correspondem à proporção visual aprovada, mantendo sua geometria. |
| A11 | Aplicado | Contato em landmark `aside` e números com melhor contraste. |
| R01 | Aplicado | Typecheck, lint, testes, build e limites; workflow de qualidade pronto, sem publicação automática. |
| R02 | Aplicado | Catálogo tipado com IDs, unidades numéricas, dimensões e relação explícita com o guia. |
| R03 | Aplicado | Lógica do simulador extraída para reducer/hook, com guardas e testes de comportamento. |
| R04 | Aplicado | Estado armazena valores estáveis; rótulos resolvidos somente na apresentação/mensagem. |
| R05 | Aplicado | Política de tema e offset comum de navegação centralizados; estilos legados removidos. Ajustes geométricos específicos preservados. |
| R06 | Aplicado | Seções desativadas e dados antigos em `archive/`; nada foi reativado. |
| R07 | Aplicado | README substituído por documentação real; análise antiga identificada como histórica. |
| R08 | Aplicado/processo externo | Build reproduzível pelo lockfile, modelos de servidor rastreáveis e instruções de publicação atômica/rollback. Não houve commit, merge ou deploy remoto. |
| R09 | Aplicado | Ferramentas em devDependencies; ambiente Node/npm documentado e `.nvmrc` disponível. |
| I01 | Aplicado | Workspace Apache restringe acesso aos arquivos distribuíveis. Produção deve servir somente `dist/`. |
| I02 | Aplicado | Atualizações de segurança instaladas e lockfile atualizado; audit sem alertas. |
| I03 | Pronto/configurar | CSP, nosniff, referrer, enquadramento e permissões definidos/testados. Ativar módulos no host; HTTPS/HSTS dependem da publicação real. |
| I04 | Aplicado/parcial externo | Smoke pós-publicação e orientação de rollback; adaptador de erros pronto. Backend/coleta e disponibilidade precisam de operação externa. |
| C01 | Pronto/configurar | Eventos de intenção e contato com IDs controlados, sem respostas ou mensagem completa. Nenhum envio externo por padrão. |
| C02 | Validação da empresa | Alegações, depoimentos, produção, tempo de mercado e cobertura preservados. Sua comprovação/atualização depende da empresa. |
| C03 | Aplicado | Guia encaminha diretamente ao produto e embalagem correspondentes, incluindo M = Fofuxão 30 un., 70 × 60 cm. |
| C04 | Decisão jurídica/operacional | Não foram inventados termos, políticas ou consentimentos. Definir documentos de acordo com coleta, serviços e práticas efetivamente adotados. |

## Publicação ainda necessária

1. Informar `SITE_URL` e gerar `npm run build:release`. A versão local atual é uma prévia **não indexável**, intencionalmente.
2. Publicar somente `dist/`, habilitar os módulos/cabeçalhos e testar URL real, HTTPS, redirecionamentos e robots na raiz do domínio. Habilitação do módulo `headers` no Apache local requer administrador.
3. Validar conteúdo comercial com a empresa e, se desejado, configurar endpoint próprio/privacidade para métricas. Adaptador pronto não significa dados já coletados.
4. Conferir Search Console e Core Web Vitals de campo após tráfego suficiente; planejar páginas comerciais específicas somente com conteúdo próprio.

A opção por pré-renderização/hidratação segue a [documentação do React](https://react.dev/reference/react-dom/client/hydrateRoot); as mudanças do hero tratam descoberta e atraso de exibição conforme o [guia de LCP](https://web.dev/articles/optimize-lcp). A separação dos arquivos públicos utiliza a [configuração de diretório público do Vite](https://vite.dev/config/shared-options#publicdir).

A fonte principal é antecipada para reduzir mudanças de layout na abertura, conforme as [boas práticas de fontes](https://web.dev/articles/font-best-practices). A seleção automática de resolução das imagens lazy segue o [atributo sizes](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/sizes), mantendo alternativas de compatibilidade. O Tailwind varre apenas `src/`, por [configuração explícita da origem](https://tailwindcss.com/docs/detecting-classes-in-source-files).
