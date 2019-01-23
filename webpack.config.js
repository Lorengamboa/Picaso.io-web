'use strict';

const path = require('path');
const webpack = require('webpack');
var UnminifiedWebpackPlugin = require('unminified-webpack-plugin');

var ENVIROMENT = (process.env.NODE_ENV === 'production')

module.exports = {
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, "public"),
    filename: ENVIROMENT ? 'bundle.min.js' : 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader',
        include: /node_modules/
      }
    ]
  },
  plugins: ENVIROMENT ? [
    new webpack.optimize.UglifyJsPlugin({
      compress: false
    })
  ] : [],
  watch: ENVIROMENT ? false : true
}