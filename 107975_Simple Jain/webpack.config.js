const path = require('path');
//const CleanWebpackPlugin = require('clean-webpack-plugin');
const copyWebPackPugin = require('copy-webpack-plugin');
//Copy static content img, data

const copyStaticData = new copyWebPackPugin([{
    from: './src/assets/img',
    to: '../dist/assets/img'
}, {
    from: './src/assets/fonts',
    to: '../dist/assets/fonts'
}, {
    from: './src/assets/data',
    to: '../dist/assets/data'
}, {
    from: './src/pages',
    to: '../dist',
}]);

module.exports = env => {
    
    const no_dist = (env && env.dist === "false");
    return {
        mode:'production',
        entry: './src/assets/js/main.js',
        output: {
            filename: './assets/js/main.js',
            path: path.resolve(__dirname, 'dist')
        },
       // devtool: 'inline-source-map',
        devServer: {
            contentBase: './dist'
        },
        plugins: [copyStaticData]
    }
};