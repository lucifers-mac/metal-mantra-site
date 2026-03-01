import { Post, getRelatedPosts, formatDate } from "@/lib/content";
import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar";
import AffiliateWidget from "@/components/AffiliateWidget";
import SponsorSlot from "@/components/SponsorSlot";
import Link from "next/link";

const TYPE_BADGE: Record<string, string> = {
  rundown: "bg-mantra-ember/20 text-mantra-ember border-mantra-ember/30",
  news: "bg-mantra-red/10 text-mantra-red-hot border-mantra-red/30",
  festival: "bg-purple-900/30 text-purple-400 border-purple-500/30",
  review: "bg-blue-900/30 text-blue-400 border-blue-500/30",
  feature: "bg-amber-900/30 text-amber-400 border-amber-500/30",
  tour: "bg-emerald-900/30 text-emerald-400 border-emerald-500/30",
};

export default function ArticlePage({ post }: { post: Post }) {
  const related = getRelatedPosts(post, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    datePublished: post.date,
    dateModified: post.modified,
    image: post.featuredImage || undefined,
    author: { "@type": "Organization", name: "Metal Mantra" },
    publisher: {
      "@type": "Organization",
      name: "Metal Mantra",
      logo: { "@type": "ImageObject", url: "https://metal-mantra.com/metal-mantra-banner.png" },
    },
    description: post.seo.description || post.excerpt.replace(/<[^>]+>/g, "").slice(0, 160),
    wordCount: post.wordCount,
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://metal-mantra.com${post.path}` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-10">
          <article className="lg:col-span-2">
        {/* Breadcrumb */}
        <nav className="mb-6 text-xs text-mantra-muted flex items-center gap-2 flex-wrap uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
          <Link href="/" className="hover:text-mantra-red transition-colors">Home</Link>
          <span className="text-mantra-border">/</span>
          <Link href={`/${post.urlPrefix}/`} className="hover:text-mantra-red transition-colors">
            {post.urlPrefix}
          </Link>
          <span className="text-mantra-border">/</span>
          <span className="text-mantra-dim truncate max-w-xs normal-case">{post.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded border ${TYPE_BADGE[post.contentType] || TYPE_BADGE.news}`}>
              {post.contentType}
            </span>
            <time className="text-sm text-mantra-muted">{formatDate(post.date)}</time>
            <span className="text-sm text-mantra-dim">&middot; {post.readingTime} min read</span>
          </div>

          <h1
            className="text-3xl md:text-5xl font-black text-white leading-[1.1]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {post.title}
          </h1>

          {/* Red underline accent */}
          <div className="mt-4 w-16 h-0.5 bg-mantra-red" />
        </header>

        {/* Featured Image */}
        {post.featuredImage && (
          <figure className="mb-8 rounded-lg overflow-hidden">
            <img src={post.featuredImage} alt={post.featuredImageAlt || post.title} className="w-full" />
          </figure>
        )}

        {/* Content */}
        <div className="article-content max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mt-10 pt-6 border-t border-mantra-border">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] uppercase tracking-[0.15em] text-mantra-muted font-bold" style={{ fontFamily: "var(--font-heading)" }}>Tags:</span>
              {post.tags.map((tag) => (
                <Link
                  key={tag.slug}
                  href={`/tags/${tag.slug}/`}
                  className="px-2.5 py-1 text-[11px] bg-mantra-dark border border-mantra-border text-mantra-muted hover:text-white hover:border-mantra-red/30 rounded transition-all"
                >
                  {tag.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Share */}
        <div className="mt-6 pt-6 border-t border-mantra-border flex items-center gap-4">
          <span className="text-[11px] uppercase tracking-[0.15em] text-mantra-muted font-bold" style={{ fontFamily: "var(--font-heading)" }}>Share:</span>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://metal-mantra.com${post.path}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-mantra-muted hover:text-mantra-red transition-colors"
            aria-label="Share on X"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://metal-mantra.com${post.path}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-mantra-muted hover:text-mantra-red transition-colors"
            aria-label="Share on Facebook"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a
            href={`https://www.reddit.com/submit?url=${encodeURIComponent(`https://metal-mantra.com${post.path}`)}&title=${encodeURIComponent(post.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-mantra-muted hover:text-mantra-red transition-colors"
            aria-label="Share on Reddit"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 0-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>
          </a>
        </div>
          </article>

          {/* Sidebar */}
          <div className="mt-10 lg:mt-0 space-y-6">
            {/* Affiliate widget — shows + music for bands in this article */}
            {post.tags && post.tags.length > 0 && (
              <AffiliateWidget bands={post.tags.map((t) => t.name)} title={post.title} />
            )}
            <SponsorSlot label="Sponsored By" />
            <Sidebar />
          </div>
        </div>
      </div>

      {/* Related Posts — full width below */}
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 border-t border-mantra-border">
          <h2
            className="section-header text-sm font-bold uppercase tracking-[0.15em] text-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Related Stories
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {related.map((rp) => (
              <PostCard key={rp.id} post={rp} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
