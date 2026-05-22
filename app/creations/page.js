'use client';

import { useEffect, useState } from 'react';
import SiteHeader from '@/components/site/SiteHeader';
import SiteFooter from '@/components/site/SiteFooter';
import { PageHero, CTASection } from '@/components/site/Shared';

export default function Page() {
  const [creations, setCreations] = useState([]);
  useEffect(() => { fetch('/api/entries/creations').then(r => r.json()).then(d => setCreations(d.entries || [])).catch(() => {}); }, []);

  return (
    <main className="min-h-screen bg-[#f5f4f8]">
      <SiteHeader />
      <PageHero kicker="Univers créatif" title="Créations" italic="& explorations." subtitle="Un espace où mes explorations prennent forme à travers les textes, les objets, les images, les projets et les matières." />

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-10 lg:gap-16 text-[#312e81]/75 leading-relaxed text-lg">
          <p>La création est au cœur de l&apos;Atelier Kairos. Elle n&apos;est pas seulement une production extérieure, mais une <span className="text-[#312e81] font-medium">manière d&apos;entrer en relation</span> avec le vivant, avec la conscience, avec la matière et avec l&apos;être.</p>
          <p>Cet espace présente mes créations personnelles — envisagées comme un <span className="italic text-[#4338ca]">chemin d&apos;incarnation</span>. Une manière de rendre visible l&apos;invisible, de donner forme à ce qui traverse le corps, la conscience et l&apos;imaginaire.</p>
        </div>
      </section>

      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute -left-32 top-1/3 w-[400px] h-[400px] rounded-full bg-[#a78bfa]/15 blur-3xl -z-10" />
        <div className="container mx-auto px-6">
          {creations.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {creations.map((c) => (
                <article key={c.id} className="group relative overflow-hidden rounded-3xl glass hover:glass-strong hover:-translate-y-1 transition-all duration-500">
                  {c.imageUrl && <div className="aspect-[4/5] overflow-hidden"><img src={c.imageUrl} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" /></div>}
                  <div className="p-6">
                    {c.subtitle && <p className="text-[10px] uppercase tracking-[0.25em] text-[#4338ca] mb-2">{c.subtitle}</p>}
                    <h3 className="font-serif text-2xl text-[#312e81] leading-tight">{c.title}</h3>
                    {c.description && <p className="mt-3 text-[14px] text-[#312e81]/70 leading-relaxed">{c.description}</p>}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="glass-strong rounded-3xl p-12 text-center max-w-2xl mx-auto">
              <p className="font-serif italic text-2xl text-[#312e81]/80 leading-snug">Les premières créations seront publiées ici progressivement, au rythme de l&apos;émergence.</p>
              <p className="mt-4 text-[#312e81]/65">Écrivez-moi pour être tenu au courant.</p>
            </div>
          )}
        </div>
      </section>

      <CTASection title="Curieux de suivre ces explorations ?" subtitle="Écrivez-moi pour être tenu au courant des nouvelles créations et publications." buttonLabel="Rester en lien" />
      <SiteFooter />
    </main>
  );
}
