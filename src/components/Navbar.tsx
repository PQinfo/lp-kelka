import { useState, useEffect, useRef, useCallback } from "react";
import { m as motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { List, X, ArrowRight } from "@phosphor-icons/react";
import KelkaLogo from "./KelkaLogo";
import { cta } from "../data/site";

const links = [
  { label: "Tecnologia", href: "#tecnologia" },
  { label: "Produtos", href: "#produtos" },
  { label: "Guia de tamanhos", href: "#guia-de-tamanhos" },
  { label: "Avaliações", href: "#depoimentos" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduce = useReducedMotion();

  const sentinelRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  /* Antes: window.addEventListener("scroll"), que dispara a cada frame de
     rolagem e re-renderiza a árvore. IntersectionObserver observa um marcador
     de 40px no topo do documento e só notifica na virada de estado. */
  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  /* Menu móvel: Esc fecha, o fundo não rola e o foco entra e volta ao gatilho. */
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const trigger = triggerRef.current;
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) closeMenu();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onDesktop);
    const timer = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>("button")?.focus();
    }, 60);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onDesktop);
      window.clearTimeout(timer);
      trigger?.focus({ preventScroll: true });
    };
  }, [menuOpen, closeMenu]);

  return (
    <>
      {/* Marcador de rolagem, sem tamanho visual */}
      <div ref={sentinelRef} aria-hidden="true" className="absolute top-0 left-0 h-10 w-px pointer-events-none" />

      <motion.nav
        aria-label="Navegação principal"
        initial={false}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
        style={{
          /* Sem faixa propria no topo, como no layout original. O contraste dos
             links vem do sombreado aplicado sobre a imagem, dentro do Hero. */
          background: scrolled
            ? "color-mix(in srgb, var(--kelka-navy-deep) 94%, transparent)"
            : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: `1px solid ${scrolled ? "rgba(255,255,255,0.1)" : "transparent"}`,
        }}
      >
        {/* Altura fixa de 68px, dentro do teto de 80px */}
        <div className="max-w-7xl mx-auto px-5 sm:px-6 h-[68px] flex items-center justify-between gap-4 xl:gap-6">
          <a href="#hero" aria-label="Kelka, início da página" className="shrink-0">
            <KelkaLogo className="h-9" variant={scrolled ? "gradient" : "light"} />
          </a>

          <ul className="hidden lg:flex items-center gap-4 xl:gap-7">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="group relative text-[0.85rem] xl:text-[0.9rem] font-medium text-white/80 hover:text-white transition-colors duration-200 whitespace-nowrap"
                >
                  {l.label}
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1.5 left-0 h-px w-0 rounded-pill bg-emerald transition-all duration-300 group-hover:w-full"
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-4 xl:gap-7">
            <span aria-hidden="true" className="block w-px h-6 bg-white/15" />
            <a
              href="#contato"
              className="group inline-flex items-center gap-2.5 rounded-pill border border-white/25 px-4 xl:px-6 py-2.5 text-[0.85rem] xl:text-[0.9rem] font-semibold text-white whitespace-nowrap transition-colors duration-200 hover:border-white/60 hover:bg-white/5"
            >
              {cta.header}
              <ArrowRight
                size={15}
                weight="bold"
                className="transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </div>

          <noscript><a href="#produtos" className="lg:hidden text-sm text-white">Ver produtos</a></noscript>
          <button
            ref={triggerRef}
            onClick={() => setMenuOpen(true)}
            className="requires-js lg:hidden text-white p-2 -mr-2"
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
          >
            <List size={26} weight="bold" />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="menu-mobile"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: "100%" }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden fixed inset-0 z-[60] flex flex-col overflow-y-auto overscroll-contain"
            style={{ background: "var(--kelka-navy-deep)" }}
          >
            <div className="flex items-center justify-between px-5 h-[68px] shrink-0">
              <KelkaLogo className="h-9" variant="light" />
              <button
                onClick={closeMenu}
                className="text-white/70 hover:text-white transition-colors p-2 -mr-2"
                aria-label="Fechar menu"
              >
                <X size={26} weight="bold" />
              </button>
            </div>

            <nav aria-label="Seções da página" className="flex-1 flex flex-col justify-center gap-1 px-6 py-8">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={closeMenu}
                  className="py-3 sm:py-4 text-xl sm:text-2xl font-black text-white/85 hover:text-emerald border-b border-white/10 transition-colors"
                >
                  {l.label}
                </a>
              ))}

              <a
                href="#contato"
                onClick={closeMenu}
                className="btn-primary text-lg px-8 py-4 mt-8 text-center !rounded-card"
              >
                Fale com a nossa equipe
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
