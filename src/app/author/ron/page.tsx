import type { Metadata } from "next";
import { getAllPosts } from "@/lib/content";
import PostCard from "@/components/PostCard";

export const metadata: Metadata = {
  title: "Ron — Author | Metal Mantra",
  description:
    "Ron is the Editor-in-Chief at Metal Mantra — covering heavy music news, tours, and releases because the scene deserves better coverage.",
  alternates: { canonical: "/author/ron/" },
  openGraph: {
    title: "Ron — Author | Metal Mantra",
    description:
      "Editor-in-Chief at Metal Mantra. Heavy music news, tours, and releases.",
    type: "profile",
    url: "/author/ron/",
  },
  twitter: {
    card: "summary",
    site: "@MetalMantraNews",
    title: "Ron — Author | Metal Mantra",
    description:
      "Editor-in-Chief at Metal Mantra. Heavy music news, tours, and releases.",
  },
};

export default function RonPage() {
  const posts = getAllPosts().filter((p) => p.author === "Ron");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ron",
    url: "https://metal-mantra.com/author/ron/",
    jobTitle: "Editor-in-Chief",
    worksFor: {
      "@type": "Organization",
      name: "Metal Mantra",
      url: "https://metal-mantra.com",
    },
    description:
      "Editor-in-Chief at Metal Mantra. Covers heavy music news, tours, festivals, and releases.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <h1
          className="text-3xl font-black text-white tracking-wider"
          style={{ fontFamily: "var(--font-display)" }}
        >
          RON
        </h1>
        <p className="mt-1 text-mantra-red font-bold text-sm uppercase tracking-wide">
          Editor-in-Chief
        </p>

        <div className="mt-8 space-y-5 text-mantra-text leading-relaxed">
          <p>
            I keep the lights on at Metal Mantra — the rundowns, the breaking news, the
            tour dates, the album drops, and everything in between. If it happened in
            heavy music today, there&rsquo;s a good chance I&rsquo;m already writing about it.
          </p>
          <p>
            This isn&rsquo;t a paycheck gig for me. I genuinely love this music. The riffs
            that make you forget where you are, the albums that rewire how you hear
            everything after them, the moment a band you&rsquo;ve been following for years
            finally gets the recognition they earned — that&rsquo;s why I do this.
          </p>
          <p>
            I cover metal, metalcore, hardcore, and everything heavy that deserves
            attention. My goal is the same as yours: never miss the news that matters
            and skip the noise that doesn&rsquo;t.
          </p>
        </div>

        {posts.length > 0 && (
          <div className="mt-14">
            <h2
              className="text-xl font-bold text-white mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              LATEST FROM RON
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {posts.slice(0, 8).map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
            {posts.length > 8 && (
              <p className="mt-6 text-mantra-muted text-sm">
                Showing 8 of {posts.length} posts.
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
