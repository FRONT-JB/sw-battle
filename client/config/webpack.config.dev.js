const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.config.common');

module.exports = merge(commonConfig, {
  mode: 'development',
  target: 'web',
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'js/[name].[contenthash].js',
  },
  optimization: {
    removeEmptyChunks: false,
    splitChunks: false,
  },
  devtool: 'inline-source-map',
  devServer: {
    open: true,
    port: 3000,
    historyApiFallback: true,
    hot: true,
  },
});
