const webpack = require('webpack');
const conf = require('./conf');
const path = require('path');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = webpackMerge(commonConfig, {
  mode: 'production',

  entry: {
    vendors: [
      conf.path.src('vendors.js')
    ],
    app: [
      conf.path.src('index.scss'),
      conf.path.src('index.ts')
    ]
  },

  output: {
    path: conf.path.dist(),
    publicPath: '',
    filename: 'scripts/[name].js',
    crossOriginLoading: 'anonymous'
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {loader: 'sass-loader'}
        ]
      }
    ]
  },
  stats: {
    colors: false,
    hash: true,
    timings: true,
    assets: true,
    chunks: true,
    chunkModules: true,
    modules: true,
    children: true,
  },
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        sourceMap: true,
        uglifyOptions: {
          compress: {
            inline: false
          }
        }
      })
    ],
    runtimeChunk: false
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      },
    }),
  ],
});
