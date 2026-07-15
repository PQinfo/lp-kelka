import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRefs = useRef<(HTMLDivElement | null)[]>([]);

  const counters = [
    { target: 2000000, label: "Tapetes vendidos", suffix: "M+" },
    { target: 50000, label: "Pets satisfeitos", suffix: "k+" },
    { target: 98, label: "Taxa de satisfação", suffix: "%" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      counterRefs.current.forEach((el, i) => {
        if (!el) return;
        const target = counters[i].target;
        const isMillions = target >= 1000000;
        const isThou = target >= 1000 && target < 1000000;

        gsap.from(el, {
          textContent: 0,
          duration: 2.5,
          ease: "power2.out",
          snap: { textContent: isMillions ? 100000 : isThou ? 100 : 1 },
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
          onUpdate() {
            const val = parseFloat(el.textContent);
            if (isMillions) el.textContent = (val / 1000000).toFixed(1) + "M+";
            else if (isThou) el.textContent = (val / 1000).toFixed(0) + "k+";
            else el.textContent = val.toFixed(0) + "%";
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 bg-kelka-gradient relative overflow-hidden"
    >
      <div className="absolute inset-0 paw-pattern opacity-70 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Animated counters */}
        <div className="grid grid-cols-3 gap-8 mb-20 text-center">
          {counters.map((c, i) => (
            <div key={c.label}>
              <div
                ref={(el) => { counterRefs.current[i] = el; }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-2"
              >
                0
              </div>
              <div className="text-white/60 font-medium text-sm sm:text-base">{c.label}</div>
            </div>
          ))}
        </div>

        {/* Main CTA */}
        <div className="glass-card rounded-3xl p-10 sm:p-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            <span className="text-6xl mb-6 block">🐾</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
              Seu pet merece{" "}
              <span className="text-gradient">o melhor!</span>
            </h2>
            <p className="text-white/70 text-lg max-w-xl mx-auto mb-10">
              Junte-se às famílias que já escolheram a Kelka para cuidar do seu mundo.
            </p>

            <motion.a
              href="https://wa.me/5500000000000"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(92,205,167,0.4)" }}
              whileTap={{ scale: 0.97 }}
              className="shimmer-btn text-white font-black text-xl px-12 py-5 rounded-2xl shadow-2xl inline-flex items-center gap-3"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
              </svg>
              Fale com um consultor
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
