import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar";
import BreakingTicker from "@/components/BreakingTicker";
import NewsletterSignup from "@/components/NewsletterSignup";
import Link from "next/link";
import { getLatestPosts, getPostsByType } from "@/lib/content";

export default function HomePage() {
  // Get latest posts — exclude rundowns from main feed
  const allLatest = getLatestPosts(40);
  const nonRundown = allLatest.filter((p) => p.contentType !== "rundown");

  // Hero should be breaking news/tour/festival — not reviews or features
  const heroPool = nonRundown.filter((p) => ["news", "tour", "festival"].includes(p.contentType));
  const hero = heroPool[0];
  const subHeroes = heroPool.slice(1, 3);   // 2 side features
  // News grid: only news/tour posts, no festivals bleeding in
  const newsOnly = nonRundown.filter((p) => p.contentType === "news" || p.contentType === "tour");
  const gridPosts = newsOnly.slice(0, 6);
  const morePosts = nonRundown.slice(9, 15);  // mixed is fine for "More Stories"

  // Ticker: most recent 8 non-rundown posts
  const tickerPosts = nonRundown.slice(0, 8);

  // Featured content by type — strict
  const festivals = getPostsByType("festival").slice(0, 3);
  const features = getPostsByType("feature").slice(0, 3);

  return (
    <>
      {/* Breaking News Ticker */}
      <BreakingTicker posts={tickerPosts} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* ═══ HERO SECTION ═══ */}
        <section className="py-6">
          <div className="grid lg:grid-cols-3 gap-4">
            {/* Main Hero */}
            <div className="lg:col-span-2">
              {hero && <PostCard post={hero} variant="hero" />}
            </div>

            {/* Side Stack — 2 featured cards */}
            <div className="flex flex-col gap-4">
              {subHeroes.map((post) => (
                <Link key={post.id} href={post.path} className="group relative flex-1 overflow-hidden rounded-lg">
                  <div className="relative h-full min-h-[180px]">
                    {post.featuredImage ? (
                      <img src={post.featuredImage} alt={post.featuredImageAlt || post.title} className="w-full h-full object-cover absolute inset-0 group-hover:scale-[1.03] transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full absolute inset-0 bg-gradient-to-br from-mantra-card to-mantra-black" />
                    )}
                    <div className="hero-gradient absolute inset-0" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3
                        className="text-sm md:text-base font-bold text-white leading-tight group-hover:text-mantra-red-hot transition-colors line-clamp-2"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {post.title}
                      </h3>
                      <time className="mt-1 text-[11px] text-gray-400 block">{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</time>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ MAIN CONTENT ═══ */}
        <div className="lg:grid lg:grid-cols-3 lg:gap-8 pb-12">
          {/* Main Feed — 2/3 */}
          <div className="lg:col-span-2">
            {/* Latest News Grid */}
            <section>
              <div className="section-header flex items-center justify-between">
                <h2
                  className="text-sm font-bold uppercase tracking-[0.15em] text-white"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  News &amp; Tours
                </h2>
                <Link href="/news/" className="text-[11px] text-mantra-dim hover:text-mantra-red uppercase tracking-wider font-bold transition-colors">
                  View All &rarr;
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {gridPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </section>

            {/* Featured / Long-form */}
            {features.length > 0 && (
              <section className="mt-12">
                <div className="section-header flex items-center justify-between">
                  <h2
                    className="text-sm font-bold uppercase tracking-[0.15em] text-white"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Features
                  </h2>
                  <Link href="/features/" className="text-[11px] text-mantra-dim hover:text-mantra-red uppercase tracking-wider font-bold transition-colors">
                    View All &rarr;
                  </Link>
                </div>
                <div className="space-y-4">
                  {features.map((post) => (
                    <PostCard key={post.id} post={post} variant="featured" />
                  ))}
                </div>
              </section>
            )}

            {/* Festivals */}
            {festivals.length > 0 && (
              <section className="mt-12">
                <div className="section-header flex items-center justify-between">
                  <h2
                    className="text-sm font-bold uppercase tracking-[0.15em] text-white"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Festivals &amp; Events
                  </h2>
                  <Link href="/festivals/" className="text-[11px] text-mantra-dim hover:text-mantra-red uppercase tracking-wider font-bold transition-colors">
                    View All &rarr;
                  </Link>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  {festivals.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </section>
            )}

            {/* Newsletter CTA */}
            <section className="mt-12">
              <NewsletterSignup />
            </section>

            {/* More Stories */}
            {morePosts.length > 0 && (
              <section className="mt-12">
                <div className="section-header">
                  <h2
                    className="text-sm font-bold uppercase tracking-[0.15em] text-white"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    More Stories
                  </h2>
                </div>
                <div className="space-y-0">
                  {morePosts.map((post) => (
                    <PostCard key={post.id} post={post} variant="horizontal" />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar — 1/3 */}
          <div className="mt-10 lg:mt-0">
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
}
