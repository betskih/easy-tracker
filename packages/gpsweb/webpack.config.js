const nodeExternals = require('webpack-node-externals');

 module.exports = [
  {
    name: 'server',
    target: 'node',
    entry: './server.js',
    externals: [nodeExternals()],
    mode: 'development',
    output: {
      filename: './server.js',
      libraryTarget: 'commonjs2',
    },
  },
  {
    name: 'client',
    target: 'web',
    entry: './serverRenderer.js',
    externals: [nodeExternals()],
    mode: 'development',
    output: {
      filename: './client.js',
      libraryTarget: 'commonjs2',
    },
  },
];
