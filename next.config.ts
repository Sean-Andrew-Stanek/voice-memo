import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactStrictMode: true,
    transpilePackages: ['react-speech-recognition'] // Ensure transpiling of external libraries if needed
};

export default nextConfig;
