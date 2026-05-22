import SiteHeader from '@/components/site/SiteHeader';
import SiteFooter from '@/components/site/SiteFooter';
import { PageHero, CTASection } from '@/components/site/Shared';

export const metadata = {
  title: 'Créations',
  description: "Un espace où mes explorations prennent forme à travers les textes, les objets, les images, les projets et les matières.",
};

const CATEGORIES = [
  { name: 'Textes', img: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=85&w=900' },
  { name: 'Objets', img: 'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?auto=format&fit=crop&q=85&w=900' },
  { name: 'Projets artistiques', img: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&q=85&w=900' },
  { name: 'Explorations numériques', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=85&w=900' },
  { name: 'Matière & formes', img: 'https://images.unsplash.com/photo-1502691876148-a84978e59af8?auto=format&fit=crop&q=85&w=900' },
  { name: 'Processus créatifs', img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=85&w=900' },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-[#f5efe4]">
      <SiteHeader />
      <PageHero
        kicker="Univers créatif"
        title="Créations"
        italic="& explorations."
        subtitle="Un espace où mes explorations prennent forme à travers les textes, les objets, les images, les projets et les matières."
      />

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-10 lg:gap-16 text-[#28201a]/75 leading-relaxed text-lg">
          <p>La création est au cœur d&apos;Asthia Horizon. Elle n&apos;est pas seulement une production extérieure, mais une <span className="text-[#28201a] font-medium">manière d&apos;entrer en relation</span> avec le vivant, avec la conscience, avec la matière et avec l&apos;être.</p>
          <p>Cet espace présente mes créations personnelles. La création est ici envisagée comme un <span className="italic text-[#1d2a3f]">chemin d&apos;incarnation</span> — une manière de rendre visible l&apos;invisible, de donner forme à ce qui traverse le corps, la conscience et l&apos;imaginaire.</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#eae2d0]">
        <div className="container mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CATEGORIES.map((c) => (
              <article key={c.name} className="group relative overflow-hidden rounded-3xl bg-[#fbf8f1] border border-[#28201a]/8 hover:border-[#1d2a3f]/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={c.img} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1500ms]" />
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase tracking-widest text-[#28201a]/50 mb-2">Catégorie</p>
                  <h3 className="font-serif text-2xl text-[#28201a] leading-tight">{c.name}</h3>
                  <p className="mt-3 text-sm text-[#28201a]/60 italic">À venir prochainement.</p>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-12 text-center font-serif italic text-xl text-[#28201a]/65 max-w-2xl mx-auto">
            Les premières créations seront publiées ici progressivement, au rythme de l&apos;émergence.
          </p>
        </div>
      </section>

      <CTASection
        title="Curieux de suivre ces explorations ?"
        subtitle="Écrivez-moi pour être tenu au courant des nouvelles créations et publications."
        buttonLabel="Rester en lien"
      />
      <SiteFooter />
    </main>
  );
}
