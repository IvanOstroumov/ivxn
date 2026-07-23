import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Sans, Space_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { DEFAULT_THEME, THEME_STORAGE_KEY } from "@/lib/themes";
import { routing } from "@/i18n/routing";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Analytics } from "@/components/Analytics";
import { MouseSpotlight } from "@/components/MouseSpotlight";
import { ThemeBackdrop } from "@/components/ThemeBackdrop";

const SITE_URL = "https://ivxn.dev";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Cyber theme's body font (nesen.ch's dark theme uses DM Sans).
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

// Experimental theme's font — monospace reads as more "underground/hacker",
// deliberately distinct from Cyber's clean DM Sans.
const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${SITE_URL}/${l}`])
  );

  return {
    metadataBase: new URL(SITE_URL),
    title: `${t("name")} — ${t("brand")}`,
    description: t("tagline"),
    alternates: {
      canonical: `/${locale}`,
      languages,
    },
    openGraph: {
      title: `${t("name")} — ${t("brand")}`,
      description: t("tagline"),
      url: `${SITE_URL}/${locale}`,
      siteName: t("brand"),
      locale,
    },
  };
}

// Runs before hydration so the correct theme is applied on first paint,
// avoiding a flash of the default theme for returning visitors.
const themeInitScript = `
(function() {
  try {
    var stored = window.localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
    var valid = ["cyber", "minimal", "glass", "experimental"];
    var theme = valid.indexOf(stored) !== -1 ? stored : ${JSON.stringify(DEFAULT_THEME)};
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {}
})();
`;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} ${dmSans.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <Analytics />
      </head>
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider>
          <ThemeProvider>
            <MouseSpotlight />
            <ThemeBackdrop />
            <Nav />
            <div className="flex-1">{children}</div>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
