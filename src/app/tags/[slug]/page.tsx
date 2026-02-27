import PostCard from "@/components/PostCard";
import { getAllTags, getPostsByTag } from "@/lib/content";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllTags()
    .filter((t) => t.count > 0)
    .map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = getAllTags().find((t) => t.slug === slug);
  return {
    title: tag ? `${tag.name}` : slug,
    description: tag ? `All Metal Mantra coverage tagged "${tag.name}".` : "",
  };
}

export default async function TagPage({ params }: PageProps) {
  const { slug } = await params;
  const tag = getAllTags().find((t) => t.slug === slug);
  if (!tag) notFound();

  const posts = getPostsByTag(slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <header className="mb-8">
        <span className="text-xs uppercase tracking-widest text-mantra-red font-bold">Tag</span>
        <h1 className="mt-1 text-3xl font-black text-white tracking-wider" style={{ fontFamily: "var(--font-display)" }}>
          {tag.name}
        </h1>
        <p className="mt-2 text-mantra-muted">{posts.length} {posts.length === 1 ? "story" : "stories"}</p>
      </header>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
