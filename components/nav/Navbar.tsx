"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Sparkles, Menu, X } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useChat } from "@/components/chat/ChatProvider";
import { profile } from "@/lib/content";
import { cn } from "@/lib/utils";

const links: { id: string; key: Parameters<ReturnType<typeof useLang>["t"]>[0] }[] = [
  { id: "about", key: "nav.about" },
  { id: "experience", key: "nav.experience" },
  { id: "projects", key: "nav.projects" },
  { id: "teaching", key: "nav.teaching" },
  { id: "consulting", key: "nav.consulting" },
  { id: "contact", key: "nav.contact" },
];

export function Navbar() {
  const { t, lang, toggle } = useLang();
  const { open } = useChat();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <nav
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-2xl px-4 py-2.5 transition-all sm:px-5",
          scrolled ? "glass-strong mx-3 shadow-lg sm:mx-5" : "mx-3 bg-transparent sm:mx-5"
        )}
      >
        <a href="#top" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl gradient-brand font-display text-sm font-bold text-white">
            C
          </span>
          <span className="font-display text-sm font-semibold tracking-tight text-ink">
            {profile.shortName}
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:text-ink"
            >
              {t(l.key)}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle language"
            className="glass flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold text-muted transition-colors hover:text-ink"
          >
            <span className={lang === "pt" ? "text-brand-bright" : ""}>PT</span>
            <span className="text-faint">/</span>
            <span className={lang === "en" ? "text-brand-bright" : ""}>EN</span>
          </button>

          <button
            onClick={() => open()}
            className="group relative hidden h-9 items-center gap-2 overflow-hidden rounded-lg gradient-brand px-4 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.03] sm:flex"
          >
            <Sparkles className="h-4 w-4" />
            {t("cta.chatShort")}
          </button>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
            className="glass grid h-9 w-9 place-items-center rounded-lg text-ink lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="glass-strong mx-3 mt-2 rounded-2xl p-3 lg:hidden">
          <div className="grid grid-cols-2 gap-1">
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-muted transition-colors hover:bg-white/5 hover:text-ink"
              >
                {t(l.key)}
              </a>
            ))}
          </div>
          <button
            onClick={() => {
              setMobileOpen(false);
              open();
            }}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg gradient-brand px-4 py-2.5 text-sm font-semibold text-white"
          >
            <Sparkles className="h-4 w-4" />
            {t("cta.chat")}
          </button>
        </div>
      )}
    </header>
  );
}
