"use client";

import Image from "next/image";
import {
  ExternalLink,
  Star,
  CalendarDays,
  Mail,
  Play,
  Bot,
  Brain,
  Code2,
  Database,
  Cloud,
  Compass,
  Search,
  Briefcase,
  type LucideIcon,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import type { ResolvedCard } from "@/lib/agent";
import type { Lang } from "@/lib/utils";

const skillIcons: Record<string, LucideIcon> = { Bot, Brain, Code2, Database, Cloud, Compass, Search, Briefcase };

const L = (pt: string, en: string, lang: Lang) => (lang === "pt" ? pt : en);

export function ChatCards({ cards, lang }: { cards: ResolvedCard[]; lang: Lang }) {
  if (!cards?.length) return null;
  return (
    <div className="mt-3 space-y-3">
      {cards.map((card, i) => (
        <CardRenderer key={i} card={card} lang={lang} />
      ))}
    </div>
  );
}

function CardRenderer({ card, lang }: { card: ResolvedCard; lang: Lang }) {
  switch (card.kind) {
    case "projects":
      return (
        <div className="grid gap-2.5 sm:grid-cols-2">
          {card.items.map((p) => (
            <a
              key={p.id}
              href={p.url || "#"}
              target={p.url ? "_blank" : undefined}
              rel="noopener noreferrer"
              className={`card-hover glass block rounded-xl p-3.5 ${!p.url ? "pointer-events-none" : ""}`}
            >
              <div className="mb-1.5 flex items-center gap-2">
                {p.repo ? (
                  <GithubIcon className="h-3.5 w-3.5 text-muted" />
                ) : p.org ? (
                  <span className="rounded bg-brand/15 px-1.5 py-0.5 text-[10px] font-bold text-brand-bright">{p.org}</span>
                ) : (
                  <Briefcase className="h-3.5 w-3.5 text-brand-bright" />
                )}
                <span className="font-display text-sm font-bold text-ink">{p.name}</span>
              </div>
              <p className="text-xs leading-snug text-muted line-clamp-2">{p.summary}</p>
              {p.metric && <div className="mt-1.5 text-xs font-bold gradient-text">{p.metric}</div>}
              {p.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {p.tags.slice(0, 3).map((t) => (
                    <span key={t} className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-muted">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </a>
          ))}
        </div>
      );

    case "skills":
      return (
        <div className="space-y-2">
          {card.groups.map((g) => {
            const Icon = skillIcons[g.icon] ?? Bot;
            return (
              <div key={g.id} className="glass rounded-xl p-3">
                <div className="mb-2 flex items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-lg gradient-brand text-white">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="font-display text-sm font-semibold text-ink">{g.title}</span>
                  <span className="ml-auto text-xs font-bold text-brand-bright">{g.level}%</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {g.skills.map((s) => (
                    <span key={s} className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] text-muted">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      );

    case "experience":
      return (
        <div className="space-y-2">
          {card.items.map((e) => (
            <div key={e.company} className="glass rounded-xl p-3.5">
              <div className="flex items-center justify-between gap-2">
                <span className="font-display text-sm font-bold text-ink">{e.role}</span>
                <span className="text-[11px] font-semibold text-brand-bright">{e.period}</span>
              </div>
              <span className="text-xs font-medium text-muted">{e.company}</span>
              <p className="mt-1.5 text-xs leading-snug text-muted">{e.summary}</p>
            </div>
          ))}
        </div>
      );

    case "content":
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {card.videos.slice(0, 6).map((v) => (
              <a
                key={v.id}
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover group block overflow-hidden rounded-xl glass"
              >
                <div className="relative aspect-video">
                  <Image
                    src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                    alt={v.title}
                    fill
                    className="object-cover"
                    sizes="150px"
                  />
                  <div className="absolute inset-0 grid place-items-center bg-black/20">
                    <span className="grid h-8 w-8 place-items-center rounded-full gradient-brand text-white">
                      <Play className="h-4 w-4 translate-x-0.5" fill="currentColor" />
                    </span>
                  </div>
                </div>
                <p className="p-2 text-[11px] font-medium leading-snug text-ink line-clamp-2">{v.title}</p>
              </a>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {card.courses.map((c) => (
              <a
                key={c.url}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-ink transition-colors hover:border-brand-bright/40"
              >
                <span className="rounded bg-brand/15 px-1.5 py-0.5 text-[10px] font-bold text-brand-bright">{c.badge}</span>
                {c.title}
                <ExternalLink className="h-3 w-3 text-muted" />
              </a>
            ))}
          </div>
        </div>
      );

    case "consulting":
      return (
        <div className="glass rounded-xl p-4">
          <p className="text-xs leading-relaxed text-muted">{card.intro}</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {card.services.map((s) => {
              const Icon = skillIcons[s.icon] ?? Bot;
              return (
                <div key={s.title} className="rounded-lg bg-white/[0.03] p-2.5">
                  <Icon className="mb-1 h-4 w-4 text-brand-bright" />
                  <div className="text-xs font-bold text-ink">{s.title}</div>
                  <div className="text-[11px] leading-snug text-muted">{s.desc}</div>
                </div>
              );
            })}
          </div>
          <a
            href={card.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-lg gradient-brand px-4 py-2 text-xs font-semibold text-white"
          >
            <CalendarDays className="h-4 w-4" />
            {L("Agende uma conversa", "Book a call", lang)}
          </a>
        </div>
      );

    case "contact":
      return (
        <div className="flex flex-wrap gap-2">
          <ContactBtn href={card.calendly} icon={CalendarDays} label={L("Agendar", "Book", lang)} primary />
          <ContactBtn href={`mailto:${card.email}`} icon={Mail} label="Email" />
          <ContactBtn href={card.linkedin} icon={LinkedinIcon} label="LinkedIn" />
          <ContactBtn href={card.github} icon={GithubIcon} label="GitHub" />
        </div>
      );

    case "booking":
      return (
        <a
          href={card.calendly}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-glow"
        >
          <CalendarDays className="h-4 w-4" />
          {card.title}
        </a>
      );

    default:
      return null;
  }
}

function ContactBtn({
  href,
  icon: Icon,
  label,
  primary,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        primary
          ? "inline-flex items-center gap-1.5 rounded-lg gradient-brand px-3.5 py-2 text-xs font-semibold text-white"
          : "glass inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-medium text-ink transition-colors hover:border-brand-bright/40"
      }
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </a>
  );
}
