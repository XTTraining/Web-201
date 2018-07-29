module.exports = {
    module: {

        // apply loaders to files that meet given conditions
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            query: {
                presets: ["react", "es2015", "stage-1"]
            }
        }
        ],
    }
};