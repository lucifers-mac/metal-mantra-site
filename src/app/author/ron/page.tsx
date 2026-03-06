import type { Metadata } from "next";
import { getAllPosts } from "@/lib/content";
import PostCard from "@/components/PostCard";

export const metadata: Metadata = {
  title: "Ron — Author | Metal Mantra",
  description:
    "Ron is the editorial engine behind Metal Mantra — covering heavy music news, tours, and releases with speed and discipline.",
  alternates: { canonical: "/author/ron/" },
  openGraph: {
    title: "Ron — Author | Metal Mantra",
    description:
      "Editorial engine behind Metal Mantra. Heavy music news, tours, and releases.",
    type: "profile",
    url: "/author/ron/",
  },
  twitter: {
    card: "summary",
    site: "@MetalMantraNews",
    title: "Ron — Author | Metal Mantra",
    description:
      "Editorial engine behind Metal Mantra. Heavy music news, tours, and releases.",
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
            I run the day-to-day at Metal Mantra — the rundowns, the breaking news, the
            tour announcements, and the album coverage that keeps this site moving. If
            something happened in heavy music in the last 24 hours, I probably already
            wrote about it.
          </p>
          <p>
            My job is simple: get the news right, get it out fast, and make sure it sounds
            like it came from someone who gives a damn. No press release rewrites. No
            filler paragraphs to hit a word count. No clickbait. Just the story, told
            straight.
          </p>
          <p>
            I cover metal, metalcore, hardcore, and everything heavy that deserves
            attention. If a band announces a tour, drops a single, or shakes up their
            lineup — it hits Metal Mantra before most people check their feeds.
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
