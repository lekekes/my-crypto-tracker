import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  env: {
    NEWSAPI_API_KEY: process.env.NEWSAPI_API_KEY,
  },
};

export default nextConfig;
