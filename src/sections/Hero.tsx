import { useRef } from "react";
import { m as motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { ArrowRight, Drop, ShieldCheck, PawPrint, Leaf } from "@phosphor-icons/react";
import { images } from "../generated/images";
import { imageProps } from "../lib/image";

const CTA_GRADIENT = "linear-gradient(135deg, #00A2D6 0%, #5CCDA7 100%)";
const EASE = [0.22, 1, 0.36, 1] as const;


export default function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const kDrift = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const contentDrift = useTransform(scrollYProgress, [0, 1], ["0%", "-7%"]);
  const contentFade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const step = (delay: number, y = 20) => ({
    initial: reduce ? false : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE },
  });

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#00283b]"
    >
      {/* Painel escuro. Termina onde a faixa começa (não no pé da seção), e o
          canto inferior esquerdo arredondado deixa o branco contornar por ali. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-40 overflow-hidden"
        style={{ backgroundColor: "#00283B" }}
      />

      {/* Fundo azul-marinho da marca, escurecendo nas bordas. Dois focos radiais
          muito discretos dão profundidade. Sem preto puro. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-30 overflow-hidden"
        style={{
          background: [
            "radial-gradient(54% 50% at 78% 42%, rgba(0,162,214,0.17) 0%, rgba(0,162,214,0) 62%)",
            "radial-gradient(56% 50% at 4% 4%, rgba(0,72,104,0.8) 0%, rgba(0,72,104,0) 68%)",
            "radial-gradient(46% 38% at 16% 96%, rgba(0,60,87,0.62) 0%, rgba(0,60,87,0) 72%)",
            "radial-gradient(120% 92% at 50% 46%, rgba(0,0,0,0) 46%, rgba(0,20,31,0.5) 100%)",
            "linear-gradient(155deg, #003C57 0%, #00304A 40%, #00283B 72%, #001E2C 100%)",
          ].join(","),
        }}
      />

      {/* Círculo enorme, parcialmente fora da viewport. Único elemento
          decorativo acrescentado: o K já traz o próprio arco e o próprio disco. */}
      <motion.div data-reveal
        aria-hidden="true"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 1.05, ease: EASE }}
        className="absolute -z-20 hidden sm:block rounded-pill pointer-events-none"
        style={{
          top: "-18%",
          right: "-20%",
          width: "min(72vw, 66rem)",
          aspectRatio: "1 / 1",
          border: "1px solid rgba(92,205,167,0.075)",
        }}
      />

      {/* ── K-hero ────────────────────────────────────────────────────────── */}
      <motion.div data-reveal
        aria-hidden="true"
        className="absolute inset-0 -z-10 overflow-hidden pointer-events-none"
        style={{ y: reduce ? 0 : kDrift }}
      >
        {/* Entrada pela direita, feita em CSS (ver .hero-k-entrada no index.css).
            O parallax de scroll continua no Framer Motion, na div de cima. */}
        <picture
          className="hero-k-entrada absolute block [--k-right:-18%] [--k-top:auto] [--k-bottom:17%] [--k-w:118vw] sm:[--k-right:5%] sm:[--k-top:11vh] sm:[--k-bottom:auto] sm:[--k-w:clamp(27rem,45vw,54rem)]"
          style={{
            right: "var(--k-right)",
            top: "var(--k-top)",
            bottom: "var(--k-bottom)",
            width: "var(--k-w)",
            transformOrigin: "72% 45%",
          }}
        >
          <img
            {...imageProps(images.hero, "(max-width: 639px) 118vw, 45vw")}
            alt=""
            fetchPriority="high"
            decoding="async"
            className="w-full h-auto select-none"
          />
        </picture>
      </motion.div>

      {/* No mobile o conteúdo divide espaço com o K. Este véu mantém a leitura
          sem precisar apagar a peça. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-[5] sm:hidden pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,40,59,0.97) 0%, rgba(0,40,59,0.9) 38%, rgba(0,40,59,0.55) 58%, rgba(0,40,59,0.1) 78%, rgba(0,40,59,0) 100%)",
        }}
      />

      {/* ── Conteúdo ──────────────────────────────────────────────────────── */}
      <motion.div data-reveal
        style={{ y: reduce ? 0 : contentDrift, opacity: reduce ? 1 : contentFade }}
        className="relative z-10 min-h-[100svh] flex items-start sm:items-center px-6 sm:px-10 lg:px-16 xl:px-24 pt-28 pb-[min(26rem,62vh)] lg:pb-[min(17rem,30vh)] max-md:items-start max-md:pt-[clamp(9rem,23svh,12rem)] max-md:pb-[clamp(17rem,38svh,21rem)]"
      >
        <div className="w-full max-w-[46rem]">
          <motion.p data-reveal
            {...step(0.05, 12)}
            className="text-[0.68rem] sm:text-xs font-semibold uppercase tracking-[0.32em]"
            style={{ color: "rgba(255,255,255,0.9)" }}
          >
            Soluções que cuidam do seu mundo
          </motion.p>

          <motion.span data-reveal
            aria-hidden="true"
            initial={reduce ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="block h-px w-14 mt-5 mb-8 origin-left"
            style={{ background: "linear-gradient(90deg,#5CCDA7,rgba(92,205,167,0))" }}
          />

          <h1 className="font-extrabold leading-[1.05] tracking-[-0.025em] text-[clamp(2.1rem,4.9vw,4.15rem)]">
            <motion.span data-reveal {...step(0.16)} className="block text-white">
              Mais <span className="text-[#5CCDA7]">absorção</span>
            </motion.span>
            <motion.span data-reveal {...step(0.3)} className="block text-white">
              Menos <span className="text-[#5CCDA7]">preocupação</span>
            </motion.span>
          </h1>

          <motion.p data-reveal
            {...step(0.44, 16)}
            className="mt-7 text-[0.98rem] sm:text-lg leading-relaxed max-w-[36ch]"
            style={{ color: "rgba(255,255,255,0.74)" }}
          >
            Tapetes higiênicos desenvolvidos para tornar o cuidado diário
            mais simples, seguro e confortável.
          </motion.p>

          <motion.div data-reveal {...step(0.56, 16)} className="mt-10 max-md:mt-12">
            <a
              href="#produtos"
              className="group inline-flex items-center gap-3 pl-8 pr-7 py-4 text-[0.95rem] font-semibold transition-[filter,transform] duration-300 hover:brightness-110 hover:-translate-y-px max-md:w-auto max-md:justify-center max-md:gap-2 max-md:px-5 max-md:py-3 max-md:min-h-11 max-md:text-sm"
              style={{
                background: CTA_GRADIENT,
                color: "#002236",
                borderRadius: "var(--kelka-radius-pill)",
                boxShadow: "0 16px 40px -22px rgba(0,162,214,0.85)",
              }}
            >
              Conheça nossas soluções
              <ArrowRight
                size={18}
                weight="bold"
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Faixa de transição ────────────────────────────────────────────
          Curva recortando a base do hero, seguida de uma faixa editorial.
          Sem ícones, sem colunas iguais, sem cartões: só tipografia e um
          separador fino. Ela também cobre o pé do K, que é o que faz a peça
          parecer encaixada na composição em vez de colada por cima. */}
      <div className="absolute inset-x-0 bottom-0 z-20 pointer-events-none">
        {/* A forma clara é UM svg esticado sobre a faixa inteira, não uma tira
            empilhada acima dela. É o que permite a rampa da direita descer até
            perto do rodapé: empilhada, ela morria no topo do bloco branco.
            O traçado tem três trechos declarados: joelho curto e fechado na
            ponta esquerda (resolve em ~100 das 1440 unidades), reta longa no
            miolo e rampa na ponta direita. */}
        {/* A faixa fica branca nos dois modos, como a seção de Benefícios logo
            abaixo: no escuro, surface-2 viraria #003c57 e a curva sumiria
            contra o hero. Redefinir os tokens aqui faz fundo, texto e traço
            trocarem juntos — mexer só no fill deixaria texto branco no branco. */}
        <div
          className="relative"
          style={{
            ["--kelka-surface-2" as string]: "#ffffff",
            ["--kelka-text" as string]: "#002236",
            ["--kelka-text-muted" as string]: "#346378",
            ["--kelka-border" as string]: "rgba(0,60,87,0.14)",
          }}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 1440 220"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
          >
            <path
              d="M0 220 L0 30 C 14 72, 46 99, 110 99 L 1330 99 C 1392 99, 1432 148, 1440 196 L 1440 220 Z"
              fill="var(--kelka-surface-2)"
            />
          </svg>

          <div className="relative max-w-7xl mx-auto px-6 pr-[4.75rem] sm:px-10 sm:pr-10 lg:px-14 lg:pr-28 2xl:pr-14 pt-44 pb-6 lg:pt-44 lg:pb-12">
            {/* Quatro colunas com ícone fino e título curto, como no mockup.
                Separadores verticais de 1px, sem cartão e sem marcador. */}
            <ul className="grid grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-4 m-0 p-0 list-none">
              {[
                { Icone: Drop, l1: "Superabsorção", l2: "que seca de verdade" },
                { Icone: ShieldCheck, l1: "Mais proteção", l2: "contra vazamentos" },
                { Icone: PawPrint, l1: "Conforto para ele,", l2: "tranquilidade para você" },
                { Icone: Leaf, l1: "Tecnologia e cuidado", l2: "em cada detalhe" },
              ].map((item, i) => (
                <li
                  key={item.l1}
                  className={[
                    "flex items-center gap-4 sm:gap-5",
                    i > 0 ? "lg:border-l lg:border-line lg:pl-8" : "",
                    i === 1 ? "border-l border-line pl-4 lg:pl-8" : "",
                    i === 3 ? "border-l border-line pl-4 lg:pl-8" : "",
                  ].join(" ")}
                >
                  <item.Icone
                    size={36}
                    weight="light"
                    className="text-sky shrink-0"
                    aria-hidden="true"
                  />
                  <p className="text-[0.85rem] sm:text-[0.95rem] leading-snug text-ink">
                    <span className="font-semibold">{item.l1}</span>
                    <br />
                    <span className="text-ink-muted">{item.l2}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
