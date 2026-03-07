import { redirect } from "next/navigation";
import { getPostsByType } from "@/lib/content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getPostsByType("festival").map((p) => ({ slug: p.slug }));
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  redirect(`/${slug}/`);
}
