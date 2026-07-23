"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Placeholder gallery until real screenshots are provided (see CONTENT.md).
// Structure is real: clicking a thumbnail swaps the main image with an animation.
// Note: deliberately not using AnimatePresence exit animations here — mode="wait"
// depends on the exit transition actually completing to mount the next child, and
// in testing that got stuck (stale content frozen at opacity 0). A plain
// enter-only fade keyed by `active` gets the same visual effect without that risk.
export function ProjectGallery({ title }: { title: string }) {
  const slots = [0, 1, 2, 3];
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-video overflow-hidden rounded-[var(--radius-theme)] border border-[var(--border)] bg-[var(--surface)]">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="flex h-full w-full items-center justify-center text-[var(--text-muted)]"
        >
          {title} — screenshot {active + 1}
        </motion.div>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-3">
        {slots.map((i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            className="aspect-video rounded-[var(--radius-theme)] border text-xs text-[var(--text-muted)] transition-colors"
            style={{
              borderColor: active === i ? "var(--accent)" : "var(--border)",
              backgroundColor: "var(--surface-2)",
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
