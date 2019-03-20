"use strict";

const path = require("path");
const webpack = require('webpack');

module.exports = {
  entry: "./app/index.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      { test: /\.js$/, loader: "babel-loader", exclude: /node_modules/ },
      { test: /\.jsx?$/, loader: "babel-loader", exclude: /node_modules/ },
      {
        test: /\.css$/,
        loader: "style!css!-loader",
        include: /node_modules/
      }
    ]
  },
  resolve: {
    alias: {
      Shared: path.resolve(__dirname, "shared/"),
    }
  },
  plugins: [],
  watch: true
};
