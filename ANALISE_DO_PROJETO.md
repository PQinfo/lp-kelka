# Análise técnica e recomendações — LP Kelka

**Data da análise:** 22 de julho de 2026  
**Projeto:** LP Kelka  
**Diretório analisado:** `C:\Projetos\PHP\kelka\lp-kelka`

## 1. Objetivo deste documento

Este documento registra o entendimento atual do projeto, os pontos positivos identificados, os problemas técnicos e comerciais que precisam ser verificados e uma proposta de evolução por etapas.

Nenhuma das recomendações descritas aqui representa uma alteração já aprovada. As implementações devem ser avaliadas e autorizadas antes de serem realizadas.

## 2. Entendimento do projeto

O projeto é uma landing page institucional e comercial da Kelka, destinada à apresentação de linhas de tapetes higiênicos para cães.

O objetivo principal da página é:

- apresentar a marca e seus produtos;
- comunicar benefícios e diferenciais;
- mostrar instruções de uso;
- transmitir confiança por meio de parceiros, avaliações e depoimentos;
- responder às principais dúvidas dos clientes;
- conduzir o visitante ao contato e à compra pelo WhatsApp.

### 2.1 Fluxo da página

A página está organizada na seguinte sequência:

1. Barra de navegação fixa;
2. Banner principal;
3. Benefícios dos produtos;
4. Carrossel com as linhas de produtos;
5. Lista animada de parceiros;
6. Instruções de utilização;
7. Depoimentos de clientes;
8. Perguntas frequentes;
9. Chamada final para compra;
10. Rodapé e botão flutuante do WhatsApp.

## 3. Tecnologias utilizadas

O projeto utiliza:

- React 19;
- TypeScript;
- Vite;
- Tailwind CSS 4;
- Framer Motion;
- GSAP;
- AOS;
- Swiper;
- Apache e `.htaccess` para publicação e redirecionamentos.

A aplicação está configurada para ser publicada no caminho `/lp-kelka/`.

## 4. Organização do código

Os componentes visuais estão separados entre componentes compartilhados e seções da página.

Estrutura principal:

```text
src/
├── components/
│   ├── KelkaLogo.tsx
│   └── Navbar.tsx
├── data/
│   └── content.ts
├── sections/
│   ├── Benefits.tsx
│   ├── CTA.tsx
│   ├── FAQ.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── HowItWorks.tsx
│   ├── Partners.tsx
│   ├── Products.tsx
│   └── Testimonials.tsx
├── App.tsx
├── index.css
└── main.tsx
```

Os produtos, benefícios, depoimentos, perguntas e outros textos estão centralizados no arquivo `src/data/content.ts`. Essa separação é positiva, pois facilita a manutenção do conteúdo sem espalhá-lo por muitos componentes.

## 5. Pontos positivos identificados

- Componentes separados de acordo com suas responsabilidades visuais;
- Uso de TypeScript em modo estrito;
- Conteúdo de produtos centralizado;
- Disponibilidade de imagens no formato WebP;
- Estrutura semântica básica com `main`, `section`, títulos e listas;
- Imagens de produtos com texto alternativo;
- Links externos protegidos com `noopener noreferrer`;
- Layout preparado para dispositivos móveis;
- Metadados básicos de descrição e Open Graph;
- Separação da versão compilada na pasta `dist`;
- Identidade visual consistente entre as seções;
- Chamadas para ação distribuídas ao longo da página.

## 6. Pontos que precisam de atenção

### 6.1 Arquivo de entrada divergente

O arquivo `index.html` procura por:

```html
<script type="module" src="/src/main.jsx"></script>
```

Entretanto, o arquivo existente no projeto é:

```text
src/main.tsx
```

Essa divergência provavelmente impede uma nova compilação a partir do código-fonte. A versão presente em `dist` pode continuar funcionando por ter sido gerada anteriormente.

**Recomendação:** corrigir o caminho para `main.tsx` e executar novamente as verificações de TypeScript, lint e build.

### 6.2 Número de WhatsApp provisório

Os principais botões de conversão usam o seguinte número:

```text
5500000000000
```

Ele aparece em `App.tsx`, `Products.tsx`, `FAQ.tsx` e `CTA.tsx`.

**Recomendações:**

- substituir pelo número oficial;
- definir mensagens diferentes conforme a origem do clique;
- centralizar número e mensagens em um único arquivo de configuração;
- adicionar parâmetros de rastreamento quando apropriado.

### 6.3 Informações comerciais que precisam de validação

O site apresenta afirmações que devem ser confirmadas pela empresa e, quando necessário, respaldadas por laudos, documentos ou dados reais:

- “100% biodegradável”;
- “dermatologicamente testado”;
- “aprovado por veterinários e dermatologistas”;
- eliminação de bactérias por até 12 horas;
- absorção de até 500 ml;
- 2 milhões de tapetes vendidos;
- 50 mil pets satisfeitos;
- mais de 12 mil avaliações;
- índice de recomendação de 98%;
- suporte 24 horas por dia, sete dias por semana;
- frete grátis acima de R$ 80;
- depoimentos apresentados como relatos reais.

