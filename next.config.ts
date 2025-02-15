import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    output: 'export',
    images: {
        unoptimized: true
    },
    reactStrictMode: true,
    basePath: '/tts'
};

export default nextConfig;
