import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function Section({
  id,
  kicker,
  title,
  children,
  className,
}: {
  id?: string;
  kicker?: string;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("relative mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 md:py-32", className)}>
      {(kicker || title) && (
        <Reveal className="mb-14 max-w-3xl">
          {kicker && (
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-brand to-transparent" />
              <span className="font-display text-sm font-medium uppercase tracking-[0.2em] text-brand-bright">
                {kicker}
              </span>
            </div>
          )}
          {title && (
            <h2 className="font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
              {title}
            </h2>
          )}
        </Reveal>
      )}
      {children}
    </section>
  );
}
