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
        hostname: "process.env.AWS_BUCKET_NAME.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "nextui-docs-v2.vercel.app",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "theinkedclown-dev-954091e38b4e.herokuapp.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // trailingSlash: true
};

// export default nextConfig;
export default withNextIntl(nextConfig);
