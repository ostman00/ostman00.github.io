import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: { default: "Osman Erdoğan | Workspace", template: "%s | Osman Erdoğan" },
  description: "Ürün, tasarım, teknoloji ve daha dikkatli bir çalışma biçimi üzerine notlar.",
  metadataBase: new URL("https://ostman00.github.io"),
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: { type: "website", locale: "tr_TR", siteName: "Osman Erdoğan | Workspace" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" suppressHydrationWarning className={jetbrainsMono.variable}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('terminal_theme');
                  if (saved && ['classic', 'amber', 'matrix', 'monochrome'].indexOf(saved) !== -1) {
                    document.documentElement.setAttribute('data-theme', saved);
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased min-h-screen">
        <div className="flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}

