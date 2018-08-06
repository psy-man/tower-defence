const path = require('path');
const webpack = require('webpack');

const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');


module.exports = function (env) {
  return webpackMerge(commonConfig, {
    mode: 'development',

    devtool: 'eval-source-map',

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: 'tslint-loader',
          enforce: 'pre'
        },
        {
          test: /\.scss$/,
          use: [
            {loader: 'style-loader'},
            {loader: 'css-loader', options: {sourceMap: true}},
            {loader: 'sass-loader', options: {sourceMap: true}}
          ]
        }
      ]
    },

    plugins: [
      // new webpack.DllReferencePlugin({
      //   context: path.join(__dirname, '..', 'src'),
      //   manifest: require('../dll/vendor-manifest.json')
      // }),
    ],

    devServer: {
      port: 3000,
      open: true,
      openPage: '',
      stats: {
        assets: false,
        children: false,
        chunks: false,
        hash: false,
        modules: false,
        publicPath: false,
        timings: true,
        version: false,
        warnings: true
      }
    }
  });
};
