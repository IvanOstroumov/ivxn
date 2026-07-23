"use client";

import { useEffect, useRef } from "react";

// The single biggest "wow" detail Ivan pointed to on nesen.ch: the background
// subtly lights up around the cursor. Tracks the mouse and writes its
// position into CSS variables that a fixed radial-gradient layer reads —
// cheap (no React re-renders per mousemove) and themed via --spotlight-color.
export function MouseSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      const el = ref.current;
      if (!el) return;
      el.style.setProperty("--mx", `${e.clientX}px`);
      el.style.setProperty("--my", `${e.clientY}px`);
    }
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 transition-opacity duration-300"
      style={{
        background:
          "radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), var(--spotlight-color), transparent 70%)",
      }}
    />
  );
}
