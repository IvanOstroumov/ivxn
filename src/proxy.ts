import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // /admin is a standalone, non-localized tool. /apple-icon is a root-level
  // metadata route (no file extension in its URL, so the "has a dot" rule
  // below doesn't catch it) — both need excluding or the i18n middleware
  // redirects them into a locale prefix and 404s.
  matcher: ["/((?!api|admin|apple-icon|_next|_vercel|.*\\..*).*)"],
};
