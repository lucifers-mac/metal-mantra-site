import type { Metadata } from "next";
import { getAllPosts } from "@/lib/content";
import PostCard from "@/components/PostCard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FeNyX42 — Author | Metal Mantra",
  description:
    "FeNyX42 is the founder and editor of Metal Mantra. 30+ years deep in the Bay Area metal and hardcore scene.",
  alternates: { canonical: "/author/fenyx42/" },
  openGraph: {
    title: "FeNyX42 — Author | Metal Mantra",
    description:
      "Founder and editor of Metal Mantra. 30+ years in Bay Area metal and hardcore.",
    type: "profile",
    url: "/author/fenyx42/",
  },
  twitter: {
    card: "summary",
    site: "@MetalMantraNews",
    title: "FeNyX42 — Author | Metal Mantra",
    description:
      "Founder and editor of Metal Mantra. 30+ years in Bay Area metal and hardcore.",
  },
};

export default function FeNyX42Page() {
  const posts = getAllPosts().filter((p) => p.author === "FeNyX42");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "FeNyX42",
    url: "https://metal-mantra.com/author/fenyx42/",
    jobTitle: "Founder & Editor",
    worksFor: {
      "@type": "Organization",
      name: "Metal Mantra",
      url: "https://metal-mantra.com",
    },
    sameAs: [
      "https://x.com/MetalMantraNews",
      "https://www.instagram.com/metal_mantra",
      "https://www.facebook.com/MetalMantraOfficial",
    ],
    description:
      "Founder and editor of Metal Mantra. Over 30 years in the Bay Area metal and hardcore scene.",
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
          FeNyX42
        </h1>
        <p className="mt-1 text-mantra-red font-bold text-sm uppercase tracking-wide">
          Founder & Editor
        </p>

        <div className="mt-8 space-y-5 text-mantra-text leading-relaxed">
          <p>
            I&rsquo;ve been in the pit since before most metal blogs existed. Over 30 years in the
            Bay Area metal and hardcore scene — from the Ruthie&rsquo;s Inn days through the
            Gilman Street era, through the rise and fall of every wave that mattered.
          </p>
          <p>
            I built Metal Mantra because heavy music coverage got soft. Too many sites
            chasing clicks with listicle garbage and rewritten press releases. The scene
            deserves better than that. It deserves coverage from someone who actually goes
            to shows, actually buys records, and actually knows the difference between a
            band paying dues and a band buying hype.
          </p>
          <p>
            Metal Mantra covers tours, festivals, new releases, and the stories that matter
            to people who live this music — not people who consume it as content. Every
            Monday, Wednesday, and Friday morning, the{" "}
            <Link href="/rundowns/" className="text-mantra-red hover:underline">
              Metal Rundown
            </Link>{" "}
            drops the biggest stories in heavy music so you never miss what happened.
          </p>
          <p>
            If Death Angel is playing, I&rsquo;m there. That&rsquo;s all you need to know.
          </p>
        </div>

        {posts.length > 0 && (
          <div className="mt-14">
            <h2
              className="text-xl font-bold text-white mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              LATEST FROM FeNyX42
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
