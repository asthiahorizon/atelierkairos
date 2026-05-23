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
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/entries/articles')
      .then((r) => r.json())
      .then((d) => { setArticles(d.entries || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  // newest first
  const sorted = [...articles].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />
      <PageHero
        kicker="Espace de transmission"
        title="Articles"
        italic="& réflexions"
        subtitle="Réflexions autour du corps, de la conscience, de la créativité, du système nerveux et de la neurodivergence"
      />

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6 max-w-3xl text-[#312e81]/75 leading-relaxed text-lg space-y-5">
          <p>
            Un espace de transmission, d&apos;exploration et de mise en mots — entre le corps, la conscience, la créativité,
            la neurodivergence et la régulation du système nerveux.
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
                Les premiers articles seront publiés ici progressivement.
              </p>
              <p className="mt-4 text-[#312e81]/65">Revenez bientôt — ou écrivez-moi pour rester en lien.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sorted.map((a) => (
                <Link
                  key={a.id}
                  href={`/articles/${a.id}`}
                  className="group surface rounded-3xl overflow-hidden hover:surface-strong hover:-translate-y-1 transition-all duration-500 flex flex-col"
                >
                  {a.imageUrl ? (
                    <div className="aspect-[16/10] overflow-hidden bg-[#eef0fb]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={a.imageUrl}
                        alt={a.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms]"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[16/10] bg-gradient-to-br from-[#eef0fb] to-[#dde1f5] flex items-center justify-center">
                      <span className="font-serif italic text-3xl text-[#4338ca]/40">Kairos</span>
                    </div>
                  )}

                  <div className="p-7 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#312e81]/60 mb-4">
                      <Calendar className="w-3.5 h-3.5" />
                      <time dateTime={a.createdAt}>{formatDate(a.createdAt)}</time>
                      {a.subtitle && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-[#312e81]/30" />
                          <span className="text-[#4338ca]">{a.subtitle}</span>
                        </>
                      )}
                    </div>

                    <h3 className="font-serif text-xl md:text-[22px] text-[#312e81] leading-tight mb-3 group-hover:text-[#4338ca] transition-colors">
                      {a.title}
                    </h3>

                    {a.description && (
                      <p className="text-[#312e81]/70 leading-relaxed text-[14.5px] line-clamp-3">{a.description}</p>
                    )}

                    {a.tags?.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {a.tags.slice(0, 3).map((t) => (
                          <span key={t} className="text-[10.5px] px-2.5 py-1 rounded-full tag-indigo">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-auto pt-5 flex items-center justify-between border-t border-[#312e81]/10 mt-5">
                      <span className="text-[12px] text-[#4338ca] font-medium">Lire l&apos;article</span>
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
        title="Être averti des prochaines publications"
        subtitle="Écrivez-moi pour rester en lien et recevoir les nouveaux articles dès leur parution"
        buttonLabel="Me contacter"
      />
      <SiteFooter />
    </main>
  );
}
