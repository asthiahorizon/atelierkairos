'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export const NAV_LINKS = [
  { href: '/', label: 'Accueil' },
  { href: '/accompagnement', label: 'Accompagnement' },
  { href: '/entreprise', label: 'Entreprise' },
  { href: '/ateliers', label: 'Ateliers' },
  { href: '/creations', label: 'Créations' },
  { href: '/articles', label: 'Articles' },
  { href: '/contact', label: 'Contact' },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <div className={`mx-auto max-w-7xl rounded-full transition-all duration-500 ${scrolled ? 'glass-strong py-2.5' : 'glass py-3'}`}>
        <div className="px-5 md:px-7 flex items-center justify-between">
          <Link href="/" className="inline-flex items-baseline gap-1.5" aria-label="Atelier Kairos — Accueil">
            <span className="font-serif text-xl md:text-2xl font-light tracking-tight text-[#3730a3]">Atelier</span>
            <span className="font-serif text-xl md:text-2xl italic font-normal tracking-tight text-[#4f46e5]">Kairos</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.slice(0, -1).map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`px-3.5 py-2 text-[13px] rounded-full transition-all ${
                  pathname === n.href
                    ? 'glass-indigo text-[#3730a3]'
                    : 'text-[#3730a3]/75 hover:text-[#3730a3] hover:bg-white/50'
                }`}
              >
                {n.label}
              </Link>
            ))}
            <Link href="/contact" className="ml-2 px-5 py-2.5 bg-[#3730a3] text-white rounded-full text-[13px] hover:bg-[#4f46e5] transition-colors flex items-center gap-1.5 group">
              Contact
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </nav>

          <button className="lg:hidden text-[#3730a3]" onClick={() => setOpen(!open)} aria-label="menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden mt-3 mx-auto max-w-7xl glass-strong rounded-3xl overflow-hidden">
          <nav className="px-6 py-5 flex flex-col gap-0.5">
            {NAV_LINKS.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`py-3 px-4 rounded-2xl text-sm ${pathname === n.href ? 'glass-indigo text-[#3730a3] font-medium' : 'text-[#3730a3]/80'}`}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
