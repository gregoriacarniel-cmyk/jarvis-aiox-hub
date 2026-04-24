import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jarvis AIOX Hub | Master Command",
  description: "Unified AI Control Center for Alpha Sentinel and FoxConect",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800&family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#050505] text-white antialiased font-['Inter'] selection:bg-cyan-500/30">
        {children}
      </body>
    </html>
  );
}
