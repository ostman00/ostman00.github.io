"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Terminal } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ThemeSwitcher } from "./theme-switcher";

export function SiteHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Yazılar", href: "/blog" },
    { name: "Projeler", href: "/projects" },
    { name: "Hakkımda", href: "/hakkimda" },
    { name: "İletişim", href: "/iletisim" },
  ];

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/ostman00" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/osman-erdo%C4%9Fan-b9748824b/" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--color-border-default)] bg-[var(--color-surface-page)]/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-8">
        
        {/* Brand (Terminal Prompt Capsule) */}
        <div className="flex items-center mr-auto pr-6 sm:pr-10">
          <Link 
            href="/" 
            className="flex items-center gap-2.5 text-xs sm:text-sm font-mono tracking-tight px-3 py-1.5 border border-[var(--color-border-default)] bg-[var(--color-surface-sunken)] hover:border-[var(--color-action-primary)] transition-all select-none group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]"
            aria-label="Ana Sayfa"
          >
            <img src="/icon.png" alt="Site İkonu" className="size-5 object-contain" />
            <Terminal className="size-3.5 text-[var(--color-action-primary)]" aria-hidden="true" />
            <span className="text-[var(--color-action-primary)] font-bold">osman</span>
            <span className="text-[var(--color-text-secondary)] font-medium">@localhost:~$</span>
            <span className="inline-block w-1.5 h-3.5 bg-[var(--color-action-primary)] animate-pulse" aria-hidden="true" />
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center ml-auto" aria-label="Ana Menü">
          {/* Main Navigation Links */}
          <div className="flex items-center gap-5 lg:gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium uppercase tracking-wider transition-colors hover:text-[var(--color-action-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] px-2 py-1 ${
                  pathname === link.href ? "text-[var(--color-action-primary)] font-bold" : "text-[var(--color-text-secondary)]"
                }`}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Social Links Divider & Container */}
          <div className="hidden lg:flex items-center gap-5 ml-6 pl-6 lg:ml-7 lg:pl-7 border-l border-[var(--color-border-strong)]">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors py-1"
              >
                [{link.name}]
              </a>
            ))}
          </div>

          {/* Theme Switcher Divider & Container */}
          <div className="ml-6 pl-6 lg:ml-7 lg:pl-7 border-l border-[var(--color-border-strong)] flex items-center">
            <ThemeSwitcher />
          </div>
        </nav>


        {/* Mobile Navigation Toggle + Theme */}
        <div className="flex items-center gap-3.5 md:hidden">
          <ThemeSwitcher />
          <Button
            variant="secondary"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
            className="border border-[var(--color-border-default)] bg-[var(--color-surface-sunken)] hover:border-[var(--color-action-primary)] hover:text-[var(--color-action-primary)] rounded-none"
          >
            {isMobileMenuOpen ? (
              <X className="size-4" aria-hidden="true" />
            ) : (
              <Menu className="size-4" aria-hidden="true" />
            )}
          </Button>
        </div>
      </div>



      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="border-b border-[var(--color-border-default)] bg-[var(--color-surface-page)] px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-2" aria-label="Mobil Menü">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium uppercase tracking-wide transition-colors hover:text-[var(--color-action-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] rounded-none p-3 border border-transparent ${
                  pathname === link.href 
                    ? "text-[var(--color-action-primary)] border-[var(--color-border-default)] bg-[var(--color-surface-sunken)]" 
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-sunken)] hover:border-[var(--color-border-default)]"
                }`}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="mt-4 pt-4 border-t border-[var(--color-border-strong)] flex flex-row gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors p-2 bg-[var(--color-surface-sunken)] border border-[var(--color-border-default)]"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
