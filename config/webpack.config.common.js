const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const postcssConfig = path.resolve(__dirname, 'postcss.config.js');
const babelConfig = require('./babel.config');

const ROOT_PATH = path.resolve(__dirname, '..');
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const IMAGE_PATH = path.resolve(ROOT_PATH, 'src/assets/images');
const plugins = [
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin({
    filename: 'css/[name].css',
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.resolve(SRC_PATH, 'index.html'),
    favicon: path.resolve(IMAGE_PATH, 'favicon.ico'),
  }),
  new webpack.DefinePlugin({
    'process.env.API_BASE_URL': JSON.stringify('https://sw-battle-server.herokuapp.com'),
    'process.env.BASE_IMAGE_URL': JSON.stringify(
      'https://swarfarm.com/static/herders/images/monsters',
    ),
  }),
];

if (process.env.SERVE) {
  // We only want React Hot Reloading in serve mode
  plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = {
  entry: path.resolve(SRC_PATH, 'index.tsx'),

  module: {
    rules: [
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: postcssConfig,
              },
            },
          },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader', options: babelConfig },
      },
    ],
  },
  plugins,
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};
