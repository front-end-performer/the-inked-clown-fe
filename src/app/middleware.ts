import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n/configs";

export default async function middleware(request: NextRequest) {
  const handleI18nRouting = createMiddleware({
    locales,
    defaultLocale,
    localePrefix: "as-needed",
  });
  
  const response = handleI18nRouting(request);

  response.headers.set('NEXT_LOCALE', defaultLocale)
}


export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/:path*"],
};
