"use client";

import { useLang } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { TechTag } from "@/components/ui/TechTag";
import { CompanyLogo } from "@/components/ui/CompanyLogo";
import { experience } from "@/lib/content";

export function Timeline() {
  const { t, lang } = useLang();
  const items = experience.filter((e) => !e.education);
  return (
    <Section id="experience" kicker={t("exp.kicker")} title={t("exp.title")}>
      <div className="relative">
        {/* vertical line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-brand via-brand/30 to-transparent md:left-1/2" />

        <div className="space-y-10">
          {items.map((e, i) => {
            const rightCard = i % 2 !== 0;
            return (
              <Reveal key={e.id} delay={i * 0.05}>
                <div className={`relative md:grid md:grid-cols-2 md:gap-10 ${rightCard ? "md:[&>*:first-child]:col-start-2" : ""}`}>
                  {/* dot */}
                  <span className="absolute left-0 top-2 grid h-[15px] w-[15px] place-items-center rounded-full bg-brand shadow-glow md:left-1/2 md:-translate-x-1/2">
                    {e.current && <span className="absolute h-full w-full rounded-full bg-brand pulse-ring" />}
                  </span>

                  <div className={`pl-8 md:pl-0 ${rightCard ? "md:col-start-2 md:pl-12" : "md:pr-12"}`}>
                    <div className="card-hover glass rounded-2xl p-6 text-left">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-display text-xs font-semibold uppercase tracking-wider text-brand-bright">
                          {e.period[lang]}
                        </span>
                        {e.current && (
                          <span className="rounded-full bg-cyan/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan">
                            {t("exp.present")}
                          </span>
                        )}
                      </div>
                      <div className="mt-2 flex items-center gap-3">
                        <CompanyLogo name={e.company} src={e.logo} className="h-11 w-11 rounded-lg text-sm" />
                        <div>
                          <h3 className="font-display text-lg font-bold leading-tight text-ink">{e.role[lang]}</h3>
                          <p className="text-sm font-medium text-muted">{e.company}</p>
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-muted">{e.summary[lang]}</p>
                      <ul className="mt-4 space-y-1.5">
                        {e.highlights.map((h, j) => (
                          <li key={j} className="text-sm leading-snug text-faint">
                            {h[lang]}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {e.tags.map((tag) => (
                          <TechTag key={tag} name={tag} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
