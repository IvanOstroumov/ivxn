"use client";

import { useState } from "react";

export function ShareButtons({ url, title, label }: { url: string; title: string; label: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="mt-8 flex flex-wrap items-center gap-3 text-sm">
      <span className="text-[var(--text-muted)]">{label}</span>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-[var(--radius-pill)] border border-[var(--border)] px-3 py-1.5 hover:border-[var(--accent)]"
      >
        X / Twitter
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-[var(--radius-pill)] border border-[var(--border)] px-3 py-1.5 hover:border-[var(--accent)]"
      >
        LinkedIn
      </a>
      <button
        type="button"
        onClick={() => {
          navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          });
        }}
        className="rounded-[var(--radius-pill)] border border-[var(--border)] px-3 py-1.5 hover:border-[var(--accent)]"
      >
        {copied ? "✓" : "Copy link"}
      </button>
    </div>
  );
}
