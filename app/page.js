'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import {
  Heart, Sparkles, Wind, Compass, Leaf,
  Brain, HandHeart, ArrowRight, ArrowUpRight, Mail, Phone, MapPin,
  Menu, X, ShieldCheck, Flower2
} from 'lucide-react';

const LOGO = 'https://atelierkairos.ch/wp-content/uploads/2025/06/logo_noir.png';

const IMG = {
  hero: 'https://atelierkairos.ch/wp-content/uploads/2025/04/IMG_5226.jpg',
  bouquetin: 'https://atelierkairos.ch/wp-content/uploads/2025/04/bouquetin.jpg',
  method1: 'https://atelierkairos.ch/wp-content/uploads/2025/04/IMG_5140.jpg',
  bisse: 'https://atelierkairos.ch/wp-content/uploads/2025/04/bisse.png',
  equilibre: 'https://atelierkairos.ch/wp-content/uploads/2025/04/IMG_5256.jpg',
  guillaume: 'https://atelierkairos.ch/wp-content/uploads/2025/11/ialo.jpeg',
};

const NAV = [
  { href: '#philosophie', label: 'Philosophie' },
  { href: '#apropos', label: 'À propos' },
  { href: '#approche', label: 'Approche' },
  { href: '#methodes', label: 'Méthodes' },
  { href: '#indications', label: 'Pour qui ?' },
  { href: '#tarifs', label: 'Tarifs' },
  { href: '#contact', label: 'Contact' },
];

const INDICATIONS = [
  { icon: Wind, num: '01', title: 'Gestion du stress', text: "Apprendre à réguler son système nerveux et gérer le stress de manière saine. Apaiser les états d'anxiété chronique, les tensions corporelles et émotionnelles." },
  { icon: Heart, num: '02', title: 'Guérison du traumatisme', text: 'Guérir les traumatismes corporels et émotionnels afin de recouvrer une vitalité pleine et sereine.' },
  { icon: Flower2, num: '03', title: 'Libération des tensions', text: 'Se libérer des tensions physiques et émotionnelles pour retrouver un équilibre intérieur durable.' },
  { icon: Sparkles, num: '04', title: 'Réalisation de Soi', text: 'Explorer son identité profonde pour mieux comprendre ses besoins, ses ressentis et ce qui nous anime.' },
  { icon: Compass, num: '05', title: 'Accompagner les transitions', text: 'Soutien dans les phases de transition de vie : deuil, changement professionnel, séparation, nouveau cycle.' },
  { icon: ShieldCheck, num: '06', title: 'Douleurs chroniques', text: 'Prévention et gestion des douleurs chroniques par la reconnexion corporelle et la libération des tensions.' },
];

const METHODS = [
  {
    name: 'Somatic Experiencing',
    short: 'SE',
    icon: Leaf,
    text: "La SE se concentre sur la régulation du système nerveux en aidant à libérer en douceur les tensions, blocages et réactions physiologiques associées aux traumatismes passés. Une approche progressive, centrée sur l'écoute des sensations corporelles, qui rétablit un sentiment profond de sécurité intérieure."
  },
  {
    name: 'Thérapie Cranio-Sacrée Biodynamique',
    short: 'TCSB',
    icon: HandHeart,
    text: "La TCSB est une approche subtile et respectueuse qui s'appuie sur l'écoute des rythmes naturels du corps — notamment les mouvements fluides du système crânio-sacré. Elle favorise l'équilibre, la vitalité et soutient le fonctionnement optimal des mécanismes d'auto-régulation."
  },
  {
    name: 'Théorie polyvagale',
    short: 'TPV',
    icon: Brain,
    text: "Cette théorie offre un cadre pour comprendre le fonctionnement du système nerveux autonome — comment il module nos états de sécurité, vigilance ou défense. Un repère pour identifier nos états nerveux, favoriser un retour à la sécurité intérieure et renforcer la capacité à s'ouvrir à la relation."
  },
];

