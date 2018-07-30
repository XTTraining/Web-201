// webpack.config.js
var path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: "./src/js/app.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/dist"
  },
  mode: 'development',
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "min.css",
    }),
    new CopyWebpackPlugin([{
        from: 'src/index.html',
        to: './index.html'
      },
      {
        from: 'src/checkout.html',
        to: './checkout.html'
      },
      {
        from: 'src/cart.html',
        to: './cart.html'
      }, 
      {
        from: 'src/images',
        to: 'images'
      }      

    ]),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),


  ],
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["es2015"]
          }
        }
      },
      {
        test: /\.scss$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
          },
          {

            loader: "css-loader" // translates CSS into CommonJS
          },
          {

            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      }
    ]
  },
  node: {
    fs: 'empty',
    // tls: 'empty'
  }
};