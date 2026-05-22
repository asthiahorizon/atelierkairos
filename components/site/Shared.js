import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

export function PageHero({ kicker, title, italic, subtitle }) {
  return (
    <section className="relative pt-36 pb-16 md:pt-44 md:pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#eae2d0] via-[#f5efe4] to-[#f5efe4] -z-10" />
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-[#5e7a5e]/10 rounded-full blur-3xl -z-10" />
      <div className="container mx-auto px-6">
        {kicker && (
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-[#28201a]/30" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#28201a]/60">{kicker}</span>
          </div>
        )}
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-[88px] leading-[1.02] tracking-tight max-w-5xl text-balance">
          {title} {italic && <span className="italic font-light text-[#1d2a3f]">{italic}</span>}
        </h1>
        {subtitle && (
          <p className="mt-8 max-w-2xl text-lg md:text-xl text-[#28201a]/70 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

export function CTASection({ title, subtitle, buttonLabel = 'Prendre contact', href = '/contact' }) {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="relative overflow-hidden bg-[#1d2a3f] text-[#f5efe4] rounded-[2.5rem] p-10 md:p-16 lg:p-20">
          <div className="absolute -right-32 -top-32 w-[400px] h-[400px] rounded-full bg-[#5e7a5e]/25 blur-3xl animate-breathe" />
          <div className="absolute -left-20 -bottom-20 w-[300px] h-[300px] rounded-full bg-[#c9b694]/15 blur-3xl" />
          <div className="relative max-w-3xl">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-6 text-lg text-[#f5efe4]/80 leading-relaxed max-w-2xl">
                {subtitle}
              </p>
            )}
            <Link
              href={href}
              className="mt-10 inline-flex items-center gap-2 px-7 py-4 bg-[#f5efe4] text-[#1d2a3f] rounded-full text-sm hover:bg-[#c9b694] transition-all group"
            >
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
        <div className={`flex items-center gap-3 mb-5 ${center ? 'justify-center' : ''}`}>
          <span className="w-8 h-px bg-[#28201a]/30" />
          <span className="text-xs uppercase tracking-[0.25em] text-[#28201a]/60">{kicker}</span>
          {center && <span className="w-8 h-px bg-[#28201a]/30" />}
        </div>
      )}
      <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-tight text-balance">
        {title} {italic && <span className="italic font-light text-[#1d2a3f]">{italic}</span>}
      </h2>
      {subtitle && (
        <p className="mt-6 text-lg text-[#28201a]/70 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function TagList({ tags, label = 'Indications possibles' }) {
  return (
    <div>
      {label && <p className="text-xs uppercase tracking-widest text-[#28201a]/55 mb-4">{label}</p>}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs md:text-sm px-3.5 py-1.5 rounded-full bg-[#28201a]/5 text-[#28201a]/80 border border-[#28201a]/10"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export { ArrowUpRight, ArrowRight };
