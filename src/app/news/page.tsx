import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar";
import { getPostsByType } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Metal News",
  description: "The latest heavy music news — tour announcements, lineup changes, new releases, and breaking stories from the metal world.",
};

export default function NewsPage() {
  const posts = getPostsByType("news");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-white tracking-wider" style={{ fontFamily: "var(--font-display)" }}>
          METAL NEWS
        </h1>
        <p className="mt-2 text-mantra-muted">Tour announcements, lineup changes, breaking stories.</p>
      </header>

      <div className="lg:grid lg:grid-cols-3 lg:gap-10">
        <div className="lg:col-span-2">
          <div className="grid sm:grid-cols-2 gap-5">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
        <div className="mt-10 lg:mt-0">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
