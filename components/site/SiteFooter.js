import Link from 'next/link';

const COLS = [
  { title: 'Espaces', links: [
    { href: '/accompagnement', label: 'Accompagnement' },
    { href: '/entreprise', label: 'Entreprise' },
    { href: '/ateliers', label: 'Ateliers' },
  ]},
  { title: 'Univers', links: [
    { href: '/creations', label: 'Créations' },
    { href: '/articles', label: 'Articles' },
    { href: '/contact', label: 'Contact' },
  ]},
];

export default function SiteFooter() {
  return (
    <footer className="relative bg-[#1e1b4b] text-white/80 pt-20 pb-12 overflow-hidden">
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#4338ca]/40 blur-3xl animate-shimmer" />
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-[#7c3aed]/30 blur-3xl" />

      <div className="container mx-auto px-6 relative">
        <div className="grid md:grid-cols-12 gap-10 md:gap-12 mb-14">
          <div className="md:col-span-5">
            <div className="inline-flex items-baseline gap-1.5">
              <span className="font-serif text-3xl font-light tracking-tight text-white">Atelier</span>
              <span className="font-serif text-3xl italic font-normal tracking-tight text-[#a5b4fc]">Kairos</span>
            </div>
            <p className="mt-5 text-sm text-white/65 leading-relaxed max-w-sm">
              Le moment juste, pour ce qui demande à advenir. Un espace en dehors du tumulte, dédié à l&apos;écoute du vivant et à la transformation profonde.
            </p>
            <p className="mt-4 text-xs text-white/45 leading-relaxed">
              Espace Chèndâ — Centre holistique de santé<br />
              Av. du Général Guisan 19, 3960 Sierre
            </p>
          </div>

          {COLS.map((col) => (
            <div key={col.title} className="md:col-span-3">
              <p className="uppercase tracking-widest text-xs text-white/45 mb-5">{col.title}</p>
              <ul className="space-y-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l.href}><Link href={l.href} className="hover:text-white transition-colors">{l.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-1">
            <p className="uppercase tracking-widest text-xs text-white/45 mb-5">Lien</p>
            <a href="mailto:info@atelierkairos.ch" className="hover:text-white text-[13px] block transition-colors">
              info@<br />atelierkairos.ch
            </a>
            <a href="tel:+41794371196" className="hover:text-white text-[13px] block mt-3 transition-colors">+41 79 437 11 96</a>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Atelier Kairos — Tous droits réservés.</p>
          <p className="italic font-serif text-sm">« Le moment juste, pour ce qui demande à advenir. »</p>
        </div>
      </div>
    </footer>
  );
}