Também existe o título provisório “X famílias aprovam!”.

**Recomendação:** criar uma lista de conteúdos aprovados pela empresa antes da publicação definitiva.

### 6.4 Caminhos fixos em `/lp-kelka/`

Imagens e logos utilizam caminhos absolutos como:

```text
/lp-kelka/produtos/xixicao-7un.webp
/lp-kelka/logo-horizontal.webp
/lp-kelka/hero-banner.webp
```

Isso cria dependência do diretório de publicação. Se o site for transferido para a raiz do domínio ou outro subdiretório, os arquivos poderão deixar de carregar.

**Recomendação:** usar a base configurada pelo Vite ou caminhos que sejam resolvidos automaticamente no processo de compilação.

### 6.5 Bibliotecas de animação em excesso

A página utiliza simultaneamente:

- GSAP;
- AOS;
- Framer Motion.

Essa combinação aumenta o JavaScript enviado ao navegador e a complexidade de manutenção. Também pode afetar o desempenho em celulares menos potentes.

Foram identificados ainda:

- `lucide-react` sem uso aparente;
- CSS do Fancybox importado sem funcionalidade correspondente;
- inicialização global do AOS e atualização adicional em uma seção específica.

**Recomendações:**

- escolher uma biblioteca principal de animação;
- remover dependências e estilos não utilizados;
- evitar animações que não tenham função de comunicação ou conversão;
- respeitar a preferência `prefers-reduced-motion`.

### 6.6 Acessibilidade

Os principais aprimoramentos recomendados são:

- incluir `aria-expanded` e `aria-controls` no menu móvel;
- permitir fechar o menu com a tecla `Esc`;
- controlar corretamente o foco quando o menu estiver aberto;
- impedir a rolagem do conteúdo atrás do menu;
- melhorar os indicadores visuais de foco nos botões e links;
- associar corretamente perguntas e respostas do FAQ;
- adicionar `aria-expanded` aos botões do FAQ;
- verificar o contraste de textos com baixa opacidade;
- pausar carrosséis e animações contínuas quando necessário;
- adaptar o ticker de parceiros para leitores de tela;
- revisar as animações contínuas do botão flutuante do WhatsApp.

### 6.7 SEO e compartilhamento

A página possui título, descrição e alguns dados Open Graph, mas ainda pode receber:

- URL canônica;
- `og:image`;
- `og:url`;
- metadados para Twitter Cards;
- dados estruturados de organização e produtos;
- arquivo `robots.txt`;
- arquivo `sitemap.xml`;
- favicon compatível com o caminho final de publicação;
- textos alternativos revisados;
- páginas reais de privacidade, termos e atendimento.

Existem links no rodapé com `href="#"`. Esses links devem apontar para páginas ou seções reais antes da publicação.

### 6.8 Imagens e arquivos duplicados

Existem imagens repetidas em:

- `src/assets`;
- `src/assets/materiais`;
- `public`;
- `dist`.

Alguns PNGs possuem mais de 2 MB. Embora o site use versões WebP em vários pontos, a duplicação aumenta o tamanho do repositório e torna difícil identificar a versão oficial de cada imagem.

**Recomendações:**

- definir uma pasta oficial para arquivos-fonte;
- manter em `public` apenas os arquivos realmente publicados;
- eliminar duplicações depois de confirmar quais arquivos podem ser removidos;
- definir dimensões adequadas para cada contexto;
- avaliar AVIF além de WebP;
- documentar se `dist` precisa permanecer versionada.

### 6.9 Documentação

O `README.md` ainda contém o texto padrão do Vite.

O documento deveria explicar:

- objetivo do projeto;
- requisitos do ambiente;
- instalação das dependências;
- execução local;
- geração da versão de produção;
- processo de publicação;
- configuração do WhatsApp;
- edição de produtos e textos;
- motivo da configuração `/lp-kelka/`;
- política adotada para a pasta `dist`.

### 6.10 Testes e verificações automatizadas

Não foram identificados testes automatizados.

Para uma landing page, uma cobertura inicial enxuta poderia verificar:

- carregamento da aplicação;
- exibição dos produtos;
- funcionamento do menu móvel;
- abertura e fechamento do FAQ;
- links do WhatsApp;
- navegação pelas âncoras;
- ausência de links quebrados;
- compilação e validação de tipos.

Na análise atual, não foi possível executar lint, TypeScript e build porque as dependências locais não estavam instaladas e o ambiente não permitiu baixá-las. Portanto, a avaliação de compilação foi realizada de forma estática.

## 7. Boas práticas recomendadas para o código

### 7.1 Centralizar configurações

Criar uma configuração única para informações globais, como:

- número do WhatsApp;
- mensagens de atendimento;
- URLs das redes sociais;
- dados da empresa;
- caminho base da aplicação;
- métricas aprovadas;
- regras de frete.

### 7.2 Separar conteúdo de comportamento

Manter textos, produtos e perguntas em arquivos de dados, deixando os componentes responsáveis principalmente pela apresentação e interação.

### 7.3 Evitar valores mágicos

