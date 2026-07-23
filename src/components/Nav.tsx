"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { CTAButton } from "@/components/CTAButton";

const NAV_ITEMS = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/services", key: "services" },
  { href: "/projects", key: "projects" },
  { href: "/tools", key: "tools" },
  { href: "/skills", key: "skills" },
  { href: "/contact", key: "contact" },
] as const;

export function Nav() {
  const t = useTranslations("nav");
  const tCta = useTranslations("cta");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-semibold tracking-tight">
          IO — Ivan Labs
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <ThemeSwitcher />
          <CTAButton>{tCta("contact")}</CTAButton>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
        >
          <span className="h-0.5 w-6 bg-[var(--text)]" />
          <span className="h-0.5 w-6 bg-[var(--text)]" />
          <span className="h-0.5 w-6 bg-[var(--text)]" />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex flex-col bg-[var(--bg)] md:hidden"
          >
            <div className="flex items-center justify-between px-6 py-4">
              <span className="font-semibold">IO — Ivan Labs</span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="text-2xl leading-none text-[var(--text)]"
              >
                ×
              </button>
            </div>

            <motion.nav
              initial="closed"
              animate="open"
              variants={{
                open: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
                closed: {},
              }}
              className="flex flex-1 flex-col items-center justify-center gap-6"
            >
              {NAV_ITEMS.map((item) => (
                <motion.div
                  key={item.key}
                  variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: 12 },
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-2xl font-medium text-[var(--text)]"
                  >
                    {t(item.key)}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            <div className="flex items-center justify-center gap-4 px-6 py-8">
              <LanguageSwitcher />
              <ThemeSwitcher />
            </div>
            <div className="px-6 pb-10">
              <CTAButton className="w-full">{tCta("contact")}</CTAButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
