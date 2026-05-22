'use client';

import { useEffect, useState } from 'react';
import SiteHeader from '@/components/site/SiteHeader';
import SiteFooter from '@/components/site/SiteFooter';
import { PageHero, SectionTitle, CTASection } from '@/components/site/Shared';
import { Sparkles } from 'lucide-react';

export default function Page() {
  const [programmes, setProgrammes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/entries/programmes')
      .then((r) => r.json())
      .then((d) => { setProgrammes(d.entries || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-[#f5f4f8]">
      <SiteHeader />
      <PageHero
        kicker="Pour les organisations"
        title="Entreprise,"
        italic="créativité et neurodivergence."
        subtitle="Accompagner les organisations à intégrer le corps, la créativité et la diversité des fonctionnements comme ressources vivantes."
      />

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-10 lg:gap-16">
          <p className="text-[#312e81]/75 leading-relaxed text-lg">
            L&apos;Atelier Kairos propose des accompagnements pour les entreprises, équipes et organisations qui souhaitent
            développer une <span className="text-[#312e81] font-medium">culture plus sensible, créative et inclusive</span>.
            L&apos;approche relie la régulation du système nerveux, la créativité corporelle, la neurodivergence et
            l&apos;intelligence collective.
          </p>
          <p className="text-[#312e81]/75 leading-relaxed text-lg">
            Dans les environnements professionnels, beaucoup de tensions viennent d&apos;un excès de mental, de pression,
            de vitesse et de déconnexion corporelle. Revenir au corps permet d&apos;ouvrir d&apos;autres formes de présence,
            de collaboration, d&apos;innovation et de clarté.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute -left-32 top-1/3 w-[400px] h-[400px] rounded-full bg-[#818cf8]/15 blur-3xl -z-10" />
        <div className="absolute -right-32 top-1/2 w-[500px] h-[500px] rounded-full bg-[#a78bfa]/15 blur-3xl -z-10" />
        <div className="container mx-auto px-6">
          <SectionTitle
            kicker="Programmes & axes d'intervention"
            title="Nos"
            italic="programmes."
            subtitle="Les programmes proposés aux organisations — pensés comme des portes d'entrée complémentaires pour transformer le rapport au corps, à la créativité et aux fonctionnements singuliers."
          />

          {loading ? (
            <div className="text-center py-16 text-[#312e81]/60">Chargement…</div>
          ) : programmes.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex flex-col items-center gap-3 glass rounded-3xl p-10 max-w-md">
                <Sparkles className="w-6 h-6 text-[#4338ca]" strokeWidth={1.4} />
                <p className="text-[#312e81]/70">Les programmes sont en cours d&apos;élaboration. Revenez bientôt.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {programmes.map((p, i) => (
                <article
                  key={p.id}
                  className="group glass rounded-3xl overflow-hidden hover:glass-strong transition-all duration-500"
                >
                  <div className="grid md:grid-cols-12 gap-0">
                    {p.imageUrl && (
                      <div className="md:col-span-4 aspect-[4/3] md:aspect-auto overflow-hidden">
                        <img
                          src={p.imageUrl}
                          alt={p.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                        />
                      </div>
                    )}
                    <div className={`p-7 md:p-9 ${p.imageUrl ? 'md:col-span-8' : 'md:col-span-12'}`}>
                      <div className="grid md:grid-cols-12 gap-5 items-start">
                        <div className="md:col-span-2 flex md:flex-col items-baseline gap-3 md:gap-2">
                          <span className="font-serif italic text-3xl md:text-4xl text-[#4338ca]/55 leading-none">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          {p.subtitle && (
                            <span className="text-[10px] uppercase tracking-[0.22em] text-[#4338ca]">
                              {p.subtitle}
                            </span>
                          )}
                        </div>
                        <div className="md:col-span-10">
                          <h3 className="font-serif text-2xl md:text-[26px] text-[#312e81] leading-tight tracking-tight">
                            {p.title}
                          </h3>
                          {p.description && (
                            <p className="mt-3 text-[#312e81]/75 leading-relaxed">{p.description}</p>
                          )}
                          {p.content && (
                            <p className="mt-3 text-[#312e81]/65 leading-relaxed text-[15px] whitespace-pre-line">
                              {p.content}
                            </p>
                          )}
                          {p.tags?.length > 0 && (
                            <div className="mt-5 flex flex-wrap gap-1.5">
                              {p.tags.map((t) => (
                                <span key={t} className="text-[11px] px-3 py-1 rounded-full glass-indigo text-[#312e81]">
                                  {t}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection
        title="Discuter d'une intervention en entreprise."
        subtitle="Démarrons par un échange pour cerner les besoins de votre équipe et imaginer une proposition sur-mesure."
        buttonLabel="Prendre contact"
      />
      <SiteFooter />
    </main>
  );
}
