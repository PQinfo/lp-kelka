import { Phone, EnvelopeSimple, MapPin } from "@phosphor-icons/react";
import KelkaLogo from "../components/KelkaLogo";
import { lines, productHref } from "../data/catalog";
import { navigateWithinPage } from "../lib/navigation";
import { site } from "../data/site";

const productLinks = [
  ...lines.map(line => ({label: line.name, href: productHref(line.id, 7)})),
  {label: "Terceirização de tapetes", href: "?interesse=terceirizar#contato"},
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="section-navy bg-surface border-t border-line pt-14 pb-8 max-md:pb-24 px-5 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.2fr] gap-x-5 gap-y-10 md:gap-10 mb-12">
          <div className="max-md:col-span-2 max-md:text-center">
            <KelkaLogo className="h-12 mb-5 max-md:mx-auto" variant="gradient" />
            <p className="text-ink-muted text-sm leading-relaxed max-w-[38ch] max-md:mx-auto">
              A Kelka desenvolve soluções de higiene e bem-estar animal, com
              fabricação própria e atendimento direto ao lojista.
            </p>
          </div>

          <nav aria-label="Produtos">
            <h2 className="font-black text-sm text-ink mb-4">Produtos</h2>
            <ul className="space-y-3">
              {productLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={navigateWithinPage} className="text-ink-muted hover:text-accent text-sm transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-black text-sm text-ink mb-4">Atendimento</h2>
            <ul className="space-y-3 text-sm max-md:text-xs">
              <li>
                <a href={`tel:${site.phoneHref}`} className="flex items-center gap-2.5 max-md:gap-1.5 text-ink-muted hover:text-accent transition-colors">
                  <Phone size={17} weight="bold" className="shrink-0 max-md:w-4 max-md:h-4" aria-hidden="true" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 max-md:gap-1.5 max-md:break-all text-ink-muted hover:text-accent transition-colors">
                  <EnvelopeSimple size={17} weight="bold" className="shrink-0 max-md:w-4 max-md:h-4" aria-hidden="true" />
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 max-md:gap-1.5 text-ink-muted">
                <MapPin size={17} weight="bold" className="shrink-0 mt-0.5 max-md:w-4 max-md:h-4" aria-hidden="true" />
                <span>{site.regions}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-line pt-7">
          <p className="text-ink-muted text-xs max-md:text-center">
            {year} Kelka. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
