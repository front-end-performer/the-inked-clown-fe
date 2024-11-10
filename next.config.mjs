import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

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
        hostname: "tdart-tatto.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "the-inked-clown.s3.eu-central-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "nextui-docs-v2.vercel.app",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "theinkedclown-dev-954091e38b4e.herokuapp.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
