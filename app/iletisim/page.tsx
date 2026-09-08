import { SiteHeader } from "@/components/site-header";
import { ContactForm } from "@/components/contact-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim",
  description: "Bana ulaşın",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 px-6 py-12 max-w-4xl mx-auto w-full font-mono text-sm sm:text-base">
        <header className="mb-12">
          <div className="flex items-center text-[var(--color-text-primary)] mb-4">
            <span className="text-[var(--color-action-primary)] font-bold mr-2">$</span>
            <span>./send_message.sh</span>
          </div>
          <p className="text-[var(--color-text-secondary)]">
            # Enter your details below to establish a connection.
          </p>
        </header>

        <ContactForm />
      </main>
    </>
  );
}
