import Link from 'next/link';
import SiteHeader from '@/components/site/SiteHeader';
import SiteFooter from '@/components/site/SiteFooter';
import { CTASection } from '@/components/site/Shared';
import { ArrowRight, ArrowUpRight, Heart, Briefcase, Users, Palette, FileText, Clock, Mountain, Activity, Flame, Wind } from 'lucide-react';

const HERO_IMG = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=85&w=1600';

const CARDS = [
  { icon: Heart, href: '/accompagnement', title: 'Accompagnement', text: "Accompagnement psycho-corporel individuel — régulation du système nerveux, travail autour du trauma et expression créative de l'Être." },
  { icon: Briefcase, href: '/entreprise', title: 'Entreprise', text: "Interventions en organisation : neurodivergence, créativité corporelle et intelligence sensible." },
  { icon: Users, href: '/ateliers', title: 'Ateliers', text: "Espaces collectifs d'exploration, de présence, de régulation et de création." },
  { icon: Palette, href: '/creations', title: 'Créations', text: "Textes, œuvres, explorations — donner forme à ce qui traverse le corps, la conscience et l'imaginaire." },
  { icon: FileText, href: '/articles', title: 'Articles', text: "Réflexions autour du corps, de la conscience, du système nerveux et de la neurodivergence." },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f5f4f8]">
      <SiteHeader />

      {/* HERO */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-32 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] bg-[#818cf8]/30 rounded-full blur-3xl -z-10 animate-shimmer" />
        <div className="absolute top-60 -left-40 w-[560px] h-[560px] bg-[#a78bfa]/25 rounded-full blur-3xl -z-10" />
        <div className="absolute top-20 left-1/3 w-[400px] h-[400px] bg-[#c7d2fe]/40 rounded-full blur-3xl -z-10" />

        <div className="container mx-auto px-6 relative">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7 animate-fade-up opacity-0" style={{ animationDelay: '0.15s' }}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-indigo mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4f46e5] animate-pulse" />
                <span className="text-[11px] tracking-[0.25em] uppercase text-[#3730a3]">Accompagnement psycho-corporel — Sierre</span>
              </div>

              <p className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light leading-[0.95] tracking-tight text-[#3730a3] mb-5">
                Atelier <span className="italic text-[#4f46e5]">Kairos</span>
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.04] tracking-tight text-[#3730a3]/85 font-light">
                Kairos, <span className="italic text-[#4f46e5]">le temps de l&apos;Être.</span>
              </h1>

              <p className="mt-8 max-w-xl text-base md:text-lg text-[#3730a3]/70 leading-relaxed">
                Un espace dédié à la <span className="text-[#3730a3] font-medium">régulation du système nerveux</span> et à l&apos;<span className="text-[#3730a3] font-medium">expression de l&apos;élan créatif de l&apos;Être</span>. Un temps réservé pour <em>achever</em>, se <em>réguler</em>, et avancer vers une vie cohérente exprimant ce que l&apos;on Est profondément.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link href="/accompagnement" className="px-7 py-4 bg-[#3730a3] text-white rounded-full text-sm hover:bg-[#4f46e5] transition-all flex items-center gap-2 group">
                  Découvrir l&apos;accompagnement
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/contact" className="px-7 py-4 glass-strong rounded-full text-sm text-[#3730a3] hover:bg-white/75 transition-all flex items-center gap-2">
                  Prendre rendez-vous
                </Link>
              </div>

              <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-4 text-xs uppercase tracking-widest text-[#3730a3]/55">
                <div><p className="font-serif text-xl text-[#3730a3] normal-case tracking-normal">SE</p><p className="mt-1">Somatic Experiencing</p></div>
                <span className="w-px h-10 bg-[#3730a3]/15" />
                <div><p className="font-serif text-xl text-[#3730a3] normal-case tracking-normal">TCSB</p><p className="mt-1">Cranio-Sacrée Biodynamique</p></div>
                <span className="w-px h-10 bg-[#3730a3]/15 hidden sm:block" />
                <div className="hidden sm:block"><p className="font-serif text-xl text-[#3730a3] normal-case tracking-normal">TPV</p><p className="mt-1">Théorie polyvagale</p></div>
              </div>
            </div>

            <div className="lg:col-span-5 animate-fade-up opacity-0" style={{ animationDelay: '0.4s' }}>
              <div className="relative">
                <div className="absolute -inset-5 rounded-[2.75rem] bg-gradient-to-br from-[#818cf8]/50 to-[#a78bfa]/40 blur-2xl -z-10" />
                <div className="overflow-hidden rounded-[2rem] shadow-2xl shadow-[#3730a3]/30 ring-1 ring-white/50">
                  <img src={HERO_IMG} alt="Atelier Kairos" className="w-full h-[480px] md:h-[580px] object-cover animate-slow-zoom" />
                </div>
                <div className="absolute -bottom-6 -left-6 glass-strong rounded-2xl p-5 max-w-[260px]">
                  <p className="font-serif italic text-[#3730a3] text-lg leading-tight">« Le moment juste, où quelque chose peut advenir. »</p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-[#3730a3]/55">Kairos — Grèce antique</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RÉGULATION + EXPRESSION */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute -top-32 right-1/4 w-[500px] h-[500px] bg-[#a78bfa]/20 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 -left-32 w-[400px] h-[400px] bg-[#c7d2fe]/30 rounded-full blur-3xl -z-10" />
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-indigo mb-5">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#3730a3]">Le cœur de l&apos;atelier</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.04] tracking-tight text-[#3730a3]">
              Réguler le système nerveux,<br /><span className="italic font-light text-[#4f46e5]">libérer l&apos;élan créatif de l&apos;Être.</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-5">
            <div className="glass-strong rounded-3xl p-8 md:p-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-2xl glass-indigo flex items-center justify-center">
                  <Activity className="w-5 h-5 text-[#4f46e5]" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-2xl text-[#3730a3]">Régulation du système nerveux</h3>
              </div>
              <p className="text-[#3730a3]/75 leading-relaxed">
                Le système nerveux est ce qui module nos états — de sécurité, de vigilance, de défense. Lorsqu&apos;il est dérégulé par le stress, le trauma ou la surcharge, le corps se fige, se contracte, se déconnecte. <span className="text-[#3730a3] font-medium">Réapprendre à le réguler</span>, c&apos;est retrouver la base : un sentiment de sécurité intérieure stable, un corps qui peut respirer, un esprit qui peut écouter.
              </p>
              <p className="mt-4 text-[#3730a3]/70 leading-relaxed">
                C&apos;est aussi la condition préalable à tout le reste : sans régulation, l&apos;expression authentique ne peut pas émerger.
              </p>
            </div>

            <div className="glass-strong rounded-3xl p-8 md:p-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-2xl glass-indigo flex items-center justify-center">
                  <Flame className="w-5 h-5 text-[#4f46e5]" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-2xl text-[#3730a3]">L&apos;élan créatif de l&apos;Être</h3>
              </div>
              <p className="text-[#3730a3]/75 leading-relaxed">
                Une fois le terrain apaisé, quelque chose veut émerger. Un mouvement, une parole, une forme, un projet. Cet élan créatif n&apos;est pas une performance — c&apos;est <span className="italic text-[#4f46e5]">l&apos;être qui s&apos;exprime</span>. Il peut prendre mille formes : écriture, mouvement, voix, geste, choix de vie, présence renouvelée au monde.
              </p>
              <p className="mt-4 text-[#3730a3]/70 leading-relaxed">
                L&apos;atelier accompagne cette double dynamique : d&apos;abord créer la sécurité, puis laisser circuler ce qui demande à advenir.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHIE */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[400px] h-[400px] rounded-full bg-[#c7d2fe]/30 blur-3xl -z-10" />
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-indigo mb-5">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#3730a3]">La philosophie</span>
              </div>
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight text-[#3730a3]">
                Kairos, <span className="italic font-light text-[#4f46e5]">le temps de l&apos;Être.</span>
              </h2>
              <p className="mt-6 text-[#3730a3]/70 leading-relaxed text-lg">
                Dans la Grèce antique, Kairos désignait le moment juste — un temps de qualité, où quelque chose peut advenir. Non pas parce qu&apos;on l&apos;a prévu, mais parce qu&apos;on y est pleinement présent.
              </p>
            </div>
            <div className="lg:col-span-7 space-y-5">
              <div className="glass rounded-3xl p-8 md:p-10">
                <div className="flex items-baseline gap-3 mb-4">
                  <Clock className="w-5 h-5 text-[#4f46e5]" strokeWidth={1.5} />
                  <p className="font-serif text-xl md:text-2xl text-[#3730a3]">Chronos vs. Kairos</p>
                </div>
                <p className="text-[#3730a3]/75 leading-relaxed">
                  À la différence de Chronos — le temps linéaire qui mesure la durée — Kairos est le temps de l&apos;instant vécu. Celui du corps, de l&apos;intuition, des sensations fines et de l&apos;Être. Le temps où une bascule peut se faire, où une transformation peut naître.
                </p>
              </div>
              <div className="glass rounded-3xl p-8 md:p-10">
                <div className="flex items-baseline gap-3 mb-4">
                  <Mountain className="w-5 h-5 text-[#4f46e5]" strokeWidth={1.5} />
                  <p className="font-serif text-xl md:text-2xl text-[#3730a3]">L&apos;atelier, le lieu de la création</p>
                </div>
                <p className="text-[#3730a3]/75 leading-relaxed">
                  Le mot atelier évoque cet espace vivant, ce lieu où l&apos;on crée, s&apos;exprime, explore et ajuste. Rien n&apos;y est figé : on y travaille avec ce qui est présent, dans l&apos;instant. Tel un artisan qui travaille la matière, ici, on travaille avec le corps, les sensations, le système nerveux, l&apos;élan de vie.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5 CARDS */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#eef0fb] via-[#f5f4f8] to-[#f0e9ff] -z-10" />
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-indigo mb-5">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#3730a3]">Les espaces</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.04] tracking-tight text-[#3730a3]">
              Cinq <span className="italic font-light text-[#4f46e5]">portes d&apos;entrée.</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {CARDS.map((c, i) => (
              <Link key={c.title} href={c.href} className="group glass rounded-3xl p-6 hover:glass-strong hover:-translate-y-1 transition-all duration-500 flex flex-col">
                <div className="flex items-start justify-between mb-7">
                  <div className="w-11 h-11 rounded-2xl bg-[#4f46e5]/12 flex items-center justify-center group-hover:bg-[#4f46e5]/22 transition-colors">
                    <c.icon className="w-5 h-5 text-[#4f46e5]" strokeWidth={1.4} />
                  </div>
                  <span className="font-serif text-sm text-[#3730a3]/40">0{i + 1}</span>
                </div>
                <h3 className="font-serif text-xl text-[#3730a3] mb-3 leading-tight">{c.title}</h3>
                <p className="text-[#3730a3]/70 leading-relaxed text-[13px] flex-1">{c.text}</p>
                <div className="mt-5 pt-4 border-t border-[#3730a3]/10 flex items-center justify-end">
                  <ArrowUpRight className="w-4 h-4 text-[#3730a3]/40 group-hover:text-[#4f46e5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
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
            <div className="relative overflow-hidden rounded-[2rem] shadow-2xl shadow-[#3730a3]/25 ring-1 ring-white/50">
              <img src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&q=85&w=1600" alt="Équilibre essentiel" className="w-full h-[640px] md:h-[720px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#3730a3]/85 via-[#4f46e5]/45 to-transparent" />
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

      <CTASection title="Commencer simplement, à partir de là où vous en êtes." subtitle="Pour un accompagnement individuel, un atelier, une intervention en entreprise — ou simplement une première prise de contact. Je réponds personnellement à chaque message." buttonLabel="Prendre contact" />
      <SiteFooter />
    </main>
  );
}
