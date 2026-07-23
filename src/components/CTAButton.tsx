import { Link } from "@/i18n/navigation";

export function CTAButton({
  children,
  href = "/contact",
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-[var(--radius-pill)] px-5 py-2.5 font-medium transition-transform hover:scale-[1.03] ${className}`}
      style={{
        backgroundColor: "var(--accent)",
        color: "var(--on-accent)",
        boxShadow: "var(--shadow-cta)",
      }}
    >
      {children}
    </Link>
  );
}
