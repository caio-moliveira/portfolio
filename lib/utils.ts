import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Pick the correct language value from a bilingual object. */
export type Lang = "pt" | "en";
export type Bi<T = string> = { pt: T; en: T };

export function bi<T>(value: Bi<T>, lang: Lang): T {
  return value[lang];
}
