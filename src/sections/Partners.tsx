import { partners } from "../data/content";

export default function Partners() {
  return (
    <div className="py-5 overflow-hidden" style={{ background: "#002236", borderTop: "1px solid rgba(92,205,167,0.12)" }}>
      <p className="text-center text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: "rgba(92,205,167,0.6)" }}>
        Parceiros
      </p>
      <div className="flex animate-ticker whitespace-nowrap gap-16">
        {[...partners, ...partners].map((name, i) => (
          <span
            key={i}
            className="shrink-0 font-bold text-sm flex items-center gap-3"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: "#5CCDA7" }} />
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
