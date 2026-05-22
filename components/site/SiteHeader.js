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
      <div
        className={`mx-auto max-w-7xl rounded-full transition-all duration-500 ${
          scrolled ? 'glass py-2.5' : 'glass-soft py-3'
        }`}
      >
        <div className="px-5 md:px-7 flex items-center justify-between">
          <Link href="/" className="inline-flex items-baseline gap-1.5" aria-label="Atelier Kairos">
            <span className="font-serif text-xl md:text-2xl font-light tracking-tight text-[#1e1b4b]">Atelier</span>
            <span className="font-serif text-xl md:text-2xl italic font-normal tracking-tight text-[#4338ca]">Kairos</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.slice(1, -1).map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`px-3.5 py-2 text-[13px] rounded-full transition-all ${
                  pathname === n.href
                    ? 'bg-[#4338ca]/10 text-[#312e81]'
                    : 'text-[#1e1b4b]/75 hover:text-[#312e81] hover:bg-white/40'
                }`}
              >
                {n.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-2 px-5 py-2.5 bg-[#1e1b4b] text-white rounded-full text-[13px] hover:bg-[#4338ca] transition-colors flex items-center gap-1.5 group"
            >
              Contact
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </nav>

          <button className="lg:hidden text-[#1e1b4b]" onClick={() => setOpen(!open)} aria-label="menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden mt-3 mx-auto max-w-7xl glass rounded-3xl overflow-hidden">
          <nav className="px-6 py-5 flex flex-col gap-0.5">
            {NAV_LINKS.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`py-3 px-4 rounded-2xl text-sm ${pathname === n.href ? 'bg-[#4338ca]/10 text-[#312e81] font-medium' : 'text-[#1e1b4b]/80'}`}
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
