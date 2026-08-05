import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { motion } from "framer-motion";
import { products, type Product } from "../data/content";

const ProductCard = ({ p }: { p: Product }) => (
  <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 group h-full flex flex-col shadow-sm hover:shadow-xl transition-shadow duration-300">
    {/* Product image */}
    <div
      className="relative h-72 flex items-center justify-center overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${p.imgBg}dd, ${p.imgBg}88)` }}
    >
      {/* Badge */}
      <span
        className="absolute top-4 left-4 z-10 text-white text-xs font-black px-3 py-1 rounded-full"
        style={{ background: p.badgeColor }}
      >
        {p.badge}
      </span>

      {/* Units chip */}
      <span
        className="absolute top-4 right-4 z-10 text-white text-xs font-bold px-3 py-1 rounded-full"
        style={{ background: "rgba(0,0,0,0.35)" }}
      >
        {p.units}
      </span>

      {/* Product image */}
      <img
        src={p.img}
        alt={`${p.name} ${p.units}`}
        className="h-64 w-auto object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
    </div>

    {/* Content */}
    <div className="p-6 flex flex-col flex-1">
      <div className="mb-1">
        <h3 className="font-black text-xl" style={{ color: "#003C57" }}>{p.name}</h3>
        <span className="text-sm font-semibold" style={{ color: "#5CCDA7" }}>{p.size} · {p.units}</span>
      </div>

      <p className="text-sm leading-relaxed mb-4 mt-2" style={{ color: "rgba(0,60,87,0.6)" }}>
        {p.desc}
      </p>

      {/* Features */}
      <ul className="space-y-1.5 mb-5 flex-1">
        {p.features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm" style={{ color: "rgba(0,60,87,0.8)" }}>
            <span
              className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[10px] font-black shrink-0"
              style={{ background: "#5CCDA7" }}
            >
              ✓
            </span>
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <motion.a
        href="https://wa.me/554835248058"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="shimmer-btn text-white font-black py-3 rounded-xl text-sm text-center w-full block"
        style={{ boxShadow: "0 8px 24px rgba(92,205,167,0.3)" }}
      >
        Pedir via WhatsApp 🐾
      </motion.a>
    </div>
  </div>
);

export default function Products() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section id="produtos" className="py-24 px-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #002236 0%, #003C57 100%)" }}>
      <div className="absolute inset-0 paw-pattern opacity-60 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(92,205,167,0.5), transparent)" }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block font-bold text-sm uppercase tracking-widest mb-4"
            style={{ color: "#5CCDA7" }}
          >
            Nossas Linhas
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4"
          >
            Tapetes para{" "}
            <span style={{
              background: "linear-gradient(135deg, #5CCDA7 0%, #00A2D6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              todo tipo de pet
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg max-w-xl mx-auto"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Linhas exclusivas, do filhote ao adulto, do compacto ao mega pacotão.
          </motion.p>
        </div>

        {/* Arrows + Swiper */}
        <div className="relative">
          {/* Custom nav arrows — top right */}
          <div className="absolute -top-12 right-0 flex gap-3 z-10">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="text-white/30 hover:text-white/80 transition-colors duration-200"
              aria-label="Anterior"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="text-white/30 hover:text-white/80 transition-colors duration-200"
              aria-label="Próximo"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <Swiper
            modules={[Navigation, Autoplay]}
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          >
            {products.map((p) => (
              <SwiperSlide key={p.id} className="h-auto">
                <ProductCard p={p} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
}
