"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles } from "lucide-react";
import { useChat } from "./ChatProvider";
import { useLang } from "@/lib/i18n";

/** Floating action button — persistent access to the AI chat after the hero. */
export function ChatFab() {
  const { open, isOpen } = useChat();
  const { t } = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.85);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && !isOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          onClick={() => open()}
          className="group fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-full gradient-brand py-3.5 pl-4 pr-5 font-semibold text-white shadow-glow"
        >
          <span className="pulse-ring grid h-7 w-7 place-items-center rounded-full bg-white/20">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="hidden text-sm sm:inline">{t("cta.chatShort")}</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
