import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs, type Faq } from "../data/content";

interface FAQItemProps {
  faq: Faq;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ faq, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border border-emerald-100 rounded-2xl overflow-hidden bg-white">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-7 py-5 text-left hover:bg-emerald-50/50 transition-colors duration-200"
      >
        <span className="font-bold text-navy text-[0.97rem] pr-4">{faq.q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-black text-lg shrink-0"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-7 pb-6 text-navy/65 leading-relaxed text-sm border-t border-emerald-50 pt-4">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="py-24 px-6 bg-ice relative overflow-hidden">
      <div className="absolute -top-32 right-0 w-96 h-96 rounded-full bg-emerald-400/5 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-emerald-500 font-bold text-sm uppercase tracking-widest mb-4"
          >
            Dúvidas frequentes
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-navy leading-tight"
          >
            Tem alguma{" "}
            <span className="text-gradient">dúvida?</span>
          </motion.h2>
        </div>

        {/* FAQ items */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="space-y-3"
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </motion.div>

        {/* Contact nudge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-navy/60 mb-4">Ainda tem dúvidas? Nossa equipe está pronta para ajudar.</p>
          <a
            href="https://wa.me/5500000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-3.5 rounded-2xl transition-colors shadow-lg shadow-green-500/30"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
            </svg>
            Falar no WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
