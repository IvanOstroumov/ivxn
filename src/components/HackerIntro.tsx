"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Easter egg, explicitly requested by Ivan (overrides the earlier "no easter
// eggs in v1" decision — his call, made after launch once the site felt
// stable). A fast (~1.3s) fake hacker-terminal boot sequence: plays once
// automatically per browser session on first load, and replays anytime via
// clicking the "IO — Ivan Labs" logo (Nav.tsx dispatches the event). Kept
// strictly harmless/SFW per the site's existing content boundaries — just a
// fun loading flourish, nothing embarrassing if a client sees it.
const LINES = [
  "> establishing secure connection...",
  "> bypassing firewall... [OK]",
  "> decrypting payload...",
  "> spoofing coordinates...",
  "> injecting session token...",
  "> rerouting through 7 proxies...",
  "> access level: root",
  "> ACCESS GRANTED",
];

function randomHex(len = 28) {
  return Array.from({ length: len }, () => Math.floor(Math.random() * 16).toString(16)).join("");
}

export function HackerIntro() {
  const [visible, setVisible] = useState(false);
  const [shownLines, setShownLines] = useState<string[]>([]);

  const play = useCallback(() => {
    setShownLines([]);
    setVisible(true);
    let i = 0;
    const total = LINES.length + 4;
    const interval = setInterval(() => {
      setShownLines((prev) => [...prev, i < LINES.length ? LINES[i] : randomHex()]);
      i++;
      if (i >= total) {
        clearInterval(interval);
        setTimeout(() => setVisible(false), 250);
      }
    }, 90);
  }, []);

  useEffect(() => {
    if (!sessionStorage.getItem("ivxn-intro-seen")) {
      sessionStorage.setItem("ivxn-intro-seen", "1");
      // Safe here (unlike the ThemeProvider case): this component renders
      // nothing server-side either way (starts at visible=false), so there's
      // no hydration content at stake — just a client-only decorative overlay.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      play();
    }
    window.addEventListener("ivxn:hacker-intro", play);
    return () => window.removeEventListener("ivxn:hacker-intro", play);
  }, [play]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black p-6 font-mono text-sm text-[#33ff66]"
          aria-hidden="true"
        >
          <div className="w-full max-w-lg space-y-1">
            {shownLines.map((line, i) => (
              <div key={i} className="truncate">
                {line}
              </div>
            ))}
            <span className="inline-block h-4 w-2 animate-pulse bg-[#33ff66]" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
