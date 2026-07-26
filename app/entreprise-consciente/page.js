import SiteHeader from '@/components/site/SiteHeader';
import SiteFooter from '@/components/site/SiteFooter';
import { PageHero, CTASection } from '@/components/site/Shared';
import { Leaf, Sparkles, Compass, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Entreprise consciente',
  description: "Une manière d'entreprendre en lien avec le vivant, la conscience et la régulation — au croisement de la structure et de la sensibilité.",
};

const PILLARS = [
  {
    icon: Leaf,
    title: 'Le vivant comme partenaire',
    text: "L'entreprise est envisagée comme un écosystème. Elle évolue en interaction constante avec les personnes qui la composent, les rythmes naturels et les contextes qu'elle traverse. Le vivant n'est pas un décor ni une ressource : il est reconnu comme un élément structurant, qui influence les choix, les cadences et les formes de développement.",
  },
  {
    icon: Sparkles,
    title: 'La conscience comme qualité d\u2019attention',
    text: "La conscience se manifeste à travers une attention portée à la manière de faire, mais aussi à la manière d'être. Les décisions ne sont pas seulement guidées par des objectifs économiques, mais par une lecture globale des situations — humaine, sociale, environnementale. Cette qualité de présence permet des ajustements fins et une plus grande cohérence entre intentions, actions et résultats.",
  },
  {
    icon: ShieldCheck,
    title: 'La régulation comme socle',
    text: "Une entreprise ne peut être durable si elle se construit au détriment des personnes qui la font vivre. Le respect des rythmes, des capacités et des limites humaines est central. Le cadre de travail est pensé pour offrir sécurité et souplesse, afin de soutenir la stabilité, la créativité et l'engagement sur le long terme.",
  },
  {
    icon: Compass,
    title: 'Une démarche progressive et ajustée',
    text: "Les projets prennent forme de manière itérative : expérimentation, observation, ajustement. Les erreurs et les temps de pause ne sont pas des freins à la performance mais des éléments normaux du développement. On cherche à faire émerger la forme juste, plutôt qu'à forcer un plan préétabli.",
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />
      <PageHero
        title="Entreprise consciente"
        subtitle="Une manière d'entreprendre en lien avec le vivant, la conscience et la régulation. Ni un modèle, ni une méthode — plutôt une posture."
      />

      {/* INTRO */}
      <section className="pb-12 md:pb-20">
        <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-7 space-y-5 text-[#312e81]/78 leading-relaxed text-[17px]">
            <p>
              L&apos;entrepreneuriat conscient, tel qu&apos;il est envisagé ici, est une manière de créer et de développer des
              projets en lien étroit avec le <span className="text-[#312e81] font-medium">vivant</span>, la{' '}
              <span className="text-[#312e81] font-medium">conscience</span> et la{' '}
              <span className="text-[#312e81] font-medium">régulation</span>. Il ne s&apos;agit pas seulement de produire ou de
              croître, mais de construire des activités capables de s&apos;inscrire durablement dans les rythmes humains et
              naturels.
            </p>
            <p>
              Cette approche peut s&apos;appliquer à des domaines très variés. Elle ne définit pas un type d&apos;activité
              spécifique, mais une manière d&apos;entreprendre — attentive, incarnée, et fondée sur des principes de régulation.
              L&apos;entreprise devient alors un espace d&apos;apprentissage, de création et de coopération, capable de générer
              une valeur à la fois économique, humaine et durable.
            </p>
          </div>
          <aside className="lg:col-span-5">
            <div className="surface-strong rounded-3xl p-7">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#312e81]/55 mb-4">
                En quelques mots
              </p>
              <p className="font-serif italic text-xl text-[#4338ca] leading-snug">
                Une approche écosystémique de l&apos;entreprise, qui reconnaît le vivant comme partenaire, la conscience
                comme qualité d&apos;attention, et la régulation comme condition essentielle à toute construction durable.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* 4 PILLARS */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.04] tracking-tight text-[#312e81] max-w-3xl mb-12 md:mb-16">
            Les quatre piliers
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {PILLARS.map((p, i) => (
              <article key={p.title} className="surface rounded-3xl p-7 md:p-8 flex flex-col">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#eef0fb] flex items-center justify-center">
                    <p.icon className="w-5 h-5 text-[#4338ca]" strokeWidth={1.5} />
                  </div>
                  <span className="font-serif italic text-[#4338ca]/40 text-2xl">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="font-serif text-xl md:text-[22px] text-[#312e81] leading-tight mb-3">{p.title}</h3>
                <p className="text-[#312e81]/70 leading-relaxed text-[15px]">{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* IMPLEMENTATION */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.04] tracking-tight text-[#312e81]">
                Comment cela prend forme
              </h2>
              <p className="mt-6 text-[#312e81]/70 leading-relaxed text-lg">
                L&apos;implémentation ne se limite pas à mettre en place des projets ou des systèmes. Elle commence par la
                capacité à <span className="text-[#312e81] font-medium">identifier, accueillir et canaliser un élan
                de création</span> — puis à lui donner une forme concrète, cohérente et durable.
              </p>
            </div>

            <div className="lg:col-span-7 space-y-5 text-[#312e81]/78 leading-relaxed text-[17px]">
              <p>
                Chaque initiative est envisagée comme le résultat d&apos;un mouvement vivant, qui demande à être reconnu,
                structuré et accompagné. Le travail consiste à créer les conditions nécessaires pour que cet élan puisse
                se traduire en actions concrètes, sans perdre sa cohérence ni son sens. Il ne s&apos;agit pas de forcer les
                projets, mais de leur offrir un cadre suffisamment clair et régulé pour qu&apos;ils puissent se déployer.
              </p>
              <p>
                L&apos;approche vise à relier l&apos;intention à la matière. Les idées ne sont pas traitées comme des concepts
                abstraits, mais comme des processus à incarner progressivement, en tenant compte du contexte, des
                ressources disponibles et des rythmes humains. Les projets s&apos;inscrivent dans une logique de respect du
                vivant, qu&apos;ils soient technologiques, créatifs ou orientés vers l&apos;accompagnement.
              </p>
              <p>
                L&apos;entreprise fonctionne comme un espace d&apos;expérimentation. Les projets peuvent y être testés, ajustés
                et affinés avant de prendre une forme plus stable. Cette manière de procéder permet de préserver la
                fluidité du processus tout en assurant une mise en œuvre concrète et fonctionnelle. Le cadre est pensé
                pour offrir sécurité, clarté et souplesse — tant pour les personnes impliquées que pour les projets
                eux-mêmes.
              </p>
              <p>
                Une importance particulière est également accordée à la <span className="text-[#312e81] font-medium">
                transmission de cette manière de travailler</span>. L&apos;objectif n&apos;est pas de produire des projets
                isolés, mais de développer des approches reproductibles, capables d&apos;être comprises et adaptées par
                d&apos;autres contextes. Cette reproductibilité ne cherche pas à standardiser, mais à proposer des repères
                permettant de concilier structure, conscience et respect du vivant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="surface-strong rounded-[2.5rem] p-10 md:p-16 max-w-4xl mx-auto text-center">
            <p className="font-serif italic text-2xl md:text-3xl text-[#312e81] leading-snug">
              Une entreprise ancrée dans le réel, capable de s&apos;inscrire dans la durée — en lien avec le vivant, la
              conscience, et des formes d&apos;innovation adaptées aux enjeux actuels.
            </p>
          </div>
        </div>
      </section>

      {/* ASTHIA HORIZON */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-6">
          <div className="surface rounded-3xl p-8 md:p-10 max-w-4xl mx-auto">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#312e81]/55 mb-3">
              Entité porteuse
            </p>
            <h3 className="font-serif text-2xl md:text-[28px] text-[#312e81] leading-tight mb-4">
              Asthia Horizon Sàrl
            </h3>
            <p className="text-[#312e81]/75 leading-relaxed text-[16px]">
              Les activités de l&apos;Atelier Kairos sont portées par la société{' '}
              <span className="text-[#312e81] font-medium">Asthia Horizon Sàrl</span>, qui s&apos;engage à respecter et à
              incarner l&apos;ensemble des principes de cette charte — vivant, conscience, régulation et démarche progressive
              — dans tous les projets qu&apos;elle soutient et développe.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        title="Discuter d'un projet"
        subtitle="Pour un accompagnement d'entreprise, une intervention en organisation ou un projet créatif — parlons-en simplement."
        buttonLabel="Prendre contact"
      />
      <SiteFooter />
    </main>
  );
}
