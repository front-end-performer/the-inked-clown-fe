import {Pathnames, LocalePrefix} from 'next-intl/routing';

export const defaultLocale = 'en' as const;
export const locales = ['en', 'de'] as const;

export const pathnames: Pathnames<typeof locales> = {
  '/': '/',
  '/*': {
    en: '/*',
    de: '/*'
  }
};

export const localePrefix: LocalePrefix<typeof locales> = 'always';

export const port = process.env.PORT || 3000;
export const host = process.env.VERCEL_URL
  ? `https://theinkedclown-dev-954091e38b4e.herokuapp.com/`
  : `http://localhost:${port}`;
