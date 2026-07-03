export type Repo = {
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  topics: string[];
  updatedAt: string;
  /** Timestamp of the last push (used as "last commit" date). */
  pushedAt: string;
};

/** Client helper: fetch curated repos from our own API route. */
export async function fetchRepos(): Promise<Repo[]> {
  try {
    const res = await fetch("/api/github", { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.repos as Repo[]) ?? [];
  } catch {
    return [];
  }
}
