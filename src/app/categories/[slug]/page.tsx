import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar";
import { getAllCategories, getPostsByCategory } from "@/lib/content";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllCategories().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cat = getAllCategories().find((c) => c.slug === slug);
  return {
    title: cat ? cat.name : slug,
    description: cat?.description || `All Metal Mantra coverage in "${cat?.name || slug}".`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const cat = getAllCategories().find((c) => c.slug === slug);
  if (!cat) notFound();

  const posts = getPostsByCategory(slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <header className="mb-8">
        <span className="text-xs uppercase tracking-widest text-mantra-red font-bold" style={{ fontFamily: "var(--font-heading)" }}>
          Category
        </span>
        <h1
          className="mt-1 text-3xl font-black text-white tracking-wider"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {cat.name.toUpperCase()}
        </h1>
        {cat.description && (
          <p className="mt-2 text-mantra-muted">{cat.description}</p>
        )}
        <p className="mt-1 text-sm text-mantra-dim">
          {posts.length} {posts.length === 1 ? "story" : "stories"}
        </p>
      </header>

      <div className="lg:grid lg:grid-cols-3 lg:gap-10">
        <div className="lg:col-span-2">
          <div className="grid sm:grid-cols-2 gap-5">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          {posts.length === 0 && (
            <p className="text-mantra-muted py-12 text-center">No stories in this category yet.</p>
          )}
        </div>
        <div className="mt-10 lg:mt-0">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
