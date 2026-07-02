"use client";

import { useEffect, useRef, useState } from "react";
import { getFileBrand } from "@/lib/tech";
import { cn } from "@/lib/utils";

/**
 * Logo for brands shipped as a file at /brand/tech/<slug>.svg. Until the file
 * exists it shows a brand-colored dot; drop the SVG and the real logo appears.
 */
export function TechFile({ name, className }: { name: string; className?: string }) {
  const brand = getFileBrand(name);
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
  }, [brand?.slug]);

  if (!brand) return null;

  const dot = (
    <span
      className="h-2 w-2 rounded-full"
      style={{ backgroundColor: `#${brand.hex}` }}
      aria-hidden
    />
  );

  if (failed) return dot;

  return (
    <span className={cn("relative inline-flex items-center justify-center", className)}>
      {!loaded && dot}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={ref}
        src={`/brand/tech/${brand.slug}.svg`}
        alt={name}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={cn(
          "absolute inset-0 m-auto max-h-full max-w-full object-contain transition-opacity",
          loaded ? "opacity-100" : "opacity-0"
        )}
      />
    </span>
  );
}
