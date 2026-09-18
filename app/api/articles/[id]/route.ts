import { NextRequest, NextResponse } from "next/server";
import {
  getArticleById,
  getArticleBySlug,
  updateArticle,
  deleteArticle,
  calculateReadingTime,
} from "@/lib/articles";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const article = getArticleById(id) || getArticleBySlug(id);

  if (!article) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }

  // For premium articles, only return free content unless unlocked
  const { searchParams } = new URL(request.url);
  const unlocked = searchParams.get("unlocked") === "true";

  if (article.isPremium && !unlocked) {
    return NextResponse.json({
      ...article,
      premiumContent: undefined,
      isLocked: true,
    });
  }

  return NextResponse.json(article);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (body.content) {
      body.readingTime = calculateReadingTime(body.content);
    }

    const updated = updateArticle(id, body);

    if (!updated) {
      return NextResponse.json(
        { error: "Article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { error: "Failed to update article" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const deleted = deleteArticle(id);

  if (!deleted) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
