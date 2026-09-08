import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projeler",
  description: "Açık kaynaklı projelerim ve repolarım.",
};

interface ProjectItem {
  pid: string;
  name: string;
  description: string;
  stars: string;
  lang: string;
  status: "active" | "archived";
  url: string;
  blogUrl?: string;
}

const projects: ProjectItem[] = [
  {
    pid: "4081",
    name: "uzem-rehber",
    description: "Yüksek Erişilebilir (HA) Uzaktan Eğitim Altyapısı (Moodle, HAProxy, PostgreSQL, PgBouncer, Scalelite, Redis, NFS).",
    stars: "1",
    lang: "DevOps",
    status: "active",
    url: "https://github.com/ostman00/uzem-rehber",
    blogUrl: "/blog/uzem-rehber"
  },
  {
    pid: "3892",
    name: "frontend-moodle",
    description: "AKUZEM için geliştirilmiş modern Headless Moodle SPA arayüzü, öğretmen kokpiti ve soru bankası platformu.",
    stars: "1",
    lang: "React / Vite",
    status: "active",
    url: "https://github.com/ostman00/frontend-moodle",
    blogUrl: "/blog/frontend-moodle"
  }
];

export default function ProjectsPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 px-6 py-12 max-w-4xl mx-auto w-full font-mono text-sm sm:text-base">
        <header className="mb-12">
          <div className="flex items-center text-[var(--color-text-primary)] mb-4">
            <span className="text-[var(--color-action-primary)] font-bold mr-2">$</span>
            <span>htop --filter=projects</span>
          </div>
          <p className="text-[var(--color-text-secondary)]">
            # Fetching public repositories... (Showing {projects.length} active processes)
          </p>
        </header>

        <div className="flex flex-col border border-[var(--color-border-default)] bg-[var(--color-surface-card)]">
          <div className="flex flex-row p-3 border-b border-[var(--color-border-default)] text-[var(--color-text-tertiary)] text-xs font-bold uppercase tracking-wider">
            <div className="w-16 shrink-0">PID</div>
            <div className="w-24 shrink-0 hidden sm:block">USER</div>
            <div className="w-16 shrink-0 hidden sm:block">STARS</div>
            <div className="w-24 shrink-0">LANG</div>
            <div className="flex-1">COMMAND (REPO)</div>
            <div className="w-24 shrink-0 text-right hidden md:block">STATUS</div>
          </div>
          
          {projects.map((proj, i) => (
            <div 
              key={proj.name}
              className={`flex flex-row items-center p-3 hover:bg-[var(--color-surface-sunken)] transition-colors group ${i !== projects.length - 1 ? 'border-b border-[var(--color-border-default)]' : ''}`}
            >
              <div className="w-16 shrink-0 text-xs text-[var(--color-text-secondary)]">
                {proj.pid}
              </div>
              <div className="w-24 shrink-0 text-xs text-[var(--color-text-secondary)] hidden sm:block">
                ostman00
              </div>
              <div className="w-16 shrink-0 text-xs text-[#FE9900] hidden sm:block">
                ★ {proj.stars}
              </div>
              <div className="w-24 shrink-0 text-xs text-[var(--color-text-tertiary)]">
                {proj.lang}
              </div>
              <div className="flex-1 flex flex-col min-w-0 pr-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <a 
                    href={proj.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[var(--color-text-primary)] group-hover:text-[var(--color-action-primary)] truncate font-bold hover:underline"
                  >
                    ./{proj.name}
                  </a>
                  {proj.blogUrl && (
                    <Link
                      href={proj.blogUrl}
                      className="text-[10px] text-[var(--color-action-primary)] border border-[var(--color-action-primary)]/50 px-1.5 py-0.5 hover:bg-[var(--color-action-primary)] hover:text-[var(--color-text-on-action)] transition-colors inline-block"
                      title="Blog yazısını oku"
                    >
                      [BLOG YAZISI]
                    </Link>
                  )}
                </div>
                <span className="text-xs text-[var(--color-text-secondary)] mt-1 line-clamp-1">
                  {proj.description}
                </span>
              </div>
              <div className={`w-24 shrink-0 text-xs text-right hidden md:block ${proj.status === 'active' ? 'text-[#00A63D]' : 'text-[#FF2157]'}`}>
                [{proj.status.toUpperCase()}]
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
