"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, Sparkles, ArrowUp } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useChat } from "./ChatProvider";
import { ChatCards } from "./ChatCards";
import { ChatMarkdown } from "./ChatMarkdown";
import { profile } from "@/lib/content";
import type { ResolvedCard } from "@/lib/agent";
import type { Lang } from "@/lib/utils";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  cards?: ResolvedCard[];
};

const suggestions: Record<Lang, string[]> = {
  pt: [
    "Quais são seus principais projetos?",
    "Que skills e tecnologias você domina?",
    "Como funciona sua consultoria?",
    "Me fala do seu trabalho no TCEMG",
    "Tem conteúdo pra eu aprender IA?",
  ],
  en: [
    "What are your main projects?",
    "Which skills and tech do you master?",
    "How does your consulting work?",
    "Tell me about your work at TCEMG",
    "Any content to help me learn AI?",
  ],
};

let idc = 0;
const nextId = () => `m${idc++}`;

export function ChatOverlay() {
  const { t, lang } = useLang();
  const { isOpen, close, consumePrompt } = useChat();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    });
  };

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      const userMsg: Message = { id: nextId(), role: "user", content: trimmed };
      const history = [...messages, userMsg];
      setMessages(history);
      setInput("");
      setLoading(true);
      scrollToBottom();

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lang,
            messages: history
              .filter((m) => m.id !== "greeting")
              .map((m) => ({ role: m.role, content: m.content })),
          }),
        });
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          { id: nextId(), role: "assistant", content: data.reply, cards: data.cards ?? [] },
        ]);
      } catch {
        setMessages((prev) => [...prev, { id: nextId(), role: "assistant", content: t("chat.error") }]);
      } finally {
        setLoading(false);
        scrollToBottom();
      }
    },
    [messages, loading, lang, t]
  );

  // Seed greeting + consume any pending prompt when opened.
  useEffect(() => {
    if (!isOpen) return;
    setMessages((prev) => {
      if (prev.length > 0) return prev;
      return [{ id: "greeting", role: "assistant", content: t("chat.greeting") }];
    });
    const pending = consumePrompt();
    if (pending) setTimeout(() => send(pending), 250);
    setTimeout(() => inputRef.current?.focus(), 350);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Update greeting text when language changes (only if it's still the sole message).
  useEffect(() => {
    setMessages((prev) =>
      prev.length === 1 && prev[0].id === "greeting"
        ? [{ id: "greeting", role: "assistant", content: t("chat.greeting") }]
        : prev
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-stretch justify-center sm:items-center sm:p-4"
        >
          {/* backdrop */}
          <div className="absolute inset-0 bg-bg/80 backdrop-blur-md" onClick={close} />

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong relative flex h-full w-full flex-col overflow-hidden rounded-none border-brand-bright/20 shadow-2xl sm:h-[85vh] sm:max-w-2xl sm:rounded-3xl"
          >
            {/* header */}
            <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Image
                    src={profile.photo}
                    alt={profile.name}
                    width={44}
                    height={44}
                    className="h-11 w-11 rounded-full object-cover ring-2 ring-brand-bright/40"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-bg bg-cyan" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-display font-bold text-ink">
                    {profile.shortName}
                    <Sparkles className="h-3.5 w-3.5 text-brand-bright" />
                  </div>
                  <div className="text-xs text-muted">{t("chat.subtitle")}</div>
                </div>
              </div>
              <button
                onClick={close}
                aria-label={t("chat.close")}
                className="glass grid h-9 w-9 place-items-center rounded-lg text-muted transition-colors hover:text-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* messages */}
            <div ref={scrollRef} className="hide-scrollbar flex-1 space-y-5 overflow-y-auto px-4 py-6 sm:px-5">
              {messages.map((m) => (
                <MessageBubble key={m.id} message={m} lang={lang} />
              ))}

              {loading && (
                <div className="flex items-center gap-3">
                  <Image src={profile.photo} alt="" width={32} height={32} className="h-8 w-8 rounded-full object-cover" />
                  <div className="glass flex items-center gap-1 rounded-2xl rounded-tl-sm px-4 py-3">
                    <Dot /> <Dot delay={0.15} /> <Dot delay={0.3} />
                  </div>
                </div>
              )}

              {/* suggestions (only before first user message) */}
              {messages.filter((m) => m.role === "user").length === 0 && !loading && (
                <div className="pt-2">
                  <div className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-faint">
                    {t("chat.suggestions")}
                  </div>
                  <div className="flex flex-col gap-2">
                    {suggestions[lang].map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className="group flex items-center justify-between gap-2 rounded-xl glass px-4 py-2.5 text-left text-sm text-muted transition-all hover:border-brand-bright/40 hover:text-ink"
                      >
                        {s}
                        <ArrowUp className="h-4 w-4 rotate-45 text-faint transition-transform group-hover:translate-x-0.5 group-hover:text-brand-bright" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* input */}
            <div className="border-t border-line p-3 sm:p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className="flex items-end gap-2 rounded-2xl glass p-2"
              >
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send(input);
                    }
                  }}
                  rows={1}
                  placeholder={t("chat.placeholder")}
                  className="hide-scrollbar max-h-32 flex-1 resize-none bg-transparent px-3 py-2 text-sm text-ink outline-none placeholder:text-faint"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  aria-label="Send"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl gradient-brand text-white transition-transform enabled:hover:scale-105 disabled:opacity-40"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MessageBubble({ message, lang }: { message: Message; lang: Lang }) {
  const isUser = message.role === "user";
  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-tr-sm gradient-brand px-4 py-2.5 text-sm text-white">
          {message.content}
        </div>
      </div>
    );
  }
  return (
    <div className="flex gap-3">
      <Image
        src={profile.photo}
        alt=""
        width={32}
        height={32}
        className="mt-0.5 h-8 w-8 shrink-0 rounded-full object-cover ring-1 ring-brand-bright/30"
      />
      <div className="min-w-0 flex-1">
        <div className="glass max-w-[92%] rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm leading-relaxed text-ink">
          <ChatMarkdown content={message.content} />
        </div>
        {message.cards && message.cards.length > 0 && <ChatCards cards={message.cards} lang={lang} />}
      </div>
    </div>
  );
}

function Dot({ delay = 0 }: { delay?: number }) {
  return (
    <motion.span
      className="h-2 w-2 rounded-full bg-brand-bright"
      animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
      transition={{ duration: 0.9, repeat: Infinity, delay }}
    />
  );
}
