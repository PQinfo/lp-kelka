import { useEffect, useRef } from "react";

const partnerLogos = [
  { name: "Basso e Pancotte", file: "bassopancotte.webp" },
  { name: "Disupra",          file: "disupra.webp"       },
  { name: "Forpets",          file: "forpets.webp"       },
  { name: "GranNature",       file: "grannature.webp"    },
  { name: "NewPet",           file: "newpet.webp"        },
  { name: "Pian",             file: "pian.webp"          },
];

const GAP    = 64;  // px entre logos
const SPEED  = 0.3; // px por frame

export default function Partners() {
  const copy1Ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef   = useRef(0);
  const rafRef   = useRef<number>(0);

  useEffect(() => {
    const step = () => {
      const copyWidth = copy1Ref.current?.offsetWidth ?? 0;
      if (copyWidth > 0 && trackRef.current) {
        posRef.current += SPEED;
        if (posRef.current >= copyWidth) posRef.current -= copyWidth;
        trackRef.current.style.transform = `translateX(-${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // 6 cópias garantem cobertura em qualquer tamanho de tela
  const copies = Array.from({ length: 6 });

  const logoRow = (key: number) => (
    <div
      key={key}
      ref={key === 0 ? copy1Ref : undefined}
      style={{
        display: "flex",
        alignItems: "center",
        gap: `${GAP}px`,
        paddingRight: `${GAP}px`,
        flexShrink: 0,
      }}
    >
      {partnerLogos.map((p, i) => (
        <img
          key={i}
          src={`${import.meta.env.BASE_URL}parceiros/${p.file}`}
          alt={p.name}
          style={{
            height: "5rem",
            width: "auto",
            maxWidth: "180px",
            objectFit: "contain",
            flexShrink: 0,
            filter: "brightness(0) invert(1)",
            opacity: 0.55,
            transition: "opacity 0.3s",
          }}
          loading="lazy"
          onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "0.55")}
        />
      ))}
    </div>
  );

  return (
    <div style={{ borderTop: "1px solid rgba(92,205,167,0.12)", paddingTop: "10px" }}>
      <p
        className="text-center text-xs font-bold uppercase tracking-[0.25em]"
        style={{ color: "rgba(92,205,167,0.6)", marginBottom: "6px" }}
      >
        Parceiros
      </p>

      <div style={{ overflow: "hidden" }}>
        <div
          ref={trackRef}
          style={{ display: "flex", width: "max-content", willChange: "transform" }}
        >
          {copies.map((_, i) => logoRow(i))}
        </div>
      </div>
    </div>
  );
}
