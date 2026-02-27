import PostCard from "@/components/PostCard";
import { getPostsByType } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reviews",
  description: "Album reviews, concert reviews, and honest takes on the latest heavy music releases.",
};

export default function ReviewsPage() {
  const posts = getPostsByType("review");
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-white tracking-wider" style={{ fontFamily: "var(--font-display)" }}>REVIEWS</h1>
        <p className="mt-2 text-mantra-muted">Honest takes. No paid scores. No clickbait ratings.</p>
      </header>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post) => <PostCard key={post.id} post={post} />)}
      </div>
    </div>
  );
}
