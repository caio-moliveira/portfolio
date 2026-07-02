"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { Play, Users, Cpu, Layers, Sparkles, CalendarDays, type LucideIcon } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { useChat } from "@/components/chat/ChatProvider";
import { profile, socials, manifesto, aboutHighlights } from "@/lib/content";
import { ParticleField } from "@/components/background/ParticleField";

const icons: Record<string, LucideIcon> = { Play, Users, Cpu, Layers };

export function About() {
  const { t, lang } = useLang();
  const { open } = useChat();

  // Parallax: the brand logo drifts down as the hero is scrolled.
  const { scrollY } = useScroll();
  const logoY = useTransform(scrollY, [0, 700], [0, 220]);

  return (
    <section id="top" className="relative overflow-hidden pb-24 pt-28 md:pt-36">
      {/* Centered brand logo watermark: parallax + soft fade into the dark */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 flex h-[82vh] items-center justify-center">
        <motion.div style={{ y: logoY }} className="relative w-full max-w-4xl px-6">
          <Image
            src={profile.heroBg}
            alt=""
            width={1254}
            height={516}
            priority
            className="logo-feather h-auto w-full object-contain opacity-45"
          />
        </motion.div>
      </div>
      {/* Soft center scrim to keep the hero copy legible over the logo */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_58%_46%_at_50%_34%,rgba(5,7,15,0.6),transparent_72%)]" />
      <div className="absolute inset-0 grid-bg" />
      <ParticleField className="absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg to-transparent" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Title + subtitle + CTAs */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl"
            >
              {lang === "pt" ? "Transformo problemas em " : "I turn problems into "}
              <span className="gradient-text">{lang === "pt" ? "soluções de IA" : "AI solutions"}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted"
            >
              {profile.homeSubtitle[lang]}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
            >
              <button
                onClick={() => open()}
                className="group flex items-center gap-2.5 rounded-xl gradient-brand px-6 py-3.5 font-semibold text-white shadow-glow transition-transform hover:scale-[1.03]"
              >
                <Sparkles className="h-5 w-5 transition-transform group-hover:rotate-12" />
                {t("cta.chat")}
              </button>
              <a
                href={socials.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 rounded-xl glass px-6 py-3.5 font-semibold text-ink transition-colors hover:border-brand-bright/40"
              >
                <CalendarDays className="h-5 w-5" />
                {t("cta.book")}
              </a>
            </motion.div>
          </div>
        </div>

        {/* Highlight cards */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {aboutHighlights.map((h, i) => {
            const Icon = icons[h.icon] ?? Play;
            return (
              <Reveal key={i} delay={i * 0.08}>
                <div className="card-hover glass h-full rounded-2xl p-6">
                  <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl gradient-brand text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="font-display text-2xl font-bold gradient-text">{h.stat[lang]}</div>
                  <p className="mt-2 text-sm leading-snug text-muted">{h.label[lang]}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Manifesto */}
        <Reveal className="mt-24">
          <div id="about" className="mx-auto max-w-4xl scroll-mt-28 text-center">
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-brand" />
              <span className="font-display text-sm font-medium uppercase tracking-[0.2em] text-brand-bright">
                {manifesto.kicker[lang]}
              </span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-brand" />
            </div>
            <h2 className="font-display text-3xl font-bold leading-tight text-balance sm:text-4xl lg:text-[2.7rem]">
              <span className="text-ink">{manifesto.headlineLead[lang]}</span>{" "}
              <span className="gradient-text">{manifesto.headlineEmphasis[lang]}</span>
            </h2>
            <div className="mx-auto mt-7 max-w-2xl space-y-4">
              {manifesto.body.map((p, i) => (
                <p key={i} className="text-lg leading-relaxed text-muted">
                  {p[lang]}
                </p>
              ))}
            </div>
            <div className="mt-8 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-brand/50" />
              <span className="font-display text-sm font-semibold text-ink">{manifesto.signature[lang]}</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
