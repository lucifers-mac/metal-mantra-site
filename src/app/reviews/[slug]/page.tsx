import { getPostsByType, getPostBySlug } from "@/lib/content";
import ArticlePage from "@/components/ArticlePage";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const SECTION_TYPE: Record<string, string> = {
  news: "news",
  rundowns: "rundown",
  festivals: "festival",
  reviews: "review",
  features: "feature",
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getPostsByType(SECTION_TYPE["reviews"]).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const title = post.seo.title || post.title;
  const description = post.seo.description || post.excerpt.replace(/<[^>]+>/g, "").slice(0, 160);
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.modified,
      images: post.featuredImage ? [{ url: post.featuredImage }] : [],
      tags: post.tags.map((t) => t.name),
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  return <ArticlePage post={post} />;
}
