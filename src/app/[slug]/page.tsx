import { getAllPosts, getPostBySlug, getRelatedPosts, formatDate } from "@/lib/content";
import PostCard from "@/components/PostCard";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const title = post.seo.title || post.title;
  const description = post.seo.description || post.excerpt.replace(/<[^>]+>/g, "").slice(0, 160);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.modified,
      images: post.featuredImage ? [{ url: post.featuredImage }] : [],
      tags: post.tags.map((t) => t.name),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post, 4);

  // Structured data for Google News
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
      logo: { "@type": "ImageObject", url: "https://metal-mantra.com/logo.png" },
    },
    description: post.seo.description || post.excerpt.replace(/<[^>]+>/g, "").slice(0, 160),
    wordCount: post.wordCount,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-mantra-muted flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-mantra-red transition-colors">Home</Link>
          <span>/</span>
          {post.categories[0] && (
            <>
              <Link href={`/categories/${post.categories[0]}/`} className="hover:text-mantra-red transition-colors capitalize">
                {post.categories[0].replace(/-/g, " ")}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-mantra-dim truncate">{post.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className={`px-2.5 py-0.5 text-xs font-medium uppercase tracking-wider rounded border ${
              post.contentType === "rundown"
                ? "bg-mantra-ember/20 text-mantra-ember border-mantra-ember/30"
                : post.contentType === "festival"
                ? "bg-purple-900/30 text-purple-400 border-purple-500/30"
                : post.contentType === "review"
                ? "bg-blue-900/30 text-blue-400 border-blue-500/30"
                : post.contentType === "feature"
                ? "bg-amber-900/30 text-amber-400 border-amber-500/30"
                : "bg-mantra-red/10 text-mantra-red border-mantra-red/30"
            }`}>
              {post.contentType}
            </span>
            <time className="text-sm text-mantra-muted">{formatDate(post.date)}</time>
            <span className="text-sm text-mantra-dim">&middot; {post.readingTime} min read</span>
            <span className="text-sm text-mantra-dim">&middot; {post.wordCount} words</span>
          </div>

          <h1
            className="text-3xl md:text-5xl font-black text-white leading-tight"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "0.01em" }}
          >
            {post.title}
          </h1>
        </header>

        {/* Featured Image */}
        {post.featuredImage && (
          <figure className="mb-8 rounded-xl overflow-hidden">
            <img
              src={post.featuredImage}
              alt={post.featuredImageAlt || post.title}
              className="w-full"
            />
          </figure>
        )}

        {/* Content */}
        <div
          className="article-content max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mt-10 pt-6 border-t border-mantra-border">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs uppercase tracking-widest text-mantra-muted font-bold">Tags:</span>
              {post.tags.map((tag) => (
                <Link
                  key={tag.slug}
                  href={`/tags/${tag.slug}/`}
                  className="px-2.5 py-1 text-xs bg-mantra-dark border border-mantra-border text-mantra-muted hover:text-mantra-red hover:border-mantra-red/30 rounded-md transition-all"
                >
                  {tag.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Share */}
        <div className="mt-6 pt-6 border-t border-mantra-border flex items-center gap-4">
          <span className="text-xs uppercase tracking-widest text-mantra-muted font-bold">Share:</span>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://metal-mantra.com/${post.slug}/`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-mantra-muted hover:text-mantra-red transition-colors"
            aria-label="Share on X"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://metal-mantra.com/${post.slug}/`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-mantra-muted hover:text-mantra-red transition-colors"
            aria-label="Share on Facebook"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
        </div>
      </article>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 border-t border-mantra-border">
          <h2
            className="text-lg font-bold uppercase tracking-wider text-white mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Related Stories
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((rp) => (
              <PostCard key={rp.id} post={rp} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
