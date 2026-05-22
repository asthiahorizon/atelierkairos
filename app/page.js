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
                <span className="w-1.5 h-1.5 rounded-full bg-[#4338ca] animate-pulse" />
                <span className="text-[11px] tracking-[0.25em] uppercase text-[#312e81]">Accompagnement psycho-corporel</span>
              </div>

              <p className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light leading-[0.95] tracking-tight text-[#312e81] mb-5">
                Atelier <span className="italic text-[#4338ca]">Kairos</span>
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.04] tracking-tight text-[#312e81]/85 font-light">
                Kairos, <span className="italic text-[#4338ca]">le temps de l&apos;Être.</span>
              </h1>

              <p className="mt-8 max-w-xl text-base md:text-lg text-[#312e81]/70 leading-relaxed">
                Un espace dédié à la <span className="text-[#312e81] font-medium">régulation du système nerveux</span> et à l&apos;<span className="text-[#312e81] font-medium">expression de l&apos;élan créatif de l&apos;Être</span>. Un temps réservé pour <em>achever</em>, se <em>réguler</em>, et avancer vers une vie cohérente exprimant ce que l&apos;on Est profondément.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link href="/accompagnement" className="px-7 py-4 bg-[#312e81] text-white rounded-full text-sm hover:bg-[#4338ca] transition-all flex items-center gap-2 group">
                  Découvrir l&apos;accompagnement
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/contact" className="px-7 py-4 glass-strong rounded-full text-sm text-[#312e81] hover:bg-white/75 transition-all flex items-center gap-2">
                  Prendre rendez-vous
                </Link>
              </div>

              <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-4 text-xs uppercase tracking-widest text-[#312e81]/55">
                <div><p className="font-serif text-xl text-[#312e81] normal-case tracking-normal">SE</p><p className="mt-1">Somatic Experiencing</p></div>
                <span className="w-px h-10 bg-[#312e81]/15" />
                <div><p className="font-serif text-xl text-[#312e81] normal-case tracking-normal">TCSB</p><p className="mt-1">Cranio-Sacrée Biodynamique</p></div>
                <span className="w-px h-10 bg-[#312e81]/15 hidden sm:block" />
                <div className="hidden sm:block"><p className="font-serif text-xl text-[#312e81] normal-case tracking-normal">TPV</p><p className="mt-1">Théorie polyvagale</p></div>
              </div>
            </div>

            <div className="lg:col-span-5 animate-fade-up opacity-0" style={{ animationDelay: '0.4s' }}>
              <div className="relative">
                <div className="absolute -inset-5 rounded-[2.75rem] bg-gradient-to-br from-[#818cf8]/50 to-[#a78bfa]/40 blur-2xl -z-10" />
                <div className="overflow-hidden rounded-[2rem] shadow-2xl shadow-[#312e81]/30 ring-1 ring-white/50">
                  <img src={HERO_IMG} alt="Atelier Kairos" className="w-full h-[480px] md:h-[580px] object-cover animate-slow-zoom" />
                </div>
                <div className="absolute -bottom-6 -left-6 glass-strong rounded-2xl p-5 max-w-[260px]">
                  <p className="font-serif italic text-[#312e81] text-lg leading-tight">« Le moment juste, où quelque chose peut advenir. »</p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-[#312e81]/55">Kairos — Grèce antique</p>
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
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#312e81]">Le cœur de l&apos;atelier</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.04] tracking-tight text-[#312e81]">
              Réguler le système nerveux,<br /><span className="italic font-light text-[#4338ca]">libérer l&apos;élan créatif de l&apos;Être.</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-5">
            <div className="glass-strong rounded-3xl p-8 md:p-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-2xl glass-indigo flex items-center justify-center">
                  <Activity className="w-5 h-5 text-[#4338ca]" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-2xl text-[#312e81]">Régulation du système nerveux</h3>
              </div>
              <p className="text-[#312e81]/75 leading-relaxed">
                Le système nerveux est ce qui module nos états — de sécurité, de vigilance, de défense. Lorsqu&apos;il est dérégulé par le stress, le trauma ou la surcharge, le corps se fige, se contracte, se déconnecte. <span className="text-[#312e81] font-medium">Réapprendre à le réguler</span>, c&apos;est retrouver la base : un sentiment de sécurité intérieure stable, un corps qui peut respirer, un esprit qui peut écouter.
              </p>
              <p className="mt-4 text-[#312e81]/70 leading-relaxed">
                C&apos;est aussi la condition préalable à tout le reste : sans régulation, l&apos;expression authentique ne peut pas émerger.
              </p>
            </div>

            <div className="glass-strong rounded-3xl p-8 md:p-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-2xl glass-indigo flex items-center justify-center">
                  <Flame className="w-5 h-5 text-[#4338ca]" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-2xl text-[#312e81]">L&apos;élan créatif de l&apos;Être</h3>
              </div>
              <p className="text-[#312e81]/75 leading-relaxed">
                Une fois le terrain apaisé, quelque chose veut émerger. Un mouvement, une parole, une forme, un projet. Cet élan créatif n&apos;est pas une performance — c&apos;est <span className="italic text-[#4338ca]">l&apos;être qui s&apos;exprime</span>. Il peut prendre mille formes : écriture, mouvement, voix, geste, choix de vie, présence renouvelée au monde.
              </p>
              <p className="mt-4 text-[#312e81]/70 leading-relaxed">
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
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#312e81]">La philosophie</span>
              </div>
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight text-[#312e81]">
                Kairos, <span className="italic font-light text-[#4338ca]">le temps de l&apos;Être.</span>
              </h2>
              <p className="mt-6 text-[#312e81]/70 leading-relaxed text-lg">
                Dans la Grèce antique, Kairos désignait le moment juste — un temps de qualité, où quelque chose peut advenir. Non pas parce qu&apos;on l&apos;a prévu, mais parce qu&apos;on y est pleinement présent.
              </p>
            </div>
            <div className="lg:col-span-7 space-y-5">
              <div className="glass rounded-3xl p-8 md:p-10">
                <div className="flex items-baseline gap-3 mb-4">
                  <Clock className="w-5 h-5 text-[#4338ca]" strokeWidth={1.5} />
                  <p className="font-serif text-xl md:text-2xl text-[#312e81]">Chronos vs. Kairos</p>
                </div>
                <p className="text-[#312e81]/75 leading-relaxed">
                  À la différence de Chronos — le temps linéaire qui mesure la durée — Kairos est le temps de l&apos;instant vécu. Celui du corps, de l&apos;intuition, des sensations fines et de l&apos;Être. Le temps où une bascule peut se faire, où une transformation peut naître.
                </p>
              </div>
              <div className="glass rounded-3xl p-8 md:p-10">
                <div className="flex items-baseline gap-3 mb-4">
                  <Mountain className="w-5 h-5 text-[#4338ca]" strokeWidth={1.5} />
                  <p className="font-serif text-xl md:text-2xl text-[#312e81]">L&apos;atelier, le lieu de la création</p>
                </div>
                <p className="text-[#312e81]/75 leading-relaxed">
                  Le mot atelier évoque cet espace vivant, ce lieu où l&apos;on crée, s&apos;exprime, explore et ajuste. Rien n&apos;y est figé : on y travaille avec ce qui est présent, dans l&apos;instant. Tel un artisan qui travaille la matière, ici, on travaille avec le corps, les sensations, le système nerveux, l&apos;élan de vie.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* À PROPOS — Guillaume */}
      <section id="apropos" className="py-24 md:py-32 relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* PORTRAIT */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="relative">
                <div className="overflow-hidden rounded-[2rem] border border-[#312e81]/10 shadow-[0_24px_60px_-20px_rgba(49,46,129,0.25)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/guillaume.jpeg" alt="Guillaume David — Atelier Kairos" className="w-full h-auto object-cover" />
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="surface rounded-2xl p-4">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[#312e81]/55 mb-1">Formation</p>
                    <p className="font-serif text-[15px] text-[#312e81] leading-tight">Bachelor HES en Business Analyse</p>
                    <p className="text-[12px] text-[#312e81]/60 mt-1 italic">Rigueur, structure, processus.</p>
                  </div>
                  <div className="surface rounded-2xl p-4">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[#312e81]/55 mb-1">Pratique somatique</p>
                    <p className="font-serif text-[15px] text-[#312e81] leading-tight">Approche psycho-corporelle</p>
                    <p className="text-[12px] text-[#312e81]/60 mt-1 italic">Écoute, sensibilité, présence.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* TEXTE */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full tag-indigo mb-6">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#312e81]">À propos</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.04] tracking-tight text-[#312e81]">
                Un parcours, <span className="italic font-light text-[#4338ca]">une présence.</span>
              </h2>

              <div className="mt-8 space-y-5 text-[#312e81]/78 leading-relaxed text-[17px]">
                <p>
                  Je m&apos;appelle Guillaume. Depuis ma naissance, je vis avec une <span className="text-[#312e81] font-medium">épilepsie congénitale</span>, dont la première crise est survenue à seulement six mois.
                </p>
                <p>
                  Cette maladie, intense et imprévisible, m&apos;a très tôt confronté à des expériences extrêmes, où le corps se fige, la peur s&apos;installe profondément, et la vulnérabilité devient une réalité quotidienne. Ces moments m&apos;ont obligé à développer une relation intime avec ma propre force intérieure — une présence en soi qui dépasse la peur et la douleur.
                </p>
              </div>

              <blockquote className="mt-8 relative pl-6 border-l-2 border-[#4338ca]/40">
                <p className="font-serif italic text-xl md:text-2xl text-[#4338ca] leading-snug">
                  « La spiritualité a toujours été un socle fondamental dans ma vie, une source d&apos;ancrage et de sens face aux épreuves. »
                </p>
              </blockquote>

              <div className="mt-8 space-y-5 text-[#312e81]/78 leading-relaxed text-[17px]">
                <p>
                  Au fil des années, j&apos;ai cherché, expérimenté, testé différentes approches, jusqu&apos;à comprendre ce qui fonctionne vraiment pour moi. Ce chemin m&apos;a permis d&apos;émerger d&apos;un traumatisme profond, <span className="text-[#312e81] font-medium">transformé par la résilience</span>.
                </p>
                <p>
                  Je me reconnais aussi dans le spectre de la <span className="text-[#312e81] font-medium">neurodiversité</span>, ce qui a demandé un travail considérable de gestion émotionnelle et de régulation, intimement lié à mon vécu avec l&apos;épilepsie. Cette double réalité m&apos;a poussé à explorer et intégrer des pratiques corporelles et spirituelles qui m&apos;aident à retrouver un équilibre profond et durable.
                </p>
                <p>
                  Aujourd&apos;hui, la connexion avec soi-même — avec son corps, ses émotions et sa dimension subtile — est pour moi une nécessité vitale. Après des années d&apos;exploration, je suis désormais porteur d&apos;outils solides, éprouvés dans ma vie quotidienne, que je souhaite partager pour accompagner d&apos;autres personnes dans leur propre chemin de reconnexion, de transformation et de bien-être.
                </p>
              </div>

              <div className="mt-10 rounded-2xl surface-soft border border-[#312e81]/10 p-6">
                <p className="text-[#312e81]/80 leading-relaxed italic">
                  Mon accompagnement reflète cette double vision : à la fois <span className="not-italic text-[#312e81] font-medium">ancrée et fluide</span>, <span className="not-italic text-[#312e81] font-medium">structurée et vivante</span>, technique et sensible. Je crois profondément que la rigueur extérieure et l&apos;écoute intérieure s&apos;allient pour créer un équilibre puissant.
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
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#312e81]">Les espaces</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.04] tracking-tight text-[#312e81]">
              Cinq <span className="italic font-light text-[#4338ca]">portes d&apos;entrée.</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {CARDS.map((c, i) => (
              <Link key={c.title} href={c.href} className="group glass rounded-3xl p-6 hover:glass-strong hover:-translate-y-1 transition-all duration-500 flex flex-col">
                <div className="flex items-start justify-between mb-7">
                  <div className="w-11 h-11 rounded-2xl bg-[#4338ca]/12 flex items-center justify-center group-hover:bg-[#4338ca]/22 transition-colors">
                    <c.icon className="w-5 h-5 text-[#4338ca]" strokeWidth={1.4} />
                  </div>
                  <span className="font-serif text-sm text-[#312e81]/40">0{i + 1}</span>
                </div>
                <h3 className="font-serif text-xl text-[#312e81] mb-3 leading-tight">{c.title}</h3>
                <p className="text-[#312e81]/70 leading-relaxed text-[13px] flex-1">{c.text}</p>
                <div className="mt-5 pt-4 border-t border-[#312e81]/10 flex items-center justify-end">
                  <ArrowUpRight className="w-4 h-4 text-[#312e81]/40 group-hover:text-[#4338ca] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
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
            <div className="relative overflow-hidden rounded-[2rem] shadow-2xl shadow-[#312e81]/25 ring-1 ring-white/50">
              <img src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&q=85&w=1600" alt="Équilibre essentiel" className="w-full h-[640px] md:h-[720px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#312e81]/85 via-[#4338ca]/45 to-transparent" />
              <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end text-white">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-dark mb-5">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-white/85">Une posture</span>
                  </div>
                  <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
                    Un équilibre <span className="italic font-light">essentiel.</span>
                  </h2>
                  <p className="mt-6 text-white/85 leading-relaxed">
                    Reconnaître la rigueur des connaissances de la neurobiologie et de la physiologie, et&nbsp;— en même temps&nbsp;— prendre la <span className="italic">subtilité de l&apos;Être</span> dans sa globalité&nbsp;: ce qui ne se laisse pas mesurer mais qui fait pourtant partie de l&apos;humain. Une posture qui tient les deux ensemble, sans les opposer.
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
