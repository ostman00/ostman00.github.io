import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { ThreeTerminalCard } from "@/components/three-terminal-card";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 px-6 py-20 max-w-2xl mx-auto w-full font-mono flex flex-col justify-center">
        <div className="flex items-center text-[var(--color-text-primary)] mb-4 text-sm sm:text-base">
          <span className="text-[var(--color-action-primary)] font-bold mr-2">$</span>
          <span>curl -I https://ostman00.github.io/requested_path</span>
        </div>

        <ThreeTerminalCard variant="waves" opacity={0.35} className="p-8 border-[var(--color-border-default)]">
          <div className="text-[var(--color-action-destructive)] font-bold text-lg mb-2">
            &gt; HTTP/2 404 NOT FOUND
          </div>
          <div className="text-xs text-[var(--color-text-tertiary)] mb-6 border-b border-[var(--color-border-default)] pb-3">
            [ERROR: ERR_FILE_OR_RESOURCE_NOT_FOUND]
          </div>

          <p className="text-[var(--color-text-secondary)] text-sm mb-4 leading-relaxed">
            Aradığınız dosya, komut veya kaynak bu dizinde mevcut değil. Dosya taşınmış, silinmiş veya hatalı yazılmış olabilir.
          </p>

          <div className="pt-4 border-t border-[var(--color-border-default)] flex items-center justify-between">
            <span className="text-xs text-[var(--color-text-tertiary)]">$ cd /</span>
            <Link
              href="/"
              className="text-xs sm:text-sm font-bold bg-[var(--color-action-primary)] text-[var(--color-text-on-action)] px-4 py-2 hover:opacity-90 transition-opacity inline-flex items-center gap-1.5"
            >
              <span>[RETURN_TO_HOME]</span>
            </Link>
          </div>
        </ThreeTerminalCard>
      </main>
    </>
  );
}
