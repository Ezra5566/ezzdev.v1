"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  Save,
  Eye,
  X,
  Lock,
  Unlock,
} from "lucide-react";
import Link from "next/link";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import AdminGate from "../components/AdminGate";

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
  price?: number;
  status: "draft" | "published";
}

const CATEGORIES = [
  "AI",
  "Cybersecurity",
  "Software Engineering",
  "Web Development",
  "System Design",
  "Databases",
  "Programming",
];

const emptyArticle: Omit<Article, "id"> = {
  slug: "",
  title: "",
  description: "",
  date: new Date().toISOString().split("T")[0],
  readingTime: "5 MIN",
  category: "AI",
  tags: [],
  content: "",
  premiumContent: "",
  isPremium: false,
  price: undefined,
  status: "draft",
};

export default function AdminPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Article | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Omit<Article, "id">>(emptyArticle);
  const [tagInput, setTagInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const fetchArticles = () => {
    fetch("/api/articles")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleCreate = () => {
    setFormData(emptyArticle);
    setIsCreating(true);
    setEditing(null);
  };

  const handleEdit = (article: Article) => {
    setFormData({ ...article });
    setEditing(article);
    setIsCreating(false);
  };

  const handleCancel = () => {
    setEditing(null);
    setIsCreating(false);
    setFormData(emptyArticle);
    setMessage("");
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    try {
      const method = editing ? "PUT" : "POST";
      const url = editing ? `/api/articles/${editing.id}` : "/api/articles";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage(editing ? "Article updated!" : "Article created!");
        fetchArticles();
        setTimeout(() => {
          setEditing(null);
          setIsCreating(false);
          setFormData(emptyArticle);
          setMessage("");
        }, 1500);
      } else {
        setMessage("Error saving article");
      }
    } catch {
      setMessage("Error saving article");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this article?")) return;

    try {
      const response = await fetch(`/api/articles/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchArticles();
      }
    } catch {
      // Handle error
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    });
  };

  const autoSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const isEditing = editing !== null || isCreating;

  return (
    <AdminGate>
    <main className="relative min-h-screen bg-[#0a0a0a] overflow-x-hidden">
      <Navigation />

      <div className="relative z-10 pt-24 pb-24 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="font-mono text-xs text-[#737373] tracking-widest block mb-2">
                {'// ADMIN'}
              </span>
              <h1 className="font-mono text-2xl md:text-3xl text-white">
                <span className="text-[#a3e635]">MANAGE</span>
                <span className="text-white"> ARTICLES</span>
              </h1>
            </div>
            {!isEditing && (
              <button
                onClick={handleCreate}
                className="bg-[#a3e635] text-[#0a0a0a] font-mono text-xs tracking-widest px-4 py-2 hover:bg-[#bef264] transition-colors flex items-center gap-2"
              >
                <Plus size={14} />
                NEW_ARTICLE( )
              </button>
            )}
          </div>

          {/* Message */}
          {message && (
            <div className="mb-6 p-4 border border-[#a3e635]/30 bg-[#a3e635]/5">
              <span className="font-mono text-xs text-[#a3e635] tracking-widest">
                {message}
              </span>
            </div>
          )}

          {/* Editor */}
          {isEditing && (
            <div className="mb-12 border border-[#262626] bg-[#111111] p-6 lg:p-8">
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-xs text-[#737373] tracking-widest">
                  {editing ? "EDIT_ARTICLE( )" : "CREATE_ARTICLE( )"}
                </span>
                <button
                  onClick={handleCancel}
                  className="text-[#737373] hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label className="font-mono text-[10px] text-[#737373] tracking-widest block mb-2">
                    TITLE:
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      setFormData({
                        ...formData,
                        title,
                        slug: formData.slug || autoSlug(title),
                      });
                    }}
                    className="w-full bg-[#0a0a0a] border border-[#262626] text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-[#a3e635] transition-colors"
                    placeholder="Article title..."
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="font-mono text-[10px] text-[#737373] tracking-widest block mb-2">
                    SLUG:
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    className="w-full bg-[#0a0a0a] border border-[#262626] text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-[#a3e635] transition-colors"
                    placeholder="article-slug"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="font-mono text-[10px] text-[#737373] tracking-widest block mb-2">
                    DESCRIPTION:
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={2}
                    className="w-full bg-[#0a0a0a] border border-[#262626] text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-[#a3e635] transition-colors resize-none"
                    placeholder="Short description..."
                  />
                </div>

                {/* Date & Category Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="font-mono text-[10px] text-[#737373] tracking-widest block mb-2">
                      DATE:
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      className="w-full bg-[#0a0a0a] border border-[#262626] text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-[#a3e635] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] text-[#737373] tracking-widest block mb-2">
                      CATEGORY:
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full bg-[#0a0a0a] border border-[#262626] text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-[#a3e635] transition-colors"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="font-mono text-[10px] text-[#737373] tracking-widest block mb-2">
                    TAGS:
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                      className="flex-1 bg-[#0a0a0a] border border-[#262626] text-white font-mono text-sm px-4 py-2 focus:outline-none focus:border-[#a3e635] transition-colors"
                      placeholder="Add tag..."
                    />
                    <button
                      onClick={handleAddTag}
                      className="bg-[#262626] text-white font-mono text-xs px-4 py-2 hover:bg-[#404040] transition-colors"
                    >
                      ADD
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] text-[#737373] px-2 py-1 border border-[#262626] flex items-center gap-2"
                      >
                        {tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="text-[#737373] hover:text-[#a3e635]"
                        >
                          <X size={10} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Premium Toggle */}
                <div className="flex items-center gap-4 p-4 border border-[#262626]">
                  <button
                    onClick={() =>
                      setFormData({ ...formData, isPremium: !formData.isPremium })
                    }
                    className={`flex items-center gap-2 font-mono text-xs tracking-widest transition-colors ${
                      formData.isPremium
                        ? "text-[#a3e635]"
                        : "text-[#737373]"
                    }`}
                  >
                    {formData.isPremium ? (
                      <Lock size={14} />
                    ) : (
                      <Unlock size={14} />
                    )}
                    {formData.isPremium ? "PREMIUM" : "FREE"}
                  </button>
                  {formData.isPremium && (
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-[#737373]">
                        PRICE: $
                      </span>
                      <input
                        type="number"
                        value={formData.price || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            price: parseInt(e.target.value) || undefined,
                          })
                        }
                        className="w-20 bg-[#0a0a0a] border border-[#262626] text-white font-mono text-sm px-3 py-1 focus:outline-none focus:border-[#a3e635] transition-colors"
                        placeholder="0"
                        min={0}
                      />
                    </div>
                  )}
                </div>

                {/* Status */}
                <div>
                  <label className="font-mono text-[10px] text-[#737373] tracking-widest block mb-2">
                    STATUS:
                  </label>
                  <div className="flex gap-4">
                    {(["draft", "published"] as const).map((status) => (
                      <button
                        key={status}
                        onClick={() =>
                          setFormData({ ...formData, status })
                        }
                        className={`font-mono text-xs tracking-widest px-4 py-2 border transition-all ${
                          formData.status === status
                            ? "bg-[#a3e635]/10 border-[#a3e635] text-[#a3e635]"
                            : "border-[#262626] text-[#737373] hover:text-white"
                        }`}
                      >
                        {status.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content (Markdown) */}
                <div>
                  <label className="font-mono text-[10px] text-[#737373] tracking-widest block mb-2">
                    CONTENT (MARKDOWN):
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    rows={20}
                    className="w-full bg-[#0a0a0a] border border-[#262626] text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-[#a3e635] transition-colors resize-y leading-relaxed"
                    placeholder="Write your article in Markdown..."
                  />
                </div>

                {/* Premium Content */}
                {formData.isPremium && (
                  <div>
                    <label className="font-mono text-[10px] text-[#737373] tracking-widest block mb-2">
                      PREMIUM_CONTENT (MARKDOWN):
                    </label>
                    <textarea
                      value={formData.premiumContent || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          premiumContent: e.target.value,
                        })
                      }
                      rows={15}
                      className="w-full bg-[#0a0a0a] border border-[#a3e635]/20 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-[#a3e635] transition-colors resize-y leading-relaxed"
                      placeholder="Premium content (locked behind paywall)..."
                    />
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-4 pt-4 border-t border-[#262626]">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-[#a3e635] text-[#0a0a0a] font-mono text-xs tracking-widest px-6 py-3 hover:bg-[#bef264] transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    <Save size={14} />
                    {saving ? "SAVING..." : "SAVE( )"}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="border border-[#262626] text-[#737373] font-mono text-xs tracking-widest px-6 py-3 hover:text-white hover:border-[#404040] transition-colors"
                  >
                    CANCEL( )
                  </button>
                  {editing && (
                    <Link
                      href={`/${editing.slug}`}
                      className="border border-[#262626] text-[#737373] font-mono text-xs tracking-widest px-6 py-3 hover:text-[#a3e635] hover:border-[#a3e635]/30 transition-colors flex items-center gap-2"
                    >
                      <Eye size={14} />
                      PREVIEW( )
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Articles List */}
          {!isEditing && (
            <div>
              {loading ? (
                <div className="text-center py-16">
                  <span className="font-mono text-xs text-[#737373] tracking-widest animate-pulse">
                    LOADING( )...
                  </span>
                </div>
              ) : articles.length === 0 ? (
                <div className="text-center py-16 border border-[#262626]">
                  <span className="font-mono text-xs text-[#737373] tracking-widest">
                    NO_ARTICLES_YET( )
                  </span>
                </div>
              ) : (
                <div className="space-y-px bg-[#262626]">
                  {articles.map((article) => (
                    <div
                      key={article.id}
                      className="bg-[#111111] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <span
                            className={`font-mono text-[10px] tracking-widest px-2 py-0.5 ${
                              article.status === "published"
                                ? "text-[#a3e635] bg-[#a3e635]/10"
                                : "text-[#737373] bg-[#262626]"
                            }`}
                          >
                            {article.status.toUpperCase()}
                          </span>
                          <span className="font-mono text-[10px] text-[#737373]">
                            {article.category}
                          </span>
                          {article.isPremium && (
                            <span className="font-mono text-[10px] text-[#a3e635] flex items-center gap-1">
                              <Lock size={10} />
                              ${article.price || 0}
                            </span>
                          )}
                        </div>
                        <h3 className="font-mono text-sm text-white truncate">
                          {article.title}
                        </h3>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="font-mono text-[10px] text-[#737373]">
                            {article.date}
                          </span>
                          <span className="font-mono text-[10px] text-[#737373]">
                            {article.readingTime}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href={`/${article.slug}`}
                          className="text-[#737373] hover:text-[#a3e635] transition-colors p-2"
                        >
                          <Eye size={16} />
                        </Link>
                        <button
                          onClick={() => handleEdit(article)}
                          className="text-[#737373] hover:text-white transition-colors p-2"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(article.id)}
                          className="text-[#737373] hover:text-red-400 transition-colors p-2"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
    </AdminGate>
  );
}
