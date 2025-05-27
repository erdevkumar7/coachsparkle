/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // keep this for server deployment
  basePath: '/coach',   // 👈 required for subfolder routing
  assetPrefix: '/coach', // 👈 required for assets like JS/CSS to load correctly
};

export default nextConfig;
