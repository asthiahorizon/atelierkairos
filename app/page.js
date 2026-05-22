import Link from 'next/link';
import SiteHeader from '@/components/site/SiteHeader';
import SiteFooter from '@/components/site/SiteFooter';
import { CTASection } from '@/components/site/Shared';
import { ArrowRight, ArrowUpRight, Heart, Briefcase, Users, Palette, Sparkles, Compass, Brain, Leaf } from 'lucide-react';

const HERO_IMG = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=85&w=1600';
const MANIFESTO_IMG = 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&q=85&w=1600';

const CARDS = [
  { icon: Heart, href: '/accompagnement-individuel', title: 'Accompagnement individuel', text: "Régulation du système nerveux, retour au corps, expression de soi et créativité incarnée." },
  { icon: Briefcase, href: '/entreprises', title: 'Entreprises & neurodivergence', text: "Approches corporelles, créativité, intelligence sensible et accompagnement des profils neurodivergents." },
  { icon: Users, href: '/ateliers-cercles', title: 'Ateliers & cercles', text: "Espaces collectifs d'exploration, de présence, de régulation et de création." },
  { icon: Palette, href: '/creations', title: 'Créations & articles', text: "Textes, œuvres, explorations et partages autour du corps, de la conscience et de la créativité." },
];

