"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Lock, Search } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

interface Article {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  category: string;
  tags: string[];
  isPremium: boolean;
}

const WireframeVisual = ({ category }: { category: string }) => {
  const visuals: Record<string, React.ReactNode> = {
    AI: (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <g stroke="#a3e635" strokeWidth="1" fill="none" opacity="0.5">
          <circle cx="100" cy="100" r="60" />
          <circle cx="100" cy="100" r="40" />
          <circle cx="100" cy="100" r="20" />
          <line x1="100" y1="40" x2="100" y2="160" />
          <line x1="40" y1="100" x2="160" y2="100" />
          <line x1="58" y1="58" x2="142" y2="142" />
          <line x1="142" y1="58" x2="58" y2="142" />
        </g>
      </svg>
    ),
    "Software Engineering": (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <g stroke="#a3e635" strokeWidth="1" fill="none" opacity="0.5">
          <rect x="40" y="40" width="120" height="120" rx="4" />
          <rect x="55" y="55" width="40" height="20" rx="2" />
          <rect x="105" y="55" width="40" height="20" rx="2" />
          <rect x="55" y="85" width="90" height="20" rx="2" />
          <rect x="55" y="115" width="60" height="30" rx="2" />
          <line x1="55" y1="75" x2="145" y2="75" opacity="0.3" />
        </g>
      </svg>
    ),
    Cybersecurity: (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <g stroke="#a3e635" strokeWidth="1" fill="none" opacity="0.5">
          <path d="M100 30 L160 60 L160 120 C160 150 130 170 100 180 C70 170 40 150 40 120 L40 60 Z" />
          <circle cx="100" cy="110" r="20" />
          <line x1="100" y1="130" x2="100" y2="150" />
          <line x1="90" y1="140" x2="110" y2="140" />
        </g>
      </svg>
    ),
    "System Design": (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <g stroke="#a3e635" strokeWidth="1" fill="none" opacity="0.5">
          <rect x="80" y="30" width="40" height="30" rx="2" />
          <rect x="30" y="100" width="40" height="30" rx="2" />
          <rect x="130" y="100" width="40" height="30" rx="2" />
          <rect x="80" y="150" width="40" height="30" rx="2" />
          <line x1="100" y1="60" x2="50" y2="100" />
          <line x1="100" y1="60" x2="150" y2="100" />
          <line x1="50" y1="130" x2="100" y2="150" />
          <line x1="150" y1="130" x2="100" y2="150" />
        </g>
      </svg>
    ),
    "Web Development": (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <g stroke="#a3e635" strokeWidth="1" fill="none" opacity="0.5">
          <rect x="40" y="50" width="120" height="90" rx="4" />
          <line x1="40" y1="70" x2="160" y2="70" />
          <circle cx="52" cy="60" r="3" />
          <circle cx="62" cy="60" r="3" />
          <circle cx="72" cy="60" r="3" />
          <text x="55" y="100" fill="#a3e635" fontSize="14" fontFamily="monospace" opacity="0.4">&lt;/&gt;</text>
        </g>
      </svg>
    ),
  };

  return (visuals[category] || visuals["AI"]) as React.ReactElement;
};

const WireframeVisualTyped = ({ category }: { category: string }) => {
  return <WireframeVisual category={category} />;
};

