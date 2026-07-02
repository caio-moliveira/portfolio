"use client";

import { Bot, Search, Compass, CalendarDays, ArrowRight, ExternalLink, type LucideIcon } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { useChat } from "@/components/chat/ChatProvider";
import { TechTag } from "@/components/ui/TechTag";
import { CompanyLogo } from "@/components/ui/CompanyLogo";
import { consultingOffer, socials, curatedProjects } from "@/lib/content";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = { Bot, Search, Compass };

const accentBar: Record<string, string> = {
  blue: "from-brand to-brand-bright",
  cyan: "from-cyan to-brand",
  violet: "from-violet to-brand",
};

export function Consulting() {
  const { t, lang } = useLang();
  const { open } = useChat();
  const clients = curatedProjects.filter((p) => p.category === "consulting");

  return (
    <Section id="consulting" kicker={t("consult.kicker")} title={t("consult.title")}>
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <p className="text-lg leading-relaxed text-muted">{consultingOffer.intro[lang]}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={socials.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-xl gradient-brand px-6 py-3.5 font-semibold text-white shadow-glow transition-transform hover:scale-[1.03]"
            >
              <CalendarDays className="h-5 w-5" />
              {t("cta.book")}
            </a>
            <button
              onClick={() => open(lang === "pt" ? "Como funciona sua consultoria?" : "How does your consulting work?")}
              className="flex items-center gap-2.5 rounded-xl glass px-6 py-3.5 font-semibold text-ink transition-colors hover:border-brand-bright/40"
            >
              {t("cta.chat")}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-3">
          {consultingOffer.services.map((s, i) => {
            const Icon = icons[s.icon] ?? Bot;
            return (
              <Reveal key={s.title.en} delay={i * 0.08}>
                <div className="card-hover glass h-full rounded-2xl p-6 text-center">
                  <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl gradient-brand text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display font-bold text-ink">{s.title[lang]}</h3>
                  <p className="mt-2 text-sm leading-snug text-muted">{s.desc[lang]}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Clients & engagements */}
      <Reveal className="mb-6 mt-20">
        <h3 className="font-display text-xl font-bold text-ink">
          {lang === "pt" ? "Clientes & Engajamentos" : "Clients & Engagements"}
        </h3>
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {clients.map((c, i) => (
          <Reveal key={c.id} delay={i * 0.06}>
            <div className="card-hover glass relative flex h-full flex-col overflow-hidden rounded-2xl p-6">
              <div className={cn("absolute inset-x-0 top-0 h-1 bg-gradient-to-r", accentBar[c.accent ?? "blue"])} />
              <div className="mb-3 flex items-center gap-3">
                <CompanyLogo name={c.name} src={c.logo} className="h-11 w-11 rounded-lg text-xs" />
                <h4 className="font-display text-lg font-bold leading-tight text-ink">{c.name}</h4>
              </div>
              <p className="flex-1 text-sm leading-relaxed text-muted">{c.description[lang]}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {c.tags.map((tag) => (
                  <TechTag key={tag} name={tag} />
                ))}
              </div>
              {c.url && (
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-bright transition-colors hover:text-cyan"
                >
                  {t("proj.viewLive")} <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
