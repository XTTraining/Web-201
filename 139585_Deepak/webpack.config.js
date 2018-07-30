const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill', './src/js/index.js'], // This is entry file. All dependencies will be looked in this file. Multiple files can be given here
    output: {
        path: path.resolve(__dirname, 'dist'), // here we need absolute path//so we use a buildin Node package// __dirname --> this is current absolute path
        filename: 'js/bundle.js' //Where to save output
    },
    optimization: {
        minimizer: [
      new OptimizeCSSAssetsPlugin({})
    ]
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'cart.html',
            template: './src/cart.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'payment.html',
            template: './src/payment.html'
        }),
        new ExtractTextPlugin('css/style.css'),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'src/img'), //copy images from src forder to dist folder
                to: path.resolve(__dirname, 'dist/img')
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
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    // use: ['css-loader?url=false', 'sass-loader']
                    use: [
                        {
                            loader: "css-loader",
                            query: {
                                url: false
                            }
                        }, {
                            loader: "sass-loader"
                        }
                    ]
                })
            },
            {
                test: /\.hbs$/,
                exclude: /node_modules/,
                include: [
                    path.resolve(__dirname, 'src/templates')
                ],
                loader: 'handlebars-loader',
                query: {
                    helperDirs: [path.resolve(__dirname, 'src/helpers')]
                }
            }
        ]
    },
    performance: {
        hints: false
    }
};
