"use client";

import { useEffect, useState, useRef } from "react";
import { Monitor, ChevronDown, Check } from "lucide-react";

export type ThemeKey = "classic" | "amber" | "matrix" | "monochrome";

interface ThemeOption {
  key: ThemeKey;
  label: string;
  badge: string;
  color: string;
  desc: string;
}

const THEMES: ThemeOption[] = [
  {
    key: "classic",
    label: "Klasik Yeşil",
    badge: "CRT_GREEN",
    color: "#37F712",
    desc: "Standart Linux & Hacker yeşili",
  },
  {
    key: "amber",
    label: "Amber CRT",
    badge: "CRT_AMBER",
    color: "#FFB000",
    desc: "Retro VT220 kehribar sarısı",
  },
  {
    key: "matrix",
    label: "Matrix Fosfor",
    badge: "MATRIX",
    color: "#00FF66",
    desc: "Derin neon matriks akışı",
  },
  {
    key: "monochrome",
    label: "Monochrome",
    badge: "MONO_BW",
    color: "#FFFFFF",
    desc: "Temiz siyah & beyaz terminal",
  },
];

export function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>("classic");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Read theme on mount
  useEffect(() => {
    const saved = (localStorage.getItem("terminal_theme") as ThemeKey) || "classic";
    if (["classic", "amber", "matrix", "monochrome"].includes(saved)) {
      setCurrentTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeTheme = (theme: ThemeKey) => {
    setCurrentTheme(theme);
    localStorage.setItem("terminal_theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    setIsOpen(false);
  };

  const activeOption = THEMES.find((t) => t.key === currentTheme) || THEMES[0];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-mono font-medium uppercase tracking-wider text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] bg-[var(--color-surface-sunken)] border border-[var(--color-border-default)] hover:border-[var(--color-action-primary)] transition-all cursor-pointer select-none"
        aria-expanded={isOpen}
        aria-haspopup="true"
        title="Retro Terminal Teması Seç"
      >
        <span
          className="size-2 rounded-none inline-block shadow-[0_0_6px_currentColor]"
          style={{ backgroundColor: activeOption.color, color: activeOption.color }}
        />
        <Monitor className="size-3.5 text-[var(--color-action-primary)]" />
        <span className="hidden sm:inline font-bold">[{activeOption.badge}]</span>
        <ChevronDown className="size-3 text-[var(--color-text-tertiary)] ml-0.5" />
      </button>


      {isOpen && (
        <div
          className="absolute right-0 mt-1.5 w-60 border border-[var(--color-border-default)] bg-[var(--color-surface-card)] shadow-2xl z-50 p-1.5 font-mono text-xs"
          role="menu"
        >
          <div className="px-2 py-1 border-b border-[var(--color-border-default)] mb-1 text-[11px] text-[var(--color-text-tertiary)] flex items-center justify-between">
            <span>$ set-theme --retro</span>
            <span className="text-[var(--color-action-primary)]">v2.0</span>
          </div>

          <div className="space-y-0.5">
            {THEMES.map((theme) => {
              const isSelected = currentTheme === theme.key;
              return (
                <button
                  key={theme.key}
                  type="button"
                  onClick={() => changeTheme(theme.key)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 text-left transition-colors cursor-pointer border ${
                    isSelected
                      ? "bg-[var(--color-surface-sunken)] border-[var(--color-action-primary)] text-[var(--color-text-primary)]"
                      : "border-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-sunken)] hover:text-[var(--color-text-primary)]"
                  }`}
                  role="menuitem"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="size-2.5 shrink-0 shadow-[0_0_6px_currentColor]"
                      style={{ backgroundColor: theme.color, color: theme.color }}
                    />
                    <div className="flex flex-col">
                      <span className="font-bold">{theme.label}</span>
                      <span className="text-[10px] text-[var(--color-text-tertiary)] leading-tight">
                        {theme.desc}
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="size-3.5 text-[var(--color-action-primary)] shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
