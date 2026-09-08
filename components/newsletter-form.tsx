"use client";

import { FormEvent, useState } from "react";
import { Button } from "./ui/button";

export function NewsletterForm() {
  const [message, setMessage] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Teşekkürler. Bülten altyapısı yayına alınırken seni bilgilendireceğim.");
  }

  return (
    <form className="flex w-full flex-col gap-3 sm:max-w-md" onSubmit={submit} noValidate>
      <label htmlFor="email" className="text-sm font-medium text-[var(--color-text-secondary)]">E-posta adresin</label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input 
          id="email" 
          name="email" 
          type="email" 
          placeholder="ad@ornek.com" 
          required 
          aria-describedby="newsletter-message"
          className="flex h-10 w-full rounded-[var(--radius-button)] border border-[var(--color-border-default)] bg-[var(--color-surface-card)] px-3 py-2 text-base text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] transition-colors duration-150 hover:border-[var(--color-border-strong)] focus-visible:border-[var(--color-border-focus)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
        />
        <Button type="submit" variant="primary" className="sm:w-auto w-full">Listeye katıl</Button>
      </div>
      <p className="text-sm text-[var(--color-text-secondary)]" id="newsletter-message" role="status">
        {message || "Yeni yazılar için nadir ve kısa notlar."}
      </p>
    </form>
  );
}
