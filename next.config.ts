import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dzyxm0rhg/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/fertwlow/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // ← Add this for fallback images
      },
    ],
  },
};

export default nextConfig;