import SiteHeader from '@/components/site/SiteHeader';
import SiteFooter from '@/components/site/SiteFooter';
import { PageHero, CTASection } from '@/components/site/Shared';
import { Users, Sparkles, HeartHandshake, ArrowUpRight } from 'lucide-react';

export const metadata = {
  title: 'Communauté',
  description: "Les groupes Meetup soutenus par l'Atelier Kairos — Neurodiversité, Génération consciente et Épilepsie en Valais.",
};

const MEETUPS = [
  {
    icon: Sparkles,
    title: 'Neurodiversité Valais',
    tagline: 'Un espace pour les profils atypiques',
    description:
      "Un groupe pour se retrouver, échanger et se sentir compris entre personnes concernées par la neurodivergence — autisme, TDAH, HPI, dys, syndromes rares — et leurs proches. Rencontres, discussions, activités partagées, dans une ambiance respectueuse des rythmes et sensibilités de chacun.",
    url: 'https://www.meetup.com/fr-FR/neurodiversite-valais/',
  },
  {
    icon: HeartHandshake,
    title: 'Génération consciente Valais',
    tagline: 'Se relier, s\u2019éveiller, agir ensemble',
    description:
      "Un espace d'échange, de partage et d'expérimentation pour celles et ceux qui souhaitent explorer une manière de vivre plus consciente — au croisement de la spiritualité, du bien-être, de l'écologie et du lien humain. Cercles de parole, ateliers, rencontres, sorties.",
    url: 'https://www.meetup.com/fr-FR/generation-consciente-valais/',
  },
  {
    icon: Users,
    title: 'Épilepsie Valais',
    tagline: 'Se rencontrer, se soutenir, se comprendre',
    description:
      "Un groupe dédié aux personnes vivant avec une épilepsie, à leurs proches, et à toute personne concernée de près ou de loin. Un espace pour rompre l'isolement, partager les expériences, faire circuler l'information et se sentir entouré — dans la simplicité et la bienveillance.",
    url: 'https://www.meetup.com/fr-FR/epilepsie-valais/',
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />
      <PageHero
        title="Communauté"
        subtitle="Trois groupes Meetup soutenus par l'Atelier Kairos — pour se relier, se rencontrer et transmettre autour de la neurodiversité, de la conscience et de l'épilepsie, en Valais."
      />

      <section className="pb-12 md:pb-16">
        <div className="container mx-auto px-6 max-w-3xl text-[#312e81]/75 leading-relaxed text-lg space-y-5">
          <p>
            Transmettre, pour moi, c&apos;est aussi tenir des espaces de rencontre où chacun peut se sentir accueilli dans sa
            singularité. Ces trois groupes Meetup sont des lieux ouverts, gratuits, où l&apos;on peut simplement venir se
            relier — sans engagement, sans attente, avec ce que l&apos;on est.
          </p>
          <p>
            Ils sont animés dans un esprit de{' '}
            <span className="text-[#312e81] font-medium">simplicité, de respect et de régulation</span>, et complètent
            l&apos;accompagnement individuel par une dimension collective essentielle.
          </p>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-5">
            {MEETUPS.map((m) => (
              <a
                key={m.url}
                href={m.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group surface rounded-3xl p-7 md:p-8 hover:surface-strong hover:-translate-y-1 transition-all duration-500 flex flex-col"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#eef0fb] flex items-center justify-center">
                    <m.icon className="w-5 h-5 text-[#4338ca]" strokeWidth={1.5} />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#4338ca]/40 group-hover:text-[#4338ca] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <h3 className="font-serif text-xl md:text-[22px] text-[#312e81] leading-tight mb-2 group-hover:text-[#4338ca] transition-colors">
                  {m.title}
                </h3>
                <p className="text-[13px] italic text-[#4338ca]/80 mb-4">{m.tagline}</p>
                <p className="text-[#312e81]/70 leading-relaxed text-[15px] flex-1">{m.description}</p>
                <div className="mt-6 pt-5 border-t border-[#312e81]/10 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#312e81]/55">
                    Meetup.com
                  </span>
                  <span className="text-[12px] text-[#4338ca] font-medium">Rejoindre le groupe</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Organiser une rencontre"
        subtitle="Vous souhaitez proposer un thème, animer un cercle, co-organiser un événement ? Écrivez-moi, tout est possible."
        buttonLabel="Prendre contact"
      />
      <SiteFooter />
    </main>
  );
}
