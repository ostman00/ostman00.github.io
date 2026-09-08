import { notFound } from "next/navigation";
import { getPostBySlug, getSortedPostsData } from "@/lib/posts";
import { SiteHeader } from "@/components/site-header";
import { marked } from "marked";
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

  const contentHtml = await marked(post.content);

  return (
    <>
      <SiteHeader />
      <main className="flex-1 px-6 py-12 max-w-4xl mx-auto w-full font-mono text-sm sm:text-base">
        <article>
          <header className="mb-12">
            <div className="flex items-center text-[var(--color-text-primary)] mb-4">
              <span className="text-[var(--color-action-primary)] font-bold mr-2">$</span>
              <span>cat /blog/posts/{post.slug}.md</span>
            </div>
            
            <div className="border border-[var(--color-border-default)] bg-[var(--color-surface-card)] p-4 mb-8 text-xs text-[var(--color-text-secondary)]">
              <span className="text-[var(--color-action-primary)]">---</span><br/>
              title: "{post.title}"<br/>
              category: "{post.category}"<br/>
              date: "{post.date}"<br/>
              readingTime: "{post.readingTime}"<br/>
              <span className="text-[var(--color-action-primary)]">---</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-action-primary)] mb-4 lowercase">
              # {post.title}
            </h1>
          </header>
          
          <div 
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

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
      </main>
    </>
  );
}
