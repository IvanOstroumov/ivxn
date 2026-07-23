import type { LocalizedText } from "@/content/types";

export function getLocalized(text: LocalizedText, locale: string): string {
  return text[locale as keyof LocalizedText] ?? text.en;
}
