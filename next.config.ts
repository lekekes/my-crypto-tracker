/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["coin-images.coingecko.com"], // Erlaubte Domains hinzufügen
  },
};

module.exports = nextConfig;
