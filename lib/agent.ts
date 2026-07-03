import type { Lang } from "./utils";
import {
  buildKnowledgeContext,
  curatedProjects,
  featuredRepos,
  skillGroups,
  experience,
  videos,
  courses,
  consultingOffer,
  socials,
  profile,
  type Project,
} from "./content";

/* ---------------- Resolved card types (already localized → plain strings) ---------------- */
export type ProjectView = {
  id: string;
  name: string;
  category: string;
  org?: string;
  status?: "delivered" | "in_progress";
  summary: string;
  metric?: string;
  tags: string[];
  url?: string;
  accent?: string;
  repo?: boolean;
};

export type ResolvedCard =
  | { kind: "projects"; title: string; items: ProjectView[] }
  | { kind: "skills"; title: string; groups: { id: string; title: string; icon: string; level: number; skills: string[] }[] }
  | { kind: "experience"; title: string; items: { company: string; role: string; period: string; summary: string; tags: string[] }[] }
  | { kind: "content"; title: string; videos: { id: string; title: string; url: string; kind: string }[]; courses: { title: string; desc: string; url: string; badge: string }[] }
  | { kind: "consulting"; title: string; intro: string; services: { title: string; desc: string; icon: string }[]; calendly: string }
  | { kind: "contact"; title: string; email: string; linkedin: string; github: string; calendly: string }
  | { kind: "booking"; title: string; calendly: string };

export type CardSpec = { type: string; query?: string };

const T = (pt: string, en: string, lang: Lang) => (lang === "pt" ? pt : en);

/* ---------------- Project matching ---------------- */
function matchProjects(query: string | undefined, lang: Lang): ProjectView[] {
  const q = (query ?? "").toLowerCase();
  const asView = (p: Project): ProjectView => ({
    id: p.id,
    name: p.name,
    category: p.category,
    org: p.org,
    status: p.status,
    summary: p.summary[lang],
    metric: p.metric?.[lang],
    tags: p.tags,
    url: p.url,
    accent: p.accent,
  });

  const wantsPersonal = /github|personal|pessoa|open ?source|repo/.test(q);
  const wantsConsulting = /consult|cliente|empresa|client/.test(q);
  const wantsBuilding = /desenvolv|building|progress|andamento|em dev/.test(q);

  let items = curatedProjects;
  if (wantsConsulting) items = items.filter((p) => p.category === "consulting");
  else if (wantsBuilding) items = items.filter((p) => p.category === "building");
  else if (q) {
    const filtered = curatedProjects.filter((p) => {
      const hay = `${p.name} ${p.summary[lang]} ${p.description[lang]} ${p.tags.join(" ")} ${p.org ?? ""}`.toLowerCase();
      return q.split(/\s+/).some((token) => token.length > 2 && hay.includes(token));
    });
    if (filtered.length) items = filtered;
    else items = curatedProjects.filter((p) => p.category === "professional").slice(0, 3);
  } else {
    items = curatedProjects.filter((p) => p.category === "professional").slice(0, 4);
  }

  const views = items.map(asView);

  // Add personal GitHub cards when relevant (or when explicitly asked).
  if (wantsPersonal || /project|projeto/.test(q)) {
    const repoViews: ProjectView[] = featuredRepos.slice(0, wantsPersonal ? 6 : 3).map((r) => ({
      id: r.repo,
      name: r.repo,
      category: "personal",
      summary: r.desc[lang],
      tags: r.tags,
      url: `${socials.github}/${r.repo}`,
      accent: r.accent,
      repo: true,
    }));
    if (wantsPersonal) return repoViews;
    return [...views.slice(0, 3), ...repoViews];
  }

  return views;
}

