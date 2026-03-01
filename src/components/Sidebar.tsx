import Link from "next/link";
import PostCard from "@/components/PostCard";
import NewsletterSignup from "@/components/NewsletterSignup";
import SponsorSlot from "@/components/SponsorSlot";
import { getTrendingPosts, getPopularTags, getPostsByType, formatDateShort } from "@/lib/content";

export default function Sidebar() {
  const trending = getTrendingPosts(5);
  const popularTags = getPopularTags(20);
  const rundowns = getPostsByType("rundown").slice(0, 4);

  return (
    <aside className="space-y-6">
      {/* Trending */}
      <div className="bg-mantra-card border border-mantra-border rounded-lg p-5">
        <h3
          className="section-header text-sm font-bold uppercase tracking-[0.15em] text-white flex items-center gap-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          <span className="w-2 h-2 rounded-full bg-mantra-red animate-pulse" />
          Trending Now
        </h3>
        <div>
          {trending.map((post, i) => (
            <PostCard key={post.id} post={post} variant="numbered" number={i + 1} />
          ))}
        </div>
      </div>

      {/* Rundowns */}
      {rundowns.length > 0 && (
        <div className="bg-mantra-card border border-mantra-border rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h3
              className="text-sm font-bold uppercase tracking-[0.15em] text-mantra-ember"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Rundowns
            </h3>
            <Link href="/rundowns/" className="text-[11px] text-mantra-dim hover:text-mantra-ember transition-colors uppercase tracking-wider font-bold">
              All &rarr;
            </Link>
          </div>
          <div>
            {rundowns.map((post) => (
              <PostCard key={post.id} post={post} variant="compact" />
            ))}
          </div>
        </div>
      )}

      {/* Newsletter — right after Rundowns */}
      <NewsletterSignup variant="footer" />

      {/* Sponsor */}
      <SponsorSlot />

      {/* Popular Tags */}
      <div className="bg-mantra-card border border-mantra-border rounded-lg p-5">
        <h3
          className="section-header text-sm font-bold uppercase tracking-[0.15em] text-white"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Topics
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {popularTags.map((tag) => (
            <Link
              key={tag.id}
              href={`/tags/${tag.slug}/`}
              className="px-2.5 py-1 text-[11px] bg-mantra-dark border border-mantra-border text-mantra-muted hover:text-white hover:border-mantra-red/30 hover:bg-mantra-red/5 rounded transition-all"
            >
              {tag.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Merch CTA */}
      <div className="relative overflow-hidden bg-mantra-card border border-mantra-red/20 rounded-lg p-5 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-mantra-red/5 to-transparent" />
        <div className="relative">
          <p
            className="text-xs uppercase tracking-[0.2em] text-mantra-red font-bold mb-1"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Merch
          </p>
          <p className="text-lg font-bold text-white mb-1" style={{ fontFamily: "var(--font-heading)" }}>Rep the Scene</p>
          <p className="text-xs text-mantra-muted mb-4">Official gear. No Hot Topic.</p>
          <a
            href="https://bl3gh.co"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-5 py-2 bg-mantra-red hover:bg-mantra-red-hot text-white text-xs font-bold uppercase tracking-wider rounded transition-colors"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Shop bl3gh.co
          </a>
        </div>
      </div>
    </aside>
  );
}
