import Link from 'next/link';
import Image from 'next/image';

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
    <footer className="bg-[#1e1b4b] text-white/80 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-10 md:gap-12 mb-14">
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="relative inline-block w-10 h-10 bg-white rounded-full overflow-hidden">
                <Image src="/logo.png" alt="Atelier Kairos" fill sizes="40px" className="object-contain p-1" />
              </span>
              <span className="inline-flex items-baseline gap-1.5">
                <span className="font-serif text-2xl font-light tracking-tight text-white">Atelier</span>
                <span className="font-serif text-2xl italic font-normal tracking-tight text-[#a5b4fc]">Kairos</span>
              </span>
            </Link>
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
        </div>
      </div>
    </footer>
  );
}
