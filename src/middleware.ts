import createMiddleware from 'next-intl/middleware';
import {localePrefix, defaultLocale, locales, pathnames} from './i18.config';

export default createMiddleware({
  defaultLocale,
  locales,
  localePrefix,
  pathnames
});

export const config = {
  localePrefix: "as-needed",
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(de|en)/:path*',

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    // '/((?!_next|_vercel|.*\\..*).*)'
  ]
};
