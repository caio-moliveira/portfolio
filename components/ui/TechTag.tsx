import { getTechIcon, getFileBrand } from "@/lib/tech";
import { TechIcon } from "./TechIcon";
import { TechFile } from "./TechFile";

/** A tag chip showing the tech's brand logo when available, else just text. */
export function TechTag({ name }: { name: string }) {
  const hasInline = !!getTechIcon(name);
  const fileBrand = !hasInline && getFileBrand(name);

  return (
    <span className="inline-flex items-center gap-1.5 rounded-md bg-white/5 px-2 py-1 text-xs text-muted">
      {hasInline ? (
        <TechIcon name={name} className="h-3.5 w-3.5" />
      ) : fileBrand ? (
        <TechFile name={name} className="h-3.5 w-3.5" />
      ) : null}
      {name}
    </span>
  );
}
