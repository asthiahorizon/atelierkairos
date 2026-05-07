'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import {
  Heart, Sparkles, Wind, Compass, Leaf, Mountain,
  Brain, HandHeart, ArrowRight, Mail, Phone, MapPin,
  Menu, X, Clock, ShieldCheck, Flower2, Sun
} from 'lucide-react';

// Original site images (public URLs) — to be replaced by user's own assets
const IMG = {
  hero: 'https://atelierkairos.ch/wp-content/uploads/2025/04/IMG_5226.jpg',
  bouquetin: 'https://atelierkairos.ch/wp-content/uploads/2025/04/bouquetin.jpg',
  method1: 'https://atelierkairos.ch/wp-content/uploads/2025/04/IMG_5140.jpg',
  bisse: 'https://atelierkairos.ch/wp-content/uploads/2025/04/bisse.png',
  equilibre: 'https://atelierkairos.ch/wp-content/uploads/2025/04/IMG_5256.jpg',
};

const NAV = [
  { href: '#philosophie', label: 'Philosophie' },
  { href: '#approche', label: 'Approche' },
  { href: '#methodes', label: 'Méthodes' },
  { href: '#indications', label: 'Pour qui ?' },
  { href: '#tarifs', label: 'Tarifs' },
  { href: '#contact', label: 'Contact' },
];

const INDICATIONS = [
  { icon: Wind, title: 'Gestion du stress', text: "Apprendre à réguler son système nerveux et gérer le stress de manière saine. Apaiser les états d'anxiété chronique, les tensions corporelles et émotionnelles." },
  { icon: Heart, title: 'Guérison du traumatisme', text: 'Guérir les traumatismes corporels et émotionnels afin de recouvrer une vitalité pleine et sereine.' },
  { icon: Flower2, title: 'Libération des tensions', text: 'Se libérer des tensions physiques et émotionnelles pour retrouver un équilibre intérieur durable.' },
  { icon: Sparkles, title: 'Réalisation de Soi', text: 'Explorer son identité profonde pour mieux comprendre ses besoins, ses ressentis et ce qui nous anime.' },
  { icon: Compass, title: 'Accompagner les transitions', text: 'Soutien dans les phases de transition de vie : deuil, changement professionnel, séparation, nouveau cycle.' },
  { icon: ShieldCheck, title: 'Douleurs chroniques', text: 'Prévention et gestion des douleurs chroniques par la reconnexion corporelle et la libération des tensions.' },
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
    short: 'PV',
    icon: Brain,
    text: "Cette théorie offre un cadre pour comprendre le fonctionnement du système nerveux autonome — comment il module nos états de sécurité, vigilance ou défense. Un repère précieux pour identifier nos états nerveux, favoriser un retour à la sécurité intérieure et renforcer la capacité à s'ouvrir à la relation."
  },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-stone-50/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#top" className={`flex items-center gap-2 font-serif text-2xl tracking-wide transition-colors ${scrolled ? 'text-stone-800' : 'text-stone-50'}`}>
          <Sun className="w-6 h-6 opacity-80" strokeWidth={1.2} />
          <span className="font-light">Atelier <span className="font-medium italic">Kairos</span></span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={`text-sm tracking-wide transition-colors hover:opacity-70 ${scrolled ? 'text-stone-700' : 'text-stone-100'}`}
            >
              {n.label}
            </a>
          ))}
          <a
            href="#contact"
            className={`text-sm tracking-wider px-5 py-2 rounded-full border transition-all ${
              scrolled
                ? 'border-stone-800 text-stone-800 hover:bg-stone-800 hover:text-stone-50'
                : 'border-stone-100 text-stone-100 hover:bg-stone-100 hover:text-stone-800'
            }`}
          >
            Prendre rendez-vous
          </a>
        </nav>

        <button
          className={`lg:hidden ${scrolled ? 'text-stone-800' : 'text-stone-100'}`}
          onClick={() => setOpen(!open)}
          aria-label="menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-stone-50/98 backdrop-blur-md border-t border-stone-200 mt-3">
          <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="text-stone-700 py-2">
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

