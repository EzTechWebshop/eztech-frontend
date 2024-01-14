/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '5122',
                pathname: '/api/image/**',
            },
            {
                protocol: 'https',
                hostname: 'eztechserver.azurewebsites.net',
                port: '',
                pathname: '/api/image/**',
            },
        ],
    },
}

module.exports = nextConfig
