const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.config.common');

module.exports = merge(commonConfig, {
  mode: 'production',
  target: 'browserslist',
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    assetModuleFilename: 'images/[contenthash][ext][query]',
    filename: 'js/[name].[contenthash].js',
    chunkFilename: 'js/[name].[contenthash].chunk.js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          chunks: 'all',
          name: 'vendor',
          enforce: true,
          test: /[\\/]node_modules[\\/]/,
        },
      },
    },
    runtimeChunk: true,
  },
});
