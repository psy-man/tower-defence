const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const {CheckerPlugin} = require('awesome-typescript-loader');

const paths = {
  src: path.resolve(__dirname, './src'),
  dist: path.resolve(__dirname, './docs'),
  index: path.resolve(__dirname, './src/index.html')
};

module.exports = {
  context: paths.src,
  entry: './index.ts',
  output: {
    filename: '[name].bundle.js',
    path: paths.dist,
    publicPath: '',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },

  devtool: 'source-map',

  module: {


    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.css$/,
        loaders: ExtractTextPlugin.extract({
          fallback: 'style-loader?sourceMap',
          loader: 'css-loader?sourceMap'
        })
      },
      {
        test: /\.scss$/,
        loaders: ExtractTextPlugin.extract({
          fallback: 'style-loader?sourceMap',
          loader: 'css-loader?sourceMap!sass-loader?sourceMap'
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg|mp3)$/i,
        loaders: [
          'file-loader'
        ]
      },
    ],
  },
  plugins: [
    new CheckerPlugin(),
    new WebpackNotifierPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: paths.index
    }),
    new ExtractTextPlugin('styles.css')
  ],

  devServer: {
    contentBase: paths.src
  },
};
