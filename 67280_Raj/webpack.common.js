/* 
* This file was generated with webpack-create-config version 1.0.0 
* please run the following command to install dependencies
* npm install --save-dev webpack
* or with yarn
* yarn add webpack
*/
const path = require("path");
var webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  // entry: ["babel-polyfill", "./src/index.js","./src/cartPage.js"],
  // output: {
  //     filename: 'bundled.js',
  //     path: path.resolve(__dirname, 'dist'),
  entry: {
    home: "./src/index.js",
    payment: "./src/payment.js",
    cart: "./src/cartPage.js",
    vendor:["babel-polyfill"]
    // pageThree: './src/pageThree/index.js'
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js"
  },
  // devServer: {
  //   contentBase: "./dist"
  // },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { minimize: true } },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [
                require("autoprefixer")({
                  browsers: ["last 3 versions", "ie >=9"]
                })
              ]
            }
          },
          { loader: "sass-loader", options: {} }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{ loader: "file-loader", options: { name: "[name].[ext]" } }]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/main.css"
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: "./src/index.html",
      filename: "index.html"
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: "./src/cart.html",
      filename: "cart.html"
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: "./src/payment.html",
      filename: "payment.html"
    }),
    new CopyWebpackPlugin(
      [{ from: "./src/img", to: "img" },
      { from: "./src/components/list/data/mock_data.json", to: "data" }
    ]
    )
  ]
};
