"use client";

import { useLang } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { TechIcon } from "@/components/ui/TechIcon";
import { marqueeTech } from "@/lib/tech";

export function TechStack() {
  const { lang } = useLang();
  const row = [...marqueeTech, ...marqueeTech]; // duplicated for a seamless loop

  return (
    <section className="relative overflow-hidden py-16">
      <Reveal className="mx-auto mb-8 max-w-7xl px-5 text-center sm:px-8">
        <div className="mb-3 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-brand" />
          <span className="font-display text-sm font-medium uppercase tracking-[0.2em] text-brand-bright">
            {lang === "pt" ? "Ferramentas do ofício" : "Tools of the craft"}
          </span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-brand" />
        </div>
        <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
          {lang === "pt" ? "A stack por trás dos projetos" : "The stack behind the projects"}
        </h2>
      </Reveal>

      <div className="group marquee-mask relative flex overflow-hidden">
        <div className="animate-marquee flex w-max shrink-0 items-center gap-3 pr-3 group-hover:[animation-play-state:paused]">
          {row.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex items-center gap-2.5 rounded-xl glass px-4 py-3"
            >
              <TechIcon name={name} className="h-6 w-6" />
              <span className="whitespace-nowrap font-display text-sm font-medium text-ink">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
