'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export const NAV_LINKS = [
  { href: '/', label: 'Accueil' },
  { href: '/accompagnement-individuel', label: 'Accompagnement' },
  { href: '/entreprises', label: 'Entreprises' },
  { href: '/ateliers-cercles', label: 'Ateliers & cercles' },
  { href: '/creations', label: 'Créations' },
  { href: '/articles', label: 'Articles' },
  { href: '/contact', label: 'Contact' },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#f5efe4]/90 backdrop-blur-xl border-b border-[#28201a]/8 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="inline-flex items-baseline gap-1.5" aria-label="Asthia Horizon">
          <span className="font-serif text-2xl md:text-[26px] font-light tracking-tight text-[#28201a]">
            Asthia
          </span>
          <span className="font-serif text-2xl md:text-[26px] italic font-normal tracking-tight text-[#1d2a3f]">
            Horizon
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.slice(1, -1).map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`px-3 py-2 text-sm transition-colors ${
                pathname === n.href ? 'text-[#1d2a3f]' : 'text-[#28201a]/75 hover:text-[#1d2a3f]'
              }`}
            >
              {n.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-3 px-5 py-2.5 bg-[#1d2a3f] text-[#f5efe4] rounded-full text-sm hover:bg-[#28201a] transition-colors flex items-center gap-2 group"
          >
            Contact
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </nav>

        <button className="lg:hidden text-[#28201a]" onClick={() => setOpen(!open)} aria-label="menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-[#f5efe4] border-t border-[#28201a]/10 mt-3">
          <nav className="container mx-auto px-6 py-6 flex flex-col gap-1">
            {NAV_LINKS.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`py-3 border-b border-[#28201a]/5 ${
                  pathname === n.href ? 'text-[#1d2a3f] font-medium' : 'text-[#28201a]/80'
                }`}
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
