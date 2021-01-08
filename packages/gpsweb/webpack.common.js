const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATH_BUILD = path.resolve(__dirname, 'dist');
const PATH_SRC = path.resolve(__dirname, 'src');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  context: PATH_SRC,
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css',
      ignoreOrder: false,
    }),

    new HtmlWebpackPlugin({
      template: path.join(PATH_SRC, 'index.html'),
      path: '',
      filename: 'index.html',
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoprefixer()],
      },
    }),
  ],
  resolve: { extensions: ['*', '.js', '.jsx', '.ts', '.tsx'] },
  output: {
    filename: 'index.js',
    publicPath: '',
    path: PATH_BUILD,
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)?$/,
        loader: 'ts-loader',
        exclude: [/node_modules/],
      },
      {
        test: /\.(jsx|js)?$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            // options: { modules: true, localIdentName: '[name]-[hash:5]' }
          },
        ],
      },
      {
        test: /\.scss$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },

      {
        test: /\.(jpg|jpeg|png)$/,
        loader: 'file-loader',
        options: {
          fallback: 'file-loader?name=img/[name].[ext]',
          limit: 5000,
        },
      },
      {
        test: /\.(ttf)$/,
        loader: 'url-loader',
        options: {
          fallback: 'file-loader?name=font/[name].[ext]',
          limit: 5000,
        },
      },
    ],
  },
};
