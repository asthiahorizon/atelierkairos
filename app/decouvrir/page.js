'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import SiteHeader from '@/components/site/SiteHeader';
import SiteFooter from '@/components/site/SiteFooter';
import { PageHero, CTASection } from '@/components/site/Shared';
import { ArrowUpRight, Calendar, Pen, Sparkles, Users } from 'lucide-react';

const FEED_TYPES = [
  { key: 'articles', label: 'Articles', icon: Pen, color: '#4338ca', basePath: 'articles' },
  { key: 'creations', label: 'Créations', icon: Sparkles, color: '#6d28d9', basePath: 'creations' },
  { key: 'ateliers', label: 'Ateliers', icon: Users, color: '#312e81', basePath: 'ateliers' },
];

function formatDate(d) {
  try {
    return new Date(d).toLocaleDateString('fr-CH', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return '';
  }
}

export default function Page() {
  const [filter, setFilter] = useState('all');
  const [data, setData] = useState({ articles: [], creations: [], ateliers: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    Promise.all(
      FEED_TYPES.map((t) =>
        fetch(`/api/entries/${t.key}`)
          .then((r) => r.json())
          .then((d) => [t.key, d.entries || []])
          .catch(() => [t.key, []])
      )
    ).then((results) => {
      if (!mounted) return;
      const next = { articles: [], creations: [], ateliers: [] };
      results.forEach(([k, v]) => { next[k] = v; });
      setData(next);
      setLoading(false);
    });
    return () => { mounted = false; };
  }, []);

  const feed = useMemo(() => {
    const all = [
      ...(data.articles || []).map((e) => ({ ...e, _type: 'articles' })),
      ...(data.creations || []).map((e) => ({ ...e, _type: 'creations' })),
      ...(data.ateliers || []).map((e) => ({ ...e, _type: 'ateliers' })),
    ];
    const filtered = filter === 'all' ? all : all.filter((e) => e._type === filter);
    return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [data, filter]);

  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />
      <PageHero
        kicker="Tout l'univers"
        title="Découvrir"
        italic="l'Atelier."
        subtitle="Articles, créations, ateliers et cercles — réunis ici dans un flux unique, classés par date de publication."
      />

      <section className="py-8 md:py-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-[13px] transition-all ${
                filter === 'all'
                  ? 'bg-[#312e81] text-white shadow-sm'
                  : 'bg-white border border-[#312e81]/10 text-[#312e81] hover:bg-[#eef0fb]'
              }`}
            >
              Tout ({feed.length || (data.articles.length + data.creations.length + data.ateliers.length)})
            </button>
            {FEED_TYPES.map((t) => {
              const count = (data[t.key] || []).length;
              return (
                <button
                  key={t.key}
                  onClick={() => setFilter(t.key)}
                  className={`px-4 py-2 rounded-full text-[13px] transition-all inline-flex items-center gap-1.5 ${
                    filter === t.key
                      ? 'bg-[#312e81] text-white shadow-sm'
                      : 'bg-white border border-[#312e81]/10 text-[#312e81] hover:bg-[#eef0fb]'
                  }`}
                >
                  <t.icon className="w-3.5 h-3.5" />
                  {t.label} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="text-center py-16 text-[#312e81]/60">Chargement…</div>
          ) : feed.length === 0 ? (
            <div className="surface rounded-3xl p-12 text-center max-w-2xl mx-auto">
              <p className="font-serif italic text-2xl text-[#312e81]/80 leading-snug">
                Les contenus seront publiés ici progressivement.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {feed.map((e) => {
                const meta = FEED_TYPES.find((t) => t.key === e._type) || FEED_TYPES[0];
                const Icon = meta.icon;
                const aspect = e._type === 'creations' ? 'aspect-[4/5]' : 'aspect-[16/10]';
                return (
                  <Link
                    key={`${e._type}-${e.id}`}
                    href={e._type === 'ateliers' ? '/ateliers' : `/${meta.basePath}/${e.id}`}
                    className="group surface rounded-3xl overflow-hidden hover:surface-strong hover:-translate-y-1 transition-all duration-500 flex flex-col"
                  >
                    {e.imageUrl ? (
                      <div className={`${aspect} overflow-hidden bg-[#eef0fb] relative`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={e.imageUrl} alt={e.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <span className="absolute top-3 left-3 inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-full bg-white/95 text-[#312e81] backdrop-blur-sm">
                          <Icon className="w-3 h-3" style={{ color: meta.color }} />
                          {meta.label}
                        </span>
                      </div>
                    ) : (
                      <div className={`${aspect} bg-gradient-to-br from-[#eef0fb] to-[#dde1f5] flex items-center justify-center relative`}>
                        <span className="font-serif italic text-3xl text-[#4338ca]/40">Kairos</span>
                        <span className="absolute top-3 left-3 inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-full bg-white/95 text-[#312e81]">
                          <Icon className="w-3 h-3" style={{ color: meta.color }} />
                          {meta.label}
                        </span>
                      </div>
                    )}

                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#312e81]/60 mb-3">
                        <Calendar className="w-3.5 h-3.5" />
                        <time dateTime={e.createdAt}>{formatDate(e.createdAt)}</time>
                        {e.subtitle && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-[#312e81]/30" />
                            <span className="text-[#4338ca]">{e.subtitle}</span>
                          </>
                        )}
                      </div>
                      <h3 className="font-serif text-xl md:text-[22px] text-[#312e81] leading-tight mb-2 group-hover:text-[#4338ca] transition-colors">
                        {e.title}
                      </h3>
                      {e.description && (
                        <p className="text-[#312e81]/70 leading-relaxed text-[14.5px] line-clamp-3">{e.description}</p>
                      )}
                      <div className="mt-auto pt-5 flex items-center justify-between border-t border-[#312e81]/10 mt-5">
                        <span className="text-[12px] text-[#4338ca] font-medium">
                          {e._type === 'articles' ? "Lire l'article" : e._type === 'creations' ? 'Découvrir' : "Voir l'atelier"}
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-[#4338ca] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <CTASection
        title="Rester en lien."
        subtitle="Écrivez-moi pour suivre les prochaines parutions, ateliers et créations."
        buttonLabel="Me contacter"
      />
      <SiteFooter />
    </main>
  );
}
