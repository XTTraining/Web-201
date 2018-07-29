


const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const copyWebPackPugin = require('copy-webpack-plugin');

const copyStaticData = new copyWebPackPugin([{
    from: './src/img',
    to: '../dist/assets/img'
}, {
    from: './src/pages',
    to: '../dist',
}]);


module.exports = {
    entry:  './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            },
            {
                rules: [{
                    test: /\.scss$/,
                    use: [
                        "style-loader", // creates style nodes from JS strings
                        "css-loader", // translates CSS into CommonJS
                        "sass-loader" // compiles Sass to CSS
                    ]
                }]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },

    plugins: [
        new copyWebPackPugin([
            {
                from: './src/img',
                to: './img'
            }]),
            new HtmlWebpackPlugin(), // Generates default index.html
            new HtmlWebpackPlugin({  // Also generate a test.html
              filename: 'index.html',
              template: 'src/pages/index.html'
            }),
            new HtmlWebpackPlugin({  // Also generate a test.html
                filename: 'orderlist.html',
                template: 'src/pages/orderlist.html'
              }),
              new HtmlWebpackPlugin({  // Also generate a test.html
                filename: 'pay.html',
                template: 'src/pages/pay.html'
              })
    ]

};
