import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col items-center justify-center bg-[var(--color-surface-page)] px-6 py-24 text-center">
        <h1 className="mb-4 text-6xl font-bold tracking-tight text-[var(--color-text-primary)]">404</h1>
        <h2 className="mb-6 text-2xl font-semibold text-[var(--color-text-secondary)]">Sayfa bulunamadı</h2>
        <p className="mb-8 max-w-md text-lg text-[var(--color-text-secondary)]">
          Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
        </p>
        <Button asChild variant="primary">
          <Link href="/">Ana sayfaya dön</Link>
        </Button>
      </main>
    </>
  );
}
