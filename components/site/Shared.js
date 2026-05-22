import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

export function PageHero({ kicker, title, italic, subtitle }) {
  return (
    <section className="relative pt-36 pb-16 md:pt-44 md:pb-20 overflow-hidden bg-blobs">
      <div className="container mx-auto px-6 relative">
        {kicker && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-indigo mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4338ca] animate-pulse" />
            <span className="text-[11px] tracking-[0.25em] uppercase text-[#312e81]">{kicker}</span>
          </div>
        )}
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-[88px] leading-[1.02] tracking-tight max-w-5xl text-balance">
          {title} {italic && <span className="italic font-light text-[#4338ca]">{italic}</span>}
        </h1>
        {subtitle && (
          <p className="mt-8 max-w-2xl text-lg md:text-xl text-[#1e1b4b]/70 leading-relaxed">{subtitle}</p>
        )}
      </div>
    </section>
  );
}

export function CTASection({ title, subtitle, buttonLabel = 'Prendre contact', href = '/contact' }) {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="relative overflow-hidden glass-dark text-white rounded-[2.5rem] p-10 md:p-16 lg:p-20">
          <div className="absolute -right-32 -top-32 w-[420px] h-[420px] rounded-full bg-[#6366f1]/40 blur-3xl animate-shimmer" />
          <div className="absolute -left-20 -bottom-20 w-[320px] h-[320px] rounded-full bg-[#a78bfa]/30 blur-3xl" />
          <div className="relative max-w-3xl">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-tight">{title}</h2>
            {subtitle && <p className="mt-6 text-lg text-white/75 leading-relaxed max-w-2xl">{subtitle}</p>}
            <Link href={href} className="mt-10 inline-flex items-center gap-2 px-7 py-4 bg-white text-[#1e1b4b] rounded-full text-sm hover:bg-[#a5b4fc] transition-all group">
              {buttonLabel}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionTitle({ kicker, title, italic, subtitle, center }) {
  return (
    <div className={`max-w-3xl ${center ? 'mx-auto text-center' : ''} mb-12 md:mb-16`}>
      {kicker && (
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-indigo mb-5 ${center ? 'mx-auto' : ''}`}>
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#312e81]">{kicker}</span>
        </div>
      )}
      <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-tight text-balance">
        {title} {italic && <span className="italic font-light text-[#4338ca]">{italic}</span>}
      </h2>
      {subtitle && <p className="mt-6 text-lg text-[#1e1b4b]/70 leading-relaxed">{subtitle}</p>}
    </div>
  );
}

export function TagList({ tags, label = 'Indications possibles' }) {
  return (
    <div>
      {label && <p className="text-xs uppercase tracking-widest text-[#1e1b4b]/55 mb-4">{label}</p>}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="text-xs md:text-sm px-3.5 py-1.5 rounded-full glass-indigo text-[#312e81]">{tag}</span>
        ))}
      </div>
    </div>
  );
}

export { ArrowUpRight, ArrowRight };
