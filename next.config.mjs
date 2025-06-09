/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'standalone', // keep this for server deployment
  basePath: '/coachsparkle',   //  required for subfolder routing
  assetPrefix: '/coachsparkle', //  required for assets like JS/CSS to load correctly
};

export default nextConfig;
