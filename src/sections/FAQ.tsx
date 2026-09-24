import { useId, useState } from "react";
import { m as motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { Plus } from "@phosphor-icons/react";
import { faqs, type Faq } from "../data/content";
import { cta, whatsappUrl } from "../data/site";

interface FAQItemProps {
  faq: Faq;
  isOpen: boolean;
  onToggle: () => void;
  idBase: string;
}

function FAQItem({ faq, isOpen, onToggle, idBase }: FAQItemProps) {
  const reduce = useReducedMotion();
  const buttonId = `${idBase}-pergunta`;
  const panelId = `${idBase}-resposta`;

  return (
    <div className="border-b border-line last:border-b-0">
      <h3>
        <button
          id={buttonId}
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="w-full flex items-center justify-between gap-4 py-5 text-left group"
        >
          <span className="font-bold text-ink text-[0.98rem] group-hover:text-accent transition-colors">
            {faq.q}
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: reduce ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-8 h-8 rounded-pill flex items-center justify-center shrink-0"
            style={{ background: "var(--kelka-accent-quiet)", color: "var(--kelka-accent)" }}
          >
            <Plus size={16} weight="bold" aria-hidden="true" />
          </motion.span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        data-faq-answer
        data-open={isOpen}
        className="faq-answer"
      >
        <div className="min-h-0 overflow-hidden">
          <p className="text-ink-muted leading-relaxed text-[0.92rem] pb-6 pr-12 max-w-[65ch]">
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const idBase = useId();
  const reduce = useReducedMotion();
  return (
    <section id="faq" className="section-navy scroll-mt-[var(--header-height)] py-20 sm:py-28 px-5 sm:px-6 bg-surface">
      {/* Composição dividida: à esquerda o título e a saída para o atendimento,
          à direita o acordeão. A coluna da direita carrega conteúdo interativo
          de verdade, que é o caso em que essa divisão se justifica. */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,22rem)_1fr] gap-10 lg:gap-16">
        <motion.div
          data-reveal
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: reduce ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-[1.1] text-ink mb-4 md:mb-4">
            Dúvidas frequentes
          </h2>
          <p className="hidden md:block text-ink-muted leading-relaxed mb-7 max-w-[42ch]">
            Não encontrou o que procurava? Fale direto com a nossa equipe.
          </p>
          <a
            href={whatsappUrl("Olá! Tenho uma dúvida sobre os tapetes Kelka.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost hidden md:inline-flex items-center font-bold text-sm px-6 py-3"
          >
            {cta.whatsapp}
          </a>
        </motion.div>

        <div>
          {faqs.map((faq, i) => (
            <FAQItem
              key={faq.q}
              faq={faq}
              idBase={`${idBase}-${i}`}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </div>

        <div className="md:hidden text-center">
          <p className="text-ink-muted leading-relaxed max-w-[32ch] mx-auto mb-5">
            Não encontrou o que procurava? Fale direto com a nossa equipe.
          </p>
          <a
            href={whatsappUrl("Olá! Tenho uma dúvida sobre os tapetes Kelka.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost inline-flex items-center justify-center font-bold text-sm px-6 py-3"
          >
            {cta.whatsapp}
          </a>
        </div>
      </div>
    </section>
  );
}
