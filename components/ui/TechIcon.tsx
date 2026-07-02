import { getTechIcon, isDarkHex } from "@/lib/tech";
import { cn } from "@/lib/utils";

/**
 * Renders a technology's brand logo in its brand color.
 * Near-black marks (GitHub, Vercel, Anthropic…) fall back to light ink so they
 * stay visible on the dark theme. Returns null when there's no logo for `name`.
 */
export function TechIcon({ name, className }: { name: string; className?: string }) {
  const icon = getTechIcon(name);
  if (!icon) return null;
  const fill = isDarkHex(icon.hex) ? "#e8eef9" : `#${icon.hex}`;
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-label={icon.title}
      className={cn("shrink-0", className)}
      fill={fill}
    >
      <path d={icon.path} />
    </svg>
  );
}
