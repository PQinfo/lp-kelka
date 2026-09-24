/* Fonte única para contato e rótulos de ação.

   REGRA DE CTA: um rótulo por intenção, usado igual em toda a página.
   Antes existiam três rótulos para a mesma ação de WhatsApp
   ("Pedir via WhatsApp", "Iniciar conversa no WhatsApp", "Fale pelo WhatsApp")
   e dois para a mesma âncora de produtos ("Comprar Agora", "Ver Produtos"). */

export const site = {
  whatsapp: "554835248058",
  phone: "(48) 3524-8058",
  phoneHref: "+554835248058",
  email: "contato@kelka.com.br",
  regions: "Santa Catarina, Paraná e Rio Grande do Sul",
} as const;

export const cta = {
  /** Intenção: levar para a vitrine. Usado no hero. */
  products: "Ver Produtos",
  /** Rótulo do header, vindo do mockup. Leva à seção de atendimento. */
  header: "Fale com a Kelka",
  /** Intenção: abrir conversa comercial. Cards, rodapé e botão flutuante. */
  whatsapp: "Falar no WhatsApp",
  /** Intenção: iniciar a triagem de atendimento. Só na seção de contato. */
  simulator: "Começar",
} as const;

/** Monta o link do WhatsApp com uma mensagem de origem, para rastrear de onde veio. */
export function whatsappUrl(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
