"use client";

import { useState, useMemo } from "react";
import PostCard from "@/components/PostCard";
import { getAllPosts, Post } from "@/lib/content";

const allPosts = getAllPosts();

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allPosts.filter(
      (p: Post) =>
        p.title.toLowerCase().includes(q) ||
        p.tags.some((t) => t.name.toLowerCase().includes(q)) ||
        p.excerpt.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-white tracking-wider" style={{ fontFamily: "var(--font-display)" }}>
          SEARCH
        </h1>
      </header>

      <div className="relative mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search stories, bands, tags..."
          className="w-full bg-mantra-card border border-mantra-border rounded-xl px-5 py-4 text-white placeholder-mantra-dim focus:outline-none focus:border-mantra-red/50 focus:ring-1 focus:ring-mantra-red/30 transition-all text-lg"
          autoFocus
        />
        <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-mantra-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {query.trim() && (
        <p className="text-sm text-mantra-muted mb-6">
          {results.length} {results.length === 1 ? "result" : "results"} for &quot;{query}&quot;
        </p>
      )}

      <div className="space-y-5">
        {results.map((post) => (
          <PostCard key={post.id} post={post} variant="horizontal" />
        ))}
      </div>

      {query.trim() && results.length === 0 && (
        <div className="text-center py-16">
          <p className="text-mantra-muted text-lg">Nothing found.</p>
          <p className="text-mantra-dim text-sm mt-2">Try a different search term or browse the sections above.</p>
        </div>
      )}
    </div>
  );
}
