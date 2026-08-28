import { en } from "./en";
import { vi } from "./vi";

export type Locale = "vi" | "en";
export const dictionaries = { en, vi } as const;

export function resolveTranslation(locale: Locale, path: string): string | undefined {
  const segments = path.split(".");
  let value: unknown = dictionaries[locale];

  for (const segment of segments) {
    if (!value || typeof value !== "object" || !(segment in value)) {
      return undefined;
    }
    value = (value as Record<string, unknown>)[segment];
  }

  return typeof value === "string" ? value : undefined;
}
