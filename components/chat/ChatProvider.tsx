"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type ChatCtx = {
  isOpen: boolean;
  open: (prompt?: string) => void;
  close: () => void;
  pendingPrompt: string | null;
  consumePrompt: () => string | null;
};

const Ctx = createContext<ChatCtx | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null);

  const open = (prompt?: string) => {
    if (prompt) setPendingPrompt(prompt);
    setIsOpen(true);
  };
  const close = () => setIsOpen(false);
  const consumePrompt = () => {
    const p = pendingPrompt;
    setPendingPrompt(null);
    return p;
  };

  return (
    <Ctx.Provider value={{ isOpen, open, close, pendingPrompt, consumePrompt }}>
      {children}
    </Ctx.Provider>
  );
}

export function useChat() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useChat must be used within ChatProvider");
  return ctx;
}
