import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

export function PageHero({ kicker, title, italic, subtitle }) {
  return (
    <section className="relative pt-32 pb-14 md:pt-40 md:pb-20">
      <div className="container mx-auto px-6 relative">
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-[88px] leading-[1.05] tracking-tight max-w-5xl text-balance text-[#312e81]">
          {title}{italic ? <> <span className="italic font-light">{italic}</span></> : null}
        </h1>
        {subtitle && (
          <p className="mt-8 max-w-2xl text-lg md:text-xl text-[#312e81]/70 leading-relaxed">{subtitle}</p>
        )}
      </div>
    </section>
  );
}

export function CTASection({ title, subtitle, buttonLabel = 'Prendre contact', href = '/contact' }) {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="relative overflow-hidden surface-dark rounded-[2.5rem] p-10 md:p-16 lg:p-20">
          <div className="relative max-w-3xl">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-white">
              {title}
            </h2>
            {subtitle && <p className="mt-6 text-lg text-white/75 leading-relaxed max-w-2xl">{subtitle}</p>}
            <Link
              href={href}
              className="mt-10 inline-flex items-center gap-2 px-7 py-4 bg-white text-[#312e81] rounded-full text-sm hover:bg-[#a5b4fc] hover:text-[#1e1b4b] transition-all group"
            >
              {buttonLabel}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="absolute -right-20 -bottom-20 w-[280px] h-[280px] rounded-full bg-[#4338ca]/30 blur-[80px]" />
        </div>
      </div>
    </section>
  );
}

export function SectionTitle({ kicker, title, italic, subtitle, center }) {
  return (
    <div className={`max-w-3xl ${center ? 'mx-auto text-center' : ''} mb-12 md:mb-16`}>
      <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-balance text-[#312e81]">
        {title}{italic ? <> <span className="italic font-light">{italic}</span></> : null}
      </h2>
      {subtitle && <p className="mt-6 text-lg text-[#312e81]/70 leading-relaxed">{subtitle}</p>}
    </div>
  );
}

export function TagList({ tags, label = 'Indications possibles' }) {
  return (
    <div>
      {label && <p className="text-xs uppercase tracking-widest text-[#312e81]/55 mb-4">{label}</p>}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="text-xs md:text-sm px-3.5 py-1.5 rounded-full tag-indigo">{tag}</span>
        ))}
      </div>
    </div>
  );
}

export { ArrowUpRight, ArrowRight };
