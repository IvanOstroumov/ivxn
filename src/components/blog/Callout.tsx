import type { ReactNode } from "react";

export function Callout({
  children,
  type = "info",
}: {
  children: ReactNode;
  type?: "info" | "warning";
}) {
  return (
    <div
      className="callout my-6 rounded-[var(--radius-theme)] border-l-4 px-4 py-3 text-sm"
      data-callout-type={type}
    >
      {children}
    </div>
  );
}
