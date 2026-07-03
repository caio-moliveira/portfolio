"use client";

import { getTechIcon, getFileBrand, localizeTag } from "@/lib/tech";
import { useLang } from "@/lib/i18n";
import { TechIcon } from "./TechIcon";
import { TechFile } from "./TechFile";

/** A tag chip showing the tech's brand logo when available, else just text. */
export function TechTag({ name }: { name: string }) {
  const { lang } = useLang();
  const hasInline = !!getTechIcon(name);
  const fileBrand = !hasInline && getFileBrand(name);
  // Icon lookup stays on the canonical name; only the visible label is localized.
  const label = localizeTag(name, lang);

  return (
    <span className="inline-flex items-center gap-1.5 rounded-md bg-white/5 px-2 py-1 text-xs text-muted">
      {hasInline ? (
        <TechIcon name={name} className="h-3.5 w-3.5" />
      ) : fileBrand ? (
        <TechFile name={name} className="h-3.5 w-3.5" />
      ) : null}
      {label}
    </span>
  );
}
