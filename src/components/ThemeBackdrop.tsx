"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

// Per-theme animated background layer — this is the "everything must change,
// not just colors" piece: each theme gets its own distinct moving background
// treatment, not a shared static color. Minimal deliberately gets nothing —
// its whole identity is restraint, so "no decoration" is itself the
// differentiator rather than an oversight.
export function ThemeBackdrop() {
  const { theme } = useTheme();

  if (theme === "cyber") {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(46,159,217,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(46,159,217,0.08) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at top, black, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at top, black, transparent 75%)",
        }}
      />
    );
  }

  if (theme === "glass") {
    return (
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute h-[420px] w-[420px] rounded-full"
          style={{ background: "var(--accent)", filter: "blur(90px)", opacity: 0.35, top: "-10%", left: "-5%" }}
          animate={{ x: [0, 60, -20, 0], y: [0, 40, 80, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute h-[360px] w-[360px] rounded-full"
          style={{ background: "var(--accent-2)", filter: "blur(90px)", opacity: 0.3, bottom: "-10%", right: "-5%" }}
          animate={{ x: [0, -50, 30, 0], y: [0, -30, -60, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    );
  }

  if (theme === "experimental") {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 3px)",
          animation: "scanline-drift 8s linear infinite",
        }}
      />
    );
  }

  return null;
}
