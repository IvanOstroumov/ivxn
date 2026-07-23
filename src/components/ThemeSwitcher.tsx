"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { THEMES } from "@/lib/themes";
import { useTheme } from "@/components/ThemeProvider";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const active = THEMES.find((t) => t.name === theme) ?? THEMES[0];

  return (
    <div ref={rootRef} className="relative inline-block text-sm">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-[var(--radius-theme)] border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-[var(--text)] transition-colors hover:border-[var(--accent)]"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: "var(--accent)" }}
        />
        {active.label}
        <motion.span animate={{ rotate: open ? 180 : 0 }} className="text-[var(--text-muted)]">
          ▾
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-[var(--radius-theme)] border border-[var(--border)] bg-[var(--surface)] p-1 shadow-xl"
          >
            {THEMES.map((t) => (
              <li key={t.name}>
                <button
                  type="button"
                  onClick={() => {
                    setTheme(t.name);
                    setOpen(false);
                  }}
                  className={`flex w-full flex-col items-start gap-0.5 rounded-[calc(var(--radius-theme)-4px)] px-3 py-2 text-left transition-colors hover:bg-[var(--surface-2)] ${
                    t.name === theme ? "text-[var(--accent)]" : "text-[var(--text)]"
                  }`}
                >
                  <span className="font-medium">{t.label}</span>
                  <span className="text-xs text-[var(--text-muted)]">{t.description}</span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
