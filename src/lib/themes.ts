export const THEME_NAMES = ["cyber", "minimal", "glass", "experimental"] as const;

export type ThemeName = (typeof THEME_NAMES)[number];

export const DEFAULT_THEME: ThemeName = "cyber";

export const THEME_STORAGE_KEY = "ivxn-theme";

export const THEMES: { name: ThemeName; label: string; description: string }[] = [
  { name: "cyber", label: "Cyber", description: "Dark, futuristic, tech-forward" },
  { name: "minimal", label: "Minimal", description: "Clean, restrained, Apple-like" },
  { name: "glass", label: "Glass", description: "Frosted panels, soft gradients" },
  { name: "experimental", label: "Experimental", description: "Bold, artistic, unconventional" },
];

export function isThemeName(value: string | null): value is ThemeName {
  return !!value && (THEME_NAMES as readonly string[]).includes(value);
}