const Hero = () => (
  <section id="top" className="relative h-screen min-h-[640px] w-full overflow-hidden">
    <div
      className="absolute inset-0 bg-cover bg-center scale-105 animate-fade-in"
      style={{ backgroundImage: `url(${IMG.hero})` }}
    />
    <div className="absolute inset-0 hero-overlay" />
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 text-stone-50">
      <div className="animate-fade-up opacity-0" style={{ animationDelay: '0.3s' }}>
        <p className="uppercase tracking-[0.4em] text-xs md:text-sm mb-6 opacity-80">Accompagnement psycho-corporel</p>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light leading-[1.05] text-balance max-w-5xl">
          Le temps juste, <br />
          <span className="italic font-normal">pour ce qui demande à advenir.</span>
        </h1>
        <p className="mt-8 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed opacity-90">
          L&apos;Atelier Kairos est un espace en dehors du tumulte. Un temps réservé pour <em>achever</em>, se <em>réguler</em>, et avancer vers une vie cohérente exprimant ce que l&apos;on Est profondément.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className="px-8 py-3.5 bg-stone-50 text-stone-800 rounded-full hover:bg-stone-200 transition-all tracking-wider text-sm flex items-center gap-2 group"
          >
            Prendre rendez-vous
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#philosophie"
            className="px-8 py-3.5 border border-stone-50/70 text-stone-50 rounded-full hover:bg-stone-50/10 transition-all tracking-wider text-sm"
          >
            Découvrir l&apos;atelier
          </a>
        </div>
      </div>
    </div>
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-stone-50/70 text-xs tracking-widest uppercase animate-fade-in" style={{ animationDelay: '1.2s' }}>
      <span className="block text-center mb-2">Descendre</span>
      <div className="w-px h-12 bg-stone-50/50 mx-auto animate-pulse" />
    </div>
  </section>
);

const SectionTitle = ({ kicker, title, italic }) => (
  <div className="max-w-3xl">
    {kicker && <p className="uppercase tracking-[0.3em] text-xs text-stone-500 mb-4">{kicker}</p>}
    <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-stone-800 text-balance">
      {title} {italic && <span className="italic font-normal">{italic}</span>}
    </h2>
  </div>
);

const Philosophie = () => (
  <section id="philosophie" className="py-28 md:py-40 bg-stone-50">
    <div className="container mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        <div className="lg:sticky lg:top-32">
          <SectionTitle
            kicker="La philosophie"
            title="Kairos,"
            italic="le temps de l'Être."
          />
          <p className="mt-8 text-stone-600 leading-relaxed text-lg font-light">
            Dans la Grèce antique, Kairos désignait le moment juste — un temps de qualité, où quelque chose peut advenir. Non pas parce qu&apos;on l&apos;a prévu, mais parce qu&apos;on y est pleinement présent.
          </p>
        </div>

        <div className="space-y-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-5 h-5 text-stone-500" strokeWidth={1.4} />
              <p className="font-serif text-xl text-stone-800">À la différence de Chronos…</p>
            </div>
            <p className="text-stone-600 leading-relaxed font-light">
              …le temps linéaire qui mesure la durée, Kairos est le temps de l&apos;instant vécu. Celui du corps, de l&apos;intuition, des sensations fines et de l&apos;Être. Le temps où une bascule peut se faire, où une transformation peut naître.
            </p>
          </div>

          <div className="section-divider" />

          <div>
            <div className="flex items-center gap-3 mb-3">
              <Mountain className="w-5 h-5 text-stone-500" strokeWidth={1.4} />
              <p className="font-serif text-xl text-stone-800">L&apos;atelier, le lieu de la création</p>
            </div>
            <p className="text-stone-600 leading-relaxed font-light">
              Le mot atelier évoque cet espace vivant, ce lieu où l&apos;on crée, s&apos;exprime, explore et ajuste. Rien n&apos;y est figé : on y travaille avec ce qui est présent, dans l&apos;instant. Tel un artisan qui travaille la matière, ici, on travaille avec le corps, les sensations, le système nerveux, l&apos;élan de vie.
            </p>
          </div>

          <figure className="mt-12 group">
            <div className="overflow-hidden rounded-sm">
              <img
                src={IMG.hero}
                alt="Landmannalaugar, Islande"
                className="w-full h-[420px] object-cover transition-transform duration-[2s] group-hover:scale-105"
              />
            </div>
            <figcaption className="mt-3 text-xs uppercase tracking-widest text-stone-500">
              Landmannalaugar, Islande — un lieu où le Kairos est si perceptible.
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  </section>
);

