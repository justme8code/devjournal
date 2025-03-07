import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*',
                port: '',
                pathname: '/**',
                search: '',
            },
            {
                protocol:'https',
                hostname:'https://lh3.googleusercontent.com/fife/**'
            },
            {
                protocol:'https',
                hostname: 'th.bing.com',
            },
            {
                protocol:'https',
                hostname:'https://tse4.mm.bing.net/th/**'
            },

            {
                protocol:"https",
                hostname:"static.vecteezy.com/**",
            },

            {
                protocol:"https",
                hostname:"encrypted-tbn0.gstatic.com/**"
            }
        ],
    },


};

export default nextConfig;
