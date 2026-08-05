import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { flows } from "../data/simulator";

gsap.registerPlugin(ScrollTrigger);

type Phase = "start" | "initial" | "steps" | "result";

const WA = "554835248058";

export default function CTA() {
  const sectionRef    = useRef<HTMLElement>(null);
  const counterRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const cardRef       = useRef<HTMLDivElement>(null);

  const counters = [
    { target: 30, label: "Tapetes produzidos",         format: (v: number) => `${v}M+`      },
    { target: 8,  label: "Experiência no mercado pet", format: (v: number) => `${v} Anos+`  },
    { target: 3,  label: "Atendidos diretamente",      format: (v: number) => `${v} Estados` },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      counterRefs.current.forEach((el, i) => {
        if (!el) return;
        const { target, format } = counters[i];
        const obj = { val: 0 };
        el.textContent = format(0);
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate() { el.textContent = format(Math.round(obj.val)); },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // ── Simulator state ──────────────────────────────────────────────────────────
  const [phase, setPhase]           = useState<Phase>("start");
  const [flowId, setFlowId]         = useState<string | null>(null);
  const [stepIndex, setStepIndex]   = useState(0);
  const [selections, setSelections] = useState<Record<string, string | string[]>>({});
  const [multiBuffer, setMultiBuffer] = useState<string[]>([]);
  const [highlighted, setHighlighted] = useState<string | null>(null);

  const currentFlow = flows.find(f => f.id === flowId) ?? null;
  const currentStep = currentFlow?.steps[stepIndex] ?? null;
  const totalSteps  = currentFlow?.steps.length ?? 0;
  const progress    = totalSteps > 0 ? Math.round(((stepIndex + 1) / totalSteps) * 100) : 0;

  const transition = useCallback((dir: 1 | -1, cb: () => void) => {
    const el = cardRef.current;
    if (!el) { cb(); return; }
    gsap.to(el, {
      opacity: 0, x: dir > 0 ? -24 : 24, duration: 0.22, ease: "power2.in",
      onComplete: () => {
        cb();
        gsap.fromTo(el,
          { opacity: 0, x: dir > 0 ? 24 : -24 },
          { opacity: 1, x: 0, duration: 0.28, ease: "power2.out" }
        );
      },
    });
  }, []);

  const advance = useCallback((newSel: Record<string, string | string[]>) => {
    const next = stepIndex + 1;
    setTimeout(() => {
      transition(1, () => {
        setSelections(newSel);
        setHighlighted(null);
        setMultiBuffer([]);
        if (next < totalSteps) setStepIndex(next);
        else setPhase("result");
      });
    }, 260);
  }, [stepIndex, totalSteps, transition]);

  const selectFlow = (id: string) => {
    transition(1, () => {
      setFlowId(id); setPhase("steps"); setStepIndex(0);
      setSelections({}); setMultiBuffer([]); setHighlighted(null);
    });
  };

  const selectSingle = (field: string, label: string) => {
    setHighlighted(label);
    advance({ ...selections, [field]: label });
  };

  const toggleMulti = (label: string) => {
    setMultiBuffer(prev =>
      prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
    );
  };

  const confirmMulti = () => {
    if (!currentStep || multiBuffer.length === 0) return;
    advance({ ...selections, [currentStep.field]: [...multiBuffer] });
  };

  const goBack = () => {
    if (phase === "result") {
      transition(-1, () => { setPhase("steps"); setStepIndex(totalSteps - 1); setHighlighted(null); });
    } else if (stepIndex > 0) {
      transition(-1, () => { setStepIndex(s => s - 1); setHighlighted(null); setMultiBuffer([]); });
    } else if (phase === "steps") {
      transition(-1, () => { setPhase("initial"); setFlowId(null); setHighlighted(null); setMultiBuffer([]); });
    } else if (phase === "initial") {
      transition(-1, () => { setPhase("start"); });
    }
  };

  const restart = () => {
    transition(-1, () => {
      setPhase("start"); setFlowId(null); setStepIndex(0);
      setSelections({}); setMultiBuffer([]); setHighlighted(null);
    });
  };

  const whatsappLink = (() => {
    if (!currentFlow) return "#";
    return `https://wa.me/${WA}?text=${encodeURIComponent(currentFlow.buildMessage(selections))}`;
  })();

  return (
    <section
      ref={sectionRef}
      id="contato"
      className="py-24 px-6 bg-kelka-gradient relative overflow-hidden"
    >
      <div className="absolute inset-0 paw-pattern opacity-70 pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Simulator card */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">
            Fale com a <span className="text-gradient">Kelka</span>
          </h2>
        </div>

        <div ref={cardRef} className="glass-card rounded-3xl p-7 sm:p-10">

          {/* Progress */}
          {phase === "steps" && (
            <div className="mb-7">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/40 text-xs font-semibold">{stepIndex + 1} / {totalSteps}</span>
                <span className="text-white/40 text-xs">{progress}%</span>
              </div>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%`, background: "linear-gradient(90deg,#5CCDA7,#00A2D6)" }}
                />
              </div>
            </div>
          )}

          {/* ── START ── */}
          {phase === "start" && (
            <div className="text-center py-4">
              {/* Chat bubbles */}
              <div className="flex flex-col items-start gap-2 mb-6 px-2">
                {/* Bubble 1 — mensagem */}
                <div className="flex items-end gap-2">
                  <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs font-black text-white"
                    style={{ background: "linear-gradient(135deg,#5CCDA7,#00A2D6)" }}>K</div>
                  <div
                    className="px-4 py-2.5 rounded-2xl rounded-tl-sm text-sm font-medium text-white max-w-[220px] text-left"
                    style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}
                  >
                    Olá! Como posso te ajudar hoje? 👋
                  </div>
                </div>

                {/* Bubble 2 — typing */}
                <div className="flex items-end gap-2 self-end">
                  <div
                    className="px-4 py-3 rounded-2xl rounded-tr-sm flex items-center gap-1.5"
                    style={{ background: "linear-gradient(135deg,#5CCDA7,#00A2D6)", boxShadow: "0 4px 20px rgba(92,205,167,0.35)" }}
                  >
                    {[0, 1, 2].map(i => (
                      <span
                        key={i}
                        className="block w-2 h-2 rounded-full bg-white"
                        style={{ animation: "typing-dot 1.2s ease-in-out infinite", animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-white font-black text-xl mb-2">Encontre o atendimento certo</p>
              <p className="text-white/50 text-sm mb-8 max-w-sm mx-auto">
                Responda algumas perguntas e te conectamos com o consultor ideal.
              </p>

              {/* Counters as social proof */}
              <div className="grid grid-cols-3 gap-4 mb-8 py-6 border-y border-white/10">
                {counters.map((c, i) => (
                  <div key={c.label}>
                    <div
                      ref={el => { counterRefs.current[i] = el; }}
                      className="text-2xl sm:text-3xl font-black text-white mb-0.5"
                    >
                      0
                    </div>
                    <div className="text-white/45 text-xs font-medium">{c.label}</div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => transition(1, () => setPhase("initial"))}
                className="shimmer-btn text-white font-black text-base px-10 py-4 rounded-2xl inline-flex items-center gap-3"
              >
                Começar <span>→</span>
              </button>
            </div>
          )}

          {/* ── INITIAL ── */}
          {phase === "initial" && (
            <div>
              <p className="text-white font-black text-lg mb-1">Como podemos ajudar?</p>
              <p className="text-white/45 text-sm mb-5">Escolha uma opção para encontrar o atendimento ideal:</p>
              <div className="flex flex-col gap-2.5">
                {flows.map(flow => (
                  <button
                    key={flow.id}
                    onClick={() => selectFlow(flow.id)}
                    className="flex items-center gap-4 p-4 rounded-2xl border text-left transition-all duration-200 hover:border-emerald-400/40 hover:bg-emerald-400/5 group"
                    style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}
                  >
                    <span className="text-xl shrink-0">{flow.icon}</span>
                    <span className="text-white/75 group-hover:text-white text-sm font-medium transition-colors flex-1">{flow.label}</span>
                    <span className="text-white/25 group-hover:text-emerald-400 transition-colors text-base shrink-0">→</span>
                  </button>
                ))}
              </div>
              <button onClick={goBack} className="mt-5 text-white/35 hover:text-white/65 text-sm flex items-center gap-1.5 transition-colors">
                ← Voltar
              </button>
            </div>
          )}

          {/* ── STEPS ── */}
          {phase === "steps" && currentStep && (
            <div>
              <p className="text-white font-black text-lg mb-1">{currentStep.question}</p>
              {currentStep.multiSelect
                ? <p className="text-white/40 text-xs mb-4">Você pode selecionar mais de uma opção</p>
                : <div className="mb-4" />
              }
              <div className="flex flex-col gap-2">
                {currentStep.options.map(opt => {
                  const active = currentStep.multiSelect
                    ? multiBuffer.includes(opt.label)
                    : highlighted === opt.label;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => currentStep.multiSelect ? toggleMulti(opt.label) : selectSingle(currentStep.field, opt.label)}
                      className="flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all duration-150"
                      style={{
                        borderColor: active ? "rgba(92,205,167,0.5)" : "rgba(255,255,255,0.08)",
                        background:  active ? "rgba(92,205,167,0.08)" : "rgba(255,255,255,0.02)",
                      }}
                    >
                      <span
                        className="w-4 h-4 shrink-0 flex items-center justify-center transition-all duration-150"
                        style={{
                          borderRadius: currentStep.multiSelect ? "4px" : "50%",
                          border: `2px solid ${active ? "#5CCDA7" : "rgba(255,255,255,0.2)"}`,
                          background: active ? "#5CCDA7" : "transparent",
                        }}
                      >
                        {active && (
                          <svg viewBox="0 0 10 10" className="w-2.5 h-2.5" fill="none">
                            <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                      <span className="text-sm font-medium transition-colors" style={{ color: active ? "#fff" : "rgba(255,255,255,0.65)" }}>
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>
              {currentStep.multiSelect && (
                <button onClick={confirmMulti} disabled={multiBuffer.length === 0}
                  className="shimmer-btn mt-5 text-white font-black text-sm px-7 py-3 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed">
                  Continuar →
                </button>
              )}
              <button onClick={goBack} className="mt-5 text-white/35 hover:text-white/65 text-sm flex items-center gap-1.5 transition-colors">
                ← Voltar
              </button>
            </div>
          )}

          {/* ── RESULT ── */}
          {phase === "result" && currentFlow && (
            <div>
              <div className="text-center mb-7">
                <div className="flex items-center justify-center mb-3">
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                    <defs>
                      <linearGradient id="check-grad" x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#5CCDA7"/>
                        <stop offset="100%" stopColor="#00A2D6"/>
                      </linearGradient>
                    </defs>
                    <circle cx="28" cy="28" r="28" fill="url(#check-grad)" opacity="0.15"/>
                    <circle cx="28" cy="28" r="20" fill="url(#check-grad)"/>
                    <path d="M18 28l7 7 13-13" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="text-white font-black text-xl mb-1">Tudo pronto!</p>
                <p className="text-white/50 text-sm">Veja o resumo e inicie a conversa no WhatsApp.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-7">
                {currentFlow.steps.map(step => {
                  const val = selections[step.field];
                  if (!val) return null;
                  const display = Array.isArray(val) ? val.join(", ") : val;
                  return (
                    <div key={step.field} className="rounded-xl p-3.5"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <p className="text-white/35 text-xs font-bold uppercase tracking-wider mb-1 truncate">{step.question}</p>
                      <p className="text-white text-sm font-semibold">{display}</p>
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
                  className="shimmer-btn text-white font-black text-base px-8 py-4 rounded-2xl flex items-center justify-center gap-3 flex-1">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                  </svg>
                  Iniciar conversa no WhatsApp
                </a>
                <button onClick={restart}
                  className="text-white/45 hover:text-white text-sm font-medium px-6 py-4 rounded-2xl border border-white/10 hover:border-white/20 transition-all">
                  Recomeçar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
