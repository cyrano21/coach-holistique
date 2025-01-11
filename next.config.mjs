/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/fonts',
          outputPath: `${isServer ? '../' : ''}static/fonts`,
          name: '[name].[hash].[ext]',
        },
      },
    });

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

    // Ajout de la configuration pour Slick Carousel
    config.module.rules.push({
      test: /\.(css)$/,
      use: ['style-loader', 'css-loader'],
    });

    return config;
  },
};

export default nextConfig;
