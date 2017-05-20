const path = require('path');
const webpack = require('webpack');

const conf = require('./conf');

module.exports = {
  entry: {
    vendor: [conf.path.src('vendors')]
  },

  output: {
    path: conf.paths.dll,
    filename: '[name].dll.js',
    library: '[name]'
  },

  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '..', 'dll', '[name]-manifest.json'),
      name: '[name]',
      context: path.resolve(__dirname, '..', 'src')
    })
  ]
};
