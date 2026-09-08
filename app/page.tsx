import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { getSortedPostsData } from "@/lib/posts";
import { TerminalEasterEgg } from "@/components/terminal-easter-egg";

export default function Home() {
  const posts = getSortedPostsData();
  const featured = posts.find((p) => p.featured) || posts[0];
  const recentPosts = posts.filter((p) => p.slug !== featured?.slug).slice(0, 5);

  return (
    <>
      <SiteHeader />
      <main className="flex-1 px-6 py-12 max-w-4xl mx-auto w-full font-mono text-sm sm:text-base">
        {/* Terminal Intro */}
        <section className="mb-16">
          <div className="flex flex-col gap-2">
            <div className="text-[var(--color-text-secondary)]">
              <span className="text-[var(--color-action-primary)]">osman@localhost</span>
              <span className="text-[var(--color-text-primary)]"> MINGW64 </span>
              <span className="text-[#00A6F4]">~</span>
            </div>
            <div className="flex items-center text-[var(--color-text-primary)]">
              <span className="text-[var(--color-action-primary)] font-bold mr-2">$</span>
              <span>cat whoami.txt</span>
            </div>
            <div className="mt-4 border border-[var(--color-border-default)] bg-[var(--color-surface-card)] p-4 text-[var(--color-text-primary)] leading-relaxed">
              &gt; SYSTEM_READY<br />
              &gt; INITIALIZING PERSONAL_BLOG v2.0...<br /><br />
              Merhaba, ben <span className="text-[var(--color-action-primary)] font-bold">Osman</span>. Bilgisayar mühendisiyim.<br />
              Full Stack web (React, Next.js), yüksek erişilebilir DevOps/SysAdmin mimarileri (Linux, HAProxy, PostgreSQL, Moodle) ve Yazılım Test/QA alanlarında çalışıyorum.<br /><br />
              Mimari kararlar, karşılaştığım sistem hataları, altyapı optimizasyonları ve test süreçlerinden edindiğim dersleri buraya not alıyorum.<br /><br />
              Daha iyi sistemler geliştirmek, sadece daha çok kod yazmakla değil; sağlam bir mimari, kesintisiz altyapı ve doğru problemleri çözmekle başlar.
            </div>
            <div className="mt-4 flex items-center text-[var(--color-text-primary)]">
              <span className="text-[var(--color-action-primary)] font-bold mr-2">$</span>
              <span className="animate-pulse">_</span>
            </div>
          </div>
        </section>

        {/* System Logs / Featured Post */}
        {featured && (
          <section className="mb-16">
            <div className="mb-4 text-[var(--color-action-primary)] font-bold border-b border-[var(--color-border-default)] pb-2 uppercase">
              // LATEST_SYSTEM_LOG
            </div>
            <article className="border-l-2 border-[var(--color-action-primary)] pl-4 py-2 hover:bg-[var(--color-surface-sunken)] transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-[var(--color-text-secondary)] mb-2">
                <span>[TIMESTAMP: {featured.date}]</span>
                <span>[TAG: {featured.category}]</span>
              </div>
              <h2 className="text-xl font-bold mb-2">
                <Link href={`/blog/${featured.slug}`} className="hover:text-[var(--color-action-primary)] transition-colors">
                  ./{featured.slug}.sh
                </Link>
              </h2>
              <p className="text-[var(--color-text-secondary)] mb-4">
                {featured.excerpt}
              </p>
              <Link href={`/blog/${featured.slug}`} className="text-[var(--color-action-primary)] hover:underline inline-flex items-center text-sm">
                [EXECUTE_READ]
              </Link>
            </article>
          </section>
        )}

        {/* Recent Posts Index */}
        <section className="mb-16">
          <div className="mb-4 text-[var(--color-text-secondary)] font-bold border-b border-[var(--color-border-default)] pb-2 flex justify-between">
            <span className="uppercase">// INDEX_DIR: /recent_notes</span>
            <span>TOTAL: {recentPosts.length}</span>
          </div>
          
          <div className="flex flex-col border border-[var(--color-border-default)] bg-[var(--color-surface-card)]">
            {recentPosts.map((post, i) => (
              <Link 
                key={post.slug} 
                href={`/blog/${post.slug}`}
                className={`flex flex-col sm:flex-row sm:items-center p-3 hover:bg-[var(--color-surface-sunken)] transition-colors group ${i !== recentPosts.length - 1 ? 'border-b border-[var(--color-border-default)]' : ''}`}
              >
                <div className="w-32 shrink-0 text-xs text-[var(--color-text-tertiary)] font-mono">
                  {post.date}
                </div>
                <div className="flex-1 text-[var(--color-text-primary)] group-hover:text-[var(--color-action-primary)] font-mono truncate mr-4">
                  {post.title}
                </div>
                <div className="w-24 shrink-0 text-xs text-[var(--color-text-secondary)] text-right hidden sm:block">
                  {post.readingTime}
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-4">
            <Link href="/blog" className="text-[var(--color-action-primary)] hover:underline text-sm">
              &gt; ls -la /blog
            </Link>
          </div>
        </section>

        <TerminalEasterEgg />
      </main>

      <footer className="border-t border-[var(--color-border-default)] py-6 mt-auto">
        <div className="mx-auto max-w-4xl px-6 flex justify-between text-xs text-[var(--color-text-tertiary)] font-mono">
          <div>STATUS: ONLINE</div>
          <div>UPTIME: 99.9%</div>
        </div>
      </footer>
    </>
  );
}
