import { useEffect } from "react";
import AOS from "aos";
import { steps } from "../data/content";

export default function HowItWorks() {
  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <section id="como-funciona" className="py-24 px-6 bg-ice relative overflow-hidden">
      {/* Decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-emerald-400/0 to-emerald-400/40" />
      <div className="absolute -top-40 left-0 w-80 h-80 rounded-full bg-emerald-400/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 right-0 w-80 h-80 rounded-full bg-sky-400/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <span
            data-aos="fade-up"
            data-aos-duration="600"
            className="inline-block text-emerald-500 font-bold text-sm uppercase tracking-widest mb-4"
          >
            Simples assim
          </span>
          <h2
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="700"
            className="text-4xl sm:text-5xl font-black text-navy leading-tight mb-4"
          >
            Como usar em{" "}
            <span className="text-gradient">4 passos</span>
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-navy/60 text-lg max-w-xl mx-auto"
          >
            Adestramento de higiene nunca foi tão fácil. Siga os passos e seu pet vai aprender rapidinho!
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-emerald-400/20 via-emerald-400/60 to-emerald-400/20" />

          {steps.map((step, i) => (
            <div
              key={i}
              data-aos="zoom-in"
              data-aos-delay={i * 120}
              data-aos-duration="700"
              className="flex flex-col items-center text-center group"
            >
              {/* Number circle */}
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full bg-white border-4 border-emerald-100 flex items-center justify-center shadow-lg shadow-emerald-100/50 group-hover:border-emerald-400 group-hover:shadow-emerald-200/60 transition-all duration-300 relative z-10">
                  <span className="text-3xl">{step.icon}</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-sky-400 flex items-center justify-center z-20 shadow-md">
                  <span className="text-white font-black text-xs">{step.number}</span>
                </div>
              </div>

              <h3 className="text-navy font-black text-lg mb-2 group-hover:text-emerald-600 transition-colors">
                {step.title}
              </h3>
              <p className="text-navy/60 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
