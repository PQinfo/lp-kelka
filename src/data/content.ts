export interface Testimonial {
  name: string;
  city: string;
  rating: number;
  text: string;
  pet: string;
  initial: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface Stat {
  /** Valor final da contagem. */
  target: number;
  label: string;
  /** Como o número é escrito na tela durante e ao fim da contagem. */
  format: (v: number) => string;
}

/* Depoimentos cortados para caber em 3 linhas no cartão. */
export const testimonials: Testimonial[] = [
  { name: "Ana Paula Seibert", city: "Florianópolis, SC", rating: 5, text: "Meu golden aderiu no primeiro dia. A absorção é impressionante e o líquido não volta.", pet: "Grande porte, 3 anos", initial: "A" },
  { name: "Carlos Mendes", city: "Curitiba, PR", rating: 5, text: "Comprei o pacote de 30 e durou meses. O controle de odor é real, meu apartamento agradeceu.", pet: "Pequeno porte, 1 ano", initial: "C" },
  { name: "Fernanda Lima", city: "Porto Alegre, RS", rating: 5, text: "Minha cadela idosa precisava de algo confiável para a noite. Resolveu por completo.", pet: "Grande porte, 11 anos", initial: "F" },
  { name: "Roberto Nunes", city: "Joinville, SC", rating: 5, text: "Testei várias marcas antes. A superfície seca é real, meu filhote ficou seco mesmo após várias vezes.", pet: "Médio porte, 4 meses", initial: "R" },
  { name: "Juliana Costa", city: "Maringá, PR", rating: 5, text: "As fitas de fixação são ótimas. O tapete fica no lugar mesmo com a minha cadela mais agitada.", pet: "Pequeno porte, 2 anos", initial: "J" },
];

export const faqs: Faq[] = [
  {
    q: "Como escolho o tamanho do tapete?",
    a: "Escolha pelo porte e pelos hábitos do seu cão. Ele precisa de espaço para subir e girar com folga. Para cães maiores ou que fazem xixi perto das bordas, prefira um modelo com maior área de absorção.",
  },
  {
    q: "O tapete ajuda a manter as patas secas?",
    a: "Sim. O tapete absorve e retém o líquido rapidamente. A superfície fica mais seca e as patas encostam menos na umidade.",
  },
  {
    q: "O tapete tem fitas de fixação?",
    a: "Sim. As fitas adesivas ajudam a segurar o tapete no lugar. Aplique-o em uma superfície limpa, seca e lisa para que as fitas grudem bem.",
  },
  {
    q: "Quando devo trocar o tapete?",
    a: "Em geral, a cada 1 ou 2 dias, mas isso depende do porte do cão e de quanto ele usa o tapete. Se estiver muito úmido, sujo ou com cheiro, troque antes.",
  },
  {
    q: "Onde posso comprar os tapetes Kelka?",
    a: "Atendemos diretamente Santa Catarina, Paraná e Rio Grande do Sul. Se você está em outro estado, confira a disponibilidade com nossos parceiros comerciais.",
  },
  {
    q: "O tapete tem atrativo para o cão?",
    a: "Sim. O atrativo ajuda o cão a reconhecer o tapete como o lugar de fazer as necessidades, o que facilita a adaptação e o treinamento.",
  },
];

/* Números institucionais. Ficam aqui e não dentro da seção, para não existir
   uma segunda cópia deles no componente que os anima. */
export const stats: Stat[] = [
  { target: 30, label: "Tapetes produzidos", format: (v) => `${v} mi+` },
  { target: 8, label: "Anos de mercado pet", format: (v) => `${v} anos+` },
  { target: 3, label: "Estados atendidos", format: (v) => `${v}` },
];
