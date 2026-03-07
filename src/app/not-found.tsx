import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/content";
import PostCard from "@/components/PostCard";

export const metadata: Metadata = {
  title: "404 — Page Not Found | Metal Mantra",
};

export default function NotFound() {
  const recentPosts = getAllPosts().slice(0, 4);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1
          className="text-8xl md:text-[10rem] font-black text-mantra-border leading-none"
          style={{ fontFamily: "var(--font-display)" }}
        >
          404
        </h1>
        <p className="mt-4 text-xl text-white font-bold" style={{ fontFamily: "var(--font-heading)" }}>
          Nothing here but feedback and broken dreams.
        </p>
        <p className="mt-2 text-mantra-muted">
          The page you&apos;re looking for doesn&apos;t exist, got moved, or never made it out of the pit.
        </p>

        {/* Search */}
        <form action="/search/" method="get" className="mt-8 flex gap-2 max-w-md mx-auto">
          <input
            type="text"
            name="q"
            placeholder="Search Metal Mantra..."
            className="flex-1 bg-mantra-card border border-mantra-border rounded-lg px-4 py-3 text-white placeholder-mantra-dim focus:outline-none focus:border-mantra-red/50 transition-all"
          />
          <button
            type="submit"
            className="px-5 py-3 bg-mantra-red hover:bg-mantra-red-hot text-white text-sm font-bold uppercase tracking-wider rounded-lg transition-colors"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Search
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 bg-mantra-card border border-mantra-border hover:border-mantra-red/30 text-mantra-muted hover:text-white text-sm font-bold uppercase tracking-wider rounded transition-all"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            ← Home
          </Link>
          <Link
            href="/tours/"
            className="px-6 py-3 bg-mantra-card border border-mantra-border hover:border-mantra-red/30 text-mantra-muted hover:text-white text-sm font-bold uppercase tracking-wider rounded transition-all"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Tours
          </Link>
          <Link
            href="/reviews/"
            className="px-6 py-3 bg-mantra-card border border-mantra-border hover:border-mantra-red/30 text-mantra-muted hover:text-white text-sm font-bold uppercase tracking-wider rounded transition-all"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Reviews
          </Link>
        </div>
      </div>

      {/* Recent posts */}
      <div>
        <h2
          className="text-sm font-bold uppercase tracking-[0.2em] text-mantra-dim mb-6 text-center"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Latest from Metal Mantra
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
