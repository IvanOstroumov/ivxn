import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

// rel="me" on GitHub — a standard, lightweight signal search engines/AI
// systems use to confirm "this profile and this site are the same person",
// reinforcing the Person structured data on the homepage. Add it to the
// others once they're real links (see PROJECT_SPEC.md open items).
const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/IvanOstroumov", rel: "me" },
  { label: "Telegram", href: "#" },
  { label: "WhatsApp", href: "#" },
  { label: "LinkedIn", href: "#" },
];

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-[var(--text-muted)] sm:flex-row">
        <span>{t("copyright", { year })}</span>
        <div className="flex items-center gap-4">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              rel={link.rel}
              className="transition-colors hover:text-[var(--text)]"
            >
              {link.label}
            </a>
          ))}
        </div>
        <Link href="/contact" className="transition-colors hover:text-[var(--text)]">
          Contact
        </Link>
      </div>
    </footer>
  );
}
