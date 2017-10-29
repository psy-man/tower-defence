const path = require('path');
const webpack = require('webpack');

const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');


module.exports = function (env) {
  return webpackMerge(commonConfig, {
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
      new webpack.DllReferencePlugin({
        context: path.join(__dirname, '..', 'src'),
        manifest: require('../dll/vendor-manifest.json')
      }),

      new AddAssetHtmlPlugin({
        filepath: require.resolve('../dll/vendor.dll.js')
      })
    ],

    devtool: 'eval-source-map',

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
