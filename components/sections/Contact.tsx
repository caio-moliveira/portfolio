"use client";

import Image from "next/image";
import { Mail, CalendarDays, FileText, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { useLang } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { socials, profile } from "@/lib/content";

export function Contact() {
  const { t } = useLang();

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
      {/* Brand logo watermark: feathered + faded into the dark, covering the whole footer */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src={profile.heroBg}
          alt=""
          fill
          priority
          className="logo-feather object-cover opacity-40"
        />
      </div>
      {/* Soft center scrim so the copy stays legible over the logo */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_58%_46%_at_50%_50%,rgba(5,7,15,0.55),transparent_72%)]" />
      <div className="relative z-10 mx-auto max-w-5xl px-5 py-24 text-center sm:px-8">
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

        <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-line pt-8 text-sm text-faint sm:flex-row">
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
