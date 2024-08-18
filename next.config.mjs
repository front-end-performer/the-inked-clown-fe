import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
  },
  serverRuntimeConfig: {
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: 'process.env.AWS_BUCKET_NAME.s3.amazonaws.com',
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: 'nextui-docs-v2.vercel.app',
        port: "",
        pathname: "/**",
      },
    ],
  },
  // i18n: {
  //   // These are all the locales you want to support in
  //   // your application
  //   locales: ["en", "de"],
  //   // This is the default locale you want to be used when visiting
  //   // a non-locale prefixed path e.g. `/hello`
  //   defaultLocale: "de",
  //   localeDetection: true,
  //   // This is a list of locale domains and the default locale they
  //   // should handle (these are only required when setting up domain routing)
  //   // Note: subdomains must be included in the domain value to be matched e.g. "fr.example.com".
  //   // domains: [
  //   //   {
  //   //     domain: 'example.de',
  //   //     defaultLocale: 'en-US',
  //   //   },
  //   // ],
  // }
};

export default withNextIntl(nextConfig);

// const nextConfig = {
  // i18n: {
  //   // These are all the locales you want to support in
  //   // your application
  //   locales: ["en-US", "de-DE"],
  //   // This is the default locale you want to be used when visiting
  //   // a non-locale prefixed path e.g. `/hello`
  //   defaultLocale: "en-US",
  //   localeDetection: true,
  //   // This is a list of locale domains and the default locale they
  //   // should handle (these are only required when setting up domain routing)
  //   // Note: subdomains must be included in the domain value to be matched e.g. "fr.example.com".
  //   // domains: [
  //   //   {
  //   //     domain: 'example.de',
  //   //     defaultLocale: 'en-US',
  //   //   },
  //   // ],
  // },
//   trailingSlash: true,
// };

// export default nextConfig;
