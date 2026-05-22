import SiteHeader from '@/components/site/SiteHeader';
import SiteFooter from '@/components/site/SiteFooter';
import { PageHero, SectionTitle, CTASection, TagList } from '@/components/site/Shared';
import { Heart, Sparkles, Compass, Leaf, Brain, HandHeart } from 'lucide-react';

export const metadata = {
  title: "Accompagnement individuel",
  description: "Un espace pour réguler le système nerveux, retrouver son axe et laisser émerger son expression authentique.",
};

const SUPPORTS = [
  'la régulation du stress',
  'la reconnexion au corps',
  'la reconstruction d\u2019un sentiment de sécurité intérieure',
  'l\u2019expression de soi',
  'l\u2019intégration de la sensibilité',
  'la créativité',
  'la neurodivergence',
  'les périodes de transition',
  'le besoin de retrouver son axe',
  'la sensation de ne pas trouver sa place dans les cadres classiques',
];

const POUR_QUI = [
  'Se sentir très sensible ou atypique',
  'Mieux comprendre son système nerveux',
  'Vouloir créer mais se sentir bloqué',
  'Retrouver du lien avec son corps',
  'Traverser une transition intérieure ou professionnelle',
  'Sentir un appel à exprimer quelque chose de plus profond',
  'Ne pas se reconnaître dans les approches trop mentales',
];

const APPROCHE = [
  { icon: Leaf, label: 'Écoute corporelle' },
  { icon: HandHeart, label: 'Régulation du système nerveux' },
  { icon: Heart, label: 'Exploration des ressentis' },
  { icon: Sparkles, label: 'Créativité & écriture' },
  { icon: Compass, label: 'Mouvement doux' },
  { icon: Brain, label: 'Profils neurodivergents' },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-[#f5efe4]">
      <SiteHeader />
      <PageHero
        kicker="L'espace individuel"
        title="Accompagnement"
        italic="individuel."
        subtitle="Un espace pour réguler le système nerveux, retrouver son axe et laisser émerger son expression authentique."
      />

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7 space-y-5 text-[#28201a]/75 leading-relaxed text-lg">
            <p>L&apos;accompagnement individuel s&apos;adresse aux personnes qui ressentent le besoin de revenir à elles-mêmes, de retrouver de la sécurité intérieure, de mieux comprendre leur fonctionnement et de libérer une expression plus profonde de leur être.</p>
            <p>L&apos;approche est <span className="text-[#28201a] font-medium">corporelle, sensible, créative et intégrative</span>. Elle s&apos;appuie sur l&apos;écoute du système nerveux, la présence au corps, la conscience des ressentis, le mouvement intérieur et l&apos;émergence créative.</p>
          </div>
          <aside className="lg:col-span-5">
            <div className="bg-[#1d2a3f] text-[#f5efe4] rounded-3xl p-7 md:p-9 relative overflow-hidden">
              <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-[#5e7a5e]/30 blur-3xl" />
              <p className="text-xs uppercase tracking-widest text-[#f5efe4]/55 mb-4 relative">Note importante</p>
              <p className="text-[#f5efe4]/90 leading-relaxed relative">
                Cet accompagnement est un <span className="italic">espace de soutien, de coaching somatique et créatif</span>. Il ne se substitue pas à un suivi médical ou à une psychothérapie clinique.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#eae2d0]">
        <div className="container mx-auto px-6">
          <SectionTitle kicker="L'accompagnement peut soutenir" title="Ce qui peut se" italic="déplier ici." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SUPPORTS.map((s, i) => (
              <div key={s} className="bg-[#fbf8f1] rounded-2xl p-5 border border-[#28201a]/8 flex items-start gap-4">
                <span className="font-serif text-[#1d2a3f]/60 text-sm shrink-0 mt-0.5">0{i + 1}</span>
                <p className="text-[#28201a]/85 leading-snug">{s.charAt(0).toUpperCase() + s.slice(1)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <SectionTitle kicker="Pour qui ?" title="Cet espace peut" italic="vous parler si…" />
          </div>
          <div className="lg:col-span-7">
            <ul className="space-y-3">
              {POUR_QUI.map((p, i) => (
                <li key={p} className="flex gap-4 items-start pb-3 border-b border-[#28201a]/10">
                  <span className="font-serif italic text-[#1d2a3f] text-sm shrink-0 mt-1">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-[#28201a]/85 leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-[#eae2d0]">
        <div className="container mx-auto px-6">
          <SectionTitle
            kicker="L'approche"
            title="Somatique,"
            italic="créative et consciente."
            subtitle="L'accompagnement ne cherche pas à forcer un changement. Il invite plutôt à créer les conditions pour que le corps retrouve de la sécurité, que l'être puisse s'exprimer et que le mouvement juste puisse émerger."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {APPROCHE.map((a) => (
              <div key={a.label} className="bg-[#fbf8f1] rounded-2xl p-6 border border-[#28201a]/8 flex items-center gap-4 hover:border-[#1d2a3f]/40 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-[#1d2a3f]/8 flex items-center justify-center">
                  <a.icon className="w-5 h-5 text-[#1d2a3f]" strokeWidth={1.4} />
                </div>
                <span className="font-serif text-lg text-[#28201a]">{a.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Prendre contact pour un accompagnement individuel."
        subtitle="L'échange peut commencer simplement, à partir de là où vous en êtes."
        buttonLabel="Écrire un message"
      />
      <SiteFooter />
    </main>
  );
}
