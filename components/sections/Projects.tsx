"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ExternalLink, Star, GitBranch, GitCommit, Loader2, CheckCircle2, Rocket } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { useLang } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CompanyLogo } from "@/components/ui/CompanyLogo";
import { curatedProjects, featuredRepos, socials, type Project } from "@/lib/content";
import { fetchRepos, type Repo } from "@/lib/github";
import { TechTag } from "@/components/ui/TechTag";
import { cn } from "@/lib/utils";

const accentBar: Record<string, string> = {
  blue: "from-brand to-brand-bright",
  cyan: "from-cyan to-brand",
  violet: "from-violet to-brand",
};

// Org name -> real logo file. Projects with their own `logo` (consulting) win.
const ORG_LOGOS: Record<string, string> = {
  TCEMG: "/brand/companies/tcemg.png",
  "Quality Engineering": "/brand/companies/quality.png",
};
function orgLogoSrc(p: Project): string | undefined {
  return p.logo ?? (p.org ? ORG_LOGOS[p.org] : undefined);
}

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

/** Section sub-heading with an icon chip, title and one-line description. */
function BlockHeading({
  icon,
  tone,
  title,
  desc,
  count,
}: {
  icon: ReactNode;
  tone: string;
  title: string;
  desc: string;
  count?: number;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-xl", tone)}>{icon}</span>
        <div>
          <h3 className="font-display text-xl font-bold leading-tight text-ink">{title}</h3>
          <p className="text-sm text-muted">{desc}</p>
        </div>
      </div>
      {typeof count === "number" && count > 0 && (
        <span className="hidden shrink-0 rounded-full bg-white/5 px-3 py-1 text-sm font-semibold text-muted sm:inline-block">
          {count}
        </span>
      )}
    </div>
  );
}

/** Org identity row shared by the project cards. */
function OrgTag({ p }: { p: Project }) {
  const src = orgLogoSrc(p);
  if (!src && !p.org) return null;
  return (
    <div className="flex items-center gap-2">
      {src && <CompanyLogo name={p.org ?? p.name} src={src} className="h-8 w-8 text-[10px]" />}
      {p.org && <span className="text-xs font-semibold text-brand-bright">{p.org}</span>}
    </div>
  );
}

/** Highlighted card for work in progress — glow, ring and a live pulse badge. */
function WorkingCard({ p, lang }: { p: Project; lang: "pt" | "en" }) {
  const { t } = useLang();
  return (
    <div className="card-hover glass group relative flex h-full flex-col overflow-hidden rounded-2xl p-6 ring-1 ring-violet/40 shadow-glow">
      <div className={cn("absolute inset-x-0 top-0 h-1 bg-gradient-to-r", accentBar[p.accent ?? "violet"])} />
      <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-violet/20 blur-3xl" />

      <div className="mb-4 flex items-center justify-between gap-2">
        <OrgTag p={p} />
        <span className="flex items-center gap-1.5 rounded-full bg-violet/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-violet">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-violet" />
          </span>
          {t("proj.inProgress")}
        </span>
      </div>

      <h3 className="font-display text-xl font-bold leading-tight text-ink">{p.name}</h3>
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
    </div>
  );
}

/** Standard card for delivered projects. */
function CuratedCard({ p, lang }: { p: Project; lang: "pt" | "en" }) {
  const { t } = useLang();
  return (
    <div className="card-hover glass group relative flex h-full flex-col overflow-hidden rounded-2xl p-6">
      <div className={cn("absolute inset-x-0 top-0 h-1 bg-gradient-to-r", accentBar[p.accent ?? "blue"])} />
      <div className="mb-3 flex items-center justify-between gap-2">
        <OrgTag p={p} />
        {p.status === "delivered" && (
          <span className="flex items-center gap-1 rounded-full bg-cyan/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan">
            <CheckCircle2 className="h-3 w-3" />
            {t("proj.delivered")}
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

function formatCommitDate(iso: string, lang: "pt" | "en"): string | null {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString(lang === "pt" ? "pt-BR" : "en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function RepoCard({ repo, lang }: { repo: Repo; lang: "pt" | "en" }) {
  const { t } = useLang();
  const featured = featuredRepos.find((f) => f.repo === repo.name);
  const label = featured ? featured.desc[lang] : repo.description;
  const tags = featured?.tags ?? [];
  const commitDate = formatCommitDate(repo.pushedAt, lang);
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

      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <TechTag key={tag} name={tag} />
          ))}
        </div>
      )}

      {commitDate && (
        <div className="mt-4 flex items-center gap-1.5 text-xs text-muted">
          <GitCommit className="h-3.5 w-3.5" />
          <span>
            {t("proj.lastCommit")}: {commitDate}
          </span>
        </div>
      )}

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
  const [repos, setRepos] = useState<Repo[] | null>(null);

  useEffect(() => {
    fetchRepos().then(setRepos);
  }, []);

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

  const inProgress = curatedProjects.filter((p) => p.status === "in_progress");
  const delivered = curatedProjects.filter((p) => p.status === "delivered");

  return (
    <Section id="projects" kicker={t("proj.kicker")} title={t("proj.title")}>
      {/* ---- Working on now (highlighted) ---- */}
      {inProgress.length > 0 && (
        <div className="mb-16">
          <Reveal>
            <BlockHeading
              tone="bg-violet/15 text-violet"
              icon={<Rocket className="h-5 w-5" />}
              title={t("proj.workingNow")}
              desc={t("proj.workingNowDesc")}
              count={inProgress.length}
            />
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {inProgress.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 0.06}>
                <WorkingCard p={p} lang={lang} />
              </Reveal>
            ))}
          </div>
        </div>
      )}

      {/* ---- Delivered ---- */}
      {delivered.length > 0 && (
        <div className="mb-16">
          <Reveal>
            <BlockHeading
              tone="bg-cyan/15 text-cyan"
              icon={<CheckCircle2 className="h-5 w-5" />}
              title={t("proj.deliveredTitle")}
              desc={t("proj.deliveredDesc")}
              count={delivered.length}
            />
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {delivered.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 0.06}>
                <CuratedCard p={p} lang={lang} />
              </Reveal>
            ))}
          </div>
        </div>
      )}

      {/* ---- Personal (GitHub live) ---- */}
      <div>
        <Reveal>
          <BlockHeading
            tone="bg-brand/15 text-brand-bright"
            icon={<GithubIcon className="h-5 w-5" />}
            title={t("proj.personalTitle")}
            desc={t("proj.personalDesc")}
            count={orderedRepos.length}
          />
        </Reveal>
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
    </Section>
  );
}
