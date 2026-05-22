'use client';

import { useEffect, useState } from 'react';
import SiteHeader from '@/components/site/SiteHeader';
import SiteFooter from '@/components/site/SiteFooter';
import { PageHero, SectionTitle, CTASection } from '@/components/site/Shared';
import { Brain, Sparkles, Wind, Users, Lightbulb, Check, ArrowUpRight } from 'lucide-react';

const AXES = [
  { icon: Brain, num: '01', title: 'Neurodivergence en entreprise', text: 'Comprendre les fonctionnements atypiques, adapter les environnements, valoriser les forces créatives et cognitives.' },
  { icon: Sparkles, num: '02', title: 'Créativité corporelle', text: 'Utiliser le corps, le mouvement et la présence comme portes d\u2019accès à l\u2019innovation et à l\u2019intelligence collective.' },
  { icon: Wind, num: '03', title: 'Régulation du système nerveux', text: 'Reconnaître les états de stress, surcharge, figement ou dispersion — et développer des ressources concrètes de régulation.' },
  { icon: Users, num: '04', title: 'Ateliers d’équipe', text: 'Créer des espaces d\u2019expérimentation, de respiration et de transformation collective.' },
  { icon: Lightbulb, num: '05', title: 'Projets créatifs', text: 'Soutenir les équipes dans l\u2019émergence, la clarification et la matérialisation d\u2019idées nouvelles.' },
];

export default function Page() {
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('/api/entries/formations').then(r => r.json()).then(d => { setFormations(d.entries || []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-[#f5f4f8]">
      <SiteHeader />
      <PageHero kicker="Pour les organisations" title="Entreprise," italic="créativité et neurodivergence." subtitle="Accompagner les organisations à intégrer le corps, la créativité et la diversité des fonctionnements comme ressources vivantes." />

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-10 lg:gap-16">
          <p className="text-[#3730a3]/75 leading-relaxed text-lg">L&apos;Atelier Kairos propose des accompagnements pour les entreprises, équipes et organisations qui souhaitent développer une <span className="text-[#3730a3] font-medium">culture plus sensible, créative et inclusive</span>. L&apos;approche relie la régulation du système nerveux, la créativité corporelle, la neurodivergence et l&apos;intelligence collective.</p>
          <p className="text-[#3730a3]/75 leading-relaxed text-lg">Dans les environnements professionnels, beaucoup de tensions viennent d&apos;un excès de mental, de pression, de vitesse et de déconnexion corporelle. Revenir au corps permet d&apos;ouvrir d&apos;autres formes de présence, de collaboration, d&apos;innovation et de clarté.</p>
        </div>
      </section>

      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute -left-32 top-1/3 w-[400px] h-[400px] rounded-full bg-[#818cf8]/15 blur-3xl -z-10" />
        <div className="container mx-auto px-6">
          <SectionTitle kicker="Axes d'intervention" title="Cinq angles" italic="pour transformer." />
          <div className="space-y-5">
            {AXES.map((a) => (
              <article key={a.title} className="group glass rounded-3xl p-7 md:p-9 hover:glass-strong transition-all">
                <div className="grid md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-1"><span className="font-serif italic text-3xl text-[#4f46e5]/50">{a.num}</span></div>
                  <div className="md:col-span-1"><div className="w-12 h-12 rounded-2xl bg-[#4f46e5]/12 flex items-center justify-center group-hover:bg-[#4f46e5]/22 transition-colors"><a.icon className="w-5 h-5 text-[#4f46e5]" strokeWidth={1.4} /></div></div>
                  <div className="md:col-span-4"><h3 className="font-serif text-xl md:text-2xl text-[#3730a3] leading-tight">{a.title}</h3></div>
                  <div className="md:col-span-6"><p className="text-[#3730a3]/70 leading-relaxed">{a.text}</p></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {formations.length > 0 && (
        <section className="py-20 md:py-28 relative overflow-hidden">
          <div className="absolute -right-32 top-1/4 w-[500px] h-[500px] rounded-full bg-[#a78bfa]/15 blur-3xl -z-10" />
          <div className="container mx-auto px-6">
            <SectionTitle kicker="Formations & interventions" title="Programmes" italic="proposés." />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {formations.map((f) => (
                <article key={f.id} className="group glass rounded-3xl overflow-hidden hover:glass-strong hover:-translate-y-1 transition-all duration-500">
                  {f.imageUrl && (
                    <div className="aspect-[16/10] overflow-hidden"><img src={f.imageUrl} alt={f.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" /></div>
                  )}
                  <div className="p-7">
                    {f.subtitle && <p className="text-[10px] uppercase tracking-[0.25em] text-[#4f46e5] mb-2">{f.subtitle}</p>}
                    <h3 className="font-serif text-xl text-[#3730a3] leading-tight mb-3">{f.title}</h3>
                    {f.description && <p className="text-[#3730a3]/70 leading-relaxed text-[14px]">{f.description}</p>}
                    {f.tags?.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-1.5">{f.tags.map(t => <span key={t} className="text-[11px] px-2.5 py-1 rounded-full glass-indigo text-[#3730a3]">{t}</span>)}</div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection title="Discuter d'une intervention en entreprise." subtitle="Démarrons par un échange pour cerner les besoins de votre équipe et imaginer une proposition sur-mesure." buttonLabel="Prendre contact" />
      <SiteFooter />
    </main>
  );
}
