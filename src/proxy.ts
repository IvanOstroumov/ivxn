import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // /admin is a standalone, non-localized tool — excluded from locale routing.
  matcher: ["/((?!api|admin|_next|_vercel|.*\\..*).*)"],
};
