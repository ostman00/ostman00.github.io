import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: { default: "Osman Erdoğan | Workspace", template: "%s | Osman Erdoğan" },
  description: "Ürün, tasarım, teknoloji ve daha dikkatli bir çalışma biçimi üzerine notlar.",
  metadataBase: new URL("https://deniznotlar.example"),
  openGraph: { type: "website", locale: "tr_TR", siteName: "Osman Erdoğan | Workspace" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased min-h-screen">
        <div className="flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
