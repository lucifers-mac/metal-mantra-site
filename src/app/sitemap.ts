import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://metal-mantra.com";
  const posts = getAllPosts();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/${post.slug}/`,
    lastModified: post.modified || post.date,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date().toISOString(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/news/`, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/tours/`, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/festivals/`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/reviews/`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/features/`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/rundowns/`, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/search/`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/about/`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/contact/`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/advertise/`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/privacy/`, changeFrequency: "monthly", priority: 0.2 },
    { url: `${baseUrl}/calendar/`, changeFrequency: "weekly", priority: 0.6 },
  ];

  return [...staticPages, ...postEntries];
}
