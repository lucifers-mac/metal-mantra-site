"use client";

import Link from "next/link";
import { Post } from "@/lib/content";

export default function BreakingTicker({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;

  // Double the items for seamless loop
  const items = [...posts, ...posts];

  return (
    <div className="bg-mantra-dark border-b border-mantra-border overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center">
        {/* Label */}
        <div className="flex-shrink-0 bg-mantra-red px-3 py-1.5 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-white" style={{ fontFamily: "var(--font-heading)" }}>
            Latest
          </span>
        </div>

        {/* Scrolling content */}
        <div className="overflow-hidden flex-1">
          <div className="ticker-animate flex items-center whitespace-nowrap py-1.5">
            {items.map((post, i) => (
              <Link
                key={`${post.id}-${i}`}
                href={post.path}
                className="inline-flex items-center gap-3 px-6 text-xs text-mantra-muted hover:text-white transition-colors"
              >
                <span className="text-mantra-red font-bold">&bull;</span>
                <span className="font-medium">{post.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
