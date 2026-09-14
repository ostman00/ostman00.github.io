"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, X, Tag } from "lucide-react";
import type { Post } from "@/lib/posts";

interface BlogSearchFilterProps {
  initialPosts: Post[];
  categories: string[];
}

export function BlogSearchFilter({ initialPosts, categories }: BlogSearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tümü");

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "Tümü" ||
        post.category?.toLowerCase() === selectedCategory.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt?.toLowerCase().includes(q) ||
        post.slug.toLowerCase().includes(q) ||
        post.category?.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [initialPosts, searchQuery, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Search Bar with Terminal Styling */}
      <div className="border border-[var(--color-border-default)] bg-[var(--color-surface-card)] p-3 flex items-center gap-2 focus-within:border-[var(--color-action-primary)] transition-colors">
        <span className="text-[var(--color-action-primary)] font-bold text-sm sm:text-base">$</span>
        <span className="text-[var(--color-text-secondary)] text-xs sm:text-sm font-semibold hidden sm:inline">
          grep -i
        </span>
        <div className="relative flex-1 flex items-center">
          <Search className="size-4 text-[var(--color-text-tertiary)] absolute left-1 sm:hidden pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="yazı başlığı, teknoloji veya anahtar kelime..."
            className="w-full bg-transparent text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] text-xs sm:text-sm pl-7 sm:pl-1 pr-8 py-1 focus:outline-none"
            aria-label="Blog yazılarında ara"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-1 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-action-destructive)] uppercase px-1 py-0.5 border border-[var(--color-border-default)] hover:border-[var(--color-action-destructive)]"
              title="Aramayı temizle"
            >
              [ESC]
            </button>
          )}
        </div>
      </div>

      {/* Category / Tag Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-[var(--color-text-tertiary)] flex items-center gap-1 mr-1">
          <Tag className="size-3 text-[var(--color-action-primary)]" />
          <span>#tags:</span>
        </span>
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer border ${
                isActive
                  ? "bg-[var(--color-action-primary)] text-[var(--color-text-on-action)] border-[var(--color-action-primary)] font-bold shadow-[0_0_8px_rgba(55,247,18,0.2)]"
                  : "bg-[var(--color-surface-card)] text-[var(--color-text-secondary)] border-[var(--color-border-default)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              {cat === "Tümü" ? "[TÜMÜ]" : `#${cat}`}
            </button>
          );
        })}
      </div>

      {/* Results Header Status */}
      <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary)] px-1">
        <span>
          # Showing {filteredPosts.length} of {initialPosts.length} entries
          {searchQuery && ` for pattern "${searchQuery}"`}
        </span>
        {(searchQuery || selectedCategory !== "Tümü") && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("Tümü");
            }}
            className="text-[var(--color-action-primary)] hover:underline flex items-center gap-1"
          >
            <X className="size-3" />
            <span>[FİLTRELERİ SIFIRLA]</span>
          </button>
        )}
      </div>

      {/* File List Table (ls -la format) */}
      <div className="flex flex-col border border-[var(--color-border-default)] bg-[var(--color-surface-card)]">
        <div className="flex flex-row p-3 border-b border-[var(--color-border-default)] text-[var(--color-text-tertiary)] text-xs font-bold uppercase tracking-wider">
          <div className="w-24 sm:w-28 shrink-0">Perms</div>
          <div className="w-24 sm:w-28 shrink-0 hidden md:block">Date</div>
          <div className="w-28 shrink-0 hidden sm:block">Category</div>
          <div className="w-20 shrink-0 hidden sm:block">Read</div>
          <div className="flex-1">Filename</div>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="p-8 text-center text-xs text-[var(--color-text-tertiary)] font-mono space-y-2">
            <p className="text-[var(--color-action-destructive)]">
              $ grep: Eşleşen kayıt bulunamadı: "{searchQuery}"
            </p>
            <p className="text-[var(--color-text-secondary)]">
              Farklı bir arama terimi deneyin veya etiket filtresini kaldırın.
            </p>
          </div>
        ) : (
          filteredPosts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`flex flex-row items-center p-3 hover:bg-[var(--color-surface-sunken)] transition-colors group ${
                i !== filteredPosts.length - 1 ? "border-b border-[var(--color-border-default)]" : ""
              }`}
            >
              <div className="w-24 sm:w-28 shrink-0 text-xs text-[var(--color-text-secondary)]">
                -rw-r--r--
              </div>
              <div className="w-24 sm:w-28 shrink-0 text-xs text-[var(--color-text-tertiary)] hidden md:block">
                {post.date}
              </div>
              <div className="w-28 shrink-0 text-xs text-[var(--color-action-primary)] truncate hidden sm:block pr-2">
                [{post.category}]
              </div>
              <div className="w-20 shrink-0 text-xs text-[var(--color-text-secondary)] hidden sm:block">
                {post.readingTime?.replace("okuma", "").trim() || "5 dk"}
              </div>
              <div className="flex-1 min-w-0 pr-2">
                <div className="text-[var(--color-text-primary)] group-hover:text-[var(--color-action-primary)] truncate font-semibold">
                  ./{post.slug}.md
                </div>
                <div className="text-[11px] text-[var(--color-text-secondary)] truncate">
                  # {post.title}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
