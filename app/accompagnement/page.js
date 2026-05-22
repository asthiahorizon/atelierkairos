import SiteHeader from '@/components/site/SiteHeader';
import SiteFooter from '@/components/site/SiteFooter';
import { PageHero, SectionTitle, CTASection } from '@/components/site/Shared';
import { Leaf, HandHeart, Brain, Shield, BrainCircuit, ArrowUpRight, Wind, Flower2, Sparkles, Compass, ShieldCheck, Waves } from 'lucide-react';

export const metadata = {
  title: 'Accompagnement psycho-corporel',
  description: "Accompagnement individuel psycho-corporel à Sierre : régulation du système nerveux, travail autour du trauma et expression de l'Être. Somatic Experiencing, TCSB, théorie polyvagale.",
};

const METHODS = [
  { name: 'Somatic Experiencing', short: 'SE', icon: Leaf, text: "La SE se concentre sur la régulation du système nerveux en aidant à libérer en douceur les tensions, blocages et réactions physiologiques associées aux traumatismes passés. Une approche progressive, centrée sur l'écoute des sensations corporelles, qui rétablit un sentiment profond de sécurité intérieure." },
  { name: 'Thérapie Cranio-Sacrée Biodynamique', short: 'TCSB', icon: HandHeart, text: "La TCSB est une approche subtile et respectueuse qui s'appuie sur l'écoute des rythmes naturels du corps — notamment les mouvements fluides du système crânio-sacré. Elle favorise l'équilibre, la vitalité et soutient le fonctionnement optimal des mécanismes d'auto-régulation." },
  { name: 'Théorie polyvagale', short: 'TPV', icon: Brain, text: "Cette théorie offre un cadre pour comprendre le fonctionnement du système nerveux autonome — comment il module nos états de sécurité, vigilance ou défense. Un repère pour identifier nos états nerveux, favoriser un retour à la sécurité intérieure et renforcer la capacité à s'ouvrir à la relation." },
];

