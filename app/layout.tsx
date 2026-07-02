import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import { ChatProvider } from "@/components/chat/ChatProvider";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Vercel injects the stable production domain at build time; fall back for local dev.
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Caio Machado — AI Engineer & Product Owner",
  description:
    "Transformo conhecimento organizacional e desafios operacionais em produtos de IA práticos. Agentes de IA, RAG, LLMs, consultoria e educação.",
  keywords: [
    "AI Engineer",
    "Product Owner",
    "Agentes de IA",
    "RAG",
    "LLMs",
    "Consultoria de IA",
    "Caio Machado",
    "Jornada de Dados",
    "TCEMG",
  ],
  authors: [{ name: "Caio Machado de Oliveira" }],
  openGraph: {
    title: "Caio Machado — AI Engineer & Product Owner",
    description:
      "Engenheiro de IA construindo produtos que transformam operação e conhecimento. Converse com minha IA.",
    type: "website",
    locale: "pt_BR",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${spaceGrotesk.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-screen antialiased" suppressHydrationWarning>
        <LanguageProvider>
          <ChatProvider>{children}</ChatProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
