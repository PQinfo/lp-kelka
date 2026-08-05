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
  { icon: "💧", title: "Superabsorvente", desc: "Rápida absorção para manter as patas secas e a casa limpa." },
  { icon: "🛡️", title: "Barreira antivazamento", desc: "Camada impermeável que ajuda a evitar vazamentos e proteger o piso." },
  { icon: "📌", title: "Fitas de fixação", desc: "Mantêm o tapete no lugar, trazendo mais praticidade e segurança no uso." },
  { icon: "🐾", title: "Atrativo natural", desc: "Ajuda o pet a identificar o local certo e facilita o treinamento." },
  { icon: "🌬️", title: "Controle de odores", desc: "Ajuda a reduzir maus odores e manter o ambiente mais agradável." },
  { icon: "🤍", title: "Dermatologicamente testado", desc: "Suave para as patas do seu pet, com mais cuidado no uso diário." },
];

export const products: Product[] = [
  {
    id: 1,
    name: "Pipizão",
    size: "80×60 cm",
    units: "7 unidades",
    badge: "Destaque",
    badgeColor: "#1a5276",
    desc: "Área de absorção: 65cm × 45cm",
    features: ["Superabsorvente", "Atrativo canino", "Fita aderente", "Sem vazamentos"],
    img: `${import.meta.env.BASE_URL}produtos/pipizao-7un.webp`,
    imgBg: "#1a5276",
  },
  {
    id: 2,
    name: "Pipizão",
    size: "60×60 cm",
    units: "30 unidades",
    badge: "Destaque",
    badgeColor: "#1a5276",
    desc: "Área de absorção: 45cm × 45cm",
    features: ["Superabsorvente", "Atrativo canino", "Fita aderente", "Sem vazamentos"],
    img: `${import.meta.env.BASE_URL}produtos/pipizao-30un.webp`,
    imgBg: "#1a5276",
  },
  {
    id: 3,
    name: "Fofuxão",
    size: "60×55 cm",
    units: "7 unidades",
    badge: "Destaque",
    badgeColor: "#784212",
    desc: "Área de absorção: 45cm × 45cm",
    features: ["Superabsorvente", "Atrativo canino", "Fita aderente", "Sem vazamentos"],
    img: `${import.meta.env.BASE_URL}produtos/fofuxao-7un.webp`,
    imgBg: "#784212",
  },
  {
    id: 4,
    name: "Fofuxão",
    size: "70×60 cm",
    units: "30 unidades",
    badge: "Destaque",
    badgeColor: "#1e8449",
    desc: "Área de absorção: 57cm × 45cm",
    features: ["Superabsorvente", "Atrativo canino", "Fita aderente", "Sem vazamentos"],
    img: `${import.meta.env.BASE_URL}produtos/fofuxao-30un.webp`,
    imgBg: "#1e8449",
  },
  {
    id: 5,
    name: "Xixicão",
    size: "80×60 cm",
    units: "7 unidades",
    badge: "Clássico",
    badgeColor: "#6b2d2d",
    desc: "Área de absorção: 65cm × 45cm",
    features: ["Superabsorvente", "Atrativo canino", "Fita aderente", "Sem vazamentos"],
    img: `${import.meta.env.BASE_URL}produtos/xixicao-7un.webp`,
    imgBg: "#6b2d2d",
  },
  {
    id: 6,
    name: "Xixicão",
    size: "60×60 cm",
    units: "30 unidades",
    badge: "Clássico",
    badgeColor: "#c0624a",
    desc: "Área de absorção: 45cm × 45cm",
    features: ["Superabsorvente", "Atrativo canino", "Fita aderente", "Sem vazamentos"],
    img: `${import.meta.env.BASE_URL}produtos/xixicao-30un.webp`,
    imgBg: "#c0624a",
  },
];

