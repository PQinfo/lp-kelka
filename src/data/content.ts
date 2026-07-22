export interface Benefit {
  icon: string;
  title: string;
  desc: string;
}

export interface Product {
  id: number;
  name: string;
  size: string;
  units: string;
  badge: string;
  badgeColor: string;
  desc: string;
  features: string[];
  img: string;
  imgBg: string;
}

export interface Step {
  number: string;
  title: string;
  desc: string;
  icon: string;
}

export interface Testimonial {
  name: string;
  city: string;
  rating: number;
  text: string;
  pet: string;
  avatar: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface Stat {
  value: string;
  label: string;
}

export const benefits: Benefit[] = [
  { icon: "🌿", title: "100% Biodegradável", desc: "Material super absorvente com camada inferior antiderrapante e impermeável. Seguro para o meio ambiente." },
  { icon: "💧", title: "Ultra Absorção", desc: "Tecnologia de 5 camadas absorve até 500ml sem retorno de líquido. Mantém a superfície seca." },
  { icon: "🛡️", title: "Antibacteriano", desc: "Tratamento antimicrobiano elimina odores e inibe o crescimento de bactérias por até 12 horas." },
  { icon: "🐾", title: "Atração Natural", desc: "Impregnado com feromonas naturais que atraem o pet para o local certo na primeira vez." },
  { icon: "📦", title: "Mega Pacotão", desc: "Embalagens econômicas com até 70 unidades. Compre mais, pague menos e nunca fique sem." },
  { icon: "🤍", title: "Dermatologicamente Testado", desc: "Suave para as patas do seu pet. Aprovado por veterinários e dermatologistas." },
];

export const products: Product[] = [
  {
    id: 1,
    name: "Xixi Cão",
    size: "80×60 cm",
    units: "7 unidades",
    badge: "Mais Vendido",
    badgeColor: "#c0392b",
    desc: "Para filhotes e adultos. Com atrativo canino, fita aderente e superabsorvente. Sem vazamentos.",
    features: ["Com atrativo canino", "Fita aderente", "Superabsorvente", "Sem vazamentos"],
    img: "/produtos/xixicao-7un.webp",
    imgBg: "#6b2d2d",
  },
  {
    id: 2,
    name: "Xixi Cão",
    size: "60×60 cm",
    units: "30 unidades",
    badge: "Econômico",
    badgeColor: "#c0392b",
    desc: "Pacotão para filhotes e adultos. Mesma qualidade em quantidade maior para economizar mais.",
    features: ["Com atrativo canino", "Fita aderente", "Superabsorvente", "Sem vazamentos"],
    img: "/produtos/xixicao-30un.webp",
    imgBg: "#6b2d2d",
  },
  {
    id: 3,
    name: "Pipi Zão",
    size: "80×60 cm",
    units: "7 unidades",
    badge: "Premium",
    badgeColor: "#1a5276",
    desc: "Para todas as idades e raças. Extra gel para máxima absorção. Ideal para casas e apartamentos.",
    features: ["Extra gel absorvente", "Com atrativo canino", "Fita aderente", "Todas as raças"],
    img: "/produtos/pipizao-7un.webp",
    imgBg: "#1a5276",
  },
  {
    id: 4,
    name: "Pipi Zão",
    size: "80×60 cm",
    units: "30 unidades",
    badge: "Super Pack",
    badgeColor: "#1a5276",
    desc: "Pacotão Premium para quem busca a melhor proteção com custo-benefício máximo.",
    features: ["Extra gel absorvente", "Com atrativo canino", "Fita aderente", "Todas as raças"],
    img: "/produtos/pipizao-30un.webp",
    imgBg: "#1a5276",
  },
  {
    id: 5,
    name: "Fofu Xão",
    size: "60×55 cm",
    units: "7 unidades",
    badge: "Compacto",
    badgeColor: "#784212",
    desc: "Tapete compacto e superabsorvente para cães de pequeno e médio porte. Tecnologia anti-odor.",
    features: ["Superabsorvente", "Com atrativo canino", "Fita aderente", "Sem vazamentos"],
    img: "/produtos/fofuxao-7un.webp",
    imgBg: "#784212",
  },
  {
    id: 6,
    name: "Fofu Xão",
    size: "70×60 cm",
    units: "30 unidades",
    badge: "Família",
    badgeColor: "#1e8449",
    desc: "Pacotão Fofu Xão em tamanho maior. Para cães adultos de médio e grande porte.",
    features: ["Superabsorvente", "Com atrativo canino", "Fita aderente", "Sem vazamentos"],
    img: "/produtos/fofuxao-30un.webp",
    imgBg: "#1e8449",
  },
];

export const steps: Step[] = [
  { number: "01", title: "Escolha o Tamanho", desc: "Selecione o tapete ideal pelo porte do seu pet. Temos opções para todas as raças e idades.", icon: "📏" },
  { number: "02", title: "Posicione no Local", desc: "Coloque em um local fixo e de fácil acesso para o seu pet. A base antiderrapante garante firmeza.", icon: "📍" },
  { number: "03", title: "Apresente ao Pet", desc: "O feromônio natural atrai o cão. Leve-o ao tapete nos momentos certos e reforce com elogios.", icon: "🐶" },
  { number: "04", title: "Descarte com Facilidade", desc: "Dobre, embale e descarte. Nossa embalagem biodegradável completa o ciclo sustentável.", icon: "♻️" },
];

export const testimonials: Testimonial[] = [
  { name: "Ana Paula S.", city: "São Paulo, SP", rating: 5, text: "Meu golden retriever aderiu no primeiro dia! A absorção é impressionante e não volta líquido. Nunca mais tive problemas com chão molhado.", pet: "Golden Retriever, 3 anos", avatar: "A" },
  { name: "Carlos Mendes", city: "Rio de Janeiro, RJ", rating: 5, text: "Comprei o Mega Pack e vai durar meses. Qualidade top pelo preço. O controle de odor é real, meu apartamento agradeceu muito.", pet: "Poodle, 1 ano", avatar: "C" },
  { name: "Fernanda Lima", city: "Belo Horizonte, MG", rating: 5, text: "Minha cadela idosa precisava de algo confiável para a noite. O Xixi Cão Premium resolveu completamente. Recomendo demais!", pet: "Labrador, 11 anos", avatar: "F" },
  { name: "Roberto Nunes", city: "Curitiba, PR", rating: 5, text: "Testei várias marcas antes. A Kelka é disparada a melhor. A superfície seca é real, meu filhote ficou seco mesmo após várias vezes.", pet: "Beagle, 4 meses", avatar: "R" },
  { name: "Juliana Costa", city: "Salvador, BA", rating: 5, text: "Adoro que é ecológico! Além de funcionar muito bem, me sinto bem por escolher um produto que cuida do planeta também.", pet: "Shih-Tzu, 2 anos", avatar: "J" },
];

export const faqs: Faq[] = [
  { q: "Qual tapete escolher para o meu cão?", a: "Para filhotes até 10kg, o Filhote 40×50 é ideal. Para cães de médio porte (10–25kg), o Classic 60×60. Para raças grandes ou se o pet costuma ir além das bordas, o Premium 60×80 é a melhor escolha." },
  { q: "Com que frequência devo trocar o tapete?", a: "Recomendamos trocar após 1–2 usos ou quando a absorção estiver saturada. Com o Mega Pack de 70 unidades, a troca frequente se torna muito econômica." },
  { q: "O tapete realmente não desliza no chão?", a: "Sim! A camada inferior é revestida com polietileno texturizado que adere ao piso sem danificá-lo, seja cerâmica, madeira ou vinil." },
  { q: "Entregam para todo o Brasil?", a: "Sim! Entregamos para todos os estados. Frete grátis para compras acima de R$80 nas principais capitais." },
];

export const stats: Stat[] = [
  { value: "2M+", label: "Tapetes vendidos" },
  { value: "50k+", label: "Pets satisfeitos" },
  { value: "4.9★", label: "Avaliação média" },
  { value: "98%", label: "Recomendam" },
];

export const partners: string[] = [
  "Basso e Pancotte",
  "Pian Alimentos",
  "GranNature",
  "Forpets",
  "ConsumoPet",
  "Vidapet",
  "Natural Dots",
];
