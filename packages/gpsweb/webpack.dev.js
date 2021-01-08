const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './index.tsx',
  devServer: {
    historyApiFallback: true,
    contentBase: false,
    hot: true,
    port: '8080',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});
