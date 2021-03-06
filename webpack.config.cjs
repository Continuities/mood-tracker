const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    "app": "./src/index.js",
    "service-worker": "./src/service-worker.js"
  },
  mode: "development",
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /(node_modules|bower_components)/,
      use: [ "babel-loader", 'eslint-loader' ]
    }, {
      test: /\.css$/,
      use: ["style-loader", "css-loader"]
    }]
  },
  resolve: { 
    extensions: ["*", ".js", ".jsx"],
    modules: ["src", "node_modules"],
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/",
    filename: "[name].js"
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    historyApiFallback: true
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      DOMAIN: 'http://localhost'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "static", "index.html"),
      filename: 'index.html',
      excludeChunks: [ 'service-worker' ]
    }),
    new CopyPlugin({
      patterns: [{ 
        from: 'static/manifest.webmanifest',
        to: 'static'
      }]
    })
  ]
};