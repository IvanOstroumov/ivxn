"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("contactPage");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();

    if (res.ok) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
      setErrorMsg(json.error ?? "Something went wrong.");
    }
  }

  const inputClass =
    "w-full rounded-[var(--radius-theme)] border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm";

  if (status === "success") {
    return <p className="card p-4 text-sm text-[var(--text)]">{t("formSuccess")}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-left">
      {/* Honeypot — hidden from real users via CSS, bots that auto-fill every
          field will trip it. Server silently no-ops if this is filled in. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <label className="flex flex-col gap-1 text-sm">
        {t("formName")}
        <input name="name" required className={inputClass} />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        {t("formEmail")}
        <input type="email" name="email" required className={inputClass} />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        {t("formMessage")}
        <textarea name="message" required rows={4} className={inputClass} />
      </label>

      {status === "error" && <p className="text-sm text-red-500">{errorMsg}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="cta-button mt-1 rounded-[var(--radius-pill)] px-5 py-2.5 text-sm font-medium disabled:opacity-60"
        style={{ backgroundColor: "var(--accent)", color: "var(--on-accent)" }}
      >
        {status === "sending" ? t("formSending") : t("formSend")}
      </button>
    </form>
  );
}
