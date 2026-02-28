import Link from "next/link";
import { Post, formatDateShort } from "@/lib/content";

interface PostCardProps {
  post: Post;
  variant?: "default" | "compact" | "hero" | "horizontal" | "featured" | "numbered";
  number?: number;
}

const TYPE_COLORS: Record<string, string> = {
  rundown: "bg-mantra-ember/20 text-mantra-ember border-mantra-ember/30",
  news: "bg-mantra-red/10 text-mantra-red-hot border-mantra-red/30",
  festival: "bg-purple-900/30 text-purple-400 border-purple-500/30",
  review: "bg-blue-900/30 text-blue-400 border-blue-500/30",
  feature: "bg-amber-900/30 text-amber-400 border-amber-500/30",
  tour: "bg-emerald-900/30 text-emerald-400 border-emerald-500/30",
};

function TypeBadge({ type }: { type: string }) {
  return (
    <span className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded border ${TYPE_COLORS[type] || TYPE_COLORS.news}`}>
      {type}
    </span>
  );
}

export default function PostCard({ post, variant = "default", number }: PostCardProps) {
  const href = post.path;
  const excerpt = post.excerpt.replace(/<[^>]+>/g, "").slice(0, 160);

  // ═══ HERO — Full-width dramatic splash ═══
  if (variant === "hero") {
    return (
      <Link href={href} className="group block relative overflow-hidden rounded-lg">
        <div className="aspect-[2/1] md:aspect-[21/9] relative">
          {post.featuredImage ? (
            <img src={post.featuredImage} alt={post.featuredImageAlt || post.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-mantra-card to-mantra-black" />
          )}
          <div className="hero-gradient absolute inset-0" />
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
            <TypeBadge type={post.contentType} />
            <h2
              className="mt-3 text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] group-hover:text-mantra-red-hot transition-colors duration-300"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {post.title}
            </h2>
            {excerpt && (
              <p className="hidden md:block mt-3 text-sm text-gray-300 max-w-2xl line-clamp-2">{excerpt}</p>
            )}
            <div className="mt-3 flex items-center gap-3 text-xs text-gray-400">
              <time>{formatDateShort(post.date)}</time>
              <span className="w-1 h-1 rounded-full bg-mantra-muted" />
              <span>{post.readingTime} min read</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // ═══ FEATURED — Large card with image left, text right ═══
  if (variant === "featured") {
    return (
      <Link href={href} className="group flex flex-col sm:flex-row gap-4 card-glow bg-mantra-card rounded-lg overflow-hidden">
        {post.featuredImage && (
          <div className="sm:w-2/5 aspect-video sm:aspect-auto overflow-hidden">
            <img src={post.featuredImage} alt={post.featuredImageAlt || post.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
          </div>
        )}
        <div className="flex-1 p-4 sm:py-5 sm:pr-5 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2">
            <TypeBadge type={post.contentType} />
            <time className="text-[11px] text-mantra-muted">{formatDateShort(post.date)}</time>
          </div>
          <h3
            className="text-lg font-bold text-white leading-tight group-hover:text-mantra-red-hot transition-colors"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {post.title}
          </h3>
          {excerpt && (
            <p className="mt-2 text-sm text-mantra-muted line-clamp-2 leading-relaxed">{excerpt}</p>
          )}
        </div>
      </Link>
    );
  }

  // ═══ HORIZONTAL — Inline row with small thumbnail ═══
  if (variant === "horizontal") {
    return (
      <Link href={href} className="group flex gap-4 items-start py-3 border-b border-mantra-border/50 last:border-0">
        {post.featuredImage && (
          <div className="w-20 h-20 flex-shrink-0 rounded overflow-hidden">
            <img src={post.featuredImage} alt={post.featuredImageAlt || post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <TypeBadge type={post.contentType} />
          </div>
          <h3 className="text-sm font-semibold text-white leading-snug group-hover:text-mantra-red-hot transition-colors line-clamp-2">
            {post.title}
          </h3>
          <time className="mt-1 text-[11px] text-mantra-dim block">{formatDateShort(post.date)}</time>
        </div>
      </Link>
    );
  }

  // ═══ NUMBERED — Trending sidebar item ═══
  if (variant === "numbered") {
    return (
      <Link href={href} className="group flex gap-3 items-start py-2.5 border-b border-mantra-border/30 last:border-0">
        <span
          className="text-3xl font-black text-mantra-border group-hover:text-mantra-red transition-colors leading-none mt-0.5"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {String(number || 0).padStart(2, "0")}
        </span>
        <div>
          <h4 className="text-sm font-medium text-white leading-snug group-hover:text-mantra-red-hot transition-colors line-clamp-2">
            {post.title}
          </h4>
          <time className="text-[11px] text-mantra-dim mt-0.5 block">{formatDateShort(post.date)}</time>
        </div>
      </Link>
    );
  }

  // ═══ COMPACT — Minimal, just title + badge ═══
  if (variant === "compact") {
    return (
      <Link href={href} className="group block py-2 border-b border-mantra-border/30 last:border-0">
        <div className="flex items-center gap-2 mb-1">
          <TypeBadge type={post.contentType} />
          <time className="text-[11px] text-mantra-dim">{formatDateShort(post.date)}</time>
        </div>
        <h3 className="text-sm font-semibold text-white leading-snug group-hover:text-mantra-red-hot transition-colors line-clamp-2">
          {post.title}
        </h3>
      </Link>
    );
  }

  // ═══ DEFAULT — Standard card with image + excerpt ═══
  return (
    <Link href={href} className="group block card-glow bg-mantra-card rounded-lg overflow-hidden">
      {post.featuredImage && (
        <div className="aspect-video overflow-hidden">
          <img src={post.featuredImage} alt={post.featuredImageAlt || post.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <TypeBadge type={post.contentType} />
          <time className="text-[11px] text-mantra-muted">{formatDateShort(post.date)}</time>
        </div>
        <h3
          className="text-base font-bold text-white leading-tight group-hover:text-mantra-red-hot transition-colors"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {post.title}
        </h3>
        {excerpt && (
          <p className="mt-2 text-sm text-mantra-muted line-clamp-2 leading-relaxed">{excerpt}</p>
        )}
        <div className="mt-3 flex items-center gap-2 flex-wrap">
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag.slug} className="text-[11px] text-mantra-dim">#{tag.name}</span>
          ))}
          {post.readingTime > 0 && (
            <span className="text-[11px] text-mantra-dim ml-auto">{post.readingTime} min</span>
          )}
        </div>
      </div>
    </Link>
  );
}
