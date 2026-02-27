import PostCard from "@/components/PostCard";
import { getPostsByType } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Metal Rundowns",
  description: "M/W/F digest of the biggest stories in heavy music. Everything you missed, nothing you don't need.",
};

export default function RundownsPage() {
  const posts = getPostsByType("rundown");
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-white tracking-wider" style={{ fontFamily: "var(--font-display)" }}>RUNDOWNS</h1>
        <p className="mt-2 text-mantra-muted">M/W/F digest. The biggest stories in heavy music, no filler.</p>
      </header>
      <div className="space-y-5">
        {posts.map((post) => <PostCard key={post.id} post={post} variant="horizontal" />)}
      </div>
    </div>
  );
}
