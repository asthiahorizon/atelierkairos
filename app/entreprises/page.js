import SiteHeader from '@/components/site/SiteHeader';
import SiteFooter from '@/components/site/SiteFooter';
import { PageHero, SectionTitle, CTASection } from '@/components/site/Shared';
import { Brain, Sparkles, Wind, Users, Lightbulb, Check } from 'lucide-react';

export const metadata = {
  title: 'Entreprises, créativité et neurodivergence',
  description: "Accompagner les organisations à intégrer le corps, la créativité et la diversité des fonctionnements comme ressources vivantes.",
};

const AXES = [
  { icon: Brain, num: '01', title: 'Neurodivergence en entreprise', text: 'Comprendre les fonctionnements atypiques, adapter les environnements, valoriser les forces créatives et cognitives.' },
  { icon: Sparkles, num: '02', title: 'Créativité corporelle', text: 'Utiliser le corps, le mouvement et la présence comme portes d\u2019accès à l\u2019innovation et à l\u2019intelligence collective.' },
  { icon: Wind, num: '03', title: 'Régulation du système nerveux', text: 'Reconnaître les états de stress, surcharge, figement ou dispersion — et développer des ressources concrètes de régulation.' },
  { icon: Users, num: '04', title: 'Ateliers d’équipe', text: 'Créer des espaces d\u2019expérimentation, de respiration et de transformation collective.' },
  { icon: Lightbulb, num: '05', title: 'Projets créatifs', text: 'Soutenir les équipes dans l\u2019émergence, la clarification et la matérialisation d\u2019idées nouvelles.' },
];

const BENEFITS = [
  'Mieux comprendre la neurodivergence',
  'Soutenir la créativité des équipes',
  'Réduire la surcharge mentale',
  'Intégrer des pratiques corporelles simples',
  'Favoriser l\u2019innovation sensible',
  'Développer une culture plus humaine',
  'Accompagner les profils atypiques',
  'Ouvrir des espaces d\u2019expression et de collaboration',
];

export default function Page() {
  return (
    <main className="min-h-screen bg-[#f5efe4]">
      <SiteHeader />
      <PageHero
        kicker="Pour les organisations"
        title="Entreprises,"
        italic="créativité et neurodivergence."
        subtitle="Accompagner les organisations à intégrer le corps, la créativité et la diversité des fonctionnements comme ressources vivantes."
      />

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-10 lg:gap-16">
          <p className="text-[#28201a]/75 leading-relaxed text-lg">
            Asthia Horizon propose des accompagnements pour les entreprises, équipes et organisations qui souhaitent développer une <span className="text-[#28201a] font-medium">culture plus sensible, créative et inclusive</span>. L&apos;approche relie la régulation du système nerveux, la créativité corporelle, la neurodivergence et l&apos;intelligence collective.
          </p>
          <p className="text-[#28201a]/75 leading-relaxed text-lg">
            Dans les environnements professionnels, beaucoup de tensions viennent d&apos;un excès de mental, de pression, de vitesse et de déconnexion corporelle. Revenir au corps permet d&apos;ouvrir d&apos;autres formes de présence, de collaboration, d&apos;innovation et de clarté.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#eae2d0]">
        <div className="container mx-auto px-6">
          <SectionTitle kicker="Axes d'intervention" title="Cinq angles" italic="pour transformer." />
          <div className="space-y-5">
            {AXES.map((a) => (
              <article key={a.title} className="group bg-[#fbf8f1] rounded-3xl p-7 md:p-9 border border-[#28201a]/8 hover:border-[#1d2a3f]/40 hover:shadow-lg transition-all">
                <div className="grid md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-1 flex items-center gap-3">
                    <span className="font-serif italic text-3xl text-[#1d2a3f]/50">{a.num}</span>
                  </div>
                  <div className="md:col-span-1">
                    <div className="w-12 h-12 rounded-2xl bg-[#1d2a3f]/8 flex items-center justify-center group-hover:bg-[#1d2a3f]/15 transition-colors">
                      <a.icon className="w-5 h-5 text-[#1d2a3f]" strokeWidth={1.4} />
                    </div>
                  </div>
                  <div className="md:col-span-4">
                    <h3 className="font-serif text-xl md:text-2xl text-[#28201a] leading-tight">{a.title}</h3>
                  </div>
                  <div className="md:col-span-6">
                    <p className="text-[#28201a]/70 leading-relaxed">{a.text}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <SectionTitle kicker="Pour les entreprises qui souhaitent" title="Ouvrir un autre" italic="rapport au travail." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {BENEFITS.map((b) => (
              <div key={b} className="bg-[#fbf8f1] rounded-2xl p-5 border border-[#28201a]/8 flex items-start gap-3">
                <Check className="w-4 h-4 text-[#5e7a5e] shrink-0 mt-1" strokeWidth={2} />
                <span className="text-[#28201a]/85 text-[15px] leading-snug">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Discuter d'une intervention en entreprise."
        subtitle="Démarrons par un échange pour cerner les besoins de votre équipe et imaginer une proposition sur-mesure."
        buttonLabel="Prendre contact"
      />
      <SiteFooter />
    </main>
  );
}
