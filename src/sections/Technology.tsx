import { useEffect, useRef, useState } from "react";
import { m as motion, useInView } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { ShieldCheck } from "@phosphor-icons/react";

import { images } from "../generated/images";
import { imageProps } from "../lib/image";
import styles from "./Technology.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;
const LAYER_DURATION = 1.15;
const LAYER_STAGGER = 0.2;

const laminas = [
  {
    n: "01",
    image: images.layer1,
    titulo: "Superfície seca",
    desc: "Não-tecido premium que mantém a patinha sempre seca.",
    alt: "Superfície branca acolchoada do tapete higiênico",
    anchor: [0.32, 0.5],
  },
  {
    n: "02",
    image: images.layer2,
    titulo: "Núcleo de alta absorção",
    desc: "Absorve rápido e retém o líquido por mais tempo.",
    alt: "Núcleo de flocos absorventes brancos",
    anchor: [0.2, 0.56],
  },
  {
    n: "03",
    image: images.layer3,
    titulo: "Barreira antivazamento",
    desc: "Filme impermeável que protege o piso e evita vazamentos.",
    alt: "Camada azul impermeável sob o núcleo absorvente",
    anchor: [0.251, 0.61],
  },
  {
    n: "04",
    image: images.layer4,
    titulo: "Fitas de fixação",
    desc: "Mantém o tapete firme no lugar, mais segurança para o dia a dia.",
    alt: "Base branca do tapete, onde ficam as fitas de fixação",
    anchor: [0.354, 0.669],
  },
];

export default function Technology() {
  const panelRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<HTMLElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headingRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const [connectors, setConnectors] = useState<{ path: string; x: number; y: number }[]>([]);
  const reduceMotion = useReducedMotion();
  const diagramInView = useInView(diagramRef, { once: true, amount: 0.1 });
  const visible = reduceMotion || diagramInView;

  useEffect(() => {
    const panel = panelRef.current;
    const diagram = diagramRef.current;
    if (!panel || !diagram) return;

    const media = window.matchMedia("(min-width: 1024px)");
    let frame = 0;
    const measure = () => {
      frame = 0;
      if (!media.matches) return;
      const panelRect = panel.getBoundingClientRect();
      const diagramRect = diagram.getBoundingClientRect();
      const next = laminas.flatMap((lamina, index) => {
        const layer = layerRefs.current[index];
        const headingElement = headingRefs.current[index];
        if (!layer || !headingElement) return [];
        const heading = headingElement.getBoundingClientRect();
        const startX = heading.right - panelRect.left + 14;
        const startY = heading.top - panelRect.top + heading.height / 2;
        // Layout dimensions exclude the entrance animation's translation.
        const x = diagramRect.left - panelRect.left + layer.offsetLeft + layer.offsetWidth * lamina.anchor[0];
        const y = diagramRect.top - panelRect.top + layer.offsetTop + layer.offsetHeight * lamina.anchor[1];
        const elbowX = Math.max(startX + 24, diagramRect.left - panelRect.left + diagramRect.width * 0.04);
        return [{ path: `M ${startX} ${startY} H ${elbowX} L ${x} ${y}`, x, y }];
      });
      setConnectors(previous => previous.length === next.length && previous.every((item, index) => item.path === next[index].path) ? previous : next);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(measure); };
    const observer = new ResizeObserver(schedule);
    const subscribe = () => {
      observer.disconnect();
      if (media.matches) {
        [panel, diagram, ...layerRefs.current, ...headingRefs.current].forEach(element => {
          if (element) observer.observe(element);
        });
        schedule();
      } else {
        cancelAnimationFrame(frame);
        frame = 0;
        setConnectors(previous => previous.length ? [] : previous);
      }
    };
    media.addEventListener("change", subscribe);
    subscribe();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      media.removeEventListener("change", subscribe);
    };
  }, []);

  return (
    <section id="tecnologia" aria-labelledby="technology-title" className={styles.section}>
      <div className={styles.backgroundArt} aria-hidden="true">
        <div className={styles.backgroundDisc} />
        <div className={styles.backgroundPetal} />
      </div>
      <div ref={panelRef} className={styles.panel}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>Tecnologia de verdade</p>
          <h2 id="technology-title" className={styles.title}>
            Proteção em cada camada
          </h2>
          <p className={styles.description}>
            Uma estrutura desenvolvida para absorver rápido e manter a superfície mais seca.
          </p>
        </header>

        {/* A figura fixa dispara a sequência. Observar as imagens deslocadas
            para fora do painel impediria a entrada de começar. */}
        <figure ref={diagramRef} className={styles.diagram} aria-label="As quatro camadas do tapete Kelka em vista explodida">
          {laminas.map((lamina, index) => (
            <motion.div
              key={lamina.n}
              ref={(element) => { layerRefs.current[index] = element; }}
              className={styles.layer}
              data-layer={index + 1}
              data-reveal
              initial={reduceMotion ? false : { opacity: 0, x: "85%" }}
              animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: "85%" }}
              transition={{
                duration: reduceMotion ? 0 : LAYER_DURATION,
                // A base entra primeiro; as demais deslizam sobre ela.
                delay: reduceMotion ? 0 : (laminas.length - 1 - index) * LAYER_STAGGER,
                ease: EASE,
              }}
            >
              <img
                {...imageProps(lamina.image, "auto, (max-width: 639px) 90vw, (max-width: 1023px) 400px, 54vw")}
                alt={lamina.alt}
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            </motion.div>
          ))}
        </figure>

        <ol className={styles.features}>
          {laminas.map((lamina, index) => (
            <li key={lamina.n} className={styles.feature}>
              <span className={styles.number} aria-hidden="true">{lamina.n}</span>
              <div className={styles.featureContent}>
                <div className={styles.featureHeading}>
                  <h3 ref={(element) => { headingRefs.current[index] = element; }}>
                    {lamina.titulo}
                  </h3>
                </div>
                <p>{lamina.desc}</p>
              </div>
            </li>
          ))}
        </ol>

        <svg className={styles.connectors} aria-hidden="true" focusable="false">
          {connectors.map((connector, index) => (
            <motion.g
              key={laminas[index].n}
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: visible ? 1 : 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.55,
                delay: reduceMotion ? 0 : 0.65 + (laminas.length - 1 - index) * LAYER_STAGGER,
                ease: EASE,
              }}
            >
              <path d={connector.path} />
              <circle cx={connector.x} cy={connector.y} r="6.5" />
            </motion.g>
          ))}
        </svg>

        <p className={styles.origin}>
          <ShieldCheck weight="regular" aria-hidden="true" />
          <span>Tecnologia desenvolvida no Brasil</span>
        </p>
      </div>
    </section>
  );
}