export const steps: Step[] = [
  { number: "01", title: "Escolha o Tamanho", desc: "Selecione o tapete ideal pelo porte do seu pet. Temos opções para todas as raças e idades.", icon: "📏" },
  { number: "02", title: "Posicione no Local", desc: "Coloque em um local fixo e de fácil acesso para o seu pet. A base antiderrapante garante firmeza.", icon: "📍" },
  { number: "03", title: "Apresente ao Pet", desc: "O feromônio natural atrai o cão. Leve-o ao tapete nos momentos certos e reforce com elogios.", icon: "🐶" },
  { number: "04", title: "Descarte com Facilidade", desc: "Dobre, embale e descarte. Nossa embalagem biodegradável completa o ciclo sustentável.", icon: "♻️" },
];

export const testimonials: Testimonial[] = [
  { name: "Ana Paula S.", city: "Florianópolis, SC", rating: 5, text: "Meu golden retriever aderiu no primeiro dia! A absorção é impressionante e não volta líquido. Nunca mais tive problemas com chão molhado.", pet: "Golden Retriever, 3 anos", avatar: "A" },
  { name: "Carlos Mendes", city: "Curitiba, PR", rating: 5, text: "Comprei o pacotão e vai durar meses. Qualidade top pelo preço. O controle de odor é real, meu apartamento agradeceu muito.", pet: "Poodle, 1 ano", avatar: "C" },
  { name: "Fernanda Lima", city: "Porto Alegre, RS", rating: 5, text: "Minha cadela idosa precisava de algo confiável para a noite. O tapete da Kelka resolveu completamente. Recomendo demais!", pet: "Labrador, 11 anos", avatar: "F" },
  { name: "Roberto Nunes", city: "Joinville, SC", rating: 5, text: "Testei várias marcas antes. A Kelka é disparada a melhor. A superfície seca é real, meu filhote ficou seco mesmo após várias vezes.", pet: "Beagle, 4 meses", avatar: "R" },
  { name: "Juliana Costa", city: "Maringá, PR", rating: 5, text: "Uso há meses e nunca decepcionou. As fitas de fixação são ótimas, o tapete fica no lugar mesmo com minha cadela mais agitada.", pet: "Shih-Tzu, 2 anos", avatar: "J" },
];

export const faqs: Faq[] = [
  { q: "Qual tapete escolher para o meu cão?", a: "Escolha o tamanho de acordo com o porte e os hábitos do seu cão. O tapete deve ter espaço suficiente para que ele consiga subir, se posicionar e girar confortavelmente. Para cães maiores ou que costumam fazer xixi próximo às bordas, prefira o nosso tapete com maior área de absorção." },
  { q: "O tapete ajuda a manter as patas secas?", a: "Sim. A rápida absorção ajuda a reter o líquido e manter a superfície mais seca, reduzindo o contato das patas com a umidade." },
  { q: "O tapete possui fitas de fixação?", a: "Sim. As fitas adesivas ajudam a manter o tapete no lugar. Para uma melhor fixação, aplique-o sobre uma superfície limpa, seca e lisa." },
  { q: "Com que frequência devo trocar o tapete?", a: "A frequência depende do porte do cão e da quantidade de uso. Troque o tapete quando estiver muito úmido, sujo ou apresentar odor, mantendo o ambiente sempre limpo e confortável. Em geral, a cada 1 ou 2 dias." },
  { q: "Onde posso encontrar os produtos Kelka?", a: "Atendemos diretamente Santa Catarina, Paraná e Rio Grande do Sul. Para outras regiões do Brasil, consulte a disponibilidade em nossos e-commerces e parceiros comerciais." },
  { q: "O tapete possui atrativo para o cão?", a: "Sim. O atrativo auxilia o cão a reconhecer o local adequado para fazer suas necessidades, facilitando o período de adaptação e treinamento." },
];

export const stats: Stat[] = [
  { value: "30 milhões+", label: "Tapetes produzidos" },
  { value: "8 Anos+",     label: "Experiência no mercado pet" },
  { value: "3 Estados",   label: "Atendidos diretamente" },
];

