"use client";

import Image from "next/image";
import { Play, ExternalLink, Radio, GraduationCap, PlayCircle, Check } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { TechIcon } from "@/components/ui/TechIcon";
import { CompanyLogo } from "@/components/ui/CompanyLogo";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { videos, courses, teaching, literacyTools, literacyTerms, socials } from "@/lib/content";

export function Teaching() {
  const { t, lang } = useLang();

  return (
    <Section id="teaching" kicker={t("teach.kicker")} title={t("teach.title")}>
      {/* AI Literacy highlight — tools + fundamentals for everyday use */}
      <Reveal className="mb-12">
        <div className="relative overflow-hidden rounded-3xl glass p-8 md:p-10">
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand/20 blur-3xl" />
          <div className="relative">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl gradient-brand text-white shadow-glow">
                <GraduationCap className="h-8 w-8" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-ink">{teaching.title[lang]}</h3>
                <p className="mt-2 max-w-2xl text-muted">{teaching.desc[lang]}</p>
              </div>
            </div>

            {/* Everyday AI tools */}
            <div className="mt-8">
              <p className="text-xs font-bold uppercase tracking-wider text-brand-bright">{t("teach.tools")}</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {literacyTools.map((tool) => (
                  <div
                    key={tool.name}
                    className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5"
                  >
                    <TechIcon name={tool.tech} className="h-6 w-6" />
                    <div className="leading-tight">
                      <div className="text-sm font-semibold text-ink">{tool.name}</div>
                      <div className="text-[11px] text-muted">{tool.maker[lang]}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fundamentals glossary */}
            <div className="mt-8">
              <p className="text-xs font-bold uppercase tracking-wider text-brand-bright">
                {t("teach.fundamentals")}
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {literacyTerms.map((item) => (
                  <div key={item.term.en} className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="font-display text-sm font-bold gradient-text">{item.term[lang]}</div>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted">{item.def[lang]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Courses & tracks */}
      <Reveal className="mb-4">
        <h3 className="font-display text-xl font-bold text-ink">{t("teach.courses")}</h3>
      </Reveal>
      <div className="mb-14 grid gap-5 md:grid-cols-2">
        {courses.map((c, i) => (
          <Reveal key={c.id} delay={i * 0.06}>
            <div className="card-hover glass group relative flex h-full flex-col rounded-2xl p-6">
              {/* Whole-card link to the course (stretched behind the content) */}
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={c.title[lang]}
                className="absolute inset-0 z-0 rounded-2xl"
              />

              <div className="relative z-10 flex items-center justify-between gap-2">
                <span className="w-fit rounded-full bg-brand/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-bright">
                  {c.badge[lang]}
                </span>
                {c.repo && (
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted">
                    <GithubIcon className="h-3.5 w-3.5" /> {c.repo}
                  </span>
                )}
              </div>
              <h4 className="relative z-10 mt-4 font-display text-lg font-bold text-ink">{c.title[lang]}</h4>
              <p className="relative z-10 mt-2 text-sm leading-relaxed text-muted">{c.desc[lang]}</p>

              {c.highlights && (
                <ul className="relative z-10 mt-4 space-y-2">
                  {c.highlights.map((h) => (
                    <li key={h.en} className="flex gap-2 text-sm text-muted">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                      <span className="leading-snug">{h[lang]}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="relative z-10 mt-auto flex items-center justify-between gap-3 pt-5">
                {/* Jornada de Dados logo → platform (independent link) */}
                <a
                  href={socials.jornada}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-muted transition-colors hover:text-ink"
                >
                  <CompanyLogo
                    name="Jornada de Dados"
                    src="/brand/companies/jornada.jpg"
                    className="h-7 w-7 text-[9px]"
                  />
                  Jornada de Dados
                </a>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-bright transition-colors group-hover:text-cyan">
                  {t("teach.access")} <ExternalLink className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* YouTube videos */}
      <Reveal className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-xl font-bold text-ink">{t("teach.videos")}</h3>
        <a
          href={socials.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-ink"
        >
          <PlayCircle className="h-4 w-4 text-red-500" /> @JornadaDeDados
        </a>
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((v, i) => (
          <Reveal key={v.id} delay={(i % 3) * 0.05}>
            <a
              href={v.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card-hover glass group block overflow-hidden rounded-2xl"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                  alt={v.title[lang]}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/20 to-transparent" />
                <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur">
                  {v.kind === "live" ? <Radio className="h-3 w-3 text-red-400" /> : <Play className="h-3 w-3" />}
                  {v.kind === "live" ? "Live" : t("teach.watch")}
                </div>
                <div className="absolute inset-0 grid place-items-center opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="grid h-14 w-14 place-items-center rounded-full gradient-brand text-white shadow-glow">
                    <Play className="h-6 w-6 translate-x-0.5" fill="currentColor" />
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-display text-sm font-semibold leading-snug text-ink">{v.title[lang]}</h4>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
