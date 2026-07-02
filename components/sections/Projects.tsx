"use client";

import { useEffect, useMemo, useState } from "react";
import { ExternalLink, Star, GitBranch, Loader2, CheckCircle2, CircleDot } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { useLang } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { curatedProjects, featuredRepos, socials, metrics, type Project } from "@/lib/content";
import { fetchRepos, type Repo } from "@/lib/github";
import { TechTag } from "@/components/ui/TechTag";
import { cn } from "@/lib/utils";

type Tab = "all" | "personal" | "professional" | "building";

const accentBar: Record<string, string> = {
  blue: "from-brand to-brand-bright",
  cyan: "from-cyan to-brand",
  violet: "from-violet to-brand",
};

function langColor(language: string | null): string {
  const map: Record<string, string> = {
    Python: "#3b82f6",
    "Jupyter Notebook": "#f97316",
    TypeScript: "#2dd4bf",
    JavaScript: "#eab308",
    HTML: "#ef4444",
  };
  return (language && map[language]) || "#63a4ff";
}

function CuratedCard({ p, lang }: { p: Project; lang: "pt" | "en" }) {
  const { t } = useLang();
  const statusDelivered = p.status === "delivered";
  return (
    <div className="card-hover glass group relative flex h-full flex-col overflow-hidden rounded-2xl p-6">
      <div className={cn("absolute inset-x-0 top-0 h-1 bg-gradient-to-r", accentBar[p.accent ?? "blue"])} />
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {p.org && (
            <span className="rounded-md bg-white/5 px-2 py-0.5 text-xs font-medium text-brand-bright">{p.org}</span>
          )}
        </div>
        {p.status && (
          <span
            className={cn(
              "flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
              statusDelivered ? "bg-cyan/15 text-cyan" : "bg-violet/15 text-violet"
            )}
          >
            {statusDelivered ? <CheckCircle2 className="h-3 w-3" /> : <CircleDot className="h-3 w-3" />}
            {statusDelivered ? t("proj.delivered") : t("proj.inProgress")}
          </span>
        )}
      </div>

      <h3 className="font-display text-lg font-bold leading-tight text-ink">{p.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.description[lang]}</p>

      {p.metric && (
        <div className="mt-4 inline-flex w-fit items-center rounded-lg bg-brand/10 px-3 py-1.5 font-display text-sm font-bold gradient-text">
          {p.metric[lang]}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-1.5">
        {p.tags.map((tag) => (
          <TechTag key={tag} name={tag} />
        ))}
      </div>

      {p.url && (
        <a
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-bright transition-colors hover:text-cyan"
        >
          {t("proj.viewLive")} <ExternalLink className="h-3.5 w-3.5" />
        </a>
      )}
    </div>
  );
}

function RepoCard({ repo, lang }: { repo: Repo; lang: "pt" | "en" }) {
  const { t } = useLang();
  const featured = featuredRepos.find((f) => f.repo === repo.name);
  const label = featured ? featured.label[lang] : repo.description;
  return (
    <div className="card-hover glass group flex h-full flex-col rounded-2xl p-6">
      <div className="mb-3 flex items-center justify-between">
        <GithubIcon className="h-5 w-5 text-muted" />
        <div className="flex items-center gap-3 text-xs text-muted">
          {repo.stars > 0 && (
            <span className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 text-brand-bright" /> {repo.stars}
            </span>
          )}
          {repo.language && (
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: langColor(repo.language) }} />
              {repo.language}
            </span>
          )}
        </div>
      </div>
      <h3 className="font-display text-base font-bold text-ink">{repo.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted line-clamp-3">
        {label || (lang === "pt" ? "Projeto pessoal no GitHub." : "Personal project on GitHub.")}
      </p>
      <div className="mt-4 flex items-center gap-4">
        <a
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-bright transition-colors hover:text-cyan"
        >
          <GitBranch className="h-3.5 w-3.5" /> {t("proj.viewRepo")}
        </a>
        {repo.homepage && (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
          >
            {t("proj.viewLive")} <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}

export function Projects() {
  const { t, lang } = useLang();
  const [tab, setTab] = useState<Tab>("all");
  const [repos, setRepos] = useState<Repo[] | null>(null);

  useEffect(() => {
    fetchRepos().then(setRepos);
  }, []);

  const tabs: { id: Tab; label: string }[] = [
    { id: "all", label: t("proj.all") },
    { id: "personal", label: t("proj.personal") },
    { id: "professional", label: t("proj.professional") },
    { id: "building", label: t("proj.building") },
  ];

  // Order personal repos: featured first (by our list), then by stars.
  const orderedRepos = useMemo(() => {
    if (!repos) return [];
    const featuredOrder = featuredRepos.map((f) => f.repo);
    return [...repos].sort((a, b) => {
      const ai = featuredOrder.indexOf(a.name);
      const bi = featuredOrder.indexOf(b.name);
      if (ai !== -1 && bi !== -1) return ai - bi;
      if (ai !== -1) return -1;
      if (bi !== -1) return 1;
      return b.stars - a.stars;
    });
  }, [repos]);

  const curatedByCat = (cat: Project["category"]) => curatedProjects.filter((p) => p.category === cat);

  return (
    <Section id="projects" kicker={t("proj.kicker")} title={t("proj.title")}>
      {/* Impact metrics */}
      <Reveal className="mb-10">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {metrics.map((m) => (
            <div key={m.value} className="glass rounded-2xl px-4 py-4 text-center sm:text-left">
              <div className="font-display text-2xl font-bold gradient-text sm:text-3xl">{m.value}</div>
              <div className="mt-1 text-xs leading-snug text-muted">{m.label[lang]}</div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Tabs */}
      <Reveal className="mb-10">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tb) => (
            <button
              key={tb.id}
              onClick={() => setTab(tb.id)}
              className={cn(
                "rounded-xl px-4 py-2 text-sm font-semibold transition-all",
                tab === tb.id ? "gradient-brand text-white shadow-glow" : "glass text-muted hover:text-ink"
              )}
            >
              {tb.label}
            </button>
          ))}
        </div>
      </Reveal>

      {/* All */}
      {tab === "all" && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[...curatedByCat("professional"), ...curatedByCat("building")].map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 0.06}>
              <CuratedCard p={p} lang={lang} />
            </Reveal>
          ))}
          {orderedRepos.slice(0, 3).map((r, i) => (
            <Reveal key={r.name} delay={(i % 3) * 0.06}>
              <RepoCard repo={r} lang={lang} />
            </Reveal>
          ))}
        </div>
      )}

      {/* Personal (GitHub live) */}
      {tab === "personal" && (
        <div>
          {repos === null ? (
            <div className="flex items-center justify-center gap-3 py-16 text-muted">
              <Loader2 className="h-5 w-5 animate-spin" /> {t("proj.loading")}
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {orderedRepos.map((r, i) => (
                <Reveal key={r.name} delay={(i % 3) * 0.05}>
                  <RepoCard repo={r} lang={lang} />
                </Reveal>
              ))}
            </div>
          )}
          <div className="mt-8 text-center">
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl glass px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand-bright/40"
            >
              <GithubIcon className="h-4 w-4" /> @{socials.githubUser}
            </a>
          </div>
        </div>
      )}

      {(tab === "professional" || tab === "building") && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {curatedByCat(tab).map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 0.06}>
              <CuratedCard p={p} lang={lang} />
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}
