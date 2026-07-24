"use client";

import { useRef, useState } from "react";

// Uploads a file to Vercel Blob and writes the resulting URL into a sibling
// text input (by id) — lets the admin either paste a URL manually or upload a
// real file, whichever is available at the time.
export function UploadButton({ targetInputId }: { targetInputId: string }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<string | null>(null);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setStatus("Uploading…");
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) {
        const target = document.getElementById(targetInputId) as HTMLInputElement | null;
        if (target) target.value = data.url;
        setStatus("Uploaded ✓");
      } else {
        setStatus(data.error ?? "Upload failed");
      }
    } catch {
      // Without this, a network failure leaves "Uploading…" shown forever.
      setStatus("Upload failed — network error");
    }
  }

  return (
    <span className="inline-flex items-center gap-2">
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className="rounded-[var(--radius-theme)] border border-[var(--border)] px-2 py-1 text-xs hover:border-[var(--accent)]"
      >
        Upload file
      </button>
      <input ref={fileRef} type="file" className="hidden" onChange={handleChange} />
      {status && <span className="text-xs text-[var(--text-muted)]">{status}</span>}
    </span>
  );
}
