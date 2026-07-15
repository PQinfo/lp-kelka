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

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
            style={{ background: "rgba(0,36,54,0.98)", backdropFilter: "blur(10px)" }}
          >
            <ul className="px-6 py-4 space-y-4">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="block font-semibold text-base transition-colors"
                    style={{ color: "rgba(255,255,255,0.9)" }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#produtos"
                  onClick={() => setMenuOpen(false)}
                  className="block shimmer-btn text-white font-bold text-center py-3 rounded-full mt-2"
                >
                  Comprar Agora 🐾
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
