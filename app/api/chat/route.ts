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

const SITE_URL = "https://caiomachado-ai.com";

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

// Keep the reply readable and markdown-friendly: preserve intentional line
// breaks (lists/paragraphs), collapse only stray runs of spaces.
function normalizeReply(s: string): string {
  return s
    .replace(/\r\n/g, "\n")
    .replace(/\\n/g, "\n") // some models double-escape newlines
    .replace(/[ \t]+\n/g, "\n") // trim trailing spaces per line
    .replace(/[ \t]{2,}/g, " ") // collapse runs of spaces/tabs
    .replace(/\n{3,}/g, "\n\n") // cap blank lines
    .trim();
}

function coerceCards(value: unknown): CardSpec[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((c: unknown) => c && typeof (c as CardSpec).type === "string")
    .map((c) => ({ type: (c as CardSpec).type, query: (c as CardSpec).query }));
}

function unescapeJsonString(s: string): string {
  return s
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, "\\")
    .replace(/\\n/g, "\n")
    .replace(/\\t/g, "\t")
    .replace(/\\r/g, "");
}

function parseModelJson(raw: string): { reply: string; cards: CardSpec[] } | null {
  if (!raw) return null;
  const text = raw
    .trim()
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/i, "")
    .trim();
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) return null;
  const slice = text.slice(start, end + 1);

  // 1) Strict parse (the happy path).
  try {
    const obj = JSON.parse(slice);
    if (typeof obj.reply === "string") return { reply: normalizeReply(obj.reply), cards: coerceCards(obj.cards) };
  } catch {
    /* fall through to lenient extraction */
  }

  // 2) Lenient extraction — robust to raw newlines inside the "reply" string,
  //    which smaller models often emit and which break JSON.parse.
  const replyMatch = /"reply"\s*:\s*"((?:[^"\\]|\\.)*)"/.exec(slice);
  if (!replyMatch) return null;
  const reply = normalizeReply(unescapeJsonString(replyMatch[1]));
  if (!reply) return null;
  let cards: CardSpec[] = [];
  const cardsMatch = /"cards"\s*:\s*(\[[\s\S]*?\])/.exec(slice);
  if (cardsMatch) {
    try {
      cards = coerceCards(JSON.parse(cardsMatch[1]));
    } catch {
      cards = [];
    }
  }
  return { reply, cards };
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
              ? "A IA ainda não está configurada (falta a API key do OpenRouter). Mas posso te contar: sou o Caio, engenheiro de IA. Explore as seções ou fale comigo pelo LinkedIn!"
              : "The AI isn't configured yet (missing the OpenRouter API key). But here's the gist: I'm Caio, an AI engineer. Explore the sections or reach me on LinkedIn!",
          cards: intentCards(lastUser, lang),
        },
        { status: 200 }
      );
    }

    const payload = {
      models: MODELS.slice(0, 3),
      temperature: 0.6,
      max_tokens: 800,
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
      // Reliability hedge: smaller models often write a great answer but forget
      // the cards. Backfill from intent only when the question clearly warrants a
      // card. Generic/personal questions match nothing, so they stay text-only.
      if (cards.length === 0) cards = intentCards(lastUser, lang);
    } else {
      // Model didn't follow JSON format — use its raw text and infer cards from
      // both the question and the answer it wrote.
      reply = raw.trim() || (lang === "pt" ? "Desculpe, pode repetir?" : "Sorry, could you rephrase?");
      cards = intentCards(`${lastUser} ${reply}`, lang);
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
