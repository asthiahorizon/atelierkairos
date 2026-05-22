import SiteHeader from '@/components/site/SiteHeader';
import SiteFooter from '@/components/site/SiteFooter';
import { PageHero, SectionTitle, CTASection } from '@/components/site/Shared';

export const metadata = {
  title: 'Ateliers & cercles',
  description: "Des espaces collectifs pour ressentir, réguler, créer et partager depuis un lieu plus authentique.",
};

const THEMES = [
  'Régulation du système nerveux',
  'Corps et créativité',
  'Expression de l\u2019être',
  'Neurodivergence et sensibilité',
  'Écriture intuitive',
  'Mouvement doux',
  'Présence corporelle',
  'Créativité incarnée',
  'Retrouver son axe',
  'Créer depuis la sécurité intérieure',
];

const IMG = 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=85&w=1600';

export default function Page() {
  return (
    <main className="min-h-screen bg-[#f5efe4]">
      <SiteHeader />
      <PageHero
        kicker="Espaces collectifs"
        title="Ateliers"
        italic="& cercles."
        subtitle="Des espaces collectifs pour ressentir, réguler, créer et partager depuis un lieu plus authentique."
      />

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-5 text-[#28201a]/75 leading-relaxed text-lg">
            <p>Les ateliers et cercles proposés par Asthia Horizon sont des espaces d&apos;exploration collective autour du corps, de la créativité, de la conscience et de l&apos;expression de l&apos;être.</p>
            <p>Ils peuvent prendre la forme de <span className="text-[#28201a] font-medium">rencontres ponctuelles, de cycles thématiques ou de cercles réguliers</span>.</p>
          </div>
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-3 rounded-[2rem] bg-[#5e7a5e]/15 -z-10 rotate-2" />
              <div className="overflow-hidden rounded-[1.75rem] shadow-xl shadow-[#28201a]/15">
                <img src={IMG} alt="Ateliers et cercles" className="w-full h-[420px] object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#eae2d0]">
        <div className="container mx-auto px-6">
          <SectionTitle kicker="Thèmes possibles" title="Dix portes" italic="d'exploration." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {THEMES.map((t, i) => (
              <div key={t} className="bg-[#fbf8f1] rounded-2xl p-5 border border-[#28201a]/8 hover:border-[#1d2a3f]/40 transition-colors">
                <span className="font-serif italic text-sm text-[#1d2a3f]/60 block mb-2">{String(i + 1).padStart(2, '0')}</span>
                <p className="font-serif text-base text-[#28201a] leading-tight">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <SectionTitle kicker="Un cadre" title="Doux, clair" italic="et sécurisant." />
          </div>
          <div className="lg:col-span-6 text-[#28201a]/75 leading-relaxed text-lg space-y-5">
            <p>Chaque atelier propose un cadre simple, respectueux et progressif. L&apos;objectif n&apos;est pas de performer, de réussir ou de produire quelque chose à tout prix.</p>
            <p>Il s&apos;agit plutôt d&apos;ouvrir un espace où le corps peut respirer, où la parole peut émerger, où la créativité peut circuler, et où chacun peut <span className="italic text-[#1d2a3f]">se rencontrer à son rythme</span>.</p>
          </div>
        </div>
      </section>

      <CTASection
        title="Connaître les prochains ateliers."
        subtitle="Écrivez-moi pour être tenu au courant du programme et des cercles à venir."
        buttonLabel="Me contacter"
      />
      <SiteFooter />
    </main>
  );
}
