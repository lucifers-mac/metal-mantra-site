import Link from "next/link";
import { Post, formatDateShort } from "@/lib/content";

interface PostCardProps {
  post: Post;
  variant?: "default" | "compact" | "hero" | "horizontal";
}

const TYPE_COLORS: Record<string, string> = {
  rundown: "bg-mantra-ember/20 text-mantra-ember border-mantra-ember/30",
  news: "bg-mantra-red/10 text-mantra-red border-mantra-red/30",
  festival: "bg-purple-900/30 text-purple-400 border-purple-500/30",
  review: "bg-blue-900/30 text-blue-400 border-blue-500/30",
  feature: "bg-amber-900/30 text-amber-400 border-amber-500/30",
};

function TypeBadge({ type }: { type: string }) {
  return (
    <span className={`inline-block px-2 py-0.5 text-xs font-medium uppercase tracking-wider rounded border ${TYPE_COLORS[type] || TYPE_COLORS.news}`}>
      {type}
    </span>
  );
}

export default function PostCard({ post, variant = "default" }: PostCardProps) {
  const href = post.path;
  const excerpt = post.excerpt.replace(/<[^>]+>/g, "").slice(0, 160);

  if (variant === "hero") {
    return (
      <Link href={href} className="group block relative overflow-hidden rounded-xl">
        <div className="aspect-[21/9] relative">
          {post.featuredImage ? (
            <img src={post.featuredImage} alt={post.featuredImageAlt || post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-mantra-card to-mantra-black" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <TypeBadge type={post.contentType} />
            <h2 className="mt-3 text-2xl md:text-4xl font-bold text-white leading-tight group-hover:text-mantra-red transition-colors" style={{ fontFamily: "var(--font-display)" }}>
              {post.title}
            </h2>
            <div className="mt-3 flex items-center gap-3 text-sm text-gray-400">
              <time>{formatDateShort(post.date)}</time>
              <span className="w-1 h-1 rounded-full bg-mantra-muted" />
              <span>{post.readingTime} min read</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "horizontal") {
    return (
      <Link href={href} className="group flex gap-4 items-start">
        {post.featuredImage && (
          <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
            <img src={post.featuredImage} alt={post.featuredImageAlt || post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <TypeBadge type={post.contentType} />
          <h3 className="mt-1 text-sm font-semibold text-white leading-snug group-hover:text-mantra-red transition-colors line-clamp-2">
            {post.title}
          </h3>
          <time className="mt-1 text-xs text-mantra-muted">{formatDateShort(post.date)}</time>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={href} className="group block">
        <div className="flex items-center gap-2 mb-1">
          <TypeBadge type={post.contentType} />
          <time className="text-xs text-mantra-muted">{formatDateShort(post.date)}</time>
        </div>
        <h3 className="text-sm font-semibold text-white leading-snug group-hover:text-mantra-red transition-colors line-clamp-2">
          {post.title}
        </h3>
      </Link>
    );
  }

  // Default card
  return (
    <Link href={href} className="group block bg-mantra-card border border-mantra-border rounded-xl overflow-hidden hover:border-mantra-red/30 transition-all">
      {post.featuredImage && (
        <div className="aspect-video overflow-hidden">
          <img src={post.featuredImage} alt={post.featuredImageAlt || post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <TypeBadge type={post.contentType} />
          <time className="text-xs text-mantra-muted">{formatDateShort(post.date)}</time>
        </div>
        <h3 className="text-lg font-bold text-white leading-tight group-hover:text-mantra-red transition-colors" style={{ fontFamily: "var(--font-display)", letterSpacing: "0.01em" }}>
          {post.title}
        </h3>
        {excerpt && (
          <p className="mt-2 text-sm text-mantra-muted line-clamp-2 leading-relaxed">{excerpt}</p>
        )}
        <div className="mt-3 flex items-center gap-2 flex-wrap">
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag.slug} className="text-xs text-mantra-dim">#{tag.name}</span>
          ))}
          {post.readingTime > 0 && (
            <span className="text-xs text-mantra-dim ml-auto">{post.readingTime} min</span>
          )}
        </div>
      </div>
    </Link>
  );
}
