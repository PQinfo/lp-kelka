import type { Icon } from "@phosphor-icons/react";
import { Factory, Storefront, Handshake, PawPrint, Tag } from "@phosphor-icons/react";

export interface SimOption {
  value: string;
  label: string;
}

export interface SimStep {
  field: string;
  question: string;
  options: SimOption[];
  multiSelect?: boolean;
}

export interface SimFlow {
  id: string;
  icon: Icon;
  label: string;
  steps: SimStep[];
  buildMessage: (sel: Record<string, string | string[]>) => string;
}

const get = (sel: Record<string, string | string[]>, field: string): string => {
  const v = sel[field];
  return v ? (Array.isArray(v) ? v.join(", ") : v) : "nao informado";
};

export const flows: SimFlow[] = [
  {
    id: "distribuidor",
    icon: Factory,
    label: "Quero distribuir os produtos Kelka",
    steps: [
      {
        field: "estado",
        question: "Onde sua empresa atua?",
        options: [
          { value: "sc",    label: "Santa Catarina" },
          { value: "pr",    label: "Paraná" },
          { value: "rs",    label: "Rio Grande do Sul" },
          { value: "outro", label: "Outro estado" },
        ],
      },
      {
        field: "perfil",
        question: "Qual é o perfil da sua empresa?",
        options: [
          { value: "dist_pet",    label: "Distribuidora de produtos pet" },
          { value: "atacadista",  label: "Atacadista" },
          { value: "dist_vet",    label: "Distribuidora veterinária" },
          { value: "dist_hig",    label: "Distribuidora de produtos de higiene" },
          { value: "outro",       label: "Outro segmento" },
        ],
      },
      {
        field: "experiencia",
        question: "Sua empresa já distribui produtos para o mercado pet?",
        options: [
          { value: "sim",       label: "Sim" },
          { value: "nao",       label: "Não" },
          { value: "comecando", label: "Estamos começando agora" },
        ],
      },
      {
        field: "volume",
        question: "Qual é o volume estimado de compra?",
        options: [
          { value: "ate500",    label: "Até 500 pacotes por mês" },
          { value: "501_1000",  label: "De 501 a 1.000 pacotes por mês" },
          { value: "1001_3000", label: "De 1.001 a 3.000 pacotes por mês" },
          { value: "mais3000",  label: "Mais de 3.000 pacotes por mês" },
          { value: "naossei",   label: "Ainda não sei" },
        ],
      },
      {
        field: "interesse",
        question: "O que você deseja receber?",
        options: [
          { value: "tabela",    label: "Tabela de preços" },
          { value: "catalogo",  label: "Catálogo dos produtos" },
          { value: "condicoes", label: "Condições para distribuidores" },
          { value: "consultor", label: "Falar com um consultor" },
        ],
      },
    ],
    buildMessage: (sel) =>
      `Olá, equipe Kelka! Tenho interesse em distribuir os produtos Kelka.\n\nEstado de atuação: ${get(sel, "estado")}.\nPerfil da empresa: ${get(sel, "perfil")}.\nExperiência no mercado pet: ${get(sel, "experiencia")}.\nVolume mensal estimado: ${get(sel, "volume")}.\nInteresse principal: ${get(sel, "interesse")}.\n\nGostaria de receber mais informações.`,
  },
  {
    id: "revendedor",
    icon: Storefront,
    label: "Quero revender os produtos Kelka",
    steps: [
      {
        field: "estabelecimento",
        question: "Qual é o seu tipo de estabelecimento?",
        options: [
          { value: "petshop",      label: "Pet shop" },
          { value: "agro",         label: "Agropecuária" },
          { value: "clinica",      label: "Clínica veterinária" },
          { value: "supermercado", label: "Supermercado" },
          { value: "variedades",   label: "Loja de variedades" },
          { value: "ecommerce",    label: "E-commerce" },
          { value: "outro",        label: "Outro" },
        ],
      },
      {
        field: "estado",
        question: "Onde seu estabelecimento está localizado?",
        options: [
          { value: "sc",    label: "Santa Catarina" },
          { value: "pr",    label: "Paraná" },
          { value: "rs",    label: "Rio Grande do Sul" },
          { value: "outro", label: "Outro estado" },
        ],
      },
      {
        field: "vende_tapete",
        question: "Você já vende tapetes higiênicos?",
        options: [
          { value: "sim",     label: "Sim" },
          { value: "nao",     label: "Não" },
          { value: "abrindo", label: "Estou abrindo meu negócio" },
        ],
      },
      {
        field: "compra_inicial",
        question: "Qual seria sua compra inicial?",
        options: [
          { value: "ate30",    label: "Até 30 pacotes" },
          { value: "31_100",   label: "De 31 a 100 pacotes" },
          { value: "101_300",  label: "De 101 a 300 pacotes" },
          { value: "mais300",  label: "Mais de 300 pacotes" },
          { value: "consultar",label: "Quero consultar o pedido mínimo" },
        ],
      },
      {
        field: "interesse",
        question: "O que você procura?",
        options: [
          { value: "tabela",      label: "Tabela de preços" },
          { value: "catalogo",    label: "Catálogo dos produtos" },
          { value: "pedido_min",  label: "Pedido mínimo" },
          { value: "pagamento",   label: "Condições de pagamento" },
          { value: "atendimento", label: "Atendimento comercial" },
        ],
      },
    ],
    buildMessage: (sel) =>
      `Olá, equipe Kelka! Tenho interesse em revender os produtos Kelka.\n\nTipo de estabelecimento: ${get(sel, "estabelecimento")}.\nEstado: ${get(sel, "estado")}.\nJá comercializa tapetes higiênicos: ${get(sel, "vende_tapete")}.\nCompra inicial estimada: ${get(sel, "compra_inicial")}.\n\nGostaria de informações sobre: ${get(sel, "interesse")}.`,
  },
  {
    id: "representante",
    icon: Handshake,
    label: "Quero ser representante comercial",
    steps: [
      {
        field: "estado",
        question: "Em qual estado você deseja atuar?",
        options: [
          { value: "sc",     label: "Santa Catarina" },
          { value: "pr",     label: "Paraná" },
          { value: "rs",     label: "Rio Grande do Sul" },
          { value: "outro",  label: "Outro estado" },
          { value: "varios", label: "Em mais de um estado" },
        ],
      },
      {
        field: "experiencia",
        question: "Você possui experiência com representação comercial?",
        options: [
          { value: "sim_pet",   label: "Sim, no mercado pet" },
          { value: "sim_outro", label: "Sim, em outro segmento" },
          { value: "vendas",    label: "Não, mas tenho experiência em vendas" },
          { value: "nao",       label: "Ainda não tenho experiência" },
        ],
      },
      {
        field: "carteira",
        question: "Você possui carteira de clientes?",
        options: [
          { value: "sim_pet",   label: "Sim, no mercado pet" },
          { value: "sim_outro", label: "Sim, em outros segmentos" },
          { value: "formando",  label: "Estou formando uma carteira" },
          { value: "nao",       label: "Ainda não possuo" },
        ],
      },
      {
        field: "core",
        question: "Possui registro no CORE?",
        options: [
          { value: "sim",     label: "Sim" },
          { value: "nao",     label: "Não" },
          { value: "processo",label: "Está em processo de registro" },
          { value: "duvida",  label: "Quero entender se é necessário" },
        ],
      },
      {
        field: "segmentos",
        question: "Quais clientes pretende atender?",
        multiSelect: true,
        options: [
          { value: "petshops",  label: "Pet shops" },
          { value: "agro",      label: "Agropecuárias" },
          { value: "clinicas",  label: "Clínicas veterinárias" },
          { value: "super",     label: "Supermercados" },
          { value: "dist",      label: "Distribuidores" },
          { value: "ecommerce", label: "E-commerces" },
        ],
      },
    ],
    buildMessage: (sel) =>
      `Olá, equipe Kelka! Tenho interesse em ser representante comercial.\n\nRegião pretendida: ${get(sel, "estado")}.\nExperiência: ${get(sel, "experiencia")}.\nCarteira de clientes: ${get(sel, "carteira")}.\nRegistro no CORE: ${get(sel, "core")}.\nSegmentos que pretendo atender: ${get(sel, "segmentos")}.\n\nGostaria de saber mais sobre a oportunidade.`,
  },
  {
    id: "consumidor",
    icon: PawPrint,
    label: "Quero comprar para o meu pet",
    steps: [
      {
        field: "estado",
        question: "Onde você mora?",
        options: [
          { value: "sc",    label: "Santa Catarina" },
          { value: "pr",    label: "Paraná" },
          { value: "rs",    label: "Rio Grande do Sul" },
          { value: "outro", label: "Outro estado" },
        ],
      },
      {
        field: "porte",
        question: "Qual é o porte do seu cão?",
        options: [
          { value: "pequeno", label: "Pequeno" },
          { value: "medio",   label: "Médio" },
          { value: "grande",  label: "Grande" },
          { value: "varios",  label: "Tenho cães de portes diferentes" },
        ],
      },
      {
        field: "necessidade",
        question: "Qual é a sua necessidade principal?",
        options: [
          { value: "absorcao",    label: "Maior absorção" },
          { value: "vazamento",   label: "Evitar vazamentos" },
          { value: "patas",       label: "Manter as patas secas" },
          { value: "treinamento", label: "Ajudar no treinamento" },
          { value: "economico",   label: "Encontrar uma opção econômica" },
        ],
      },
      {
        field: "compra",
        question: "Como deseja comprar?",
        options: [
          { value: "loja",     label: "Encontrar uma loja próxima" },
          { value: "internet", label: "Comprar pela internet" },
          { value: "conhecer", label: "Conhecer os produtos disponíveis" },
          { value: "ajuda",    label: "Receber ajuda para escolher" },
        ],
      },
    ],
    buildMessage: (sel) =>
      `Olá, equipe Kelka! Quero comprar tapetes higiênicos para o meu pet.\n\nEstado: ${get(sel, "estado")}.\nPorte do cão: ${get(sel, "porte")}.\nNecessidade principal: ${get(sel, "necessidade")}.\nForma de compra desejada: ${get(sel, "compra")}.\n\nPodem me indicar a melhor opção?`,
  },
  {
    id: "marca_propria",
    icon: Tag,
    label: "Quero fabricar tapetes com a minha marca",
    steps: [
      {
        field: "mercado_pet",
        question: "Sua empresa já atua no mercado pet?",
        options: [
          { value: "sim",      label: "Sim" },
          { value: "nao",      label: "Não" },
          { value: "entrando", label: "Estamos entrando no mercado" },
          { value: "outro_seg",label: "Atuamos em outro segmento" },
        ],
      },
      {
        field: "marca",
        question: "Você já possui uma marca?",
        options: [
          { value: "sim_mercado",   label: "Sim, a marca já está no mercado" },
          { value: "sim_nao_lanc",  label: "Sim, mas ainda não lançamos" },
          { value: "em_dev",        label: "A marca está em desenvolvimento" },
          { value: "nao",           label: "Ainda não possuímos marca" },
        ],
      },
      {
        field: "interesse",
        question: "O que você procura?",
        options: [
          { value: "fabricar",   label: "Fabricar tapetes com minha marca" },
          { value: "embalagem",  label: "Personalizar a embalagem" },
          { value: "novo_tam",   label: "Desenvolver um novo tamanho" },
          { value: "substituir", label: "Substituir meu fornecedor atual" },
          { value: "entender",   label: "Entender como funciona a terceirização" },
        ],
      },
      {
        field: "volume",
        question: "Qual é o volume mensal estimado?",
        options: [
          { value: "ate10k",   label: "Até 10 mil unidades" },
          { value: "10k_30k",  label: "De 10 mil a 30 mil unidades" },
          { value: "30k_100k", label: "De 30 mil a 100 mil unidades" },
          { value: "mais100k", label: "Mais de 100 mil unidades" },
          { value: "sem_est",  label: "Ainda não temos uma estimativa" },
        ],
      },
      {
        field: "etapa",
        question: "Em qual etapa está o projeto?",
        options: [
          { value: "pesquisando", label: "Apenas pesquisando fornecedores" },
          { value: "definindo",   label: "Definindo produto e embalagem" },
          { value: "orcamento",   label: "Produto pronto para orçamento" },
          { value: "novo_fab",    label: "Já comercializamos e buscamos novo fabricante" },
          { value: "urgente",     label: "Queremos iniciar o quanto antes" },
        ],
      },
    ],
    buildMessage: (sel) =>
      `Olá, equipe Kelka! Tenho interesse na fabricação terceirizada de tapetes higiênicos.\n\nAtuação no mercado pet: ${get(sel, "mercado_pet")}.\nSituação da marca: ${get(sel, "marca")}.\nInteresse: ${get(sel, "interesse")}.\nVolume mensal estimado: ${get(sel, "volume")}.\nEtapa atual do projeto: ${get(sel, "etapa")}.\n\nGostaria de conhecer as possibilidades de fabricação com a Kelka.`,
  },
];
