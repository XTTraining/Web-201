const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const bundleExtractPlugin = new ExtractTextPlugin({
//    filename: './dist/bundle.css',
// });

module.exports = {
  // mode: "development",
  entry: {
    app: './src/index.js',
    cart: './src/cart.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // filename: 'bundle.js',
    filename: "[name]-bundle.js",   
    publicPath: 'dist/'
  }, 
  module: {
    rules: [
      {
        test: /\.js$/, // include .js files
        enforce: "pre", // preload the jshint loader
        exclude: [/node_modules/, './src/js/vendor'], // exclude any and all files in the node_modules folder
        use: [{
          loader: "babel-loader"
        //   ,
        //   options: {
        //     presets: ['@babel/preset-env']
        //   }
        }]
      },
      { 
          test: /\.css$/, 
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {         
              }
            },
            "css-loader"
          ]
        //   use: ExtractTextPlugin.extract({
        //       fallback: 'style-loader',
        //       use: ['css-loader']
        //   })
          //loader: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // you can specify a publicPath here
                // by default it use publicPath in webpackOptions.output
                publicPath: 'dist/'
              }
            },
            "css-loader",
            'postcss-loader',
            'sass-loader' 
          ]
        // use: ExtractTextPlugin.extract({
        //     fallback: 'style-loader',
        //     //loader: 'style!css!postcss!sass'
        //     use: [
        //       //  'style-loader', // creates style nodes from JS strings
        //         'css-loader', // translates CSS into CommonJS
        //         'postcss-loader',
        //         'sass-loader' // compiles Sass to CSS
        //     ]
        // })
      },
      {
        test: /\.(svg|jpe?g|jpg|png|gif)$/,
        use:[
            {
                loader: 'url-loader',
                options: { //limit: 45000
                }
            },
            'image-webpack-loader'
        ]

        // test: /\.(eot|svg|ttf|woff|woff2|jpeg|jpg|png)$/,
        // loader: "file-loader",
        // options: {
        //     name: "./images/[hash].[ext]"
        // } //file?name=./images/[hash].[ext]'
      }
    ]
  },
  plugins: [
   // new ExtractTextPlugin('style.css')
    new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "style.css",
        chunkFilename: "[id].css"
    })
  ],
};