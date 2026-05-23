import SiteHeader from '@/components/site/SiteHeader';
import SiteFooter from '@/components/site/SiteFooter';
import { PageHero } from '@/components/site/Shared';
import { Mail, Phone, ArrowUpRight } from 'lucide-react';

export const metadata = {
  title: 'Contact',
  description: "Écrivons un premier mot. Pour un accompagnement, un atelier ou une collaboration, contactez l'Atelier Kairos par email ou téléphone.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />
      <PageHero
        kicker="Prendre contact"
        title="Écrivons"
        italic="un premier mot"
        subtitle="Pour un accompagnement, un atelier, une collaboration ou une simple prise de contact. Je réponds personnellement à chaque message"
      />

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <div className="space-y-5 text-[#312e81]/75 leading-relaxed text-lg">
              <p>
                Vous souhaitez explorer un accompagnement individuel, organiser un atelier, imaginer une intervention en
                entreprise ou simplement entrer en lien avec l&apos;Atelier Kairos&nbsp;?
              </p>
              <p className="font-serif italic text-xl text-[#4338ca]">
                L&apos;échange peut commencer simplement, à partir de là où vous en êtes.
              </p>
              <p className="text-[#312e81]/65 text-[15px]">
                Écrivez-moi un email ou appelez-moi&nbsp;: je vous réponds personnellement, généralement dans la journée.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href="mailto:info@atelierkairos.ch"
                className="group surface-strong rounded-3xl p-7 md:p-8 hover:-translate-y-1 transition-all duration-500"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#eef0fb] flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#4338ca]" strokeWidth={1.5} />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#4338ca]/40 group-hover:text-[#4338ca] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#312e81]/55 mb-2">Par email</p>
                <p className="font-serif text-xl md:text-[22px] text-[#312e81] group-hover:text-[#4338ca] transition-colors break-all">
                  info@atelierkairos.ch
                </p>
                <p className="mt-3 text-[13px] text-[#312e81]/60">
                  Pour les questions, demandes de rendez-vous ou simples présentations.
                </p>
              </a>

              <a
                href="tel:+41794371196"
                className="group surface-strong rounded-3xl p-7 md:p-8 hover:-translate-y-1 transition-all duration-500"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#eef0fb] flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#4338ca]" strokeWidth={1.5} />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#4338ca]/40 group-hover:text-[#4338ca] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#312e81]/55 mb-2">Par téléphone</p>
                <p className="font-serif text-xl md:text-[22px] text-[#312e81] group-hover:text-[#4338ca] transition-colors">
                  +41 79 437 11 96
                </p>
                <p className="mt-3 text-[13px] text-[#312e81]/60">
                  Pour un premier contact direct ou une question urgente.
                </p>
              </a>
            </div>

            <div className="mt-6 surface rounded-3xl p-6 md:p-7">
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#312e81]/55 mb-2">Pour réserver une séance</p>
              <p className="text-[#312e81]/75 leading-relaxed text-[15px]">
                Les réservations de séances et inscriptions aux ateliers passent par un système externe — écrivez-moi ou
                appelez-moi et je vous transmets le lien adapté à votre demande.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
