/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true,
      },
    ];
  },
  experimental: {
    ppr: true,
    staleTimes: {
      dynamic: 30,
    },
  },
};

export default nextConfig;
