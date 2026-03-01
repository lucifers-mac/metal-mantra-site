import postsData from "@/data/posts.json";
import categoriesData from "@/data/categories.json";
import tagsData from "@/data/tags.json";

export interface Post {
  id: number;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  modified: string;
  categories: string[];
  tags: { name: string; slug: string }[];
  featuredImage: string;
  featuredImageAlt: string;
  contentType: string;
  wordCount: number;
  readingTime: number;
  path: string;
  urlPrefix: string;
  seo: {
    focusKeyword: string;
    title: string;
    description: string;
  };
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
  description: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  count: number;
}

const posts = postsData as Post[];
const categories = categoriesData as Category[];
const tags = tagsData as Tag[];

export function getAllPosts(): Post[] {
  return posts;
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getPostsByType(type: string): Post[] {
  return posts.filter((p) => p.contentType === type);
}

export function getPostsByCategory(categorySlug: string): Post[] {
  return posts.filter((p) =>
    p.categories.some(
      (c) =>
        c.toLowerCase() === categorySlug ||
        c.toLowerCase().replace(/\s+/g, "-") === categorySlug
    )
  );
}

export function getPostsByTag(tagSlug: string): Post[] {
  return posts.filter((p) => p.tags.some((t) => t.slug === tagSlug));
}

export function getLatestPosts(count: number): Post[] {
  return posts.slice(0, count);
}

export function getRelatedPosts(post: Post, count: number = 4): Post[] {
  const scored = posts
    .filter((p) => p.id !== post.id)
    .map((p) => {
      let score = 0;
      score += p.categories.filter((c) => post.categories.includes(c)).length * 3;
      const postTagSlugs = post.tags.map((t) => t.slug);
      score += p.tags.filter((t) => postTagSlugs.includes(t.slug)).length * 2;
      if (p.contentType === post.contentType) score += 1;
      const daysDiff = Math.abs(
        (new Date(p.date).getTime() - new Date(post.date).getTime()) / 86400000
      );
      if (daysDiff < 7) score += 2;
      else if (daysDiff < 30) score += 1;
      return { post: p, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, count).map((s) => s.post);
}

export function searchPosts(query: string): Post[] {
  const q = query.toLowerCase();
  return posts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.tags.some((t) => t.name.toLowerCase().includes(q)) ||
      p.excerpt.toLowerCase().includes(q)
  );
}

export function getAllCategories(): Category[] {
  return categories.filter((c) => c.count > 0);
}

export function getAllTags(): Tag[] {
  return tags.filter((t) => t.count > 0).sort((a, b) => b.count - a.count);
}

export function getPopularTags(count: number = 30): Tag[] {
  return getAllTags().slice(0, count);
}

export function getTrendingPosts(count: number = 5): Post[] {
  const now = Date.now();
  return [...posts]
    .map((p) => {
      const age = (now - new Date(p.date).getTime()) / 86400000;
      const recency = Math.max(0, 30 - age) / 30;
      const tagScore = Math.min(p.tags.length / 5, 1);
      return { post: p, score: recency * 0.6 + tagScore * 0.4 };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((s) => s.post);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateShort(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getPostUrl(post: Post): string {
  return post.path;
}