/* ---------------- Card resolver ---------------- */
export function resolveCards(specs: CardSpec[], lang: Lang): ResolvedCard[] {
  const cards: ResolvedCard[] = [];
  const seen = new Set<string>();

  for (const spec of specs) {
    const type = (spec.type || "").toLowerCase();
    if (seen.has(type)) continue;
    seen.add(type);

    switch (type) {
      case "projects": {
        const items = matchProjects(spec.query, lang);
        if (items.length) cards.push({ kind: "projects", title: T("Projetos", "Projects", lang), items });
        break;
      }
      case "skills": {
        cards.push({
          kind: "skills",
          title: T("Skills & Stack", "Skills & Stack", lang),
          groups: skillGroups.map((g) => ({ id: g.id, title: g.title[lang], icon: g.icon, level: g.level, skills: g.skills })),
        });
        break;
      }
      case "experience": {
        cards.push({
          kind: "experience",
          title: T("Trajetória", "Journey", lang),
          items: experience.map((e) => ({ company: e.company, role: e.role[lang], period: e.period[lang], summary: e.summary[lang], tags: e.tags })),
        });
        break;
      }
      case "content": {
        cards.push({
          kind: "content",
          title: T("Conteúdo & Cursos", "Content & Courses", lang),
          videos: videos.map((v) => ({ id: v.id, title: v.title[lang], url: v.url, kind: v.kind })),
          courses: courses.map((c) => ({ title: c.title[lang], desc: c.desc[lang], url: c.url, badge: c.badge[lang] })),
        });
        break;
      }
      case "consulting": {
        cards.push({
          kind: "consulting",
          title: T("Consultoria em IA", "AI Consulting", lang),
          intro: consultingOffer.intro[lang],
          services: consultingOffer.services.map((s) => ({ title: s.title[lang], desc: s.desc[lang], icon: s.icon })),
          calendly: socials.calendly,
        });
        break;
      }
      case "contact": {
        cards.push({
          kind: "contact",
          title: T("Contato", "Contact", lang),
          email: socials.email,
          linkedin: socials.linkedin,
          github: socials.github,
          calendly: socials.calendly,
        });
        break;
      }
      case "booking": {
        cards.push({ kind: "booking", title: T("Agende uma conversa", "Book a call", lang), calendly: socials.calendly });
        break;
      }
    }
  }
  return cards;
}

/* ---------------- Fallback intent detection (when the model returns no cards) ---------------- */
export function intentCards(message: string, lang: Lang): ResolvedCard[] {
  const m = message.toLowerCase();
  const specs: CardSpec[] = [];
  if (/projeto|project|portfolio|portfólio|constr(ó|o)i|build|rag|agent|tcemg|github/.test(m)) specs.push({ type: "projects", query: m });
  if (/skill|habilidade|stack|tecnolog|ferramenta|domina|sabe fazer/.test(m)) specs.push({ type: "skills" });
  if (/experi[êe]ncia|carreira|trajet|hist[óo]ria|onde trabalh|formaç|career|background/.test(m)) specs.push({ type: "experience" });
  if (/curso|aula|v[íi]deo|youtube|ensina|conte[úu]do|jornada|trilha|workshop|course|teach|learn/.test(m)) specs.push({ type: "content" });
  if (/consultor|contrat|empresa|servi[çc]o|hire|consult|budget|or[çc]amento/.test(m)) specs.push({ type: "consulting" });
  if (/agend|marcar|reuni[ãa]o|conversa|call|meeting|schedule|calendly/.test(m)) specs.push({ type: "booking" });
  if (/contato|email|e-mail|linkedin|falar com|contact|reach/.test(m)) specs.push({ type: "contact" });
  return resolveCards(specs, lang);
}

/* ---------------- System prompt ---------------- */
export function systemPrompt(lang: Lang): string {
  const langName = lang === "pt" ? "Portuguese (pt-BR)" : "English";
  return `You ARE ${profile.name}, an AI Engineer & Product Owner, answering visitors on your personal portfolio in FIRST PERSON ("I", "my", "eu", "meu").

VOICE & STYLE:
- Confident but warm, approachable and a bit playful — you are also a teacher, so be didactic and clear.
- Keep replies concise: 2 to 5 sentences. Conversational, not a wall of text.
- Write in a natural, human way. NEVER use em dashes (—) or en dashes (–); use commas, periods or rephrase the sentence instead.
- ALWAYS answer in ${langName}.
- You may gently guide the visitor toward booking a call or getting in touch when it's relevant, but never be pushy or salesy.
- Only use facts from the KNOWLEDGE below. If asked something you don't know or something private/personal, answer briefly and honestly, then steer back to what you can help with.

OUTPUT FORMAT — CRITICAL:
Respond with ONLY a single valid JSON object, no markdown, no code fences, no text before or after:
{"reply": "<your message>", "cards": [ {"type": "<type>", "query": "<optional keywords>"} ]}
Allowed card types: "projects", "skills", "experience", "content", "consulting", "contact", "booking".
Attach cards ONLY when they enrich the answer:
- talking about work/projects → [{"type":"projects","query":"<e.g. rag, agents, tcemg, consulting, github>"}]
- skills/stack/technologies → [{"type":"skills"}]
- career/experience/background → [{"type":"experience"}]
- videos/courses/teaching/Jornada de Dados → [{"type":"content"}]
- hiring/consulting/services → [{"type":"consulting"}]
- how to reach me → [{"type":"contact"}]
- scheduling a meeting → [{"type":"booking"}]
If no card fits, use "cards": [].

KNOWLEDGE:
${buildKnowledgeContext(lang)}`;
}
