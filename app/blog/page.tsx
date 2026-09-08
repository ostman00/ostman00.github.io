import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { getSortedPostsData } from "@/lib/posts";

export const metadata = {
  title: "Yazılar",
  description: "Tüm blog yazıları ve notlar.",
};

export default function BlogList() {
  const posts = getSortedPostsData();
  return (
    <>
      <SiteHeader />
      <main className="flex-1 px-6 py-12 max-w-4xl mx-auto w-full font-mono text-sm sm:text-base">
        <header className="mb-12">
          <div className="flex items-center text-[var(--color-text-primary)] mb-4">
            <span className="text-[var(--color-action-primary)] font-bold mr-2">$</span>
            <span>ls -la /blog/posts</span>
          </div>
          <p className="text-[var(--color-text-secondary)]">
            # Total {posts.length} entries found. Sorted by date (descending).
          </p>
        </header>

        <div className="flex flex-col border border-[var(--color-border-default)] bg-[var(--color-surface-card)]">
          <div className="flex flex-row p-3 border-b border-[var(--color-border-default)] text-[var(--color-text-tertiary)] text-xs font-bold uppercase tracking-wider">
            <div className="w-24 sm:w-32 shrink-0">Permissions</div>
            <div className="w-24 sm:w-32 shrink-0 hidden md:block">Date</div>
            <div className="w-24 shrink-0 hidden sm:block">Size</div>
            <div className="flex-1">Filename</div>
          </div>
          {posts.map((post, i) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className={`flex flex-row items-center p-3 hover:bg-[var(--color-surface-sunken)] transition-colors group ${i !== posts.length - 1 ? 'border-b border-[var(--color-border-default)]' : ''}`}
            >
              <div className="w-24 sm:w-32 shrink-0 text-xs text-[var(--color-text-secondary)]">
                -rw-r--r--
              </div>
              <div className="w-24 sm:w-32 shrink-0 text-xs text-[var(--color-text-tertiary)] hidden md:block">
                {post.date}
              </div>
              <div className="w-24 shrink-0 text-xs text-[var(--color-text-secondary)] hidden sm:block">
                {post.readingTime.replace('okuma', '').trim()}
              </div>
              <div className="flex-1 text-[var(--color-text-primary)] group-hover:text-[var(--color-action-primary)] truncate">
                ./{post.slug}.md
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
