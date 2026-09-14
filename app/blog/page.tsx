import { SiteHeader } from "@/components/site-header";
import { getSortedPostsData, categories } from "@/lib/posts";
import { BlogSearchFilter } from "@/components/blog-search-filter";

export const metadata = {
  title: "Yazılar",
  description: "Tüm blog yazıları, teknik rehberler ve notlar.",
};

export default function BlogList() {
  const posts = getSortedPostsData();

  return (
    <>
      <SiteHeader />
      <main className="flex-1 px-6 py-12 max-w-4xl mx-auto w-full font-mono text-sm sm:text-base">
        <header className="mb-8">
          <div className="flex items-center text-[var(--color-text-primary)] mb-4">
            <span className="text-[var(--color-action-primary)] font-bold mr-2">$</span>
            <span>ls -la /blog/posts --filter</span>
          </div>
          <p className="text-[var(--color-text-secondary)]">
            # Total {posts.length} entries published. Live search and tag filtering enabled.
          </p>
        </header>

        <BlogSearchFilter initialPosts={posts} categories={categories} />
      </main>
    </>
  );
}

