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
            Tyson (FeNyX42) is the founder of Metal Mantra and has been deep in the heavy
            music scene for over three decades — from the Bay Area underground to stages
            and festivals across the country. He built Metal Mantra because the scene
            deserves coverage that actually comes from inside it: real news from real
            working bands, from rising metalcore acts to legendary artists still pushing
            the genre.
          </p>
          <p>
            Metal Mantra covers tours, new releases, reviews, and live reporting with the
            same energy the music demands. Every Monday, Wednesday, and Friday morning,
            the{" "}
            <Link href="/rundowns/" className="text-mantra-red hover:underline">
              Metal Rundown
            </Link>{" "}
            drops the biggest stories in heavy music so you never miss what happened.
          </p>
          <p>
            When he&rsquo;s not publishing, Tyson runs{" "}
            <a
              href="https://bl3gh.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-mantra-red hover:underline"
            >
              bl3gh
            </a>
            , a creative brand producing custom apparel, vinyl stickers, and 3D-printed
            goods inspired by heavy music culture.
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
