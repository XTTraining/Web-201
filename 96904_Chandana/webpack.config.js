const path = require('path');
const htmlWebpackPlugins = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';


module.exports = {
    entry: ['babel-polyfill', './index.js'],
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new htmlWebpackPlugins({
            filename: 'index.html',
            template: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "css/style.css",
            chunkFilename: "[id].css"
        }),
        new ServiceWorkerWebpackPlugin({
            entry: path.join(__dirname, 'service-worker.js'),
        })
    ],
    module: {
        
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ],
            },
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },            
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=.+)?$/,
                loader: 'file-loader?name=[path][name].[ext]'                
            },
            {
                test: /\.hbs$/,
                use: {
                  loader: "handlebars-loader",
                  options: {helperDirs: path.resolve(__dirname, "./js/view/helpers")}
                }
            },
        ]
    }
};