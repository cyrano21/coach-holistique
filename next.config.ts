// next.config.js
// ------------------------------------------
// [Lieu de modification] Vérifie que tu n'as
// pas de basePath ou d'assetPrefix erronés
// ------------------------------------------

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: 
              "default-src 'self'; " +
              "script-src 'self' 'unsafe-inline' https://www.youtube.com https://s.ytimg.com; " +
              "style-src 'self' 'unsafe-inline'; " +
              "img-src 'self' data: https://i.ytimg.com; " +
              "frame-src 'self' https://www.youtube.com; " +
              "connect-src 'self';"
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig
