import { getAllPosts, getPostBySlug } from "@/lib/content";
import ArticlePage from "@/components/ArticlePage";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
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
    alternates: { canonical: `/${slug}/` },
    openGraph: {
      title,
      description,
      type: "article",
      url: `/${slug}/`,
      siteName: "Metal Mantra",
      publishedTime: post.date,
      modifiedTime: post.modified,
      images: post.featuredImage ? [{ url: post.featuredImage }] : [],
      tags: post.tags.map((t) => t.name),
    },
    twitter: {
      card: "summary_large_image",
      site: "@MetalMantraNews",
      title,
      description,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  return <ArticlePage post={post} />;
}
