/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-28e558b74ea64a0781531927a8b49e0e.r2.dev',
        port: '',
        pathname: '/**',
      },
    ],
  },
  
  // Add security headers to allow connection to Google Apps Script
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; connect-src 'self' https://script.google.com https://*.googleapis.com; img-src 'self' data: https://* blob:; style-src 'self' 'unsafe-inline'; font-src 'self' data:; frame-src https://script.google.com; form-action https://script.google.com; base-uri 'self'; frame-ancestors 'self'; child-src https://script.google.com;"
          }
        ]
      }
    ];
  }
};

export default nextConfig;
