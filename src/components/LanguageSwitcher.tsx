"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LOCALE_LABELS: Record<string, string> = {
  en: "EN",
  ru: "RU",
  it: "IT",
  de: "DE",
  fr: "FR",
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
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

  return (
    <div ref={rootRef} className="relative inline-block text-sm">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-[var(--radius-theme)] border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-[var(--text)] transition-colors hover:border-[var(--accent)]"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {LOCALE_LABELS[locale] ?? locale.toUpperCase()}
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
            className="absolute right-0 z-50 mt-2 w-28 overflow-hidden rounded-[var(--radius-theme)] border border-[var(--border)] bg-[var(--surface)] p-1 shadow-xl"
          >
            {routing.locales.map((l) => (
              <li key={l}>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    router.replace(pathname, { locale: l });
                  }}
                  className={`w-full rounded-[calc(var(--radius-theme)-4px)] px-3 py-1.5 text-left transition-colors hover:bg-[var(--surface-2)] ${
                    l === locale ? "text-[var(--accent)]" : "text-[var(--text)]"
                  }`}
                >
                  {LOCALE_LABELS[l] ?? l.toUpperCase()}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
