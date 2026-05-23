'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight, ChevronDown } from 'lucide-react';

export const NAV_LINKS = [
  { href: '/', label: 'Accueil' },
  { href: '/#apropos', label: 'À propos' },
  {
    label: 'Accompagnement',
    href: '/accompagnement',
    children: [
      { href: '/accompagnement', label: 'Approche individuelle', desc: "Régulation du système nerveux, trauma, neurodiversité" },
      { href: '/entreprise', label: 'Entreprise', desc: "Programmes et interventions en organisation" },
      { href: '/ateliers', label: 'Ateliers', desc: "Cercles, journées d'exploration et de présence" },
    ],
  },
  { href: '/decouvrir', label: 'Découvrir' },
  { href: '/contact', label: 'Contact' },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); setHover(null); }, [pathname]);

  const isActive = (item) => {
    if (item.href === '/') return pathname === '/';
    if (item.children) return item.children.some((c) => pathname.startsWith(c.href));
    return pathname.startsWith(item.href);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'header-bar header-bar-scrolled' : 'header-bar'}`}>
      <div className="container mx-auto px-5 lg:px-8">
        <div className={`flex items-center justify-between gap-6 ${scrolled ? 'h-16' : 'h-20'} transition-all duration-300`}>
          {/* LOGO */}
          <Link href="/" className="inline-flex items-center gap-2.5 shrink-0" aria-label="Atelier Kairos — Accueil">
            <span className="relative inline-block w-9 h-9 md:w-10 md:h-10">
              <Image src="/logo.png" alt="Atelier Kairos" fill priority sizes="40px" className="object-contain" />
            </span>
            <span className="hidden sm:flex items-baseline gap-1.5">
              <span className="font-serif text-xl md:text-[22px] font-light tracking-tight text-[#312e81]">Atelier</span>
              <span className="font-serif text-xl md:text-[22px] italic font-normal tracking-tight text-[#4338ca]">Kairos</span>
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.filter((n) => n.label !== 'Contact').map((n) => (
              <div
                key={n.label}
                className="relative"
                onMouseEnter={() => n.children && setHover(n.label)}
                onMouseLeave={() => setHover(null)}
              >
                <Link
                  href={n.href}
                  className={`px-3.5 py-2 text-[13.5px] rounded-full transition-all inline-flex items-center gap-1 ${
                    isActive(n)
                      ? 'text-[#312e81] bg-[#eef0fb]'
                      : 'text-[#312e81]/75 hover:text-[#312e81] hover:bg-[#eef0fb]/60'
                  }`}
                >
                  {n.label}
                  {n.children && <ChevronDown className="w-3 h-3 opacity-60" />}
                </Link>
                {n.children && hover === n.label && (
                  <div className="absolute left-0 top-full pt-3 w-[360px]">
                    <div className="rounded-2xl bg-white border border-[#312e81]/10 shadow-xl p-2 overflow-hidden">
                      {n.children.map((c) => (
                        <Link key={c.href} href={c.href} className="block px-4 py-3 rounded-xl hover:bg-[#eef0fb] transition-colors group">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-[14px] text-[#312e81] font-medium">{c.label}</p>
                              {c.desc && <p className="text-[12.5px] text-[#312e81]/60 mt-0.5">{c.desc}</p>}
                            </div>
                            <ArrowUpRight className="w-3.5 h-3.5 text-[#4338ca]/40 group-hover:text-[#4338ca] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all mt-0.5" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA + MOBILE TRIGGER */}
          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center gap-1.5 px-5 py-2.5 btn-primary rounded-full text-[13px] group"
            >
              Prendre rendez-vous
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <button
              className="lg:hidden text-[#312e81] p-2 -mr-2"
              onClick={() => setOpen(!open)}
              aria-label="menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="lg:hidden border-t border-[#312e81]/8 bg-white">
          <nav className="container mx-auto px-5 py-4 flex flex-col gap-1 max-h-[80vh] overflow-y-auto">
            {NAV_LINKS.map((n) => (
              <div key={n.label}>
                <Link
                  href={n.href}
                  className={`block py-3 px-4 rounded-xl text-sm ${
                    isActive(n) ? 'bg-[#eef0fb] text-[#312e81] font-medium' : 'text-[#312e81]/80'
                  }`}
                >
                  {n.label}
                </Link>
                {n.children && (
                  <div className="ml-3 mt-1 mb-2 pl-3 border-l border-[#312e81]/10 space-y-0.5">
                    {n.children.filter((c) => c.href !== n.href).map((c) => (
                      <Link key={c.href} href={c.href} className="block py-2 px-3 rounded-lg text-[13px] text-[#312e81]/70 hover:bg-[#eef0fb]/60">
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/contact"
              className="mt-3 inline-flex items-center justify-center gap-1.5 btn-primary rounded-full py-3.5 text-[14px]"
            >
              Prendre rendez-vous
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
