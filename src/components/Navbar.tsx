import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import KelkaLogo from "./KelkaLogo";

const links = [
  { label: "Benefícios", href: "#beneficios" },
  { label: "Produtos", href: "#produtos" },
  { label: "Como Funciona", href: "#como-funciona" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(0,36,54,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.3)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <KelkaLogo className="h-9" variant={scrolled ? "gradient" : "light"} />

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="text-sm font-semibold transition-colors duration-200 relative group"
                style={{ color: "rgba(255,255,255,0.8)" }}
                onMouseEnter={e => e.currentTarget.style.color = "#5CCDA7"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.8)"}
              >
                {l.label}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 rounded-full transition-all duration-300 group-hover:w-full"
                  style={{ background: "#5CCDA7" }}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#produtos"
          className="hidden md:inline-flex items-center gap-2 shimmer-btn text-white font-bold text-sm px-6 py-2.5 rounded-full hover:scale-105 transition-transform duration-200"
        >
          Comprar Agora 🐾
        </a>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white p-2"
          aria-label="Menu"
        >
          <div className="w-6 space-y-1.5">
            <span
              className="block h-0.5 bg-white transition-all duration-300"
              style={{ transform: menuOpen ? "rotate(45deg) translateY(8px)" : "none" }}
            />
            <span
              className="block h-0.5 bg-white transition-all duration-300"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block h-0.5 bg-white transition-all duration-300"
              style={{ transform: menuOpen ? "rotate(-45deg) translateY(-8px)" : "none" }}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu — fullscreen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="md:hidden fixed inset-0 z-40 flex flex-col"
            style={{ background: "rgba(0,22,38,0.98)", backdropFilter: "blur(16px)" }}
          >
            {/* Close button */}
            <div className="flex items-center justify-between px-6 py-4">
              <KelkaLogo className="h-9" variant="light" />
              <button
                onClick={() => setMenuOpen(false)}
                className="text-white/60 hover:text-white transition-colors p-2"
                aria-label="Fechar menu"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 flex flex-col items-center justify-center gap-2 px-6">
              {links.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  className="w-full text-center py-4 text-2xl font-black text-white/80 hover:text-white border-b border-white/10 transition-colors"
                >
                  {l.label}
                </motion.a>
              ))}

              <motion.a
                href="#produtos"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + links.length * 0.07 }}
                className="shimmer-btn text-white font-black text-lg px-10 py-4 rounded-2xl mt-8 w-full text-center"
              >
                Comprar Agora 🐾
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
