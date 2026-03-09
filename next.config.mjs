/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'standalone', // keep this for server deployment
  basePath: '/coachsparkle',   //  required for subfolder routing
  assetPrefix: '/coachsparkle', //  required for assets like JS/CSS to load correctly
  images: {
    domains: ['coachsparkle-backend.votivereact.in', 'localhost'],
  },
};

export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   basePath: '/coachsparkle',
//   assetPrefix: '/coachsparkle',

//   images: {
//     remotePatterns: [
//       {
//         protocol: 'http',
//         hostname: '127.0.0.1',
//         port: '8000',
//         pathname: '/public/**',
//       },
//       {
//         protocol: 'https',
//         hostname: 'coachsparkle-backend.votivereact.in',
//         pathname: '/**',
//       },
//     ],
//   },
// };

// export default nextConfig;