import PostCard from "@/components/PostCard";
import AffiliateWidget from "@/components/AffiliateWidget";
import SponsorSlot from "@/components/SponsorSlot";
import { getAllTags, getPostsByTag } from "@/lib/content";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllTags()
    .filter((t) => t.count > 0)
    .map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = getAllTags().find((t) => t.slug === slug);
  return {
    title: tag ? `${tag.name} | Metal Mantra` : slug,
    description: tag
      ? `All Metal Mantra coverage of ${tag.name} — news, reviews, tours, and more.`
      : "",
    openGraph: {
      title: tag ? `${tag.name} | Metal Mantra` : slug,
      description: tag ? `All Metal Mantra coverage of ${tag.name}.` : "",
    },
  };
}

export default async function TagPage({ params }: PageProps) {
  const { slug } = await params;
  const tag = getAllTags().find((t) => t.slug === slug);
  if (!tag) notFound();

  const posts = getPostsByTag(slug);
  const amazonUrl = `https://www.amazon.com/s?k=${encodeURIComponent(tag.name + " music")}&i=digital-music&tag=metalmantra-20`;
  const audibleUrl = `https://www.audible.com/search?keywords=${encodeURIComponent(tag.name)}&tag=metalmantra08-20`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <header className="mb-8 pb-6 border-b border-mantra-border">
        <span className="text-xs uppercase tracking-widest text-mantra-red font-bold">Artist / Topic</span>
        <h1 className="mt-1 text-4xl font-black text-white tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
          {tag.name.toUpperCase()}
        </h1>
        <p className="mt-2 text-mantra-muted text-sm">
          {posts.length} {posts.length === 1 ? "story" : "stories"} on Metal Mantra
        </p>

        {/* Quick Action Bar */}
        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href={amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-900/20 border border-amber-500/30 text-amber-400 hover:bg-amber-900/40 rounded text-sm font-bold uppercase tracking-wider transition-all"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
            </svg>
            Buy Music on Amazon
          </a>
          <a
            href={audibleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-900/20 border border-orange-500/30 text-orange-400 hover:bg-orange-900/40 rounded text-sm font-bold uppercase tracking-wider transition-all"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
            Books & Docs on Audible
          </a>
          <Link
            href="/calendar/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-mantra-red/10 border border-mantra-red/30 text-mantra-red hover:bg-mantra-red hover:text-white rounded text-sm font-bold uppercase tracking-wider transition-all"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            Find Shows Near You
          </Link>
        </div>
      </header>

      <div className="lg:grid lg:grid-cols-3 lg:gap-10">
        {/* Posts Grid */}
        <div className="lg:col-span-2">
          {posts.length === 0 ? (
            <p className="text-mantra-muted">No stories yet. Check back soon.</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-5">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="mt-10 lg:mt-0 space-y-6">
          {/* Live shows widget for this artist */}
          <AffiliateWidget bands={[tag.name]} />
          <SponsorSlot label="Sponsored By" />
        </div>
      </div>
    </div>
  );
}
