"use client";

import { useEffect, useState } from "react";
import { ListOrdered, ChevronDown, ChevronUp } from "lucide-react";
import type { TocItem } from "@/lib/markdown";

interface TableOfContentsProps {
  toc: TocItem[];
  variant?: "mobile" | "desktop";
}

export function TableOfContents({ toc, variant }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpenMobile, setIsOpenMobile] = useState<boolean>(false);

  useEffect(() => {
    if (!toc || toc.length === 0) return;

    const handleScroll = () => {
      const headingElements = toc
        .map((item) => document.getElementById(item.id))
        .filter((el): el is HTMLElement => el !== null);

      const scrollPosition = window.scrollY + 120; // offset for sticky header

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const el = headingElements[i];
        if (el.offsetTop <= scrollPosition) {
          setActiveId(el.id);
          return;
        }
      }

      if (headingElements.length > 0) {
        setActiveId(headingElements[0].id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [toc]);

  if (!toc || toc.length === 0) {
    return null;
  }

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const topOffset = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
      setActiveId(id);
      setIsOpenMobile(false);
      window.history.pushState(null, "", `#${id}`);
    }
  };

  // Mobile View
  if (variant === "mobile") {
    return (
      <div className="lg:hidden mb-8 border border-[var(--color-border-default)] bg-[var(--color-surface-card)]">
        <button
          type="button"
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          className="w-full flex items-center justify-between p-3 text-xs font-bold text-[var(--color-text-primary)] hover:bg-[var(--color-surface-sunken)] transition-colors"
          aria-expanded={isOpenMobile}
        >
          <div className="flex items-center gap-2">
            <ListOrdered className="size-4 text-[var(--color-action-primary)]" />
            <span>[İÇİNDEKİLER TABLOSU] ({toc.length} Başlık)</span>
          </div>
          {isOpenMobile ? (
            <ChevronUp className="size-4 text-[var(--color-action-primary)]" />
          ) : (
            <ChevronDown className="size-4 text-[var(--color-text-secondary)]" />
          )}
        </button>

        {isOpenMobile && (
          <nav className="p-3 border-t border-[var(--color-border-default)] max-h-80 overflow-y-auto space-y-1 text-xs">
            {toc.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleLinkClick(e, item.id)}
                className={`block py-1 px-2 transition-colors truncate ${
                  item.level === 3 ? "pl-5 text-[var(--color-text-tertiary)]" : "font-medium"
                } ${
                  activeId === item.id
                    ? "text-[var(--color-action-primary)] bg-[var(--color-surface-sunken)] border-l-2 border-[var(--color-action-primary)]"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                {item.level === 3 ? "├─ " : "> "}
                {item.text}
              </a>
            ))}
          </nav>
        )}
      </div>
    );
  }

  // Desktop Sticky View
  return (
    <aside className="hidden lg:block w-72 shrink-0">
      <div className="sticky top-24 border border-[var(--color-border-default)] bg-[var(--color-surface-card)] p-4 max-h-[calc(100vh-8rem)] flex flex-col">
        <div className="flex items-center gap-2 pb-3 mb-2 border-b border-[var(--color-border-default)] text-xs font-bold text-[var(--color-text-primary)] tracking-wide">
          <span className="text-[var(--color-action-primary)]">$</span>
          <span>tree --toc /headings</span>
        </div>

        <nav className="overflow-y-auto space-y-0.5 text-xs pr-1 scrollbar-thin">
          {toc.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleLinkClick(e, item.id)}
              title={item.text}
              className={`block py-1.5 px-2 transition-colors truncate border-l-2 ${
                item.level === 3 ? "pl-4 text-[11px]" : "font-medium"
              } ${
                activeId === item.id
                  ? "border-[var(--color-action-primary)] text-[var(--color-action-primary)] bg-[var(--color-surface-sunken)] font-bold"
                  : "border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-strong)]"
              }`}
            >
              {item.level === 3 ? "└ " : "■ "}
              {item.text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}

