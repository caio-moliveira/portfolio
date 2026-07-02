"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Shows a company's real logo when the image file exists; otherwise falls back
 * to a clean monogram. The monogram is the base layer and the image only covers
 * it once it actually loads, so a missing file never flashes a broken image.
 * Handles cached images (which can complete before onLoad binds). Drop a file at
 * the expected path and it appears automatically.
 */
export function CompanyLogo({
  name,
  src,
  className,
}: {
  name: string;
  src?: string;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.complete) {
      if (el.naturalWidth > 0) setLoaded(true);
      else setFailed(true);
    }
  }, [src]);

  const initials =
    name
      .replace(/\(.*?\)/g, "")
      .replace(/[^A-Za-zÀ-ÿ ]/g, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase() || "•";

  return (
    <span
      className={cn(
        "relative grid shrink-0 place-items-center overflow-hidden rounded-lg gradient-brand font-display font-bold text-white",
        className
      )}
      aria-label={name}
    >
      <span>{initials}</span>
      {src && !failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={ref}
          src={src}
          alt={name}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={cn(
            "absolute inset-0 h-full w-full bg-white object-contain p-1.5 transition-opacity",
            loaded ? "opacity-100" : "opacity-0"
          )}
        />
      )}
    </span>
  );
}
