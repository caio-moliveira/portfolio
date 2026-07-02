import { NextResponse } from "next/server";
import { systemPrompt, resolveCards, intentCards, type CardSpec, type ResolvedCard } from "@/lib/agent";
import type { Lang } from "@/lib/utils";

export const runtime = "nodejs";
export const maxDuration = 30;

type Msg = { role: "user" | "assistant"; content: string };

// Comma-separated list → OpenRouter tries them in order (fallback routing),
// so a single rate-limited free model doesn't break the chat.
const MODELS = (
  process.env.OPENROUTER_MODEL ||
  [
    "openai/gpt-oss-20b:free",
    "nvidia/nemotron-3-super-120b-a12b:free",
    "nvidia/nemotron-nano-9b-v2:free",
  ].join(",")
)
  .split(",")
  .map((m) => m.trim())
  .filter(Boolean);

const API_KEY = process.env.OPENROUTER_API_KEY || process.env.API_KEY;

const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

async function callOpenRouter(payload: object, attempt = 0): Promise<Response> {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": SITE_URL,
      "X-Title": "Caio Machado - Portfolio",
    },
    body: JSON.stringify(payload),
  });
  // One quick retry on transient upstream rate-limit.
  if (res.status === 429 && attempt < 1) {
    await new Promise((r) => setTimeout(r, 1500));
    return callOpenRouter(payload, attempt + 1);
  }
  return res;
}

function parseModelJson(raw: string): { reply: string; cards: CardSpec[] } | null {
  if (!raw) return null;
  let text = raw.trim();
  // Strip code fences if the model wrapped the JSON.
  text = text.replace(/^```(?:json)?/i, "").replace(/```$/i, "").trim();
  // Grab the outermost JSON object.
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) return null;
  try {
    const obj = JSON.parse(text.slice(start, end + 1));
    if (typeof obj.reply !== "string") return null;
    // Some models over-escape newlines; normalize stray literal "\n" and whitespace.
    const reply = obj.reply.replace(/\\n/g, " ").replace(/[ \t]+/g, " ").trim();
    const cards = Array.isArray(obj.cards) ? obj.cards.filter((c: unknown) => c && typeof (c as CardSpec).type === "string") : [];
    return { reply, cards };
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  let lang: Lang = "pt";
  let lastUser = "";
  try {
    const body = await req.json();
    const messages: Msg[] = Array.isArray(body.messages) ? body.messages.slice(-10) : [];
    lang = body.lang === "en" ? "en" : "pt";
    lastUser = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";

    if (!API_KEY) {
      return NextResponse.json(
        {
          reply:
            lang === "pt"
              ? "A IA ainda não está configurada (falta a API key do OpenRouter). Mas posso te contar: sou o Caio, engenheiro de IA — explore as seções ou fale comigo pelo LinkedIn!"
              : "The AI isn't configured yet (missing the OpenRouter API key). But here's the gist: I'm Caio, an AI engineer — explore the sections or reach me on LinkedIn!",
          cards: intentCards(lastUser, lang),
        },
        { status: 200 }
      );
    }

    const payload = {
      models: MODELS.slice(0, 3),
      temperature: 0.6,
      max_tokens: 700,
      messages: [
        { role: "system", content: systemPrompt(lang) },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ],
    };

    const res = await callOpenRouter(payload);

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error("OpenRouter error", res.status, errText);
      throw new Error(`OpenRouter ${res.status}`);
    }

    const data = await res.json();
    const raw: string = data?.choices?.[0]?.message?.content ?? "";

    const parsed = parseModelJson(raw);
    let reply: string;
    let cards: ResolvedCard[];

    if (parsed) {
      reply = parsed.reply;
      cards = resolveCards(parsed.cards, lang);
      // If the model gave a good answer but forgot cards, backfill from intent.
      if (cards.length === 0) cards = intentCards(lastUser, lang);
    } else {
      // Model didn't follow JSON format — use its raw text and infer cards.
      reply = raw.trim() || (lang === "pt" ? "Desculpe, pode repetir?" : "Sorry, could you rephrase?");
      cards = intentCards(lastUser, lang);
    }

    return NextResponse.json({ reply, cards });
  } catch (err) {
    console.error("chat route error", err);
    return NextResponse.json(
      {
        reply:
          lang === "pt"
            ? "Tive um probleminha para responder agora. Enquanto isso, dá uma olhada nos cards ou tenta de novo em instantes. 🙂"
            : "I hit a small hiccup answering right now. Meanwhile, check the cards or try again shortly. 🙂",
        cards: intentCards(lastUser, lang),
      },
      { status: 200 }
    );
  }
}
