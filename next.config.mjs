/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        // pathname: '/photos/**'
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        // pathname: '/photos/**'
      },
    ],
  },
};

export default nextConfig;
