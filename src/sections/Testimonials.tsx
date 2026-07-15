import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { testimonials, type Testimonial } from "../data/content";

const StarRating = ({ count = 5 }: { count?: number }) => (
  <div className="flex gap-1">
    {[...Array(count)].map((_, i) => (
      <span key={i} className="text-yellow-400 text-lg">★</span>
    ))}
  </div>
);

const TestimonialCard = ({ t }: { t: Testimonial }) => (
  <div className="bg-white rounded-3xl p-7 h-full flex flex-col border border-emerald-50 shadow-sm hover:shadow-lg hover:shadow-emerald-100/50 transition-shadow duration-300">
    <div className="flex items-center gap-4 mb-4">
      {/* Avatar */}
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-sky-400 flex items-center justify-center text-white font-black text-xl shrink-0">
        {t.avatar}
      </div>
      <div>
        <p className="font-black text-navy text-base">{t.name}</p>
        <p className="text-navy/50 text-xs">{t.city}</p>
      </div>
      <div className="ml-auto">
        <StarRating count={t.rating} />
      </div>
    </div>

    {/* Quote */}
    <div className="relative flex-1">
      <span className="absolute -top-2 -left-1 text-5xl text-emerald-200 font-serif leading-none pointer-events-none select-none">"</span>
      <p className="text-navy/70 leading-relaxed text-sm pt-4 pl-3 relative z-10">{t.text}</p>
    </div>

    {/* Pet tag */}
    <div className="mt-4 pt-4 border-t border-emerald-50 flex items-center gap-2">
      <span className="text-base">🐾</span>
      <span className="text-emerald-600 text-xs font-semibold">{t.pet}</span>
    </div>
  </div>
);

export default function Testimonials() {
  return (
    <section id="depoimentos" className="py-24 px-6 bg-kelka-gradient-dark relative overflow-hidden">
      <div className="absolute inset-0 paw-pattern opacity-50 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4"
          >
            X famílias{" "}
            <span className="text-gradient">aprovam!</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 mt-2"
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-2xl">★</span>
              ))}
            </div>
            <span className="text-white/70 font-semibold">4.9 de 5.0 · +12.000 avaliações</span>
          </motion.div>
        </div>

        {/* Testimonials Swiper */}
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          className="pb-12"
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i} className="h-auto">
              <TestimonialCard t={t} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-wrap justify-center gap-6"
        >
          {[
            { icon: "🔒", label: "Compra 100% Segura" },
            { icon: "🚚", label: "Entrega Garantida" },
            { icon: "💬", label: "Suporte 24/7" },
          ].map((b) => (
            <div key={b.label} className="glass-card flex items-center gap-2 px-5 py-2.5 rounded-full">
              <span>{b.icon}</span>
              <span className="text-white/80 text-sm font-semibold">{b.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
