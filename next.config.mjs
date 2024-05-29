/** @type {import('next').NextConfig} */

const nextConfig = {
    poweredByHeader: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
                port: '',
                pathname: '**',
            },
        ],
    },
    // hideSourceMaps: process.env.NEXT_PUBLIC_VERCEL_ENV === "production",
    //   productionBrowserSourceMaps: false,
};

export default nextConfig;
