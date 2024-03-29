const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common');


module.exports = merge(common, {
  mode: 'production',
  entry: './index.tsx',
  plugins:
  [
        new CleanWebpackPlugin(),
  ],
  optimization: {
        minimize: true
    }

});


