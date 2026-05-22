'use client';

import { useEffect, useState } from 'react';
import SiteHeader from '@/components/site/SiteHeader';
import SiteFooter from '@/components/site/SiteFooter';
import { PageHero, CTASection } from '@/components/site/Shared';

export default function Page() {
  const [articles, setArticles] = useState([]);
  useEffect(() => { fetch('/api/entries/articles').then(r => r.json()).then(d => setArticles(d.entries || [])).catch(() => {}); }, []);

  return (
    <main className="min-h-screen bg-[#f5f4f8]">
      <SiteHeader />
      <PageHero kicker="Espace de transmission" title="Articles" italic="& réflexions." subtitle="Réflexions autour du corps, de la conscience, de la créativité, du système nerveux et de la neurodivergence." />

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6 max-w-3xl text-[#312e81]/75 leading-relaxed text-lg space-y-5">
          <p>Un espace de transmission, d&apos;exploration et de mise en mots — entre le corps, la conscience, la créativité, la neurodivergence et la régulation du système nerveux.</p>
        </div>
      </section>

      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute -right-32 top-1/4 w-[400px] h-[400px] rounded-full bg-[#818cf8]/15 blur-3xl -z-10" />
        <div className="container mx-auto px-6">
          {articles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {articles.map((a) => (
                <article key={a.id} className="group glass rounded-3xl overflow-hidden hover:glass-strong hover:-translate-y-1 transition-all duration-500">
                  {a.imageUrl && <div className="aspect-[16/10] overflow-hidden"><img src={a.imageUrl} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" /></div>}
                  <div className="p-7">
                    <div className="flex items-center justify-between mb-4">
                      {a.subtitle ? (<span className="text-[10px] uppercase tracking-[0.25em] text-[#4338ca]">{a.subtitle}</span>) : <span />}
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#312e81]/40">{new Date(a.createdAt).toLocaleDateString('fr-CH', { year: 'numeric', month: 'short' })}</span>
                    </div>
                    <h3 className="font-serif text-xl md:text-2xl text-[#312e81] leading-tight mb-3">{a.title}</h3>
                    {a.description && <p className="text-[#312e81]/70 leading-relaxed text-[14px]">{a.description}</p>}
                    {a.tags?.length > 0 && <div className="mt-5 flex flex-wrap gap-1.5">{a.tags.map(t => <span key={t} className="text-[11px] px-2.5 py-1 rounded-full glass-indigo text-[#312e81]">{t}</span>)}</div>}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="glass-strong rounded-3xl p-12 text-center max-w-2xl mx-auto">
              <p className="font-serif italic text-2xl text-[#312e81]/80 leading-snug">Les premiers articles seront publiés ici progressivement.</p>
              <p className="mt-4 text-[#312e81]/65">Revenez bientôt — ou écrivez-moi pour rester en lien.</p>
            </div>
          )}
        </div>
      </section>

      <CTASection title="Être averti des prochaines publications." subtitle="Écrivez-moi pour rester en lien et recevoir les nouveaux articles dès leur parution." buttonLabel="Me contacter" />
      <SiteFooter />
    </main>
  );
}
