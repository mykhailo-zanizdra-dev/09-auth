import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'ac.goit.global',
      },
    ],
  },
  /* config options here */
};
export default nextConfig;
