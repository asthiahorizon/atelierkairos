import Link from 'next/link';
import SiteHeader from '@/components/site/SiteHeader';
import SiteFooter from '@/components/site/SiteFooter';
import { CTASection } from '@/components/site/Shared';
import { ArrowRight, ArrowUpRight, Heart, Briefcase, Users, Palette, Clock, Mountain } from 'lucide-react';

const HERO_IMG = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=85&w=1600';

const CARDS = [
  { icon: Heart, href: '/accompagnement', title: 'Accompagnement', text: "Accompagnement psycho-corporel individuel — régulation du système nerveux, travail autour du trauma, neurodiversité et expression de Soi." },
  { icon: Briefcase, href: '/entreprise', title: 'Entreprise', text: "Interventions en organisation autour de la neurodivergence, du corps, de la créativité et de l'intelligence sensible." },
  { icon: Users, href: '/ateliers', title: 'Ateliers & cercles', text: "Espaces collectifs d'exploration, de présence, de régulation et de création — corps, conscience, créativité." },
  { icon: Palette, href: '/creations', title: 'Créations & articles', text: "Textes, œuvres, explorations et réflexions autour du corps, de la conscience et de la créativité incarnée." },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f5f4f8]">
      <SiteHeader />

      {/* HERO */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-32 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] bg-[#818cf8]/30 rounded-full blur-3xl -z-10 animate-shimmer" />
        <div className="absolute top-60 -left-40 w-[560px] h-[560px] bg-[#a78bfa]/20 rounded-full blur-3xl -z-10" />
        <div className="absolute top-20 left-1/3 w-[400px] h-[400px] bg-[#c7d2fe]/40 rounded-full blur-3xl -z-10" />

        <div className="container mx-auto px-6 relative">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7 animate-fade-up opacity-0" style={{ animationDelay: '0.15s' }}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-indigo mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4338ca] animate-pulse" />
                <span className="text-[11px] tracking-[0.25em] uppercase text-[#312e81]">Accompagnement psycho-corporel — Sierre</span>
              </div>

              <p className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light leading-[0.95] tracking-tight text-[#1e1b4b] mb-5">
                Atelier <span className="italic text-[#4338ca]">Kairos</span>
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.04] tracking-tight text-[#1e1b4b]/85 font-light">
                Le temps juste, <span className="italic text-[#4338ca]">pour ce qui demande à advenir.</span>
              </h1>

              <p className="mt-8 max-w-xl text-base md:text-lg text-[#1e1b4b]/70 leading-relaxed">
                Un espace en dehors du tumulte. Un temps réservé pour <em className="text-[#1e1b4b]">achever</em>, se <em className="text-[#1e1b4b]">réguler</em>, et avancer vers une vie cohérente exprimant ce que l&apos;on Est profondément.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link href="/accompagnement" className="px-7 py-4 bg-[#1e1b4b] text-white rounded-full text-sm hover:bg-[#4338ca] transition-all flex items-center gap-2 group">
                  Découvrir l&apos;accompagnement
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/contact" className="px-7 py-4 glass rounded-full text-sm text-[#1e1b4b] hover:bg-white/80 transition-all flex items-center gap-2">
                  Prendre rendez-vous
                </Link>
              </div>

              <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-4 text-xs uppercase tracking-widest text-[#1e1b4b]/55">
                <div><p className="font-serif text-xl text-[#1e1b4b] normal-case tracking-normal">SE</p><p className="mt-1">Somatic Experiencing</p></div>
                <span className="w-px h-10 bg-[#1e1b4b]/15" />
                <div><p className="font-serif text-xl text-[#1e1b4b] normal-case tracking-normal">TCSB</p><p className="mt-1">Cranio-Sacrée Biodynamique</p></div>
                <span className="w-px h-10 bg-[#1e1b4b]/15 hidden sm:block" />
                <div className="hidden sm:block"><p className="font-serif text-xl text-[#1e1b4b] normal-case tracking-normal">TPV</p><p className="mt-1">Théorie polyvagale</p></div>
              </div>
            </div>

            <div className="lg:col-span-5 animate-fade-up opacity-0" style={{ animationDelay: '0.4s' }}>
              <div className="relative">
                <div className="absolute -inset-4 rounded-[2.75rem] bg-gradient-to-br from-[#818cf8]/40 to-[#a78bfa]/30 blur-2xl -z-10" />
                <div className="overflow-hidden rounded-[2rem] shadow-2xl shadow-[#312e81]/25 ring-1 ring-white/40">
                  <img src={HERO_IMG} alt="Atelier Kairos" className="w-full h-[480px] md:h-[580px] object-cover animate-slow-zoom" />
                </div>
                <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-5 max-w-[260px]">
                  <p className="font-serif italic text-[#1e1b4b] text-lg leading-tight">« Le moment juste, où quelque chose peut advenir. »</p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-[#1e1b4b]/55">Kairos — Grèce antique</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHIE */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[400px] h-[400px] rounded-full bg-[#c7d2fe]/30 blur-3xl -z-10" />
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-indigo mb-5">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#312e81]">La philosophie</span>
              </div>
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight">
                Kairos, <span className="italic font-light text-[#4338ca]">le temps de l&apos;Être.</span>
              </h2>
              <p className="mt-6 text-[#1e1b4b]/70 leading-relaxed text-lg">
                Dans la Grèce antique, Kairos désignait le moment juste — un temps de qualité, où quelque chose peut advenir. Non pas parce qu&apos;on l&apos;a prévu, mais parce qu&apos;on y est pleinement présent.
              </p>
            </div>
            <div className="lg:col-span-7 space-y-6">
              <div className="glass rounded-3xl p-8 md:p-10">
                <div className="flex items-baseline gap-3 mb-4">
                  <Clock className="w-5 h-5 text-[#4338ca]" strokeWidth={1.5} />
                  <p className="font-serif text-xl md:text-2xl text-[#1e1b4b]">Chronos vs. Kairos</p>
                </div>
                <p className="text-[#1e1b4b]/75 leading-relaxed">
                  À la différence de Chronos — le temps linéaire qui mesure la durée — Kairos est le temps de l&apos;instant vécu. Celui du corps, de l&apos;intuition, des sensations fines et de l&apos;Être. Le temps où une bascule peut se faire, où une transformation peut naître.
                </p>
              </div>
              <div className="glass rounded-3xl p-8 md:p-10">
                <div className="flex items-baseline gap-3 mb-4">
                  <Mountain className="w-5 h-5 text-[#4338ca]" strokeWidth={1.5} />
                  <p className="font-serif text-xl md:text-2xl text-[#1e1b4b]">L&apos;atelier, le lieu de la création</p>
                </div>
                <p className="text-[#1e1b4b]/75 leading-relaxed">
                  Le mot atelier évoque cet espace vivant, ce lieu où l&apos;on crée, s&apos;exprime, explore et ajuste. Rien n&apos;y est figé : on y travaille avec ce qui est présent, dans l&apos;instant. Tel un artisan qui travaille la matière, ici, on travaille avec le corps, les sensations, le système nerveux, l&apos;élan de vie.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 CARDS */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#e9e7ef] via-[#f5f4f8] to-[#eef0fb] -z-10" />
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-indigo mb-5">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#312e81]">Les espaces</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.04] tracking-tight">
              Quatre <span className="italic font-light text-[#4338ca]">portes d&apos;entrée.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CARDS.map((c, i) => (
              <Link key={c.title} href={c.href} className="group glass rounded-3xl p-7 hover:bg-white/75 hover:-translate-y-1 transition-all duration-500 flex flex-col">
                <div className="flex items-start justify-between mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-[#4338ca]/10 flex items-center justify-center group-hover:bg-[#4338ca]/20 transition-colors">
                    <c.icon className="w-5 h-5 text-[#4338ca]" strokeWidth={1.4} />
                  </div>
                  <span className="font-serif text-sm text-[#1e1b4b]/40">0{i + 1}</span>
                </div>
                <h3 className="font-serif text-xl md:text-2xl text-[#1e1b4b] mb-3 leading-tight">{c.title}</h3>
                <p className="text-[#1e1b4b]/70 leading-relaxed text-[14px] flex-1">{c.text}</p>
                <div className="mt-6 pt-5 border-t border-[#1e1b4b]/8 flex items-center justify-end">
                  <ArrowUpRight className="w-4 h-4 text-[#1e1b4b]/40 group-hover:text-[#4338ca] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* EQUILIBRE */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="relative overflow-hidden rounded-[2rem] shadow-2xl shadow-[#312e81]/20 ring-1 ring-white/40">
              <img src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&q=85&w=1600" alt="Équilibre essentiel" className="w-full h-[640px] md:h-[720px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#1e1b4b]/85 via-[#312e81]/45 to-transparent" />
              <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end text-white">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-dark mb-5">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-white/85">Une posture</span>
                  </div>
                  <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
                    Un équilibre <span className="italic font-light">essentiel.</span>
                  </h2>
                  <p className="mt-6 text-white/85 leading-relaxed">
                    Trouver un chemin entre les deux extrêmes — ni strictement scientifique, ni purement ésotérique : une posture qui reconnaît la validité des connaissances de la neurobiologie et de la physiologie, tout en restant ouverte à la richesse des dimensions subtiles de l&apos;Être.
                  </p>
                  <p className="mt-5 font-serif text-xl md:text-2xl italic leading-snug">« À la fois rigoureux et sensible, concret et respectueux des nuances invisibles. »</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Commencer simplement, à partir de là où vous en êtes."
        subtitle="Pour un accompagnement individuel, un atelier, une intervention en entreprise — ou simplement une première prise de contact. Je réponds personnellement à chaque message."
        buttonLabel="Prendre contact"
      />

      <SiteFooter />
    </main>
  );
}
