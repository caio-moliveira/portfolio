import { NextResponse } from "next/server";
import { socials, featuredRepos } from "@/lib/content";
import type { Repo } from "@/lib/github";

// Only these repos are exposed on the site (order is applied client-side).
const ALLOWED_REPOS = new Set(featuredRepos.map((r) => r.repo));

// Revalidate at most once per hour.
export const revalidate = 3600;

type GhRepo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  topics?: string[];
  fork: boolean;
  archived: boolean;
  updated_at: string;
  pushed_at: string;
};

export async function GET() {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "User-Agent": "caio-portfolio",
    };
    // Optional token lifts rate limits; works fine without it.
    const token = process.env.GITHUB_TOKEN;
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(
      `https://api.github.com/users/${socials.githubUser}/repos?per_page=100&sort=updated`,
      { headers, next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      return NextResponse.json({ repos: [], error: `GitHub ${res.status}` }, { status: 200 });
    }

    const raw = (await res.json()) as GhRepo[];
    const repos: Repo[] = raw
      .filter((r) => !r.fork && !r.archived && ALLOWED_REPOS.has(r.name))
      .map((r) => ({
        name: r.name,
        description: r.description,
        url: r.html_url,
        homepage: r.homepage && r.homepage.length > 0 ? r.homepage : null,
        language: r.language,
        stars: r.stargazers_count,
        topics: r.topics ?? [],
        updatedAt: r.updated_at,
        pushedAt: r.pushed_at,
      }))
      .sort((a, b) => b.stars - a.stars || +new Date(b.pushedAt) - +new Date(a.pushedAt));

    return NextResponse.json({ repos });
  } catch {
    return NextResponse.json({ repos: [], error: "fetch_failed" }, { status: 200 });
  }
}
