import { WhatsappLogo } from "@phosphor-icons/react";
import { useReducedMotion } from "./hooks/useReducedMotion";
import { useEffect, useState } from "react";
import MotionProvider from "./components/MotionProvider";
import { track } from "./lib/telemetry";

import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Technology from "./sections/Technology";
import ProductLines from "./sections/ProductLines";
import SizeGuide from "./sections/SizeGuide";
import Testimonials from "./sections/Testimonials";
import FAQ from "./sections/FAQ";
import CTA from "./sections/CTA";
import Footer from "./sections/Footer";
import { cta, whatsappUrl } from "./data/site";

export default function App() {
  const reduce = useReducedMotion();
  const [showContact, setShowContact] = useState(false);
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setShowContact(!entry.isIntersecting));
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <MotionProvider>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Navbar />
      <main id="conteudo" tabIndex={-1} className="landing-main">
        <Hero />
        <Technology />
        <ProductLines />
        <SizeGuide />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />

      <aside aria-label="Contato rápido" className="floating-contact" hidden={!showContact}>
        {!reduce && (
          <span
            aria-hidden="true"
            className="animate-halo absolute inset-0 rounded-pill"
            style={{ background: "rgba(37,211,102,0.45)" }}
          />
        )}
        <a
          href={whatsappUrl("Olá! Vim pelo site da Kelka e gostaria de mais informações.")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={cta.whatsapp}
          onClick={() => track("contact_click", {source: "floating"})}
          className="relative w-14 h-14 rounded-pill flex items-center justify-center transition-transform duration-200 hover:scale-105 active:scale-95"
          style={{ background: "#25D366", boxShadow: "0 8px 24px -8px rgba(37,211,102,0.8)" }}
        >
          <WhatsappLogo size={30} weight="fill" color="#04220f" />
        </a>
      </aside>
    </MotionProvider>
  );
}
