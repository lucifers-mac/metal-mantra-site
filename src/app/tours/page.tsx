import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Metal Tours 2026",
  description: "Every major metal and hard rock tour happening in 2026. Dates, tickets, and coverage.",
};

export default function ToursPage() {
  const posts = getAllPosts().filter(
    (p) => p.slug.includes("tour") || p.categories.includes("tours") || p.tags.some((t) => t.slug.includes("tour"))
  );
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-white tracking-wider" style={{ fontFamily: "var(--font-display)" }}>TOURS</h1>
        <p className="mt-2 text-mantra-muted">Every major metal tour. Dates, tickets, coverage.</p>
      </header>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post) => <PostCard key={post.id} post={post} />)}
      </div>
    </div>
  );
}
