"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { DEFAULT_THEME, isThemeName, THEME_STORAGE_KEY, ThemeName } from "@/lib/themes";

type ThemeContextValue = {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Deliberately NOT a lazy initializer reading localStorage/data-theme here:
  // that produces a *worse* bug than the one being avoided — the server always
  // renders DEFAULT_THEME, so if the initializer returns something else on the
  // client's first render, React sees an actual text-content mismatch (e.g. the
  // ThemeSwitcher's visible label) and throws a real "Hydration failed" error,
  // not just a benign warning. Confirmed this by testing it: switching themes
  // then reloading crashed with a full tree hydration failure.
  //
  // Reading localStorage in an effect (below) intentionally starts every
  // client at DEFAULT_THEME — matching the server — then corrects to the
  // stored theme in a harmless post-mount re-render. That re-render is exactly
  // what the react-hooks/set-state-in-effect rule warns about, but it's the
  // correct tradeoff here, so the rule is disabled for this one line rather
  // than "fixed" into a worse bug again.
  const [theme, setThemeState] = useState<ThemeName>(DEFAULT_THEME);

  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (isThemeName(stored)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
