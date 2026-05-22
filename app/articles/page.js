import SiteHeader from '@/components/site/SiteHeader';
import SiteFooter from '@/components/site/SiteFooter';
import { PageHero, CTASection } from '@/components/site/Shared';

export const metadata = {
  title: 'Articles',
  description: "Réflexions autour du corps, de la conscience, de la créativité, du système nerveux et de la neurodivergence.",
};

const THEMES = [
  'Système nerveux et créativité',
  'Régulation somatique',
  'Neurodivergence et expression de soi',
  'Conscience multidimensionnelle et incarnation',
  'Créer depuis le corps',
  'Sortir de la performance',
  'Sensibilité et entreprise',
  'Créativité et sécurité intérieure',
  'Spiritualité incarnée',
  'L\u2019être comme source de création',
];

export default function Page() {
  return (
    <main className="min-h-screen bg-[#f5efe4]">
      <SiteHeader />
      <PageHero
        kicker="Espace de transmission"
        title="Articles"
        italic="& réflexions."
        subtitle="Réflexions autour du corps, de la conscience, de la créativité, du système nerveux et de la neurodivergence."
      />

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6 max-w-3xl text-[#28201a]/75 leading-relaxed text-lg space-y-5">
          <p>Les articles sont un espace de transmission, d&apos;exploration et de mise en mots. Ils permettent de partager des réflexions, des expériences et des liens entre différents mondes :</p>
          <p className="italic text-[#1d2a3f]">le corps, la conscience, la créativité, la neurodivergence, l&apos;entreprise, la spiritualité incarnée et la régulation du système nerveux.</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#eae2d0]">
        <div className="container mx-auto px-6">
          <p className="uppercase tracking-[0.3em] text-xs text-[#28201a]/55 mb-5">Thèmes à venir</p>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight tracking-tight mb-12">
            Dix explorations <span className="italic font-light text-[#1d2a3f]">en chemin.</span>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {THEMES.map((t, i) => (
              <article key={t} className="group bg-[#fbf8f1] rounded-3xl p-7 border border-[#28201a]/8 hover:border-[#1d2a3f]/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-500">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-serif italic text-sm text-[#1d2a3f]/60">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-xs uppercase tracking-widest text-[#28201a]/40">À venir</span>
                </div>
                <h3 className="font-serif text-xl md:text-2xl text-[#28201a] leading-tight">{t}</h3>
              </article>
            ))}
          </div>

          <p className="mt-12 text-center font-serif italic text-xl text-[#28201a]/65 max-w-2xl mx-auto">
            Les premiers articles seront publiés ici progressivement.
          </p>
        </div>
      </section>

      <CTASection
        title="Être averti des prochaines publications."
        subtitle="Écrivez-moi pour rester en lien et recevoir les nouveaux articles dès leur parution."
        buttonLabel="Me contacter"
      />
      <SiteFooter />
    </main>
  );
}
