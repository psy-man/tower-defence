const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const conf = require('./conf');

module.exports = {
  cache: true,
  entry: conf.path.src('index.ts'),

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        type: 'javascript/auto',
        test: /.json$/,
        use: 'json-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: 'file-loader'
      },
      {
        test: /.html$/,
        use: 'html-loader'
      }
    ]
  },

  optimization: {
    namedModules: true,
    splitChunks: {
      name: 'vendor',
      minChunks: 2
    },
    noEmitOnErrors: true,
    concatenateModules: true,
    occurrenceOrder: true
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.html'),
    }),
  ]
};
