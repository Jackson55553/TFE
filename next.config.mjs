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
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '7mb',
        },
    },
    // hideSourceMaps: process.env.NEXT_PUBLIC_VERCEL_ENV === "production",
    //   productionBrowserSourceMaps: false,
};

export default nextConfig;