const Logo = ({ className = '' }) => (
  <a href="#top" className={`inline-flex items-center ${className}`} aria-label="Atelier Kairos">
    <img src={LOGO} alt="Atelier Kairos" className="h-10 md:h-12 w-auto object-contain" />
  </a>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#f4f7fb]/85 backdrop-blur-xl border-b border-[#162032]/8 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Logo />

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="px-3 py-2 text-sm text-[#162032]/75 hover:text-[#3d5a80] transition-colors"
            >
              {n.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-3 px-5 py-2.5 bg-[#162032] text-[#f4f7fb] rounded-full text-sm hover:bg-[#3d5a80] transition-colors flex items-center gap-2 group"
          >
            Rendez-vous
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </nav>

        <button
          className="lg:hidden text-[#162032]"
          onClick={() => setOpen(!open)}
          aria-label="menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-[#f4f7fb] border-t border-[#162032]/10 mt-3">
          <nav className="container mx-auto px-6 py-6 flex flex-col gap-1">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-3 text-[#162032]/80 border-b border-[#162032]/5">
                {n.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="mt-4 px-5 py-3 bg-[#162032] text-[#f4f7fb] rounded-full text-center">
              Prendre rendez-vous
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

const Hero = () => (
  <section id="top" className="relative pt-36 pb-20 md:pt-44 md:pb-32 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-[#dde7f1] via-[#f4f7fb] to-[#f4f7fb]" />
    <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#7195c4]/15 rounded-full blur-3xl" />
    <div className="absolute top-60 -left-40 w-[500px] h-[500px] bg-[#5a7ba8]/10 rounded-full blur-3xl" />

    <div className="container mx-auto px-6 relative">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-7 animate-fade-up opacity-0" style={{ animationDelay: '0.15s' }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#162032]/5 border border-[#162032]/10 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3d5a80] animate-pulse" />
            <span className="text-xs tracking-wider uppercase text-[#162032]/70">Accompagnement psycho-corporel</span>
          </div>

          <h1 className="font-serif text-[44px] sm:text-6xl lg:text-7xl xl:text-[88px] leading-[0.98] tracking-tight text-[#162032]">
            Le temps juste,<br />
            <span className="italic font-light text-[#3d5a80]">pour ce qui demande</span><br />
            <span className="italic font-light">à advenir.</span>
          </h1>

          <p className="mt-8 max-w-xl text-base md:text-lg text-[#162032]/70 leading-relaxed">
            L&apos;Atelier Kairos est un espace en dehors du tumulte. Un temps réservé pour <em className="text-[#162032]">achever</em>, se <em className="text-[#162032]">réguler</em>, et avancer vers une vie cohérente exprimant ce que l&apos;on Est profondément.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="px-7 py-4 bg-[#162032] text-[#f4f7fb] rounded-full text-sm hover:bg-[#3d5a80] transition-all flex items-center gap-2 group"
            >
              Prendre rendez-vous
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#philosophie"
              className="px-7 py-4 text-sm text-[#162032] hover:text-[#3d5a80] transition-colors flex items-center gap-2 underline-offset-4 hover:underline"
            >
              Découvrir l&apos;atelier
            </a>
          </div>

          <div className="mt-14 flex items-center gap-6 sm:gap-8 text-xs uppercase tracking-widest text-[#162032]/50">
            <div>
              <p className="font-serif text-2xl text-[#162032] normal-case tracking-normal">SE</p>
              <p className="mt-1">Somatic<br />Experiencing</p>
            </div>
            <div className="w-px h-12 bg-[#162032]/15" />
            <div>
              <p className="font-serif text-2xl text-[#162032] normal-case tracking-normal">TCSB</p>
              <p className="mt-1">Cranio-Sacrée<br />Biodynamique</p>
            </div>
            <div className="w-px h-12 bg-[#162032]/15 hidden sm:block" />
            <div className="hidden sm:block">
              <p className="font-serif text-2xl text-[#162032] normal-case tracking-normal">TPV</p>
              <p className="mt-1">Théorie<br />polyvagale</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 animate-fade-up opacity-0" style={{ animationDelay: '0.4s' }}>
          <div className="relative">
            <div className="absolute -inset-3 rounded-[2.5rem] bg-[#3d5a80]/12 -z-10 rotate-2" />
            <div className="overflow-hidden rounded-[2rem] shadow-2xl shadow-[#162032]/15">
              <img
                src={IMG.hero}
                alt="Landmannalaugar, Islande"
                className="w-full h-[480px] md:h-[560px] object-cover animate-slow-zoom"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#f4f7fb] rounded-2xl p-5 shadow-xl shadow-[#162032]/10 max-w-[240px] border border-[#162032]/5">
              <p className="font-serif italic text-[#162032] text-lg leading-tight">
                « Le moment juste, où quelque chose peut advenir. »
              </p>
              <p className="mt-2 text-xs uppercase tracking-widest text-[#162032]/50">Kairos — Grèce antique</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const SectionLabel = ({ num, label }) => (
  <div className="flex items-center gap-3 mb-6">
    {num && <span className="font-serif text-[#3d5a80] text-sm">{num}</span>}
    {num && <span className="w-8 h-px bg-[#162032]/30" />}
    {label && <span className="text-xs uppercase tracking-[0.25em] text-[#162032]/60">{label}</span>}
  </div>
);

const Philosophie = () => (
  <section id="philosophie" className="py-24 md:py-36 relative">
    <div className="container mx-auto px-6">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-20">
        <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
          <SectionLabel num="01" label="La philosophie" />
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight">
            Kairos, <span className="italic font-light text-[#3d5a80]">le temps de l&apos;Être.</span>
          </h2>
          <p className="mt-6 text-[#162032]/70 leading-relaxed text-lg">
            Dans la Grèce antique, Kairos désignait le moment juste — un temps de qualité, où quelque chose peut advenir. Non pas parce qu&apos;on l&apos;a prévu, mais parce qu&apos;on y est pleinement présent.
          </p>
        </div>

        <div className="lg:col-span-7 space-y-14">
          <div className="bg-[#162032]/[0.03] rounded-3xl p-8 md:p-10 border border-[#162032]/8">
            <div className="flex items-baseline gap-3 mb-4">
              <span className="font-serif text-2xl text-[#3d5a80]">χ</span>
              <p className="font-serif text-2xl text-[#162032]">Chronos vs. Kairos</p>
            </div>
            <p className="text-[#162032]/75 leading-relaxed">
              À la différence de Chronos — le temps linéaire qui mesure la durée — Kairos est le temps de l&apos;instant vécu. Celui du corps, de l&apos;intuition, des sensations fines et de l&apos;Être. Le temps où une bascule peut se faire, où une transformation peut naître.
            </p>
          </div>

          <figure className="group">
            <div className="overflow-hidden rounded-3xl">
              <img
                src={IMG.hero}
                alt="Landmannalaugar, Islande"
                className="w-full h-[420px] md:h-[480px] object-cover transition-transform duration-[1500ms] group-hover:scale-105"
              />
            </div>
            <figcaption className="mt-4 flex items-center gap-3 text-sm text-[#162032]/60">
              <span className="w-6 h-px bg-[#162032]/30" />
              Landmannalaugar, Islande — un lieu où le Kairos est si perceptible.
            </figcaption>
          </figure>

          <div className="pt-2">
            <div className="flex items-baseline gap-3 mb-4">
              <span className="font-serif text-2xl text-[#3d5a80] italic">a.</span>
              <p className="font-serif text-2xl text-[#162032]">L&apos;atelier, le lieu de la création</p>
            </div>
            <p className="text-[#162032]/75 leading-relaxed">
              Le mot atelier évoque cet espace vivant, ce lieu où l&apos;on crée, s&apos;exprime, explore et ajuste. Rien n&apos;y est figé : on y travaille avec ce qui est présent, dans l&apos;instant. Tel un artisan qui travaille la matière, ici, on travaille avec le corps, les sensations, le système nerveux, l&apos;élan de vie.
            </p>
            <p className="mt-4 text-[#162032]/75 leading-relaxed">
              L&apos;Atelier Kairos conjugue cet espace tangible et bienveillant à ce temps précieux, dédié à l&apos;écoute du vivant, créant un espace propice à la transformation.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Apropos = () => (
  <section id="apropos" className="py-24 md:py-36 bg-[#dde7f1] relative overflow-hidden">
    <div className="absolute -top-24 right-1/4 w-[400px] h-[400px] bg-[#7195c4]/15 rounded-full blur-3xl pointer-events-none" />
    <div className="container mx-auto px-6 relative">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
          <SectionLabel num="02" label="À propos" />
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight">
            Guillaume, <span className="italic font-light text-[#3d5a80]">le chemin vers ce qui soigne.</span>
          </h2>
          <div className="mt-10 relative">
            <div className="absolute -inset-3 rounded-[2rem] bg-[#3d5a80]/15 -z-10 -rotate-2" />
            <div className="overflow-hidden rounded-[1.75rem] shadow-xl shadow-[#162032]/15">
              <img
                src={IMG.guillaume}
                alt="Guillaume — Atelier Kairos"
                className="w-full h-[460px] md:h-[520px] object-cover"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6 text-[#162032]/80 leading-relaxed">
          <p className="text-lg text-[#162032]/90">
            Je m&apos;appelle <span className="text-[#162032] font-medium">Guillaume</span>. Depuis ma naissance, je vis avec une épilepsie congénitale, dont la première crise est survenue à seulement six mois.
          </p>
          <p>
            Cette maladie, intense et imprévisible, m&apos;a très tôt confronté à des expériences extrêmes, où le corps se fige, la peur s&apos;installe profondément, et la vulnérabilité devient une réalité quotidienne. Ces moments m&apos;ont obligé à développer une relation intime avec ma propre force intérieure — une présence en soi qui dépasse la peur et la douleur.
          </p>

          <div className="my-10 bg-[#f4f7fb] rounded-3xl p-7 md:p-9 border border-[#162032]/8">
            <p className="font-serif text-xl md:text-2xl italic text-[#162032] leading-snug">
              « La spiritualité a toujours été un socle fondamental dans ma vie, une source d&apos;ancrage et de sens face aux épreuves. »
            </p>
          </div>

          <p>
            Au fil des années, j&apos;ai cherché, expérimenté, testé différentes approches, jusqu&apos;à comprendre ce qui fonctionne vraiment pour moi. Ce chemin m&apos;a permis d&apos;émerger d&apos;un traumatisme profond, transformé par la résilience.
          </p>
          <p>
            Je me reconnais aussi dans le spectre de la neurodiversité, ce qui a demandé un travail considérable de gestion émotionnelle et de régulation, intimement lié à mon vécu avec l&apos;épilepsie. Cette double réalité m&apos;a poussé à explorer et à intégrer des pratiques corporelles et spirituelles qui m&apos;aident à retrouver un équilibre profond et durable.
          </p>
          <p>
            Aujourd&apos;hui, la connexion avec soi-même — avec son corps, ses émotions et sa dimension spirituelle — est pour moi une nécessité vitale. Après des années d&apos;exploration, je suis désormais porteur d&apos;outils solides, éprouvés dans ma vie quotidienne, que je souhaite partager pour accompagner d&apos;autres personnes dans leur propre chemin de reconnexion, de transformation et de bien-être.
          </p>

          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            <div className="bg-[#f4f7fb] rounded-2xl p-6 border border-[#162032]/8">
              <p className="text-xs uppercase tracking-widest text-[#162032]/50 mb-2">Formation académique</p>
              <p className="font-serif text-xl text-[#162032] leading-snug">Bachelor HES en Business Analyse</p>
              <p className="mt-2 text-sm text-[#162032]/65">Rigueur, structure et processus.</p>
            </div>
            <div className="bg-[#3d5a80] rounded-2xl p-6 text-[#f4f7fb]">
              <p className="text-xs uppercase tracking-widest text-[#f4f7fb]/60 mb-2">Pratique somatique</p>
              <p className="font-serif text-xl leading-snug">Approche psycho-corporelle</p>
              <p className="mt-2 text-sm text-[#f4f7fb]/75">Écoute, sensibilité et présence.</p>
            </div>
          </div>

          <p className="pt-4">
            Mon accompagnement reflète cette double vision : <span className="text-[#162032] font-medium">à la fois ancrée et fluide, structurée et vivante, technique et sensible.</span> Je crois profondément que la rigueur extérieure et l&apos;écoute intérieure s&apos;allient pour créer un équilibre puissant.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const Approche = () => (
  <section id="approche" className="py-24 md:py-36 relative overflow-hidden">
    <div className="container mx-auto px-6">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-5 order-2 lg:order-1">
          <div className="relative">
            <div className="absolute -inset-3 rounded-[2rem] bg-[#5a7ba8]/15 -z-10 -rotate-2" />
            <div className="overflow-hidden rounded-[1.75rem] shadow-xl shadow-[#162032]/10">
              <img src={IMG.bouquetin} alt="Bouquetin, ancrage et présence" className="w-full h-[560px] md:h-[640px] object-cover" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 order-1 lg:order-2">
          <SectionLabel num="03" label="L'approche" />
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight">
            Une approche <span className="italic font-light text-[#3d5a80]">psycho-corporelle.</span>
          </h2>
          <p className="mt-8 text-[#162032]/75 leading-relaxed text-lg">
            Mon accompagnement s&apos;appuie sur une approche psycho-corporelle — point d&apos;entrée privilégié, qui reste fluide et intégrative.
          </p>
          <p className="mt-4 text-[#162032]/70 leading-relaxed">
            Elle prend en compte toutes les dimensions de l&apos;humain en favorisant la régulation du système nerveux, la reconnexion au corps, aux émotions, à l&apos;environnement et à la conscience, afin de soutenir l&apos;expression de Soi.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-3">
            {[
              { label: 'Psychologique', icon: Brain },
              { label: 'Émotionnel', icon: Heart },
              { label: 'Physique', icon: HandHeart },
              { label: 'Spirituel', icon: Sparkles },
            ].map((d) => (
              <div key={d.label} className="flex items-center gap-3 p-4 rounded-2xl bg-[#f4f7fb] border border-[#162032]/8 hover:border-[#3d5a80]/40 transition-all">
                <div className="w-9 h-9 rounded-full bg-[#3d5a80]/10 flex items-center justify-center">
                  <d.icon className="w-4 h-4 text-[#3d5a80]" strokeWidth={1.5} />
                </div>
                <span className="font-serif text-lg text-[#162032]">{d.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Methodes = () => (
  <section id="methodes" className="py-24 md:py-36 bg-[#dde7f1] relative overflow-hidden">
    <div className="container mx-auto px-6">
      <div className="max-w-3xl mb-16">
        <SectionLabel num="04" label="Les méthodes" />
        <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight">
          Méthodes <span className="italic font-light text-[#3d5a80]">pratiquées.</span>
        </h2>
        <p className="mt-6 text-[#162032]/70 leading-relaxed text-lg">
          Trois approches complémentaires, intégrées de manière fluide et adaptées à votre rythme.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
        {METHODS.map((m) => (
          <article
            key={m.name}
            className="group relative bg-[#f4f7fb] border border-[#162032]/10 rounded-3xl p-8 hover:border-[#3d5a80]/40 hover:shadow-xl hover:shadow-[#162032]/5 hover:-translate-y-1 transition-all duration-500"
          >
            <div className="flex items-start justify-between mb-10">
              <div className="w-14 h-14 rounded-2xl bg-[#3d5a80]/8 flex items-center justify-center group-hover:bg-[#3d5a80]/15 transition-colors">
                <m.icon className="w-6 h-6 text-[#3d5a80]" strokeWidth={1.4} />
              </div>
              <span className="font-serif text-5xl text-[#162032]/15 italic group-hover:text-[#3d5a80]/30 transition-colors">{m.short}</span>
            </div>
            <h3 className="font-serif text-2xl md:text-[26px] text-[#162032] mb-4 leading-tight">{m.name}</h3>
            <p className="text-[#162032]/70 leading-relaxed text-[15px]">{m.text}</p>
            <div className="mt-8 pt-6 border-t border-[#162032]/8 flex items-center justify-end">
              <ArrowUpRight className="w-4 h-4 text-[#162032]/40 group-hover:text-[#3d5a80] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
          </article>
        ))}
      </div>

      <figure className="mt-16 relative overflow-hidden rounded-3xl">
        <img src={IMG.method1} alt="Nature paisible" className="w-full h-[420px] md:h-[480px] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#162032]/70 via-[#162032]/20 to-transparent" />
        <blockquote className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-auto md:max-w-2xl text-[#f4f7fb]">
          <p className="font-serif text-2xl md:text-3xl lg:text-4xl italic font-light leading-tight">
            « L&apos;approche s&apos;adapte au rythme et aux besoins de chacun, intégrant harmonieusement corps, émotions et esprit. »
          </p>
        </blockquote>
      </figure>
    </div>
  </section>
);

const Indications = () => (
  <section id="indications" className="py-24 md:py-36">
    <div className="container mx-auto px-6">
      <div className="max-w-3xl mb-16">
        <SectionLabel num="05" label="Pour qui ?" />
        <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight">
          À qui s&apos;adresse <span className="italic font-light text-[#3d5a80]">cet accompagnement ?</span>
        </h2>
        <p className="mt-6 text-[#162032]/75 leading-relaxed text-lg">
          Un espace pour celles et ceux qui sentent l&apos;appel d&apos;un changement profond — quelle qu&apos;en soit la forme.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {INDICATIONS.map((ind) => (
          <div
            key={ind.title}
            className="group bg-[#f4f7fb] rounded-3xl p-8 border border-[#162032]/8 hover:border-[#3d5a80]/30 hover:shadow-lg hover:shadow-[#162032]/5 transition-all duration-500"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#162032]/5 flex items-center justify-center group-hover:bg-[#3d5a80]/10 transition-colors">
                <ind.icon className="w-5 h-5 text-[#162032] group-hover:text-[#3d5a80] transition-colors" strokeWidth={1.4} />
              </div>
              <span className="font-serif text-sm text-[#162032]/40">{ind.num}</span>
            </div>
            <h3 className="font-serif text-2xl text-[#162032] mb-3 leading-tight">{ind.title}</h3>
            <p className="text-[#162032]/70 leading-relaxed text-[15px]">{ind.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Tarifs = () => (
  <section id="tarifs" className="py-24 md:py-36 bg-[#dde7f1]">
    <div className="container mx-auto px-6">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight">
          Une <span className="italic font-light text-[#3d5a80]">tarification</span><br />juste et accessible.
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
        <div className="relative bg-[#f4f7fb] border border-[#162032]/10 p-10 md:p-12 rounded-3xl">
          <p className="text-xs uppercase tracking-widest text-[#162032]/50 mb-5">Tarif standard</p>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="font-serif text-7xl md:text-8xl text-[#162032] font-light tracking-tight">130</span>
            <span className="text-[#162032]/60 text-xl">CHF</span>
          </div>
          <p className="text-[#162032]/60">par séance d&apos;1 heure</p>
          <div className="my-8 h-px bg-[#162032]/10" />
          <ul className="space-y-3 text-[#162032]/75 text-sm">
            <li className="flex gap-3"><Leaf className="w-4 h-4 text-[#3d5a80] shrink-0 mt-0.5" strokeWidth={1.4} /> Séance individuelle de 60 minutes</li>
            <li className="flex gap-3"><Leaf className="w-4 h-4 text-[#3d5a80] shrink-0 mt-0.5" strokeWidth={1.4} /> Approche personnalisée et adaptée</li>
            <li className="flex gap-3"><Leaf className="w-4 h-4 text-[#3d5a80] shrink-0 mt-0.5" strokeWidth={1.4} /> Cadre sécurisant et bienveillant</li>
          </ul>
        </div>

        <div className="relative overflow-hidden bg-[#162032] text-[#f4f7fb] p-10 md:p-12 rounded-3xl">
          <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-[#3d5a80]/40 blur-3xl" />
          <p className="text-xs uppercase tracking-widest text-[#f4f7fb]/50 mb-5 relative">Tarif solidaire</p>
          <div className="flex items-baseline gap-2 mb-2 relative">
            <span className="font-serif text-7xl md:text-8xl font-light tracking-tight">80</span>
            <span className="text-[#f4f7fb]/60 text-xl">CHF</span>
          </div>
          <p className="text-[#f4f7fb]/60 relative">pour les personnes en difficulté financière</p>
          <div className="my-8 h-px bg-[#f4f7fb]/15 relative" />
          <p className="text-[#f4f7fb]/85 leading-relaxed text-[15px] relative">
            L&apos;accompagnement doit rester accessible. Si le tarif standard représente un obstacle, parlons-en simplement en amont — sans justification nécessaire.
          </p>
        </div>
      </div>

      <p className="mt-12 text-center max-w-2xl mx-auto text-[#162032]/65 italic font-serif text-xl leading-relaxed">
        « L&apos;approche psycho-corporelle privilégie un accompagnement personnalisé, centré sur le processus vivant plutôt que sur des protocoles fixes. »
      </p>
    </div>
  </section>
);

const Equilibre = () => (
  <section className="py-24 md:py-36">
    <div className="container mx-auto px-6">
      <div className="max-w-5xl mx-auto">
        <div className="relative overflow-hidden rounded-[2rem] shadow-2xl shadow-[#162032]/15">
          <img
            src={IMG.equilibre}
            alt="Équilibre essentiel"
            className="w-full h-[640px] md:h-[720px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#162032]/80 via-[#162032]/40 to-transparent" />
          <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end text-[#f4f7fb]">
            <div className="max-w-2xl">
              <SectionLabel num="06" label="Une posture" />
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
                Un équilibre <span className="italic font-light">essentiel.</span>
              </h2>
              <p className="mt-6 text-[#f4f7fb]/85 leading-relaxed">
                Trouver un chemin entre les deux extrêmes — ni strictement scientifique, ni purement ésotérique : une posture qui reconnaît la validité des connaissances de la neurobiologie et de la physiologie, tout en restant ouverte à la richesse des dimensions subtiles de l&apos;Être.
              </p>
              <p className="mt-6 font-serif text-xl md:text-2xl italic leading-snug">
                « À la fois rigoureux et sensible, concret et respectueux des nuances invisibles. »
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur');
      toast.success(data.message || 'Message envoyé.');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      toast.error(err.message || "Une erreur s'est produite.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-36 bg-[#dde7f1]">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionLabel num="07" label="Prendre contact" />
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight">
              Réservons <span className="italic font-light text-[#3d5a80]">un temps ensemble.</span>
            </h2>
            <p className="mt-8 text-[#162032]/70 leading-relaxed text-lg">
              Vous souhaitez en savoir plus, prendre rendez-vous ou simplement échanger ? Écrivez-moi en toute simplicité — je vous réponds personnellement sous 48h.
            </p>

            <div className="mt-12 space-y-5">
              {[
                { icon: Mail, label: 'Email', value: 'contact@atelierkairos.ch', href: 'mailto:contact@atelierkairos.ch' },
                { icon: Phone, label: 'Téléphone', value: 'Sur demande', href: '#contact' },
                { icon: MapPin, label: 'Cabinet', value: 'Suisse romande', href: '#' },
              ].map((c) => (
                <a key={c.label} href={c.href} className="flex items-start gap-4 group">
                  <div className="w-11 h-11 rounded-2xl bg-[#162032]/5 flex items-center justify-center shrink-0 group-hover:bg-[#3d5a80]/10 transition-colors">
                    <c.icon className="w-4 h-4 text-[#162032] group-hover:text-[#3d5a80] transition-colors" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#162032]/50 mb-1">{c.label}</p>
                    <p className="text-[#162032] group-hover:text-[#3d5a80] transition-colors">{c.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-[#f4f7fb] border border-[#162032]/10 rounded-3xl p-8 md:p-10">
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-xs uppercase tracking-widest text-[#162032]/60">Nom *</Label>
                    <Input id="name" name="name" value={form.name} onChange={onChange} required className="mt-2 bg-transparent border-0 border-b border-[#162032]/15 rounded-none focus-visible:ring-0 focus-visible:border-[#3d5a80] px-0 text-[#162032]" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-xs uppercase tracking-widest text-[#162032]/60">Email *</Label>
                    <Input id="email" name="email" type="email" value={form.email} onChange={onChange} required className="mt-2 bg-transparent border-0 border-b border-[#162032]/15 rounded-none focus-visible:ring-0 focus-visible:border-[#3d5a80] px-0 text-[#162032]" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="text-xs uppercase tracking-widest text-[#162032]/60">Téléphone</Label>
                    <Input id="phone" name="phone" value={form.phone} onChange={onChange} className="mt-2 bg-transparent border-0 border-b border-[#162032]/15 rounded-none focus-visible:ring-0 focus-visible:border-[#3d5a80] px-0 text-[#162032]" />
                  </div>
                  <div>
                    <Label htmlFor="subject" className="text-xs uppercase tracking-widest text-[#162032]/60">Sujet</Label>
                    <Input id="subject" name="subject" value={form.subject} onChange={onChange} className="mt-2 bg-transparent border-0 border-b border-[#162032]/15 rounded-none focus-visible:ring-0 focus-visible:border-[#3d5a80] px-0 text-[#162032]" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="message" className="text-xs uppercase tracking-widest text-[#162032]/60">Votre message *</Label>
                  <Textarea id="message" name="message" value={form.message} onChange={onChange} required rows={5} className="mt-2 bg-transparent border-0 border-b border-[#162032]/15 rounded-none focus-visible:ring-0 focus-visible:border-[#3d5a80] resize-none px-0 text-[#162032]" />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-6 bg-[#162032] hover:bg-[#3d5a80] text-[#f4f7fb] rounded-full py-6 text-sm transition-colors"
                >
                  {loading ? 'Envoi…' : 'Envoyer le message'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <p className="text-xs text-[#162032]/50 text-center">
                  Vos données restent strictement confidentielles.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-[#162032] text-[#f4f7fb]/80 py-16 md:py-20">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-12 gap-10 md:gap-12 mb-12">
        <div className="md:col-span-5">
          <img src={LOGO} alt="Atelier Kairos" className="h-14 w-auto mb-6 brightness-0 invert opacity-90" />
          <p className="text-sm text-[#f4f7fb]/65 leading-relaxed max-w-sm">
            Un espace en dehors du tumulte, dédié à l&apos;écoute du vivant et à la transformation profonde.
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="uppercase tracking-widest text-xs text-[#f4f7fb]/45 mb-5">Navigation</p>
          <ul className="space-y-2.5 text-sm">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="hover:text-[#f4f7fb] transition-colors">{n.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="uppercase tracking-widest text-xs text-[#f4f7fb]/45 mb-5">Contact</p>
          <ul className="space-y-2.5 text-sm">
            <li><a href="mailto:contact@atelierkairos.ch" className="hover:text-[#f4f7fb]">contact@atelierkairos.ch</a></li>
            <li>Suisse romande</li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-[#f4f7fb]/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#f4f7fb]/50">
        <p>© {new Date().getFullYear()} Atelier Kairos. Tous droits réservés.</p>
        <p className="italic font-serif text-sm">« Le moment juste, pour ce qui demande à advenir. »</p>
      </div>
    </div>
  </footer>
);

const App = () => {
  return (
    <main className="min-h-screen bg-[#f4f7fb]">
      <Navbar />
      <Hero />
      <Philosophie />
      <Apropos />
      <Approche />
      <Methodes />
      <Indications />
      <Tarifs />
      <Equilibre />
      <Contact />
      <Footer />
    </main>
  );
};

export default App;
