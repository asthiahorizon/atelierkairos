import Link from 'next/link';

const COLS = [
  { title: 'Espaces', links: [
    { href: '/accompagnement-individuel', label: 'Accompagnement individuel' },
    { href: '/entreprises', label: 'Entreprises' },
    { href: '/ateliers-cercles', label: 'Ateliers & cercles' },
  ]},
  { title: 'Univers', links: [
    { href: '/creations', label: 'Créations' },
    { href: '/articles', label: 'Articles' },
    { href: '/contact', label: 'Contact' },
  ]},
];

export default function SiteFooter() {
  return (
    <footer className="bg-[#1d2a3f] text-[#f5efe4]/80 pt-20 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-10 md:gap-12 mb-14">
          <div className="md:col-span-5">
            <div className="inline-flex items-baseline gap-1.5">
              <span className="font-serif text-3xl font-light tracking-tight text-[#f5efe4]">Asthia</span>
              <span className="font-serif text-3xl italic font-normal tracking-tight text-[#c9b694]">Horizon</span>
            </div>
            <p className="mt-5 text-sm text-[#f5efe4]/65 leading-relaxed max-w-sm">
              Un espace pour réguler le système nerveux, libérer l&apos;expression de l&apos;être et créer depuis une conscience plus vaste.
            </p>
            <p className="mt-4 text-xs text-[#f5efe4]/45 leading-relaxed">
              Espace d&apos;accompagnement, de création et de transmission.
            </p>
          </div>

          {COLS.map((col) => (
            <div key={col.title} className="md:col-span-3">
              <p className="uppercase tracking-widest text-xs text-[#f5efe4]/45 mb-5">{col.title}</p>
              <ul className="space-y-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="hover:text-[#f5efe4] transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-1 text-sm">
            <p className="uppercase tracking-widest text-xs text-[#f5efe4]/45 mb-5">Lien</p>
            <a href="mailto:info@atelierkairos.ch" className="hover:text-[#f5efe4] transition-colors text-[13px]">
              info@<br />atelierkairos.ch
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-[#f5efe4]/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#f5efe4]/50">
          <p>© {new Date().getFullYear()} Asthia Horizon — Tous droits réservés.</p>
          <p className="italic font-serif text-sm">« Créer depuis l&apos;être, pas depuis la pression. »</p>
        </div>
      </div>
    </footer>
  );
}
