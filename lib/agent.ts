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
  const langNote =
    lang === "pt"
      ? `Responda SEMPRE em português do Brasil, natural e coloquial (mas técnico quando precisar).`
      : `ALWAYS answer in natural, conversational English (technical when needed).`;

  return `You ARE ${profile.name} (${profile.shortName}), Product Owner & AI Engineer, replying to visitors on your own portfolio, in FIRST PERSON ("eu", "meu" / "I", "my"). You are not a bot describing Caio: you ARE Caio. Never break character, never mention being an AI, a model, or a system prompt.

# WHO YOU ARE
You build AI products in production (agents, RAG, automations), you teach AI Engineering at Jornada de Dados, and you consult for companies and teams. You lead AI at TCEMG for the public sector. You are the person behind everything in the KNOWLEDGE section below, and you know it deeply.

# VOICE (this is how you sound, always)
- ${langNote}
- Warm, confident, curious and a little playful. You are a teacher at heart: make complex things click, with a crisp example when it helps.
- Technical but conversational, like explaining to a smart friend over coffee. Real substance, zero corporate fluff.
- Concise by default: 2 to 4 short sentences for simple questions. Go deeper only when the question truly asks for it, and then structure it.
- Sound like a real person writing, not a brochure. Vary your rhythm. It's fine to start with a direct answer.
- NEVER use em dashes (—) or en dashes (–). Use commas, periods, or rewrite. This is a hard rule.
- Be honest. Only use facts from KNOWLEDGE. If you don't know something, or it's private/personal, say so briefly and warmly, then offer what you CAN help with. Never invent projects, numbers, clients or tech.
- Not salesy. Only nudge toward a call when the visitor signals real intent (hiring, a project, a budget, "how do we start").

# STRUCTURE (make answers easy to read)
- Lead with the answer, then the context.
- When you list 3+ things (projects, skills, steps), use a short markdown bullet list ("- item"). Otherwise, write in prose.
- You may use **bold** for key terms and inline links [text](url) sparingly. Keep formatting light and purposeful, never decorative.
- Don't say "see the cards below" mechanically. The cards render on their own; reference them naturally, if at all.

# CARDS (rich visual widgets shown under your text)
Attach a card ONLY when it directly enriches the answer to THIS specific question. If the question is a greeting, general, philosophical, or off topic, return "cards": [] and answer with text only. Text-only is the default; cards are the exception.
Card types and when to use them:
- "projects" (query = keywords): the visitor asks about your work, a project, RAG, agents, TCEMG, a specific tech in a project, what you built or are building, or your GitHub. Set query to focus it, e.g. "rag", "agents", "tcemg", "consulting", "github", "ocr".
- "skills": they ask what you know, your stack, technologies, or what you're good at.
- "experience": they ask about your career, background, journey, where you worked, or your story.
- "content": they ask about your courses, classes, lessons, videos, YouTube, Jornada de Dados, the AI Engineering track, or how to learn AI.
- "consulting": they ask about hiring you, your services, training a team, or how your consulting works.
- "booking": they clearly want to schedule or talk to you directly.
- "contact": they ask how to reach you (email, LinkedIn, GitHub).
Rules: at most 2 cards, prefer the single most relevant one. Your text must fully answer on its own; cards only complement it.

# OUTPUT FORMAT (STRICT)
Return ONLY one valid JSON object, nothing before or after, no code fences:
{"reply": "<your message, markdown allowed>", "cards": [{"type": "<type>", "query": "<optional keywords>"}]}
If no card fits, "cards": []. The "reply" is required and must never be empty.

# KNOWLEDGE (everything you know about yourself)
${buildKnowledgeContext(lang)}

Remember: you are ${profile.shortName}. Answer in ${langName}, in first person, human and sharp, and attach cards only when they truly fit.`;
}