const PILLARS = [
  { icon: Leaf, label: 'Corps' },
  { icon: Brain, label: 'Conscience' },
  { icon: Sparkles, label: 'Créativité' },
  { icon: Compass, label: 'Neurodivergence' },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f5efe4]">
      <SiteHeader />

      {/* HERO */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#eae2d0] via-[#f5efe4] to-[#f5efe4] -z-10" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#5e7a5e]/12 rounded-full blur-3xl -z-10 animate-breathe" />
        <div className="absolute top-60 -left-40 w-[500px] h-[500px] bg-[#1d2a3f]/8 rounded-full blur-3xl -z-10" />

        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7 animate-fade-up opacity-0" style={{ animationDelay: '0.15s' }}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#28201a]/5 border border-[#28201a]/10 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5e7a5e] animate-pulse" />
                <span className="text-xs tracking-wider uppercase text-[#28201a]/70">Espace d&apos;accompagnement, de création et de transmission</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.04] tracking-tight text-[#28201a]">
                Réguler le <span className="italic text-[#5e7a5e]">système nerveux,</span><br />
                libérer l&apos;<span className="italic text-[#1d2a3f]">expression de l&apos;être,</span><br />
                créer depuis une conscience <span className="italic text-[#1d2a3f]">plus vaste.</span>
              </h1>

              <p className="mt-8 max-w-xl text-base md:text-lg text-[#28201a]/70 leading-relaxed">
                Asthia Horizon est un espace d&apos;accompagnement, de création et de transmission autour du corps, de la conscience, de la créativité et de la neurodivergence.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link href="/accompagnement-individuel" className="px-7 py-4 bg-[#1d2a3f] text-[#f5efe4] rounded-full text-sm hover:bg-[#28201a] transition-all flex items-center gap-2 group">
                  Découvrir les accompagnements
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/creations" className="px-7 py-4 text-sm text-[#28201a] hover:text-[#1d2a3f] transition-colors flex items-center gap-2 underline-offset-4 hover:underline">
                  Explorer l&apos;univers
                </Link>
              </div>

              <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4">
                {PILLARS.map((p, i) => (
                  <div key={p.label} className="flex items-center gap-3">
                    <p.icon className="w-4 h-4 text-[#5e7a5e]" strokeWidth={1.4} />
                    <span className="font-serif text-base text-[#28201a]">{p.label}</span>
                    {i < PILLARS.length - 1 && <span className="w-1 h-1 rounded-full bg-[#28201a]/20 ml-5" />}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 animate-fade-up opacity-0" style={{ animationDelay: '0.4s' }}>
              <div className="relative">
                <div className="absolute -inset-3 rounded-[2.5rem] bg-[#5e7a5e]/15 -z-10 rotate-2" />
                <div className="overflow-hidden rounded-[2rem] shadow-2xl shadow-[#28201a]/20">
                  <img src={HERO_IMG} alt="Asthia Horizon" className="w-full h-[480px] md:h-[580px] object-cover animate-slow-zoom" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-[#f5efe4] rounded-2xl p-5 shadow-xl shadow-[#28201a]/10 max-w-[260px] border border-[#28201a]/5">
                  <p className="font-serif italic text-[#28201a] text-lg leading-tight">
                    « Créer depuis l&apos;être, pas depuis la pression. »
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-widest text-[#28201a]/50">Asthia Horizon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <p className="uppercase tracking-[0.3em] text-xs text-[#28201a]/55 mb-5">L&apos;invitation</p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.04] tracking-tight">
              Un espace pour revenir au corps,<br />
              <span className="italic font-light text-[#1d2a3f]">retrouver son axe</span> et laisser émerger ce qui cherche à s&apos;exprimer.
            </h2>
          </div>

          <div className="mt-14 grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div className="space-y-5 text-[#28201a]/75 leading-relaxed text-lg">
              <p>Asthia Horizon naît d&apos;un lien profond entre le corps, la conscience et la créativité. C&apos;est un espace pour celles et ceux qui sentent que leur être ne peut pas se réduire à une fonction, un rôle ou une identité figée.</p>
              <p>Ici, la régulation du système nerveux devient une porte d&apos;entrée vers plus de sécurité intérieure.</p>
            </div>
            <div className="space-y-5 text-[#28201a]/75 leading-relaxed text-lg">
              <p>La créativité devient un langage de l&apos;être. Le corps devient un espace d&apos;écoute, de transformation et d&apos;expression.</p>
              <p>Asthia Horizon propose des accompagnements individuels, des ateliers, des cercles, des espaces de création et des interventions en entreprise autour de la neurodivergence, de la créativité corporelle et de l&apos;intelligence sensible.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 CARDS */}
      <section className="py-20 md:py-28 bg-[#eae2d0]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <p className="uppercase tracking-[0.3em] text-xs text-[#28201a]/55 mb-5">Les espaces</p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.04] tracking-tight">
              Quatre <span className="italic font-light text-[#1d2a3f]">portes d&apos;entrée</span>.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CARDS.map((c, i) => (
              <Link
                key={c.title}
                href={c.href}
                className="group bg-[#fbf8f1] rounded-3xl p-7 border border-[#28201a]/8 hover:border-[#1d2a3f]/40 hover:shadow-xl hover:shadow-[#28201a]/5 hover:-translate-y-1 transition-all duration-500 flex flex-col"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-[#1d2a3f]/8 flex items-center justify-center group-hover:bg-[#1d2a3f]/15 transition-colors">
                    <c.icon className="w-5 h-5 text-[#1d2a3f]" strokeWidth={1.4} />
                  </div>
                  <span className="font-serif text-sm text-[#28201a]/40">0{i + 1}</span>
                </div>
                <h3 className="font-serif text-xl md:text-2xl text-[#28201a] mb-3 leading-tight">{c.title}</h3>
                <p className="text-[#28201a]/70 leading-relaxed text-[14px] flex-1">{c.text}</p>
                <div className="mt-6 pt-5 border-t border-[#28201a]/8 flex items-center justify-end">
                  <ArrowUpRight className="w-4 h-4 text-[#28201a]/40 group-hover:text-[#1d2a3f] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5">
              <div className="relative">
                <div className="absolute -inset-3 rounded-[2.5rem] bg-[#1d2a3f]/12 -z-10 -rotate-2" />
                <div className="overflow-hidden rounded-[2rem] shadow-xl shadow-[#28201a]/15">
                  <img src={MANIFESTO_IMG} alt="Créer depuis l'être" className="w-full h-[560px] md:h-[640px] object-cover" />
                </div>
              </div>
            </div>
            <div className="lg:col-span-7">
              <p className="uppercase tracking-[0.3em] text-xs text-[#28201a]/55 mb-5">Manifeste</p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-tight">
                Créer depuis <span className="italic font-light text-[#1d2a3f]">l&apos;être</span>,<br />pas depuis la pression.
              </h2>
              <div className="mt-8 space-y-5 text-[#28201a]/75 leading-relaxed text-lg">
                <p>Dans un monde qui pousse souvent à produire, performer et se fragmenter, Asthia Horizon propose un autre mouvement : ralentir, écouter, ressentir, intégrer, puis créer depuis un endroit plus juste.</p>
                <p className="font-serif italic text-2xl text-[#1d2a3f] leading-snug">
                  Ce n&apos;est pas une méthode figée. C&apos;est un espace vivant. Un champ d&apos;exploration où le corps, le système nerveux, la conscience et la créativité se rencontrent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Commencer simplement, à partir de là où vous en êtes."
        subtitle="Que ce soit pour un accompagnement individuel, un atelier ou une intervention en entreprise — le premier pas peut prendre la forme d'un simple message."
      />

      <SiteFooter />
    </main>
  );
}
