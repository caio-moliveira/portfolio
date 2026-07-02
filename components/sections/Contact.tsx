"use client";

import Image from "next/image";
import { Mail, CalendarDays, FileText, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { useLang } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { useChat } from "@/components/chat/ChatProvider";
import { socials, profile } from "@/lib/content";

export function Contact() {
  const { t, lang } = useLang();
  const { open } = useChat();

  const channels = [
    { icon: CalendarDays, label: t("cta.book"), href: socials.calendly, primary: true },
    { icon: Mail, label: socials.email, href: `mailto:${socials.email}` },
    { icon: LinkedinIcon, label: "LinkedIn", href: socials.linkedin },
    { icon: GithubIcon, label: `@${socials.githubUser}`, href: socials.github },
    { icon: FileText, label: t("cta.resume"), href: profile.resume, download: true },
  ];

  return (
    <footer id="contact" className="relative overflow-hidden border-t border-line">
      <div className="aurora opacity-40" />
      <div className="relative mx-auto max-w-5xl px-5 py-24 text-center sm:px-8">
        <Reveal>
          <h2 className="font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            {t("contact.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">{t("contact.subtitle")}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                download={c.download}
                className={
                  c.primary
                    ? "flex items-center gap-2.5 rounded-xl gradient-brand px-6 py-3.5 font-semibold text-white shadow-glow transition-transform hover:scale-[1.03]"
                    : "flex items-center gap-2.5 rounded-xl glass px-5 py-3.5 font-medium text-ink transition-colors hover:border-brand-bright/40"
                }
              >
                <c.icon className="h-5 w-5" />
                {c.label}
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <button
            onClick={() => open()}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-bright transition-colors hover:text-cyan"
          >
            <Sparkles className="h-4 w-4" />
            {lang === "pt" ? "ou converse com minha IA agora" : "or chat with my AI now"}
          </button>
        </Reveal>

        {/* Brand plate — the real CAIO logo on its native light background */}
        <Reveal delay={0.25}>
          <div className="mx-auto mt-16 w-full max-w-md overflow-hidden rounded-2xl bg-white p-4 shadow-xl ring-1 ring-white/10">
            <Image
              src={profile.logo}
              alt="Logo CAIO, Consultoria em Inteligência Artificial"
              width={720}
              height={240}
              className="h-auto w-full object-contain"
            />
          </div>
        </Reveal>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-8 text-sm text-faint sm:flex-row">
          <span>
            © {new Date().getFullYear()} {profile.name}. {t("footer.rights")}
          </span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-brand-bright" />
            {t("footer.built")}
          </span>
        </div>
      </div>
    </footer>
  );
}
