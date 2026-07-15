import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const PawSVG = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
    <ellipse cx="20" cy="10" rx="7" ry="9" fill="currentColor" />
    <ellipse cx="44" cy="10" rx="7" ry="9" fill="currentColor" />
    <ellipse cx="10" cy="28" rx="6" ry="8" fill="currentColor" />
    <ellipse cx="54" cy="28" rx="6" ry="8" fill="currentColor" />
    <ellipse cx="32" cy="46" rx="18" ry="14" fill="currentColor" />
  </svg>
);

const pawConfigs = [
  { left: "2%",  bottom: "10px", color: "#5CCDA7", size: 20, delay: 0    },
  { left: "18%", bottom: "0px",  color: "#00A2D6", size: 16, delay: 0.7  },
  { left: "35%", bottom: "14px", color: "#5CCDA7", size: 22, delay: 1.4  },
  { left: "55%", bottom: "4px",  color: "#00A2D6", size: 18, delay: 2.1  },
  { left: "72%", bottom: "10px", color: "#5CCDA7", size: 14, delay: 2.8  },
  { left: "88%", bottom: "2px",  color: "#00A2D6", size: 20, delay: 0.35 },
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animations
      gsap.from(".hero-badge",      { y: -20, opacity: 0, duration: 0.6, ease: "power3.out" });
      gsap.from(".hero-title-line", { y: 50,  opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.15, delay: 0.2 });
      gsap.from(".hero-subtitle",   { y: 25,  opacity: 0, duration: 0.7, ease: "power3.out", delay: 0.5 });
      gsap.from(".hero-cta",        { y: 20,  opacity: 0, duration: 0.6, ease: "power3.out", stagger: 0.12, delay: 0.7 });
      gsap.from(".hero-stat",       { y: 20,  opacity: 0, duration: 0.6, ease: "power3.out", stagger: 0.1,  delay: 0.9 });

      // Floating paws — cada uma tem seu próprio timeline em loop infinito
      document.querySelectorAll<HTMLElement>(".floating-paw").forEach((paw, i) => {
        const config = pawConfigs[i];
        gsap.timeline({ repeat: -1, delay: config.delay })
          .set(paw, { opacity: 0, y: 0, scale: 0.6, rotation: gsap.utils.random(-25, 25) as number })
          .to(paw, { opacity: 0.9, scale: 1, duration: 0.4, ease: "power2.out" })
          .to(paw, { y: -70, opacity: 0, scale: 1.3, duration: 2, ease: "power1.out" }, "-=0.1");
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* Background image — desktop */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden sm:block"
        style={{ backgroundImage: "url(/lp-kelka/hero-banner.webp)" }}
      />
      {/* Background image — mobile */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat block sm:hidden"
        style={{ backgroundImage: "url(/lp-kelka/banner-mobile.webp)" }}
      />

      {/* Overlay — mobile: escurece de baixo pra cima / desktop: esquerda pra direita */}
      <div
        className="absolute inset-0 block sm:hidden"
        style={{
          background: "linear-gradient(to top, rgba(0,20,35,0.95) 0%, rgba(0,28,45,0.75) 45%, rgba(0,28,45,0.2) 75%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-0 hidden sm:block"
        style={{
          background: "linear-gradient(to right, rgba(0,28,45,0.88) 0%, rgba(0,40,60,0.72) 45%, rgba(0,40,60,0.1) 65%, transparent 100%)",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-end sm:items-center px-6 pt-28 pb-32 sm:pb-16 max-w-7xl mx-auto w-full">
        <div className="w-full sm:max-w-xl">

          {/* Title */}
          <div className="relative mb-4 sm:mb-6">
            <h1 className="font-black leading-tight text-white text-center sm:text-left">
              <span className="hero-title-line block text-4xl sm:text-6xl lg:text-7xl">
                Seu Pet{" "}
                <span style={{
                  background: "linear-gradient(135deg, #5CCDA7 0%, #00A2D6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  Merece
                </span>
              </span>
              <span className="hero-title-line block text-4xl sm:text-6xl lg:text-7xl">
                o Melhor
              </span>
            </h1>

            {/* Patinhas flutuantes */}
            <div className="relative h-10 mt-2 overflow-visible pointer-events-none">
              {pawConfigs.map((cfg, i) => (
                <span
                  key={i}
                  className="floating-paw absolute"
                  style={{
                    left: cfg.left,
                    bottom: cfg.bottom,
                    color: cfg.color,
                    width: cfg.size,
                    height: cfg.size,
                    opacity: 0,
                  }}
                >
                  <PawSVG />
                </span>
              ))}
            </div>
          </div>

          {/* Subtitle */}
          <p
            className="hero-subtitle text-base sm:text-xl mb-8 sm:mb-10 leading-relaxed text-center sm:text-left"
            style={{ color: "rgba(255,255,255,0.80)" }}
          >
            Tapetes higiênicos{" "}
            <strong style={{ color: "#5CCDA7" }}>ultra absorventes</strong>,
            antibacterianos e biodegradáveis. Conforto e higiene para o seu melhor amigo.
          </p>

          {/* CTA Button */}
          <div className="flex items-center justify-center sm:justify-start">
            <a
              href="#produtos"
              className="hero-cta shimmer-btn text-white font-black text-lg px-10 py-4 rounded-2xl flex items-center gap-3"
              style={{ boxShadow: "0 20px 50px rgba(92,205,167,0.35)" }}
            >
              Ver Produtos
              <span className="animate-bounce-x">→</span>
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}
