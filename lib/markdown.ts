import { Marked } from "marked";

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function slugify(text: string): string {
  const trMap: Record<string, string> = {
    ç: "c",
    Ç: "c",
    ğ: "g",
    Ğ: "g",
    ı: "i",
    I: "i",
    İ: "i",
    ö: "o",
    Ö: "o",
    ş: "s",
    Ş: "s",
    ü: "u",
    Ü: "u",
  };
  let cleaned = text;
  for (const [tr, en] of Object.entries(trMap)) {
    cleaned = cleaned.replaceAll(tr, en);
  }
  return cleaned
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function extractToc(markdown: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const toc: TocItem[] = [];
  const idCounts = new Map<string, number>();

  let match;
  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const rawText = match[2]
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[*_`]/g, "")
      .trim();
    
    let id = slugify(rawText);
    if (!id) id = `section-${toc.length + 1}`;

    if (idCounts.has(id)) {
      const count = idCounts.get(id)! + 1;
      idCounts.set(id, count);
      id = `${id}-${count}`;
    } else {
      idCounts.set(id, 1);
    }

    toc.push({ id, text: rawText, level });
  }
  return toc;
}

export function calculateReadingStats(content: string): { words: number; minutes: number; text: string } {
  const cleanContent = content.replace(/```[\s\S]*?```/g, "").replace(/<[^>]*>/g, "");
  const words = cleanContent.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return {
    words,
    minutes,
    text: `${minutes} dk okuma`,
  };
}

export async function parseMarkdownWithIds(markdown: string): Promise<{ html: string; toc: TocItem[]; stats: { words: number; minutes: number; text: string } }> {
  const toc = extractToc(markdown);
  const stats = calculateReadingStats(markdown);
  const idCounts = new Map<string, number>();

  const markedInstance = new Marked();

  markedInstance.use({
    renderer: {
      heading({ tokens, depth }: { tokens: any[]; depth: number }) {
        const text = this.parser.parseInline(tokens);
        const rawText = tokens.map((t: any) => t.raw || t.text || "").join("")
          .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
          .replace(/[*_`]/g, "")
          .trim();

        let id = slugify(rawText);
        if (!id) id = `heading-${depth}`;

        if (idCounts.has(id)) {
          const count = idCounts.get(id)! + 1;
          idCounts.set(id, count);
          id = `${id}-${count}`;
        } else {
          idCounts.set(id, 1);
        }

        return `<h${depth} id="${id}" class="scroll-mt-20 group">${text} <a href="#${id}" class="opacity-0 group-hover:opacity-60 text-xs ml-2 no-underline hover:underline font-normal text-[var(--color-action-primary)]" aria-label="Bölüm linki">#</a></h${depth}>\n`;
      },
    },
  });

  const html = await markedInstance.parse(markdown);
  return { html, toc, stats };
}

