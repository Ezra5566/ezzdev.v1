import { NextRequest, NextResponse } from "next/server";
import {
  getAllArticles,
  getPublishedArticles,
  createArticle,
  searchArticles,
  calculateReadingTime,
} from "@/lib/articles";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const status = searchParams.get("status");

  let articles;

  if (query) {
    articles = searchArticles(query);
  } else if (status === "published") {
    articles = getPublishedArticles();
  } else {
    articles = getAllArticles();
  }

  return NextResponse.json(articles);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const article = createArticle({
      slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title: body.title,
      description: body.description || "",
      date: body.date || new Date().toISOString().split("T")[0],
      readingTime: calculateReadingTime(body.content || ""),
      category: body.category || "General",
      tags: body.tags || [],
      coverImage: body.coverImage,
      content: body.content || "",
      premiumContent: body.premiumContent,
      isPremium: body.isPremium || false,
      price: body.price,
      status: body.status || "draft",
    });

    return NextResponse.json(article, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create article" },
      { status: 500 }
    );
  }
}
