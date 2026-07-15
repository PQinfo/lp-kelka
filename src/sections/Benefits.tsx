import { motion, type Variants } from "framer-motion";
import { benefits } from "../data/content";

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 16 },
  },
};

export default function Benefits() {
  return (
    <section id="beneficios" className="py-24 px-6 bg-ice relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-emerald-400/8 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-sky-400/8 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-emerald-500 font-bold text-sm uppercase tracking-widest mb-4"
          >
            Por que escolher a Kelka?
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-navy leading-tight mb-4"
          >
            Tecnologia que{" "}
            <span className="text-gradient">cuida do seu pet</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-navy/60 text-lg max-w-2xl mx-auto"
          >
            Cada detalhe foi pensado para oferecer conforto ao seu animal e praticidade para você.
          </motion.p>
        </div>

        {/* Benefits grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{
                y: -8,
                boxShadow: "0 20px 60px rgba(92,205,167,0.18)",
                transition: { duration: 0.2 },
              }}
              className="bg-white rounded-3xl p-8 border border-emerald-100 group cursor-default"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-sky-400/20 flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform duration-300">
                {b.icon}
              </div>
              <h3 className="text-navy font-black text-xl mb-3 group-hover:text-emerald-600 transition-colors">
                {b.title}
              </h3>
              <p className="text-navy/60 leading-relaxed text-[0.95rem]">{b.desc}</p>
            </motion.div>
          ))}
        </motion.div>


      </div>
    </section>
  );
}
