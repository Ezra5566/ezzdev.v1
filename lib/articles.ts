import fs from "fs";
import path from "path";

export interface Article {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  category: string;
  tags: string[];
  coverImage?: string;
  content: string;
  premiumContent?: string;
  isPremium: boolean;
  price?: number;
  status: "draft" | "published";
}

const DATA_DIR = path.join(process.cwd(), "data", "articles");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function getAllArticles(): Article[] {
  ensureDataDir();
  const files = fs.readdirSync(DATA_DIR).filter((f) => f.endsWith(".json"));

  const articles = files.map((file) => {
    const content = fs.readFileSync(path.join(DATA_DIR, file), "utf-8");
    return JSON.parse(content) as Article;
  });

  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPublishedArticles(): Article[] {
  return getAllArticles().filter((a) => a.status === "published");
}

export function getArticleBySlug(slug: string): Article | null {
  const articles = getAllArticles();
  return articles.find((a) => a.slug === slug) || null;
}

export function getArticleById(id: string): Article | null {
  const articles = getAllArticles();
  return articles.find((a) => a.id === id) || null;
}

export function getArticlesByCategory(category: string): Article[] {
  return getPublishedArticles().filter(
    (a) => a.category.toLowerCase() === category.toLowerCase()
  );
}

export function getFeaturedArticle(): Article | null {
  const published = getPublishedArticles();
  return published[0] || null;
}

export function getRecentArticles(count: number = 6): Article[] {
  return getPublishedArticles().slice(0, count);
}

export function getAllCategories(): string[] {
  const articles = getPublishedArticles();
  const categories = new Set(articles.map((a) => a.category));
  return Array.from(categories).sort();
}

export function getAllTags(): string[] {
  const articles = getPublishedArticles();
  const tags = new Set(articles.flatMap((a) => a.tags));
  return Array.from(tags).sort();
}

export function searchArticles(query: string): Article[] {
  const lowercaseQuery = query.toLowerCase();
  return getPublishedArticles().filter(
    (a) =>
      a.title.toLowerCase().includes(lowercaseQuery) ||
      a.description.toLowerCase().includes(lowercaseQuery) ||
      a.category.toLowerCase().includes(lowercaseQuery) ||
      a.tags.some((t) => t.toLowerCase().includes(lowercaseQuery))
  );
}

export function createArticle(article: Omit<Article, "id">): Article {
  ensureDataDir();
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const newArticle: Article = { ...article, id };

  fs.writeFileSync(
    path.join(DATA_DIR, `${id}.json`),
    JSON.stringify(newArticle, null, 2)
  );

  return newArticle;
}

export function updateArticle(
  id: string,
  updates: Partial<Article>
): Article | null {
  const existing = getArticleById(id);
  if (!existing) return null;

  const updated = { ...existing, ...updates, id: existing.id };
  fs.writeFileSync(
    path.join(DATA_DIR, `${id}.json`),
    JSON.stringify(updated, null, 2)
  );

  return updated;
}

export function deleteArticle(id: string): boolean {
  const filePath = path.join(DATA_DIR, `${id}.json`);
  if (!fs.existsSync(filePath)) return false;

  fs.unlinkSync(filePath);
  return true;
}

export function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} MIN`;
}
