 const merge = require('webpack-merge');
 const common = require('./webpack.common.js');
 var webpack = require("webpack");
 const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

 module.exports = merge(common, {
   mode: 'production',
   optimization: {
    minimizer: [
      new UglifyJSPlugin()
    ]
  },
   plugins: [
    new UglifyJSPlugin({
      uglifyOptions: {
        parallel: true,
        compress: {
          drop_console: true,
        },
        output: {
          comments: false,
          beautify: false
        }
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')

    })
  ]
 });