import Link from "next/link";
import { getPostsByTag } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Metal & Hard Rock Guides | Metal Mantra",
  description:
    "Deep-dive guides to the biggest festivals, tours, and artists in metal and hard rock. Dates, tickets, and everything you need to know.",
  alternates: { canonical: "/guides/" },
};

const CATEGORIES: { label: string; slugs: string[] } [] = [
  {
    label: "Festivals",
    slugs: [
      "louder-than-life-2026",
      "aftershock-2026-festival-guide",
      "sonic-temple-2026",
      "welcome-to-rockville-2026",
      "headbangers-boat-2026",
      "sick-new-world",
    ],
  },
  {
    label: "Tours & Artists",
    slugs: [
      "metallica-sphere-las-vegas-2026",
      "top-10-metal-tours-coming-in-2026",
      "iron-maiden-discography-legacy",
    ],
  },
  {
    label: "Albums & Music",
    slugs: ["top-10-upcoming-metal-albums-2026"],
  },
];

export default function GuidesPage() {
  const guides = getPostsByTag("guide");
  const bySlug = Object.fromEntries(guides.map((p) => [p.slug, p]));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <header className="mb-10 border-b border-mantra-border pb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-mantra-red font-bold mb-2" style={{ fontFamily: "var(--font-heading)" }}>
          Essential Reading
        </p>
        <h1
          className="text-4xl font-black text-white tracking-wider mb-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          GUIDES
        </h1>
        <p className="text-mantra-muted max-w-xl">
          Deep-dive coverage of the festivals, tours, and artists that matter. Everything you need — dates, tickets, lineups, and context — in one place.
        </p>
      </header>

      {/* Categorized sections */}
      <div className="space-y-12">
        {CATEGORIES.map(({ label, slugs }) => {
          const posts = slugs.map((s) => bySlug[s]).filter(Boolean);
          if (!posts.length) return null;
          return (
            <section key={label}>
              <h2
                className="text-xs uppercase tracking-[0.2em] text-mantra-red font-bold mb-5"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {label}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {posts.map((post) => (
                  <GuideCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* CTA */}
      <div className="mt-16 border-t border-mantra-border pt-8 text-center">
        <p className="text-mantra-muted text-sm mb-4">More guides drop as tour season builds. Stay in the loop.</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/tours/" className="px-5 py-2 bg-mantra-card border border-mantra-border text-mantra-muted hover:text-white hover:border-mantra-red/30 text-xs uppercase tracking-wider font-bold rounded transition-all" style={{ fontFamily: "var(--font-heading)" }}>
            All Tours
          </Link>
          <Link href="/festivals/" className="px-5 py-2 bg-mantra-card border border-mantra-border text-mantra-muted hover:text-white hover:border-mantra-red/30 text-xs uppercase tracking-wider font-bold rounded transition-all" style={{ fontFamily: "var(--font-heading)" }}>
            All Festivals
          </Link>
          <Link href="/rundowns/" className="px-5 py-2 bg-mantra-card border border-mantra-border text-mantra-muted hover:text-white hover:border-mantra-red/30 text-xs uppercase tracking-wider font-bold rounded transition-all" style={{ fontFamily: "var(--font-heading)" }}>
            Rundowns
          </Link>
        </div>
      </div>
    </div>
  );
}

function GuideCard({ post }: { post: ReturnType<typeof getPostsByTag>[number] }) {
  const href = `/${post.slug}/`;
  return (
    <Link href={href} className="group block bg-mantra-card border border-mantra-border rounded-lg overflow-hidden hover:border-mantra-red/40 transition-all">
      {post.featuredImage && (
        <div className="aspect-[16/9] overflow-hidden bg-mantra-dark">
          <img
            src={post.featuredImage}
            alt={post.featuredImageAlt || post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-4">
        <h3
          className="font-bold text-white text-sm leading-snug group-hover:text-mantra-ember transition-colors mb-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-mantra-muted text-xs leading-relaxed line-clamp-2">
            {post.excerpt.replace(/^Last Updated:.*?—\s*/, "").replace(/^Last Updated:.*?\n/, "")}
          </p>
        )}
        <span className="inline-block mt-3 text-[11px] text-mantra-red font-bold uppercase tracking-wider group-hover:text-mantra-ember transition-colors" style={{ fontFamily: "var(--font-heading)" }}>
          Read Guide →
        </span>
      </div>
    </Link>
  );
}
