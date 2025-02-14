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
        async rewrites() {
            return [
                {
                    source: '/api/:path*', // Match any request starting with `/api/`
                    destination: 'https://techtideapi.whitestone-5ff89f6f.northcentralus.azurecontainerapps.io/api/:path*', // Forward to your backend
                },
            ];
        },
};

export default nextConfig;
