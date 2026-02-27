import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { getLatestPosts, getPostsByType } from "@/lib/content";

export default function HomePage() {
  const latest = getLatestPosts(13);
  const hero = latest[0];
  const grid = latest.slice(1, 7);
  const more = latest.slice(7, 13);
  const rundowns = getPostsByType("rundown").slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Hero */}
      {hero && (
        <section className="mb-10">
          <PostCard post={hero} variant="hero" />
        </section>
      )}

      <div className="lg:grid lg:grid-cols-3 lg:gap-10">
        {/* Main Feed */}
        <div className="lg:col-span-2">
          {/* Latest News Grid */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-lg font-bold uppercase tracking-wider text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Latest
              </h2>
              <Link href="/news/" className="text-xs text-mantra-red hover:text-mantra-red-hot uppercase tracking-wider font-bold transition-colors">
                View All &rarr;
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {grid.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </section>

          {/* Rundowns Section */}
          {rundowns.length > 0 && (
            <section className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h2
                  className="text-lg font-bold uppercase tracking-wider text-white"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Rundowns
                </h2>
                <Link href="/rundowns/" className="text-xs text-mantra-ember hover:text-mantra-red uppercase tracking-wider font-bold transition-colors">
                  All Rundowns &rarr;
                </Link>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {rundowns.map((post) => (
                  <PostCard key={post.id} post={post} variant="compact" />
                ))}
              </div>
            </section>
          )}

          {/* More Stories */}
          {more.length > 0 && (
            <section className="mt-12">
              <h2
                className="text-lg font-bold uppercase tracking-wider text-white mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                More Stories
              </h2>
              <div className="space-y-5">
                {more.map((post) => (
                  <PostCard key={post.id} post={post} variant="horizontal" />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="mt-10 lg:mt-0">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
