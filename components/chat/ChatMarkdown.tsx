"use client";

import Markdown, { type Components } from "react-markdown";

/**
 * Renders the assistant's reply as lightweight, on-brand markdown so answers
 * read as well-structured (bold key terms, tight bullet lists, inline links)
 * without ever injecting raw HTML. Styling inherits the chat bubble's size.
 */
const components: Components = {
  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
  ul: ({ children }) => (
    <ul className="mb-2 list-disc space-y-1 pl-4 last:mb-0 marker:text-brand-bright">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-2 list-decimal space-y-1 pl-4 last:mb-0 marker:text-brand-bright">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-snug">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-brand-bright underline decoration-brand-bright/40 underline-offset-2 transition-colors hover:text-cyan"
    >
      {children}
    </a>
  ),
  code: ({ children }) => (
    <code className="rounded bg-white/10 px-1 py-0.5 text-[0.85em] text-brand-bright">{children}</code>
  ),
  h1: ({ children }) => <p className="mb-1 font-display font-bold text-ink">{children}</p>,
  h2: ({ children }) => <p className="mb-1 font-display font-bold text-ink">{children}</p>,
  h3: ({ children }) => <p className="mb-1 font-display font-semibold text-ink">{children}</p>,
};

export function ChatMarkdown({ content }: { content: string }) {
  return <Markdown components={components}>{content}</Markdown>;
}
