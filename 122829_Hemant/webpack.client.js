const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const copyWebPackPlugin = require('copy-webpack-plugin');

const config = {
    //root of application
    entry: './src/client/client.js',
    //generated output files
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    plugins: [
        new copyWebPackPlugin([
            {
                from: './src/client/assets/img',
                to: './assets/img'
            }
        ])
    ]
};

module.exports = merge(baseConfig, config);