const ORIENTATIONS = [
  {
    icon: Shield,
    title: "Travail psycho-corporel autour du trauma et de l'expression de l'Être",
    lead: "Retrouver la sécurité intérieure, puis laisser émerger ce qui demande à s'exprimer.",
    paragraphs: [
      "Le trauma — qu'il soit ponctuel, relationnel ou développemental — laisse des empreintes profondes dans le corps et le système nerveux. Tensions chroniques, états de figement, hypervigilance, dissociation, sentiment d'insécurité diffus : autant de signes qu'une partie de nous est restée bloquée dans un schéma de survie.",
      "L'approche ici n'est pas de revivre ce qui a été difficile, ni de l'analyser mentalement. Il s'agit de créer les conditions pour que le système nerveux puisse, en douceur, sortir de ces états de survie et retrouver sa capacité d'auto-régulation. On travaille avec les sensations, les micro-mouvements, le rythme du souffle, la présence — toujours dans une fenêtre de tolérance qui respecte le rythme de chacun.",
      "Une fois la sécurité intérieure progressivement retrouvée, quelque chose peut alors se déployer : une parole plus juste, un élan créatif jusque-là contenu, une présence plus pleine à soi et aux autres. Le travail autour du trauma devient alors aussi un travail d'expression — celui de l'Être qui se libère et qui peut enfin habiter pleinement la vie.",
    ],
    indications: ['Stress chronique','Anxiété','Dissociation','Tensions corporelles','Épuisement','Hypervigilance','Sentiment d\u2019insécurité','Trauma relationnel','Blocages d\u2019expression'],
  },
  {
    icon: BrainCircuit,
    title: 'Accompagnement de la neurodiversité',
    lead: "Composer avec son fonctionnement de manière respectueuse et vivante — non pas le corriger.",
    paragraphs: [
      "Un espace pensé pour les personnes au fonctionnement sensible, intense, atypique ou neurodivergent : autisme, TDAH, haut potentiel intellectuel, hypersensibilité, multipotentialité. Il s'agit d'explorer son rapport au corps, au rythme, aux stimulations, aux émotions, à la fatigue, à la concentration et à la relation aux autres.",
      "L'objectif n'est pas de normaliser ni de corriger un fonctionnement, mais de mieux le comprendre pour apprendre à l'habiter pleinement. Le système nerveux des personnes neurodivergentes est souvent plus réactif, plus rapide, plus intense — il a besoin d'outils adaptés, de cadres respectueux et d'un accompagnement qui ne cherche pas à nous formater.",
      "Le travail intègre la régulation sensorielle, la compréhension de son profil neurologique, la mise en place de stratégies d'auto-régulation concrètes, et l'exploration de l'élan créatif singulier qui caractérise souvent ces fonctionnements. Apprendre à se rencontrer tel qu'on est, sans masque ni adaptation excessive, et à partir de là, laisser sa créativité s'exprimer.",
    ],
    indications: ['Hypersensibilité','TDAH','Haut potentiel (HPI)','Autisme','Surcharge sensorielle','Fatigue nerveuse','Sentiment d\u2019être « trop » ou « pas adapté »','Burn-out autistique','Masquage'],
    personalNote: "Étant moi-même autiste, à haut potentiel et épileptique, ce thème occupe une place particulière dans mon accompagnement. Je sais ce que cela signifie d'habiter un système nerveux singulier, et combien il est précieux de rencontrer un espace qui ne cherche pas à nous formater.",
  },
  {
    icon: Waves,
    title: 'Thérapie Cranio-Sacrée Biodynamique',
    lead: "Une écoute fine des rythmes profonds du corps, pour soutenir l'auto-régulation et la vitalité.",
    paragraphs: [
      "La Thérapie Cranio-Sacrée Biodynamique (TCSB) est une approche manuelle subtile, très douce, qui s'appuie sur l'écoute attentive des rythmes naturels du corps — en particulier les mouvements fluides du système crânio-sacré et la respiration primaire. Le toucher est léger, respectueux, presque immobile, et laisse au corps tout l'espace pour révéler ce qui demande à se réorganiser.",
      "Ce travail soutient le système nerveux dans sa capacité d'auto-régulation. Il favorise une détente profonde, un retour à des états physiologiques plus calmes, et soutient les mécanismes naturels d'équilibration du corps. La TCSB peut accompagner aussi bien des problématiques physiques (tensions, douleurs chroniques, suites de chocs, fatigue) que des états plus globaux (stress, surcharge, difficultés à se sentir habité par son corps).",
      "Cette approche se déroule habillé(e), allongé(e) sur une table. Elle convient à tout âge — du nourrisson à la personne âgée — et s'intègre naturellement à un accompagnement psycho-corporel plus global, ou peut se vivre comme une démarche en soi.",
    ],
    indications: ['Tensions chroniques','Douleurs','Suites de chocs','Fatigue profonde','Troubles du sommeil','Stress','Surcharge sensorielle','Récupération','Soutien au système nerveux'],
  },
];