const Approche = () => (
  <section id="approche" className="py-28 md:py-40 bg-[#f5f1ea]">
    <div className="container mx-auto px-6">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        <div className="lg:col-span-5">
          <div className="relative">
            <div className="absolute -inset-4 bg-stone-300/30 rounded-sm -z-10 translate-x-4 translate-y-4" />
            <img src={IMG.bouquetin} alt="Bouquetin dans la nature" className="w-full h-[560px] object-cover rounded-sm" />
          </div>
        </div>
        <div className="lg:col-span-7">
          <SectionTitle
            kicker="L'approche"
            title="Une approche"
            italic="psycho-corporelle."
          />
          <p className="mt-8 text-stone-700 leading-relaxed text-lg font-light">
            Mon accompagnement s&apos;appuie sur une approche psycho-corporelle — point d&apos;entrée privilégié, qui reste fluide et intégrative.
          </p>
          <p className="mt-6 text-stone-600 leading-relaxed font-light">
            Elle prend en compte toutes les dimensions de l&apos;humain — psychologique, émotionnelle, physique et spirituelle — en favorisant la régulation du système nerveux, la reconnexion au corps, aux émotions, à l&apos;environnement et à la conscience, afin de soutenir l&apos;expression de Soi.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-6">
            {[
              { label: 'Psychologique', icon: Brain },
              { label: 'Émotionnel', icon: Heart },
              { label: 'Physique', icon: HandHeart },
              { label: 'Spirituel', icon: Sparkles },
            ].map((d) => (
              <div key={d.label} className="flex items-center gap-3 border-b border-stone-300/60 pb-3">
                <d.icon className="w-5 h-5 text-stone-600" strokeWidth={1.3} />
                <span className="font-serif text-lg text-stone-800">{d.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Methodes = () => (
  <section id="methodes" className="py-28 md:py-40 bg-stone-50 relative overflow-hidden">
    <div
      className="absolute right-0 top-0 w-1/3 h-full opacity-10 bg-cover bg-center pointer-events-none"
      style={{ backgroundImage: `url(${IMG.bisse})` }}
    />
    <div className="container mx-auto px-6 relative">
      <div className="max-w-3xl mb-16">
        <SectionTitle
          kicker="Les méthodes"
          title="Méthodes"
          italic="pratiquées."
        />
        <p className="mt-6 text-stone-600 leading-relaxed font-light text-lg">
          Trois approches complémentaires, intégrées de manière fluide et adaptées à votre rythme.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {METHODS.map((m, i) => (
          <Card
            key={m.name}
            className="group bg-card/60 backdrop-blur-sm border-stone-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden"
          >
            <CardContent className="p-8 flex flex-col h-full">
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-full bg-[#7d8c6c]/10 flex items-center justify-center group-hover:bg-[#7d8c6c]/20 transition-colors">
                  <m.icon className="w-6 h-6 text-[#5d6c4c]" strokeWidth={1.3} />
                </div>
                <span className="font-serif text-5xl text-stone-300 italic">{m.short}</span>
              </div>
              <h3 className="font-serif text-2xl text-stone-800 mb-4 leading-tight">{m.name}</h3>
              <p className="text-stone-600 leading-relaxed font-light text-sm flex-1">{m.text}</p>
              <div className="mt-6 pt-6 border-t border-stone-200 text-xs uppercase tracking-widest text-stone-500">
                Méthode {String(i + 1).padStart(2, '0')}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <figure className="mt-20 relative rounded-sm overflow-hidden">
        <img src={IMG.method1} alt="Nature paisible" className="w-full h-[420px] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent" />
        <blockquote className="absolute bottom-8 left-8 right-8 md:left-12 md:right-auto md:max-w-xl text-stone-50 font-serif text-2xl md:text-3xl italic font-light leading-snug">
          « L&apos;approche s&apos;adapte au rythme et aux besoins de chacun, intégrant harmonieusement corps, émotions et esprit. »
        </blockquote>
      </figure>
    </div>
  </section>
);

const Indications = () => (
  <section id="indications" className="py-28 md:py-40 bg-[#eee7dc]">
    <div className="container mx-auto px-6">
      <div className="max-w-3xl mb-16">
        <SectionTitle
          kicker="Pour qui ?"
          title="À qui s'adresse"
          italic="cet accompagnement ?"
        />
        <p className="mt-6 text-stone-700 leading-relaxed font-light text-lg">
          Un espace pour celles et ceux qui sentent l&apos;appel d&apos;un changement profond — quelle qu&apos;en soit la forme.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-stone-300/40">
        {INDICATIONS.map((ind) => (
          <div
            key={ind.title}
            className="bg-[#eee7dc] p-10 hover:bg-stone-50 transition-colors duration-500 group"
          >
            <div className="w-12 h-12 mb-6 flex items-center justify-center rounded-full border border-stone-400/60 group-hover:border-[#5d6c4c] group-hover:bg-[#7d8c6c]/10 transition-all">
              <ind.icon className="w-5 h-5 text-stone-700 group-hover:text-[#5d6c4c]" strokeWidth={1.3} />
            </div>
            <h3 className="font-serif text-2xl text-stone-800 mb-3 leading-tight">{ind.title}</h3>
            <p className="text-stone-600 leading-relaxed font-light text-[15px]">{ind.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Tarifs = () => (
  <section id="tarifs" className="py-28 md:py-40 bg-stone-50">
    <div className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto text-center">
        <p className="uppercase tracking-[0.3em] text-xs text-stone-500 mb-4">Tarifs</p>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-stone-800">
          Une <span className="italic">tarification</span> juste<br />et accessible.
        </h2>
      </div>

      <div className="mt-16 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div className="relative bg-card border border-stone-200 p-10 md:p-12 rounded-sm hover:border-stone-400 transition-colors">
          <p className="uppercase tracking-widest text-xs text-stone-500 mb-4">Tarif standard</p>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="font-serif text-6xl md:text-7xl text-stone-800 font-light">130</span>
            <span className="text-stone-600 text-xl">CHF</span>
          </div>
          <p className="text-stone-500">par séance d&apos;1 heure</p>
          <div className="section-divider my-8" />
          <ul className="space-y-3 text-stone-600 font-light text-sm">
            <li className="flex gap-3"><Leaf className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" strokeWidth={1.4} /> Séance individuelle de 60 minutes</li>
            <li className="flex gap-3"><Leaf className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" strokeWidth={1.4} /> Approche personnalisée et adaptée</li>
            <li className="flex gap-3"><Leaf className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" strokeWidth={1.4} /> Cadre sécurisant et bienveillant</li>
          </ul>
        </div>

        <div className="relative bg-[#5d6c4c] text-stone-50 p-10 md:p-12 rounded-sm overflow-hidden">
          <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-stone-50/5 animate-breathe" />
          <p className="uppercase tracking-widest text-xs text-stone-300 mb-4">Tarif solidaire</p>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="font-serif text-6xl md:text-7xl font-light">80</span>
            <span className="text-stone-300 text-xl">CHF</span>
          </div>
          <p className="text-stone-300">pour les personnes en difficulté financière</p>
          <div className="my-8 h-px bg-stone-50/20" />
          <p className="text-stone-100 leading-relaxed font-light text-sm">
            L&apos;accompagnement doit rester accessible. Si le tarif standard représente un obstacle, parlons-en simplement en amont — sans justification nécessaire.
          </p>
        </div>
      </div>

      <p className="mt-12 text-center max-w-2xl mx-auto text-stone-600 font-light italic text-lg">
        « L&apos;approche psycho-corporelle privilégie un accompagnement personnalisé, centré sur le processus vivant plutôt que sur des protocoles fixes. »
      </p>
    </div>
  </section>
);

const Equilibre = () => (
  <section className="relative py-28 md:py-40 overflow-hidden">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${IMG.equilibre})` }}
    />
    <div className="absolute inset-0 bg-stone-900/65" />
    <div className="container mx-auto px-6 relative">
      <div className="max-w-3xl text-stone-50">
        <p className="uppercase tracking-[0.3em] text-xs text-stone-300 mb-4">Une posture</p>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-balance">
          Un équilibre <span className="italic">essentiel.</span>
        </h2>
        <p className="mt-8 leading-relaxed font-light text-lg text-stone-100">
          Dans le domaine de l&apos;accompagnement et de la thérapie, il est tentant de se laisser emporter soit par une approche strictement scientifique, parfois froide et réductrice, soit par des courants trop ésotériques, éloignés du réel.
        </p>
        <p className="mt-6 leading-relaxed font-light text-stone-200">
          L&apos;enjeu aujourd&apos;hui est de trouver un chemin entre ces deux extrêmes : une posture qui reconnaît la validité des connaissances scientifiques — issues de la neurobiologie et de la physiologie — tout en restant ouverte à la richesse des dimensions subtiles de l&apos;Être, de la conscience et du vécu intérieur.
        </p>
        <p className="mt-6 font-serif text-2xl italic text-stone-50 leading-snug">
          Cet équilibre, à la fois rigoureux et sensible, concret et respectueux des nuances invisibles, permet d&apos;accompagner de manière authentique et profondément humaine.
        </p>
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
    <section id="contact" className="py-28 md:py-40 bg-[#f5f1ea]">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <SectionTitle kicker="Prendre contact" title="Réservons" italic="un temps ensemble." />
            <p className="mt-8 text-stone-600 leading-relaxed font-light text-lg">
              Vous souhaitez en savoir plus, prendre rendez-vous ou simplement échanger ? Écrivez-moi en toute simplicité — je vous réponds personnellement sous 48h.
            </p>

            <div className="mt-12 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-stone-700" strokeWidth={1.4} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-stone-500 mb-1">Email</p>
                  <a href="mailto:contact@atelierkairos.ch" className="text-stone-800 hover:text-[#5d6c4c] transition">
                    contact@atelierkairos.ch
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-stone-700" strokeWidth={1.4} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-stone-500 mb-1">Téléphone</p>
                  <a href="tel:+41000000000" className="text-stone-800 hover:text-[#5d6c4c] transition">
                    Sur demande
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-stone-700" strokeWidth={1.4} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-stone-500 mb-1">Cabinet</p>
                  <p className="text-stone-800">Suisse romande</p>
                </div>
              </div>
            </div>
          </div>

          <Card className="bg-card border-stone-200 shadow-sm">
            <CardContent className="p-8 md:p-10">
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-xs uppercase tracking-widest text-stone-500">Nom *</Label>
                    <Input id="name" name="name" value={form.name} onChange={onChange} required className="mt-2 bg-transparent border-0 border-b border-stone-300 rounded-none focus-visible:ring-0 focus-visible:border-[#5d6c4c] px-0" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-xs uppercase tracking-widest text-stone-500">Email *</Label>
                    <Input id="email" name="email" type="email" value={form.email} onChange={onChange} required className="mt-2 bg-transparent border-0 border-b border-stone-300 rounded-none focus-visible:ring-0 focus-visible:border-[#5d6c4c] px-0" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="text-xs uppercase tracking-widest text-stone-500">Téléphone</Label>
                    <Input id="phone" name="phone" value={form.phone} onChange={onChange} className="mt-2 bg-transparent border-0 border-b border-stone-300 rounded-none focus-visible:ring-0 focus-visible:border-[#5d6c4c] px-0" />
                  </div>
                  <div>
                    <Label htmlFor="subject" className="text-xs uppercase tracking-widest text-stone-500">Sujet</Label>
                    <Input id="subject" name="subject" value={form.subject} onChange={onChange} className="mt-2 bg-transparent border-0 border-b border-stone-300 rounded-none focus-visible:ring-0 focus-visible:border-[#5d6c4c] px-0" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="message" className="text-xs uppercase tracking-widest text-stone-500">Votre message *</Label>
                  <Textarea id="message" name="message" value={form.message} onChange={onChange} required rows={5} className="mt-2 bg-transparent border-0 border-b border-stone-300 rounded-none focus-visible:ring-0 focus-visible:border-[#5d6c4c] resize-none px-0" />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 bg-stone-800 hover:bg-[#5d6c4c] text-stone-50 rounded-full py-6 tracking-widest text-xs uppercase"
                >
                  {loading ? 'Envoi…' : 'Envoyer le message'}
                </Button>
                <p className="text-xs text-stone-500 text-center font-light">
                  Vos données restent strictement confidentielles.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-stone-900 text-stone-300 py-16">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-3 gap-12 mb-12">
        <div>
          <div className="flex items-center gap-2 font-serif text-2xl text-stone-100 mb-4">
            <Sun className="w-6 h-6 opacity-80" strokeWidth={1.2} />
            <span className="font-light">Atelier <span className="italic font-medium">Kairos</span></span>
          </div>
          <p className="text-sm text-stone-400 leading-relaxed font-light">
            Un espace en dehors du tumulte, dédié à l&apos;écoute du vivant et à la transformation profonde.
          </p>
        </div>
        <div>
          <p className="uppercase tracking-widest text-xs text-stone-500 mb-4">Navigation</p>
          <ul className="space-y-2 text-sm">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="hover:text-stone-100 transition-colors">{n.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="uppercase tracking-widest text-xs text-stone-500 mb-4">Contact</p>
          <ul className="space-y-2 text-sm">
            <li><a href="mailto:contact@atelierkairos.ch" className="hover:text-stone-100">contact@atelierkairos.ch</a></li>
            <li>Suisse romande</li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
        <p>© {new Date().getFullYear()} Atelier Kairos. Tous droits réservés.</p>
        <p className="italic font-serif">« Le moment juste, pour ce qui demande à advenir. »</p>
      </div>
    </div>
  </footer>
);

const App = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Philosophie />
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