export default function Articles() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/articles?status=published")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        const cats = Array.from(new Set(data.map((a: Article) => a.category)));
        setCategories(["All", ...cats] as string[]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!loading) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".article-card",
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".articles-grid",
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }, sectionRef);
      return () => ctx.revert();
    }
  }, [loading]);

  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = filteredArticles[0];
  const recentArticles = filteredArticles.slice(1);

  return (
    <section
      ref={sectionRef}
      id="articles"
      className="py-24 px-6 lg:px-12 border-t border-[#262626]"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-3">
            <span className="font-mono text-xs text-[#737373] tracking-widest">
              {'// ARTICLES'}
            </span>
          </div>
          <div className="lg:col-span-6">
            <h2 className="font-mono text-2xl md:text-3xl text-white">
              <span className="text-[#a3e635]">EXPORT</span>
              <span className="text-white"> { "{ " }LATEST{ " }" }</span>
            </h2>
          </div>
          <div className="lg:col-span-3 flex justify-end">
            <a
              href="#"
              className="font-mono text-xs text-[#737373] hover:text-[#a3e635] transition-colors flex items-center gap-2"
            >
              ALL_ARTICLES( ) <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* Search & Categories */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737373]"
            />
            <input
              type="text"
              placeholder="SEARCH_ARTICLES( )"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#111111] border border-[#262626] text-white font-mono text-xs tracking-widest pl-10 pr-4 py-3 focus:outline-none focus:border-[#a3e635] transition-colors placeholder:text-[#737373]"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`font-mono text-[10px] tracking-widest px-4 py-2 border transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-[#a3e635]/10 border-[#a3e635] text-[#a3e635]"
                    : "border-[#262626] text-[#737373] hover:text-white hover:border-[#404040]"
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <span className="font-mono text-xs text-[#737373] tracking-widest animate-pulse">
              LOADING_ARTICLES( )...
            </span>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredArticles.length === 0 && (
          <div className="text-center py-16">
            <span className="font-mono text-xs text-[#737373] tracking-widest">
              NO_ARTICLES_FOUND( )
            </span>
          </div>
        )}

        {/* Featured Article */}
        {!loading && featuredArticle && (
          <div className="mb-12">
            <Link href={`/${featuredArticle.slug}`} className="block group">
              <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 border border-[#262626] bg-[#111111] p-6 lg:p-8 hover:border-[#a3e635]/30 transition-all duration-300">
                {/* Visual */}
                <div className="relative h-48 lg:h-full min-h-[200px] border border-[#262626] bg-[#0a0a0a] overflow-hidden">
                  <WireframeVisualTyped category={featuredArticle.category} />
                  <div className="absolute inset-0 bg-[#a3e635]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 left-4">
                    <span className="font-mono text-[10px] text-[#737373] tracking-widest">
                      FEATURED
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 w-2 h-2 bg-[#a3e635]" />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-mono text-[10px] text-[#737373] tracking-widest">
                        {featuredArticle.category.toUpperCase()}
                      </span>
                      <span className="text-[#262626]">|</span>
                      <span className="font-mono text-[10px] text-[#737373]">
                        {featuredArticle.readingTime}
                      </span>
                      {featuredArticle.isPremium && (
                        <>
                          <span className="text-[#262626]">|</span>
                          <span className="font-mono text-[10px] text-[#a3e635] flex items-center gap-1">
                            <Lock size={10} />
                            PREMIUM
                          </span>
                        </>
                      )}
                    </div>
                    <h3 className="font-mono text-lg lg:text-xl text-[#a3e635] group-hover:text-[#bef264] transition-colors leading-tight mb-4">
                      {featuredArticle.title}
                    </h3>
                    <p className="text-sm text-[#737373] leading-relaxed font-light mb-6">
                      {featuredArticle.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {featuredArticle.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] text-[#737373] px-2 py-1 border border-[#262626]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="pt-6 border-t border-[#262626] mt-6 flex justify-between items-center">
                    <span className="font-mono text-[10px] text-[#737373]">
                      {featuredArticle.date}
                    </span>
                    <span className="font-mono text-[10px] text-[#737373] group-hover:text-[#a3e635] transition-colors flex items-center gap-2">
                      READ( ) <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          </div>
        )}

        {/* Articles Grid */}
        {!loading && recentArticles.length > 0 && (
          <div className="articles-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentArticles.map((article) => (
              <Link
                key={article.id}
                href={`/${article.slug}`}
                className="article-card group block"
              >
                <article>
                  {/* Visual */}
                  <div className="relative h-48 mb-6 border border-[#262626] bg-[#0a0a0a] overflow-hidden">
                    <WireframeVisualTyped category={article.category} />
                    <div className="absolute inset-0 bg-[#a3e635]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 left-4">
                      <span className="font-mono text-[10px] text-[#737373] tracking-widest">
                        {article.category.toUpperCase()}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 w-2 h-2 bg-[#a3e635]" />
                    {article.isPremium && (
                      <div className="absolute top-4 right-4">
                        <Lock size={12} className="text-[#a3e635]" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[10px] text-[#737373]">
                        {article.date}
                      </span>
                      <span className="font-mono text-[10px] text-[#737373]">
                        {article.readingTime}
                      </span>
                    </div>

                    <h3 className="font-mono text-sm text-[#a3e635] group-hover:text-[#bef264] transition-colors leading-tight">
                      {article.title}
                    </h3>

                    <p className="text-xs text-[#737373] leading-relaxed font-light">
                      {article.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] text-[#737373] px-2 py-0.5 border border-[#262626]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2">
                      <span className="font-mono text-[10px] text-[#737373] group-hover:text-[#a3e635] transition-colors flex items-center gap-2">
                        READ( ) <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
