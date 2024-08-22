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
  trailingSlash: true
};

export default withNextIntl(nextConfig);