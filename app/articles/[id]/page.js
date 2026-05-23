import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import SiteHeader from '@/components/site/SiteHeader';
import SiteFooter from '@/components/site/SiteFooter';
import { CTASection } from '@/components/site/Shared';
import { ArrowLeft, Calendar } from 'lucide-react';

export const dynamic = 'force-dynamic';

const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

async function getArticle(id) {
  try {
    const res = await fetch(`${BASE}/api/entries/articles/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const d = await res.json();
    return d.entry || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const article = await getArticle(params.id);
  if (!article) return { title: 'Article introuvable' };
  return {
    title: article.title,
    description: article.description || (article.content || '').slice(0, 160) || article.title,
    openGraph: {
      title: article.title,
      description: article.description || '',
      images: article.imageUrl ? [{ url: article.imageUrl }] : undefined,
      type: 'article',
      publishedTime: article.createdAt,
    },
  };
}

function formatLong(d) {
  try {
    return new Date(d).toLocaleDateString('fr-CH', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return '';
  }
}

export default async function ArticlePage({ params }) {
  const article = await getArticle(params.id);
  if (!article) notFound();

  const readingTime = Math.max(
    2,
    Math.ceil(
      ((article.content || '') + ' ' + (article.description || '')).split(/\s+/).filter(Boolean).length / 220
    )
  );

  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />

      <article className="pt-32 md:pt-40 pb-12">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-[#4338ca] text-sm hover:text-[#312e81] mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Retour aux articles
            </Link>

            <div className="flex flex-wrap items-center gap-4 mb-6 text-[12px] uppercase tracking-[0.18em] text-[#312e81]/60">
              <span className="inline-flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" />
                {formatLong(article.createdAt)}
              </span>
              <span className="w-1 h-1 rounded-full bg-[#312e81]/30" />
              <span>{readingTime} min de lecture</span>
              {article.subtitle && (
                <>
                  <span className="w-1 h-1 rounded-full bg-[#312e81]/30" />
                  <span className="text-[#4338ca]">{article.subtitle}</span>
                </>
              )}
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-[58px] leading-[1.05] tracking-tight text-[#312e81] text-balance">
              {article.title}
            </h1>

            {article.description && (
              <p className="mt-7 text-lg md:text-xl text-[#312e81]/75 leading-relaxed font-light max-w-2xl">
                {article.description}
              </p>
            )}

            {article.tags?.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {article.tags.map((t) => (
                  <span key={t} className="text-[11px] px-3 py-1 rounded-full tag-indigo">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </article>

      {article.imageUrl && (
        <div className="pb-12 md:pb-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto rounded-[2rem] overflow-hidden border border-[#312e81]/10 shadow-[0_24px_60px_-20px_rgba(49,46,129,0.25)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={article.imageUrl} alt={article.title} className="w-full h-auto object-cover" />
            </div>
          </div>
        </div>
      )}

      <section className="pb-20 md:pb-28">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            {article.content ? (
              <div className="text-[#312e81]/85 text-[17.5px] md:text-[18px] leading-[1.78] space-y-5 article-body">
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <p className="leading-[1.78]">{children}</p>,
                    strong: ({ children }) => <strong className="font-semibold text-[#312e81]">{children}</strong>,
                    em: ({ children }) => <em className="italic text-[#4338ca]">{children}</em>,
                    h2: ({ children }) => (
                      <h2 className="font-serif text-2xl md:text-3xl text-[#312e81] mt-10 mb-2 tracking-tight">{children}</h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="font-serif text-xl md:text-2xl text-[#312e81] mt-8 mb-2 tracking-tight">{children}</h3>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="my-6 pl-5 border-l-2 border-[#4338ca]/40 font-serif italic text-xl text-[#4338ca] leading-snug">
                        {children}
                      </blockquote>
                    ),
                    ul: ({ children }) => <ul className="list-disc pl-6 space-y-2 marker:text-[#4338ca]/60">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal pl-6 space-y-2 marker:text-[#4338ca]/60">{children}</ol>,
                    li: ({ children }) => <li className="leading-[1.72]">{children}</li>,
                    a: ({ href, children }) => (
                      <a href={href} className="text-[#4338ca] underline underline-offset-2 hover:text-[#312e81]" target="_blank" rel="noopener noreferrer">
                        {children}
                      </a>
                    ),
                    hr: () => <hr className="my-10 border-[#312e81]/15" />,
                    code: ({ children }) => (
                      <code className="px-1.5 py-0.5 rounded bg-[#eef0fb] text-[#312e81] text-[15px]">{children}</code>
                    ),
                  }}
                >
                  {article.content}
                </ReactMarkdown>
              </div>
            ) : (
              <p className="text-[#312e81]/60 italic">
                Le contenu complet de cet article sera publié bientôt.
              </p>
            )}

            <div className="mt-14 pt-8 border-t border-[#312e81]/10">
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#312e81]/50 mb-1">Publié le</p>
              <p className="text-[#312e81] font-medium">{formatLong(article.createdAt)}</p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Continuer l'échange."
        subtitle="Cet article résonne avec ce que vous traversez ? Écrivons-nous — un mot, une question, une rencontre."
        buttonLabel="Écrire un message"
      />
      <SiteFooter />
    </main>
  );
}
