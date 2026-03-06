import { Post, getRelatedPosts, formatDate } from "@/lib/content";
import { optimizeImage } from "@/lib/cloudinary";
import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar";
import AffiliateWidget from "@/components/AffiliateWidget";
import SponsorSlot from "@/components/SponsorSlot";
import ShareBar from "@/components/ShareBar";
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

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://metal-mantra.com/" },
      { "@type": "ListItem", position: 2, name: post.urlPrefix, item: `https://metal-mantra.com/${post.urlPrefix}/` },
      { "@type": "ListItem", position: 3, name: post.title },
    ],
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    datePublished: post.date,
    dateModified: post.modified,
    image: post.featuredImage || undefined,
    author: {
      "@type": "Person",
      name: post.author || "FeNyX42",
      url: `https://metal-mantra.com/author/${(post.author || "FeNyX42").toLowerCase()}/`,
    },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
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
            <span className="text-sm text-mantra-dim">&middot;</span>
            <Link
              href={`/author/${(post.author || "FeNyX42").toLowerCase()}/`}
              className="text-sm text-mantra-muted hover:text-mantra-red transition-colors"
            >
              By {post.author || "FeNyX42"}
            </Link>
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
            <img src={optimizeImage(post.featuredImage, 1200)} alt={post.featuredImageAlt || post.title} className="w-full" />
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

        {/* Share — inline row */}
        <div className="mt-6 pt-6 border-t border-mantra-border">
          <ShareBar title={post.title} url={`https://metal-mantra.com${post.path}`} variant="inline" />
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

      {/* Floating share bar — appears on scroll */}
      <ShareBar title={post.title} url={`https://metal-mantra.com${post.path}`} variant="floating" />

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
