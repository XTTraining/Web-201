const path = require('path');

var HtmlwebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlwebpackPlugin(),
    new HtmlwebpackPlugin({
      title: 'DesiDhaba app',
      filename: 'home.html',
      template: 'home.html'
    }),
    new HtmlwebpackPlugin({
      title: 'Review & complete your order',
      filename: 'orderlist.html',
      template: 'orderlist.html'
    })
  ],
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }]
  }
};