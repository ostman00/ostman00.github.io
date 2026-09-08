"use client";

import { useState, FormEvent } from "react";

const ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "676b1d99-f63a-43e3-852d-4de0b87a065e";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [timestamp, setTimestamp] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          subject: `[Portfolio İletişim] ${name.trim()} yeni bir mesaj gönderdi`,
          from_name: "Osman Portfolio",
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setTimestamp(new Date().toLocaleString("tr-TR"));
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
        setErrorMessage(data.message || "İletim sırasında beklenmeyen bir hata oluştu.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage("Ağ bağlantısı kurulamadı. Lütfen tekrar deneyin.");
    }
  }

  function handleReset() {
    setStatus("idle");
    setErrorMessage("");
  }

  if (status === "success") {
    return (
      <div className="border border-[var(--color-action-primary)] bg-[var(--color-surface-card)] p-6 text-[var(--color-text-primary)] font-mono leading-relaxed flex flex-col gap-4">
        <div className="text-[var(--color-action-primary)] font-bold text-base flex items-center gap-2">
          <span>&gt;</span>
          <span>[STATUS 200 OK] PACKET_TRANSMITTED_SUCCESSFULLY</span>
        </div>
        <p className="text-[var(--color-text-secondary)]">
          Mesajınız başarıyla iletildi! En kısa sürede e-posta adresinize dönüş yapacağım.
        </p>
        <div className="text-xs text-[var(--color-text-tertiary)] border-t border-[var(--color-border-default)] pt-3 flex flex-wrap gap-4">
          <span>[TIMESTAMP: {timestamp}]</span>
          <span>[DESTINATION: EMAIL_INBOX]</span>
          <span>[PROTOCOL: WEB3FORMS_TLS]</span>
        </div>
        <div className="pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="text-[var(--color-action-primary)] hover:underline text-sm font-bold inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-action-primary)]"
          >
            <span>&gt;</span>
            <span>./send_message.sh --new-session</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 p-6 border border-[var(--color-border-default)] bg-[var(--color-surface-card)] font-mono"
      noValidate
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-[var(--color-action-primary)] font-bold">
          &gt; INPUT_NAME
        </label>
        <input 
          id="name" 
          name="name" 
          type="text" 
          required 
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={status === "submitting"}
          className="flex h-10 w-full border border-[var(--color-border-strong)] bg-[var(--color-surface-page)] px-3 py-2 text-[var(--color-text-primary)] font-mono placeholder:text-[var(--color-text-tertiary)] focus-visible:outline-none focus-visible:border-[var(--color-action-primary)] disabled:opacity-50"
          placeholder="e.g. Ahmet Yılmaz"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-[var(--color-action-primary)] font-bold">
          &gt; INPUT_EMAIL
        </label>
        <input 
          id="email" 
          name="email" 
          type="email" 
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "submitting"}
          className="flex h-10 w-full border border-[var(--color-border-strong)] bg-[var(--color-surface-page)] px-3 py-2 text-[var(--color-text-primary)] font-mono placeholder:text-[var(--color-text-tertiary)] focus-visible:outline-none focus-visible:border-[var(--color-action-primary)] disabled:opacity-50"
          placeholder="e.g. ahmet@example.com"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-[var(--color-action-primary)] font-bold">
          &gt; INPUT_PAYLOAD
        </label>
        <textarea 
          id="message" 
          name="message" 
          required 
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={status === "submitting"}
          className="flex w-full border border-[var(--color-border-strong)] bg-[var(--color-surface-page)] px-3 py-2 text-[var(--color-text-primary)] font-mono placeholder:text-[var(--color-text-tertiary)] focus-visible:outline-none focus-visible:border-[var(--color-action-primary)] disabled:opacity-50"
          placeholder="Mesajınızı buraya yazın..."
        />
      </div>

      {status === "error" && (
        <div className="border border-red-500/50 bg-red-950/30 p-4 text-red-400 text-sm leading-relaxed" role="alert">
          <div className="font-bold mb-1">&gt; [ERROR 500: TRANSMISSION_FAILED]</div>
          <div>{errorMessage}</div>
        </div>
      )}

      <button 
        type="submit" 
        disabled={status === "submitting"}
        className="w-full sm:w-auto self-start bg-[var(--color-action-primary)] text-[var(--color-text-on-action)] font-bold px-6 py-2 mt-2 hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status === "submitting" ? (
          <>
            <span className="inline-block animate-spin">⠋</span>
            <span>[TRANSMITTING_PACKET...]</span>
          </>
        ) : (
          <span>[EXECUTE_SEND]</span>
        )}
      </button>
    </form>
  );
}
