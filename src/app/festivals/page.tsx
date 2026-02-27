import PostCard from "@/components/PostCard";
import { getPostsByType } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Metal Festivals",
  description: "Festival guides, lineups, and coverage for the biggest rock and metal festivals.",
};

export default function FestivalsPage() {
  const posts = getPostsByType("festival");
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-white tracking-wider" style={{ fontFamily: "var(--font-display)" }}>FESTIVALS</h1>
        <p className="mt-2 text-mantra-muted">Lineups, guides, and on-the-ground coverage.</p>
      </header>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post) => <PostCard key={post.id} post={post} />)}
      </div>
    </div>
  );
}
