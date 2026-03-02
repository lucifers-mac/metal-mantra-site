/**
 * Prebuild script: reads content/posts/*.mdx, converts to data/posts.json
 * Run via: node scripts/generate-posts.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";
import { marked } from "marked";

// Configure marked for clean output
marked.setOptions({ gfm: true, breaks: true });

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const POSTS_DIR = path.join(ROOT, "content", "posts");
const DATA_DIR = path.join(ROOT, "src", "data");

function toSlug(str) {
  return str.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

function deriveContentType(categories) {
  const cats = categories.map((c) => c.toLowerCase());
  if (cats.some((c) => c === "rundown" || c.includes("rundown"))) return "rundown";
  if (cats.some((c) => c === "tours" || c === "tour" || c.includes("tour"))) return "tour";
  if (cats.some((c) => c === "festival" || c.includes("festival"))) return "festival";
  if (cats.some((c) => c === "review" || c.includes("review"))) return "review";
  if (cats.some((c) => c === "feature" || c.includes("feature"))) return "feature";
  return "news";
}

function countWords(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

// Load posts
if (!fs.existsSync(POSTS_DIR)) {
  console.error("content/posts/ directory not found");
  process.exit(1);
}

const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));
console.log(`Found ${files.length} MDX files in content/posts/`);

const posts = files
  .map((file, index) => {
    const filePath = path.join(POSTS_DIR, file);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    const slug = data.slug || file.replace(/\.mdx$/, "");
    const title = data.title || "";
    const date = data.date || new Date().toISOString();
    const modified = data.modified || date;
    const excerpt = data.excerpt || "";
    const featuredImage = data.featuredImage || "";
    const categories = Array.isArray(data.categories) ? data.categories : [];
    const rawTags = Array.isArray(data.tags) ? data.tags : [];

    const tags = rawTags.map((t) => ({
      name: t,
      slug: toSlug(t),
    }));

    const wc = countWords(content);
    const contentHtml = marked.parse(content);

    return {
      id: index + 1,
      slug,
      title,
      content: contentHtml,
      excerpt,
      date,
      modified,
      categories,
      tags,
      featuredImage,
      featuredImageAlt: data.featuredImageAlt || "",
      contentType: deriveContentType(categories),
      wordCount: wc,
      readingTime: Math.max(1, Math.ceil(wc / 200)),
      path: `/${slug}`,
      urlPrefix: "",
      seo: {
        focusKeyword: data.focusKeyword || "",
        title: data.seoTitle || title,
        description: data.metaDescription || excerpt,
      },
    };
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

// Derive categories
const catCountMap = new Map();
for (const post of posts) {
  for (const cat of post.categories) {
    catCountMap.set(cat, (catCountMap.get(cat) || 0) + 1);
  }
}
const categories = Array.from(catCountMap.entries()).map(([name, count], i) => ({
  id: i + 1,
  name,
  slug: toSlug(name),
  count,
  description: "",
}));

// Derive tags
const tagCountMap = new Map();
const tagNameMap = new Map();
for (const post of posts) {
  for (const tag of post.tags) {
    tagCountMap.set(tag.slug, (tagCountMap.get(tag.slug) || 0) + 1);
    tagNameMap.set(tag.slug, tag.name);
  }
}
const tags = Array.from(tagCountMap.entries())
  .map(([slug, count], i) => ({
    id: i + 1,
    name: tagNameMap.get(slug) || slug,
    slug,
    count,
  }))
  .sort((a, b) => b.count - a.count);

// Write output
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

fs.writeFileSync(path.join(DATA_DIR, "posts.json"), JSON.stringify(posts, null, 2));
fs.writeFileSync(path.join(DATA_DIR, "categories.json"), JSON.stringify(categories, null, 2));
fs.writeFileSync(path.join(DATA_DIR, "tags.json"), JSON.stringify(tags, null, 2));

console.log(`✓ Generated ${posts.length} posts → src/data/posts.json`);
console.log(`✓ Generated ${categories.length} categories → src/data/categories.json`);
console.log(`✓ Generated ${tags.length} tags → src/data/tags.json`);
