import PostCard from "@/components/PostCard";
import { getPostsByType } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features & Editorials",
  description: "Long-form features, editorials, and deep dives into heavy music culture.",
};

export default function FeaturesPage() {
  const posts = getPostsByType("feature");
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-white tracking-wider" style={{ fontFamily: "var(--font-display)" }}>FEATURES</h1>
        <p className="mt-2 text-mantra-muted">Deep dives, editorials, and long-form storytelling.</p>
      </header>
      <div className="grid sm:grid-cols-2 gap-5">
        {posts.map((post) => <PostCard key={post.id} post={post} />)}
      </div>
    </div>
  );
}
