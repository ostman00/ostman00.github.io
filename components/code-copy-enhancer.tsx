"use client";

import { useEffect } from "react";

export function CodeCopyEnhancer() {
  useEffect(() => {
    // Select all code blocks in prose
    const preBlocks = document.querySelectorAll<HTMLPreElement>(".prose pre");

    preBlocks.forEach((pre) => {
      // Check if button already exists
      if (pre.querySelector(".code-copy-btn")) return;

      // Ensure pre is relatively positioned
      pre.classList.add("relative", "group");

      const button = document.createElement("button");
      button.className =
        "code-copy-btn absolute top-2 right-2 px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-[var(--color-text-secondary)] bg-[var(--color-surface-sunken)] border border-[var(--color-border-default)] hover:border-[var(--color-action-primary)] hover:text-[var(--color-action-primary)] transition-colors opacity-80 group-hover:opacity-100 flex items-center gap-1 select-none z-10 cursor-pointer";
      button.setAttribute("type", "button");
      button.setAttribute("aria-label", "Kodu kopyala");
      button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="14" height="14" x="8" y="8" rx="0" ry="0"/>
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
        </svg>
        <span>[COPY]</span>
      `;

      button.addEventListener("click", async () => {
        const codeElement = pre.querySelector("code");
        const textToCopy = codeElement ? codeElement.innerText : pre.innerText;

        try {
          await navigator.clipboard.writeText(textToCopy);
          button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[var(--color-action-primary)]">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span class="text-[var(--color-action-primary)] font-bold">[COPIED! OK]</span>
          `;
          button.classList.add("border-[var(--color-action-primary)]");

          setTimeout(() => {
            button.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="14" height="14" x="8" y="8" rx="0" ry="0"/>
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
              </svg>
              <span>[COPY]</span>
            `;
            button.classList.remove("border-[var(--color-action-primary)]");
          }, 2000);
        } catch (err) {
          console.error("Kopyalama başarısız oldu:", err);
          button.innerText = "[ERR]";
          setTimeout(() => {
            button.innerText = "[COPY]";
          }, 2000);
        }
      });

      pre.appendChild(button);
    });
  }, []);

  return null;
}
