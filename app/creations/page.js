'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import SiteHeader from '@/components/site/SiteHeader';
import SiteFooter from '@/components/site/SiteFooter';
import { PageHero, CTASection } from '@/components/site/Shared';
import { ArrowUpRight, Calendar } from 'lucide-react';

function formatDate(d) {
  try {
    return new Date(d).toLocaleDateString('fr-CH', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return '';
  }
}

export default function Page() {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/entries/creations')
      .then((r) => r.json())
      .then((d) => { setCreations(d.entries || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const sorted = [...creations].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />
      <PageHero
        kicker="Univers créatif"
        title="Créations"
        italic="& explorations."
        subtitle="Un espace où mes explorations prennent forme à travers les textes, les objets, les images, les projets et les matières."
      />

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-10 lg:gap-16 text-[#312e81]/75 leading-relaxed text-lg">
          <p>
            La création est au cœur de l&apos;Atelier Kairos. Elle n&apos;est pas seulement une production extérieure, mais
            une <span className="text-[#312e81] font-medium">manière d&apos;entrer en relation</span> avec le vivant, avec la conscience, avec la matière et avec l&apos;être.
          </p>
          <p>
            Cet espace présente mes créations personnelles — envisagées comme un{' '}
            <span className="italic text-[#4338ca]">chemin d&apos;incarnation</span>. Une manière de rendre visible l&apos;invisible,
            de donner forme à ce qui traverse le corps, la conscience et l&apos;imaginaire.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="text-center py-16 text-[#312e81]/60">Chargement…</div>
          ) : sorted.length === 0 ? (
            <div className="surface rounded-3xl p-12 text-center max-w-2xl mx-auto">
              <p className="font-serif italic text-2xl text-[#312e81]/80 leading-snug">
                Les premières créations seront publiées ici progressivement, au rythme de l&apos;émergence.
              </p>
              <p className="mt-4 text-[#312e81]/65">Écrivez-moi pour être tenu au courant.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sorted.map((c) => (
                <Link
                  key={c.id}
                  href={`/creations/${c.id}`}
                  className="group surface rounded-3xl overflow-hidden hover:surface-strong hover:-translate-y-1 transition-all duration-500 flex flex-col"
                >
                  {c.imageUrl ? (
                    <div className="aspect-[4/5] overflow-hidden bg-[#eef0fb]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={c.imageUrl}
                        alt={c.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[4/5] bg-gradient-to-br from-[#eef0fb] to-[#dde1f5] flex items-center justify-center">
                      <span className="font-serif italic text-3xl text-[#4338ca]/40">Kairos</span>
                    </div>
                  )}

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#312e81]/60 mb-3">
                      <Calendar className="w-3.5 h-3.5" />
                      <time dateTime={c.createdAt}>{formatDate(c.createdAt)}</time>
                      {c.subtitle && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-[#312e81]/30" />
                          <span className="text-[#4338ca]">{c.subtitle}</span>
                        </>
                      )}
                    </div>
                    <h3 className="font-serif text-xl md:text-[22px] text-[#312e81] leading-tight mb-2 group-hover:text-[#4338ca] transition-colors">
                      {c.title}
                    </h3>
                    {c.description && (
                      <p className="text-[#312e81]/70 leading-relaxed text-[14.5px] line-clamp-3">{c.description}</p>
                    )}
                    <div className="mt-auto pt-5 flex items-center justify-between border-t border-[#312e81]/10 mt-5">
                      <span className="text-[12px] text-[#4338ca] font-medium">Découvrir</span>
                      <ArrowUpRight className="w-4 h-4 text-[#4338ca] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection
        title="Curieux de suivre ces explorations ?"
        subtitle="Écrivez-moi pour être tenu au courant des nouvelles créations et publications."
        buttonLabel="Rester en lien"
      />
      <SiteFooter />
    </main>
  );
}
