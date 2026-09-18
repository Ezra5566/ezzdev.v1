"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Tag,
  Lock,
  ChevronRight,
} from "lucide-react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import CustomCursor from "../components/CustomCursor";

interface Article {
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
  isLocked?: boolean;
  price?: number;
  status: string;
}

export default function ArticlePage() {
  const params = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPaywall, setShowPaywall] = useState(false);

  useEffect(() => {
    if (params.slug) {
      fetch(`/api/articles/${params.slug}`)
        .then((res) => res.json())
        .then((data) => {
          setArticle(data);
          if (data.isPremium && data.isLocked) {
            setShowPaywall(true);
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [params.slug]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <main className="relative min-h-screen bg-[#0a0a0a]">
        <Navigation />
        <div className="pt-32 pb-24 px-6 lg:px-12">
          <div className="max-w-[800px] mx-auto text-center">
            <span className="font-mono text-xs text-[#737373] tracking-widest animate-pulse">
              LOADING( )...
            </span>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!article) {
    return (
      <main className="relative min-h-screen bg-[#0a0a0a]">
        <Navigation />
        <div className="pt-32 pb-24 px-6 lg:px-12">
          <div className="max-w-[800px] mx-auto text-center">
            <span className="font-mono text-xs text-[#737373] tracking-widest">
              ARTICLE_NOT_FOUND( )
            </span>
            <div className="mt-8">
              <Link
                href="/"
                className="font-mono text-xs text-[#a3e635] hover:text-[#bef264] transition-colors flex items-center gap-2 justify-center"
              >
                <ArrowLeft size={14} />
                BACK_TO_ARTICLES( )
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-[#0a0a0a] overflow-x-hidden">
      <CustomCursor />
      <Navigation />

      <article className="relative z-10 pt-24 pb-24 px-6 lg:px-12">
        <div className="max-w-[800px] mx-auto">
          {/* Back Link */}
          <div className="mb-12">
            <Link
              href="/"
              className="font-mono text-[10px] text-[#737373] hover:text-[#a3e635] transition-colors tracking-widest flex items-center gap-2"
            >
              <ArrowLeft size={12} />
              BACK( )
            </Link>
          </div>

          {/* Article Header */}
          <header className="mb-12">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="font-mono text-[10px] text-[#a3e635] tracking-widest px-2 py-1 border border-[#a3e635]/30">
                {article.category.toUpperCase()}
              </span>
              {article.isPremium && (
                <span className="font-mono text-[10px] text-[#a3e635] tracking-widest flex items-center gap-1">
                  <Lock size={10} />
                  PREMIUM
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Description */}
            <p className="text-base text-[#737373] leading-relaxed font-light mb-8">
              {article.description}
            </p>

            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-[#262626]">
              <div className="flex items-center gap-2 text-[#737373]">
                <Calendar size={14} />
                <span className="font-mono text-[10px] tracking-widest">
                  {formatDate(article.date)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[#737373]">
                <Clock size={14} />
                <span className="font-mono text-[10px] tracking-widest">
                  {article.readingTime}
                </span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] text-[#737373] px-3 py-1 border border-[#262626] flex items-center gap-1"
                >
                  <Tag size={10} />
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Cover Image */}
          {article.coverImage && (
            <div className="mb-12 border border-[#262626] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose-custom">
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
              {article.content}
            </ReactMarkdown>
          </div>

          {/* Premium Content / Paywall */}
          {article.isPremium && showPaywall && (
            <div className="mt-12 relative">
              {/* Gradient fade */}
              <div className="absolute -top-24 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent" />

              {/* Paywall Card */}
              <div className="border border-[#262626] bg-[#111111] p-8 lg:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <Lock size={16} className="text-[#a3e635]" />
                  <span className="font-mono text-xs text-[#a3e635] tracking-widest">
                    PREMIUM_CONTENT
                  </span>
                </div>

                <h3 className="font-mono text-xl text-white mb-4">
                  Continue reading to access the full technical breakdown
                </h3>

                <p className="text-sm text-[#737373] leading-relaxed font-light mb-8">
                  This premium section includes the complete implementation,
                  detailed explanations, production-ready code, and advanced
                  techniques.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {[
                    "Full implementation",
                    "Detailed explanation",
                    "Complete code",
                    "Advanced techniques",
                    "Additional examples",
                    "Production patterns",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-xs text-[#a3a3a3]"
                    >
                      <ChevronRight size={12} className="text-[#a3e635]" />
                      <span className="font-light">{item}</span>
                    </div>
                  ))}
                </div>

                {article.price && (
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-mono text-3xl text-white">
                      ${article.price}
                    </span>
                    <span className="font-mono text-[10px] text-[#737373] tracking-widest">
                      ONE_TIME_ACCESS
                    </span>
                  </div>
                )}

                <button className="w-full sm:w-auto bg-[#a3e635] text-[#0a0a0a] font-mono text-xs tracking-widest px-8 py-4 hover:bg-[#bef264] transition-all duration-300">
                  UNLOCK_PREMIUM( )
                </button>
              </div>
            </div>
          )}

          {/* Unlocked Premium Content */}
          {article.isPremium && !showPaywall && article.premiumContent && (
            <div className="mt-12 pt-12 border-t border-[#a3e635]/20">
              <div className="flex items-center gap-3 mb-8">
                <Lock size={16} className="text-[#a3e635]" />
                <span className="font-mono text-xs text-[#a3e635] tracking-widest">
                  PREMIUM_CONTENT
                </span>
              </div>

              <div className="prose-custom">
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                  {article.premiumContent}
                </ReactMarkdown>
              </div>
            </div>
          )}

          {/* Article Footer */}
          <div className="mt-16 pt-8 border-t border-[#262626]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <Link
                href="/"
                className="font-mono text-xs text-[#737373] hover:text-[#a3e635] transition-colors flex items-center gap-2"
              >
                <ArrowLeft size={14} />
                ALL_ARTICLES( )
              </Link>

              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-[#737373] tracking-widest">
                  {'// SHARE_THIS_ARTICLE'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
