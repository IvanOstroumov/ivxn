"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { DEFAULT_THEME, isThemeName, THEME_STORAGE_KEY, ThemeName } from "@/lib/themes";

type ThemeContextValue = {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(DEFAULT_THEME);

  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (isThemeName(stored)) {
      setThemeState(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function setTheme(next: ThemeName) {
    setThemeState(next);
    window.localStorage.setItem(THEME_STORAGE_KEY, next);
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
