/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    unoptimized: true  // If you're having issues with Image optimization
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next/static/images',
            outputPath: `${isServer ? '../' : ''}static/images`,
            name: '[name].[hash].[ext]',
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