Cores, URLs, tempos de animação, números comerciais e textos repetidos devem ser definidos em variáveis, temas ou arquivos de configuração.

### 7.4 Padronizar componentes

Criar componentes reutilizáveis para:

- botões principais;
- links do WhatsApp;
- títulos de seção;
- cartões;
- ícones;
- indicadores de confiança.

### 7.5 Validar qualidade antes da publicação

O fluxo mínimo recomendado é:

```text
instalação → lint → verificação de tipos → testes → build → revisão visual → publicação
```

### 7.6 Manter o repositório limpo

- remover dependências não utilizadas;
- evitar arquivos duplicados;
- não misturar materiais brutos com arquivos de produção;
- documentar arquivos gerados;
- manter padrões consistentes de nomes e formatação.

## 8. Boas práticas para elaboração da página

### 8.1 Clareza da proposta

O visitante deve compreender rapidamente:

- o que a Kelka oferece;
- qual problema o produto resolve;
- qual linha atende ao perfil do seu pet;
- onde comprar ou pedir atendimento.

### 8.2 Conversão

Recomenda-se:

- utilizar chamadas para ação com texto específico;
- informar o que acontecerá ao clicar;
- diferenciar contato comercial de compra;
- criar mensagens de WhatsApp conforme o produto selecionado;
- medir cliques nos principais botões;
- evitar excesso de chamadas concorrentes.

### 8.3 Confiança

Informações de confiança devem ser reais e verificáveis:

- avaliações;
- depoimentos;
- parceiros;
- certificações;
- laudos;
- política de entrega;
- canais de atendimento;
- dados da empresa.

### 8.4 Desempenho

- priorizar a imagem principal;
- carregar imagens inferiores sob demanda;
- reduzir bibliotecas JavaScript;
- comprimir imagens;
- evitar animações contínuas desnecessárias;
- hospedar ou otimizar as fontes;
- testar em conexão móvel e aparelhos intermediários.

### 8.5 Responsividade

A página deve ser validada, no mínimo, nos seguintes cenários:

- celular pequeno;
- celular grande;
- tablet;
- notebook;
- monitor amplo;
- orientação horizontal em dispositivos móveis.

### 8.6 Privacidade e conformidade

Se forem instaladas ferramentas de analytics, publicidade ou rastreamento, será necessário avaliar:

- política de privacidade;
- consentimento de cookies, quando aplicável;
- tratamento de dados pessoais;
- transparência sobre serviços externos;
- conformidade com a LGPD.

## 9. Plano recomendado para aprovações

### Etapa 1 — Estabilidade técnica

- corrigir o arquivo de entrada;
- instalar dependências;
- executar lint, TypeScript e build;
- revisar a configuração do Vite e do Apache;
- confirmar o endereço final de publicação.

### Etapa 2 — Conteúdo e conversão

- inserir o WhatsApp oficial;
- aprovar mensagens automáticas;
- validar produtos, medidas e embalagens;
- confirmar todos os números e benefícios anunciados;
- revisar parceiros, depoimentos e condições comerciais.

### Etapa 3 — Acessibilidade e experiência

- corrigir menu móvel e FAQ;
- melhorar navegação por teclado;
- revisar contrastes;
- respeitar preferências de redução de movimento;
- testar celulares e diferentes tamanhos de tela.

### Etapa 4 — Desempenho e organização

- reduzir bibliotecas de animação;
- remover dependências não utilizadas;
- organizar e otimizar imagens;
- eliminar duplicações aprovadas;
- revisar o tamanho final da aplicação.

### Etapa 5 — SEO, métricas e publicação

- completar metadados;
- adicionar dados estruturados;
- criar sitemap e robots;
- configurar métricas de conversão;
- revisar páginas legais;
- realizar auditoria final antes da publicação.

## 10. Itens que dependem de decisão da empresa

Antes das alterações, é necessário confirmar:

- número oficial do WhatsApp;
- mensagens desejadas para cada botão;
- domínio e caminho definitivo de publicação;
- canais oficiais de redes sociais;
- lista correta de produtos, medidas e embalagens;
- dados comerciais e estatísticos autorizados;
- comprovação dos benefícios técnicos anunciados;
- autenticidade e autorização dos depoimentos;
- política de frete e atendimento;
- necessidade de páginas de privacidade e termos;
- ferramentas de analytics ou publicidade que serão utilizadas.

## 11. Conclusão

O projeto possui uma boa base visual e uma estrutura de componentes adequada para uma landing page. Os principais riscos atuais não estão na aparência, mas na estabilidade da compilação, nos placeholders de contato, na dependência de caminhos fixos, no excesso de recursos de animação e na necessidade de validar as afirmações comerciais.

A evolução deve ocorrer por etapas curtas, começando pelas correções técnicas essenciais. Cada etapa pode ser apresentada previamente, implementada somente após aprovação e validada antes de avançar para a próxima.

---

**Observação:** durante esta análise, foram preservadas as alterações locais já existentes em `.gitignore`, `.htaccess` e `_old.htaccess`. Nenhum arquivo da aplicação foi modificado além da criação deste documento.
