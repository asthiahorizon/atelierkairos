'use client';

import { useEffect, useState } from 'react';
import SiteHeader from '@/components/site/SiteHeader';
import SiteFooter from '@/components/site/SiteFooter';
import { PageHero, SectionTitle, CTASection } from '@/components/site/Shared';
import { Calendar, MapPin } from 'lucide-react';

const IMG = 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=85&w=1600';

export default function Page() {
  const [ateliers, setAteliers] = useState([]);
  useEffect(() => { fetch('/api/entries/ateliers').then(r => r.json()).then(d => setAteliers(d.entries || [])).catch(() => {}); }, []);

  return (
    <main className="min-h-screen bg-[#f5f4f8]">
      <SiteHeader />
      <PageHero kicker="Espaces collectifs" title="Ateliers" italic="& cercles." subtitle="Des espaces collectifs pour ressentir, réguler, créer et partager depuis un lieu plus authentique." />

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-5 text-[#3730a3]/75 leading-relaxed text-lg">
            <p>Les ateliers et cercles proposés par l&apos;Atelier Kairos sont des <span className="text-[#3730a3] font-medium">espaces collectifs vivants</span> où chacun peut explorer le corps, la créativité, la conscience et l&apos;expression de l&apos;Être dans un cadre sécurisant et progressif.</p>
            <p>Loin de la performance ou de la production à tout prix, ces espaces invitent à ralentir, à ressentir, à partager et à laisser émerger ce qui demande à advenir. Le collectif devient un terrain d&apos;expérimentation : <span className="italic text-[#4f46e5]">on s&apos;y rencontre soi-même en même temps que l&apos;on rencontre les autres.</span></p>
            <p>Les formats varient — rencontres ponctuelles d&apos;une demi-journée, cycles thématiques sur plusieurs semaines, cercles réguliers mensuels. Tous restent ancrés dans la même intention : créer les conditions d&apos;une présence vivante à soi, au corps, et au groupe.</p>
          </div>
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-5 rounded-[2.75rem] bg-gradient-to-br from-[#818cf8]/50 to-[#a78bfa]/40 blur-2xl -z-10" />
              <div className="overflow-hidden rounded-[2rem] shadow-xl shadow-[#3730a3]/20 ring-1 ring-white/50"><img src={IMG} alt="Ateliers et cercles" className="w-full h-[420px] object-cover" /></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute -right-32 top-1/4 w-[400px] h-[400px] rounded-full bg-[#c7d2fe]/30 blur-3xl -z-10" />
        <div className="container mx-auto px-6">
          <SectionTitle kicker={ateliers.length > 0 ? 'Programme' : 'Prochains ateliers'} title={ateliers.length > 0 ? 'Ateliers' : 'Prochains'} italic={ateliers.length > 0 ? 'à venir.' : 'rendez-vous.'} subtitle={ateliers.length === 0 ? "Les prochains ateliers seront annoncés ici. Inscrivez-vous à la newsletter pour être tenu au courant." : null} />
          {ateliers.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {ateliers.map((a) => (
                <article key={a.id} className="group glass rounded-3xl overflow-hidden hover:glass-strong hover:-translate-y-1 transition-all duration-500">
                  {a.imageUrl && <div className="aspect-[16/10] overflow-hidden"><img src={a.imageUrl} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" /></div>}
                  <div className="p-7">
                    {a.subtitle && <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#4f46e5] mb-3"><Calendar className="w-3 h-3" />{a.subtitle}</div>}
                    <h3 className="font-serif text-xl text-[#3730a3] leading-tight mb-3">{a.title}</h3>
                    {a.description && <p className="text-[#3730a3]/70 leading-relaxed text-[14px]">{a.description}</p>}
                    {a.tags?.length > 0 && <div className="mt-5 flex flex-wrap gap-1.5">{a.tags.map(t => <span key={t} className="text-[11px] px-2.5 py-1 rounded-full glass-indigo text-[#3730a3]">{t}</span>)}</div>}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="glass-strong rounded-3xl p-12 text-center max-w-2xl mx-auto">
              <p className="font-serif italic text-2xl text-[#3730a3]/80 leading-snug">Le programme des ateliers et cercles sera publié ici progressivement.</p>
              <p className="mt-4 text-[#3730a3]/65">Écrivez-moi pour être tenu au courant.</p>
            </div>
          )}
        </div>
      </section>

      <CTASection title="Connaître les prochains ateliers." subtitle="Écrivez-moi pour être tenu au courant du programme et des cercles à venir." buttonLabel="Me contacter" />
      <SiteFooter />
    </main>
  );
}
