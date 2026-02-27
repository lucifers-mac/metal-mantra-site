import Link from "next/link";
import { getTrendingPosts, getPopularTags, formatDateShort } from "@/lib/content";

export default function Sidebar() {
  const trending = getTrendingPosts(5);
  const popularTags = getPopularTags(20);

  return (
    <aside className="space-y-8">
      {/* Trending */}
      <div className="bg-mantra-card border border-mantra-border rounded-xl p-5">
        <h3
          className="text-sm font-bold uppercase tracking-widest text-mantra-red mb-4 flex items-center gap-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span className="w-2 h-2 rounded-full bg-mantra-red animate-pulse" />
          Trending
        </h3>
        <div className="space-y-4">
          {trending.map((post, i) => (
            <Link key={post.id} href={post.path} className="group flex gap-3 items-start">
              <span className="text-2xl font-black text-mantra-border group-hover:text-mantra-red transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h4 className="text-sm font-medium text-white leading-snug group-hover:text-mantra-red transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <time className="text-xs text-mantra-dim mt-0.5 block">{formatDateShort(post.date)}</time>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Tags */}
      <div className="bg-mantra-card border border-mantra-border rounded-xl p-5">
        <h3
          className="text-sm font-bold uppercase tracking-widest text-mantra-muted mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Popular Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <Link
              key={tag.id}
              href={`/tags/${tag.slug}/`}
              className="px-2.5 py-1 text-xs bg-mantra-dark border border-mantra-border text-mantra-muted hover:text-mantra-red hover:border-mantra-red/30 rounded-md transition-all"
            >
              {tag.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Merch CTA */}
      <div className="bg-gradient-to-br from-mantra-red/10 to-mantra-card border border-mantra-red/20 rounded-xl p-5 text-center">
        <p className="text-xs uppercase tracking-widest text-mantra-red font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
          Merch
        </p>
        <p className="text-sm text-mantra-muted mb-3">Rep the scene.</p>
        <a
          href="https://bl3gh.co"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-mantra-red hover:bg-mantra-red-hot text-white text-sm font-bold rounded-lg transition-colors"
        >
          Shop bl3gh.co
        </a>
      </div>
    </aside>
  );
}
