import { notFound } from "next/navigation";
import { getPostBySlug, getSortedPostsData } from "@/lib/posts";
import { SiteHeader } from "@/components/site-header";
import { parseMarkdownWithIds } from "@/lib/markdown";
import { TableOfContents } from "@/components/table-of-contents";
import { ReadingProgressBar } from "@/components/reading-progress-bar";
import { CodeCopyEnhancer } from "@/components/code-copy-enhancer";
import { Clock, Calendar, Tag, FileText } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "404 - Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { html: contentHtml, toc, stats } = await parseMarkdownWithIds(post.content);

  return (
    <>
      <ReadingProgressBar />
      <CodeCopyEnhancer />
      <SiteHeader />

      <main className="flex-1 px-4 sm:px-6 py-12 max-w-6xl mx-auto w-full font-mono text-sm sm:text-base">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Main Article */}
          <article className="flex-1 min-w-0 w-full">
            <header className="mb-10">
              <div className="flex items-center text-[var(--color-text-primary)] mb-4">
                <span className="text-[var(--color-action-primary)] font-bold mr-2">$</span>
                <span className="truncate">cat /blog/posts/{post.slug}.md</span>
              </div>

              {/* Terminal File Info Metadata Box */}
              <div className="border border-[var(--color-border-default)] bg-[var(--color-surface-card)] p-4 mb-8 text-xs text-[var(--color-text-secondary)] space-y-1">
                <div className="text-[var(--color-action-primary)]">---</div>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
                  <div className="flex items-center gap-1.5">
                    <Tag className="size-3.5 text-[var(--color-action-primary)]" />
                    <span>category: <strong className="text-[var(--color-text-primary)]">"{post.category}"</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="size-3.5 text-[var(--color-action-primary)]" />
                    <span>date: <strong className="text-[var(--color-text-primary)]">"{post.date}"</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="size-3.5 text-[var(--color-action-primary)]" />
                    <span>readingTime: <strong className="text-[var(--color-text-primary)]">"⏱️ {stats.text}"</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FileText className="size-3.5 text-[var(--color-action-primary)]" />
                    <span>words: <strong className="text-[var(--color-text-primary)]">~{stats.words} kelime</strong></span>
                  </div>
                </div>
                <div className="text-[var(--color-action-primary)]">---</div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-action-primary)] mb-4 lowercase leading-tight">
                # {post.title}
              </h1>
            </header>

            {/* Mobile TOC inside article flow */}
            <TableOfContents toc={toc} variant="mobile" />

            {/* Markdown Content */}
            <div
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />

            {/* Bottom Terminal Navigation */}
            <div className="mt-16 pt-8 border-t border-[var(--color-border-default)]">
              <div className="flex items-center text-[var(--color-text-primary)]">
                <span className="text-[var(--color-action-primary)] font-bold mr-2">$</span>
                <span className="mr-2">cd ..</span>
              </div>
              <Link
                href="/blog"
                className="mt-4 inline-block text-[var(--color-action-primary)] hover:underline"
              >
                [RETURN_TO_INDEX]
              </Link>
            </div>
          </article>

          {/* Desktop Sticky Table of Contents */}
          <TableOfContents toc={toc} variant="desktop" />
        </div>
      </main>
    </>
  );
}


