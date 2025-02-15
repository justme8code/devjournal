import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*',  // Allow any hostname
                port: '',
                pathname: '/**',  // Allow any pathname
                search: '',
            },
        ],
    },

};

export default nextConfig;
