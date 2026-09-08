"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { categories, posts } from "@/lib/posts";

export function BlogExplorer() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const filtered = useMemo(() => posts.filter((post) => {
    const matchesCategory = activeCategory === "Tümü" || post.category === activeCategory;
    const text = `${post.title} ${post.excerpt} ${post.category}`.toLocaleLowerCase("tr-TR");
    return matchesCategory && text.includes(query.toLocaleLowerCase("tr-TR"));
  }), [activeCategory, query]);

  return (
    <section className="explorer" aria-labelledby="explorer-title">
      <div className="explorer-head">
        <div>
          <p className="eyebrow">Arşiv</p>
          <h2 id="explorer-title">Düşünmek için kısa bir ara.</h2>
        </div>
        <label className="search-field" htmlFor="search">
          <span>Yazılarda ara</span>
          <input id="search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Başlık veya konu" />
        </label>
      </div>
      <div className="filters" aria-label="Kategori filtresi">
        {categories.map((category) => (
          <button
            key={category}
            className={activeCategory === category ? "filter selected" : "filter"}
            type="button"
            aria-pressed={activeCategory === category}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="post-list" aria-live="polite">
        {filtered.map((post) => (
          <article className="post-row" key={post.slug}>
            <div className="post-meta"><span>{post.category}</span><span>{post.readingTime}</span></div>
            <div>
              <h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
              <p>{post.excerpt}</p>
            </div>
            <time dateTime="2026-08-01">{post.date}</time>
          </article>
        ))}
      </div>
      {filtered.length === 0 && <p className="empty" role="status">Bu aramaya uygun bir yazı bulunamadı. Farklı bir ifade deneyebilirsin.</p>}
    </section>
  );
}
