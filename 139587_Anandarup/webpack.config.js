const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack'); 
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: ['babel-polyfill', './src/js/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'cart.html',
            template: './src/cart.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'checkout.html',
            template: './src/checkout.html'
        }),
        new ExtractTextPlugin('./css/bundle.css'),
       
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'src/img'),
                to: path.resolve(__dirname, 'dist/img')
            }
        ]),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })    
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
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader?url=false', 'sass-loader']
                })
            },
            { 
                test: /\.handlebars$/,
                exclude: /node_modules/,
                include: [
                    path.resolve(__dirname, 'src/templates')
                ], 
                loader: "handlebars-loader",
            }
        ]
    }
};