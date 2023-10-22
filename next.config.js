/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.insby.tech",
      },
    ],
  },
};

module.exports = nextConfig;
