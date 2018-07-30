const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const webpackNodeExternal = require('webpack-node-externals');

const config = {
    //building bundle for node rather than for browser
    target: 'node',
    //root of application
    entry: './src/index.js',
    //generated output files
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    externals:[webpackNodeExternal()]
};

module.exports = merge(baseConfig, config);