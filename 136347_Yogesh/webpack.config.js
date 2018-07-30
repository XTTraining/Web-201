const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: [/*/'babel-polyfill',/*/ './src/index.js'],

    output: {
        path: path.resolve(__dirname+"/src/project-files", 'dist'),
        filename: '[name].bundle.js'
    },
    devServer: {
        contentBase: './src/project-files/dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/project-files/index.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'orders.html',
            template: './src/project-files/orders.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'checkout.html',
            template: './src/project-files/checkout.html'
        }),
         new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "min.css",
        }),
        new CopyWebpackPlugin([
            {
                from: 'src/project-files/img',
                to: 'Images'
            }
        ])

    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: [
                "style-loader", // creates style nodes from JS strings
                "css-loader", // translates CSS into CommonJS
                "sass-loader" // compiles Sass to CSS
                ]
            }
        ]
    }
};