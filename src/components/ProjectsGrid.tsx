"use client";

import { useMemo, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import type { Project, ProjectCategory } from "@/content/types";
import { getLocalized } from "@/lib/localized";

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const t = useTranslations("projectsPage");
  const locale = useLocale();
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");

  const categories = useMemo(() => {
    const set = new Set<ProjectCategory>(projects.map((p) => p.category));
    return Array.from(set);
  }, [projects]);

  const visible =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={`rounded-[var(--radius-theme)] border px-3 py-1.5 text-sm transition-colors ${
            filter === "all"
              ? "border-[var(--accent)] text-[var(--accent)]"
              : "border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]"
          }`}
        >
          {t("filterAll")}
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={`rounded-[var(--radius-theme)] border px-3 py-1.5 text-sm transition-colors ${
              filter === cat
                ? "border-[var(--accent)] text-[var(--accent)]"
                : "border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {visible.map((project, i) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" }}
          >
            <Link
              href={`/projects/${project.slug}`}
              className="card block p-5 transition-transform hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-medium">{project.title}</h2>
                <span className="text-xs text-[var(--text-muted)]">{project.category}</span>
              </div>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                {getLocalized(project.shortDescription, locale)}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
