"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Real screenshots when a project has them (see content/projects.json
// `images`); falls back to a labeled placeholder for projects that don't yet
// (Parserize, Reflux — see STATUS_REPORT.md). Structure is real either way:
// clicking a thumbnail swaps the main image with an animation.
// Note: deliberately not using AnimatePresence exit animations here — mode="wait"
// depends on the exit transition actually completing to mount the next child, and
// in testing that got stuck (stale content frozen at opacity 0). A plain
// enter-only fade keyed by `active` gets the same visual effect without that risk.
export function ProjectGallery({ title, images }: { title: string; images?: string[] }) {
  const slots = [0, 1, 2, 3];
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="card relative aspect-video overflow-hidden">
        {images ? (
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="relative h-full w-full"
          >
            <Image
              src={images[active]}
              alt={`${title} — screenshot ${active + 1}`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 768px"
              priority={active === 0}
            />
          </motion.div>
        ) : (
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="flex h-full w-full items-center justify-center text-[var(--text-muted)]"
          >
            {title} — screenshot {active + 1}
          </motion.div>
        )}
      </div>
      <div className="mt-3 grid grid-cols-4 gap-3">
        {slots.map((i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            className="relative aspect-video overflow-hidden rounded-[var(--radius-theme)] border text-xs text-[var(--text-muted)] transition-colors"
            style={{
              borderColor: active === i ? "var(--accent)" : "var(--border)",
              backgroundColor: "var(--surface-2)",
            }}
          >
            {images ? (
              <Image
                src={images[i]}
                alt={`${title} thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="120px"
              />
            ) : (
              i + 1
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