const INDICATIONS = [
  { icon: Wind, title: 'Gestion du stress', text: "Réguler son système nerveux, apaiser anxiété chronique, tensions corporelles et émotionnelles." },
  { icon: Flower2, title: 'Libération des tensions', text: 'Se libérer des tensions physiques et émotionnelles pour retrouver un équilibre intérieur durable.' },
  { icon: Sparkles, title: 'Réalisation de Soi', text: 'Explorer son identité profonde pour mieux comprendre ses besoins, ses ressentis et ce qui nous anime.' },
  { icon: Compass, title: 'Accompagner les transitions', text: 'Soutien dans les phases de transition de vie : deuil, changement professionnel, séparation, nouveau cycle.' },
  { icon: ShieldCheck, title: 'Douleurs chroniques', text: 'Prévention et gestion des douleurs chroniques par la reconnexion corporelle et la libération des tensions.' },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-[#f5f4f8]">
      <SiteHeader />
      <PageHero kicker="L'espace individuel" title="Accompagnement" italic="psycho-corporel." subtitle="Un espace pour réguler le système nerveux, traverser ce qui demande à l'être, et laisser émerger une expression plus juste de Soi." />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionTitle kicker="L'approche" title="Une approche" italic="psycho-corporelle." />
          </div>
          <div className="lg:col-span-7 space-y-5 text-[#312e81]/75 leading-relaxed text-lg">
            <p>Mon accompagnement s&apos;appuie sur une approche psycho-corporelle — <span className="text-[#312e81] font-medium">point d&apos;entrée privilégié, qui reste fluide et intégrative.</span></p>
            <p>Elle prend en compte toutes les dimensions de l&apos;humain — psychologique, émotionnelle, physique et spirituelle — en favorisant la régulation du système nerveux, la reconnexion au corps, aux émotions, à l&apos;environnement et à la conscience, <span className="italic text-[#4338ca]">afin de soutenir l&apos;expression de l&apos;Être.</span></p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute -left-32 top-1/3 w-[400px] h-[400px] rounded-full bg-[#a78bfa]/15 blur-3xl -z-10" />
        <div className="container mx-auto px-6">
          <SectionTitle kicker="Les méthodes" title="Méthodes" italic="pratiquées." subtitle="Trois approches complémentaires, intégrées de manière fluide et adaptées à votre rythme." />
          <div className="grid md:grid-cols-3 gap-5">
            {METHODS.map((m) => (
              <article key={m.name} className="group glass rounded-3xl p-8 hover:glass-strong hover:-translate-y-1 transition-all duration-500">
                <div className="flex items-start justify-between mb-10">
                  <div className="w-14 h-14 rounded-2xl bg-[#4338ca]/12 flex items-center justify-center group-hover:bg-[#4338ca]/22 transition-colors">
                    <m.icon className="w-6 h-6 text-[#4338ca]" strokeWidth={1.4} />
                  </div>
                  <span className="font-serif text-5xl text-[#4338ca]/25 italic group-hover:text-[#4338ca]/45 transition-colors">{m.short}</span>
                </div>
                <h3 className="font-serif text-2xl text-[#312e81] mb-4 leading-tight">{m.name}</h3>
                <p className="text-[#312e81]/70 leading-relaxed text-[15px]">{m.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute -right-32 top-1/4 w-[500px] h-[500px] rounded-full bg-[#818cf8]/15 blur-3xl -z-10" />
        <div className="container mx-auto px-6">
          <SectionTitle kicker="Les orientations" title="Orientations" italic="d'accompagnement." subtitle="Trois axes complémentaires, conçus pour répondre à des besoins spécifiques tout en s'appuyant sur la même approche psycho-corporelle." />
          <div className="space-y-6">
            {ORIENTATIONS.map((o) => (
              <article key={o.title} className="group glass rounded-[2rem] overflow-hidden hover:glass-strong transition-all duration-500">
                <div className="p-8 md:p-10 lg:p-12">
                  <div className="flex items-start gap-6 mb-8">
                    <div className="w-16 h-16 rounded-2xl glass-indigo flex items-center justify-center shrink-0">
                      <o.icon className="w-7 h-7 text-[#4338ca]" strokeWidth={1.3} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-2xl md:text-3xl lg:text-[34px] text-[#312e81] leading-tight tracking-tight">{o.title}</h3>
                      <p className="mt-3 font-serif italic text-lg md:text-xl text-[#4338ca] leading-snug">{o.lead}</p>
                    </div>
                  </div>
                  <div className="space-y-4 text-[#312e81]/75 leading-relaxed">
                    {o.paragraphs.map((p, i) => (<p key={i}>{p}</p>))}
                  </div>
                  {o.personalNote && (
                    <div className="mt-7 glass-dark text-white rounded-2xl p-6 md:p-7 relative overflow-hidden">
                      <div className="absolute -right-16 -top-16 w-40 h-40 rounded-full bg-[#818cf8]/40 blur-2xl" />
                      <p className="text-[10px] uppercase tracking-[0.25em] text-white/65 mb-3 relative">Note personnelle</p>
                      <p className="font-serif italic text-base md:text-lg leading-snug relative">{o.personalNote}</p>
                    </div>
                  )}
                  <div className="mt-7 pt-6 border-t border-[#312e81]/10">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-[#312e81]/55 mb-4">Indications possibles</p>
                    <div className="flex flex-wrap gap-2">
                      {o.indications.map((t) => (
                        <span key={t} className="text-xs md:text-sm px-3.5 py-1.5 rounded-full glass-indigo text-[#312e81]">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <SectionTitle kicker="Pour qui ?" title="Les thèmes" italic="principaux." subtitle="Un espace pour celles et ceux qui sentent l'appel d'un changement profond — quelle qu'en soit la forme." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {INDICATIONS.map((ind, i) => (
              <div key={ind.title} className="group glass rounded-3xl p-8 hover:glass-strong transition-all duration-500">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#4338ca]/12 flex items-center justify-center group-hover:bg-[#4338ca]/22 transition-colors">
                    <ind.icon className="w-5 h-5 text-[#4338ca]" strokeWidth={1.4} />
                  </div>
                  <span className="font-serif text-sm text-[#312e81]/40">0{i + 1}</span>
                </div>
                <h3 className="font-serif text-2xl text-[#312e81] mb-3 leading-tight">{ind.title}</h3>
                <p className="text-[#312e81]/70 leading-relaxed text-[15px]">{ind.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#c7d2fe]/20 to-transparent -z-10" />
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.04] tracking-tight text-[#312e81]">
              Une <span className="italic font-light text-[#4338ca]">tarification</span> juste et accessible.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            <div className="glass-strong rounded-3xl p-10 md:p-12">
              <p className="text-xs uppercase tracking-widest text-[#312e81]/50 mb-5">Tarif standard</p>
              <div className="flex items-baseline gap-2 mb-2"><span className="font-serif text-7xl md:text-8xl text-[#312e81] font-light tracking-tight">130</span><span className="text-[#312e81]/60 text-xl">CHF</span></div>
              <p className="text-[#312e81]/60">par séance d&apos;1 heure</p>
              <div className="my-8 h-px bg-[#312e81]/10" />
              <ul className="space-y-3 text-[#312e81]/75 text-sm">
                <li className="flex gap-3"><Leaf className="w-4 h-4 text-[#4338ca] shrink-0 mt-0.5" strokeWidth={1.5} /> Séance individuelle de 60 minutes</li>
                <li className="flex gap-3"><Leaf className="w-4 h-4 text-[#4338ca] shrink-0 mt-0.5" strokeWidth={1.5} /> Approche personnalisée et adaptée</li>
                <li className="flex gap-3"><Leaf className="w-4 h-4 text-[#4338ca] shrink-0 mt-0.5" strokeWidth={1.5} /> Cadre sécurisant et bienveillant</li>
              </ul>
            </div>
            <div className="relative overflow-hidden glass-dark text-white p-10 md:p-12 rounded-3xl">
              <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-[#818cf8]/45 blur-3xl" />
              <p className="text-xs uppercase tracking-widest text-white/55 mb-5 relative">Tarif solidaire</p>
              <div className="flex items-baseline gap-2 mb-2 relative"><span className="font-serif text-7xl md:text-8xl font-light tracking-tight">80</span><span className="text-white/60 text-xl">CHF</span></div>
              <p className="text-white/60 relative">pour les personnes en difficulté financière</p>
              <div className="my-8 h-px bg-white/15 relative" />
              <p className="text-white/85 leading-relaxed text-[15px] relative">L&apos;accompagnement doit rester accessible. Si le tarif standard représente un obstacle, parlons-en simplement en amont — sans justification nécessaire.</p>
            </div>
          </div>
        </div>
      </section>

      <CTASection title="Réserver un premier rendez-vous." subtitle="Un échange pour faire connaissance et voir si cet accompagnement répond à ce qui se cherche en vous." buttonLabel="Écrire un message" />
      <SiteFooter />
    </main>
  );
}
