import "../[locale]/globals.css";

export const metadata = {
  title: "Admin — Ivan Labs",
  robots: "noindex, nofollow",
};

// Standalone admin tool — deliberately outside the [locale] i18n tree (it's a
// single-user utility, not public-facing content) and fixed to the Minimal
// theme for a plain, functional editing UI rather than the marketing themes.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="minimal" className="h-full antialiased">
      <body className="min-h-full bg-[var(--bg)] text-[var(--text)]">{children}</body>
    </html>
  );
}
