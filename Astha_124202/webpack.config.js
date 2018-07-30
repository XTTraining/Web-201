const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

module.exports={
entry:['babel-polyfill','./src/js/index.js'],
output:{
     path:path.resolve(__dirname,'dist'),
     filename:'js/bundle.js'
},
devServer:{
    contentBase:'./dist'
},
plugins:[
    new HtmlWebpackPlugin({
        filename:'index.html',
        template:'./src/index.html'
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
   new webpack.LoaderOptionsPlugin({
    minimize: true,
    options: {
        postcss: [autoprefixer]
    }
})
      
      
],
module:{
    rules:[
        {
            test:/\.(js)$/,
            exclude:/node_module/,
            use:{
                loader:'babel-loader'
            }
        },
        {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: ['css-loader',"postcss-loader", 'sass-loader']
            })
          },
      
          {
            test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=.+)?$/,
            loader: 'file-loader?name=img/[name].[ext]' 
            }, 
          {
             test: /\.hbs$/,
             use: [{
             loader: "handlebars-loader",
             options: {helperDirs: path.resolve(__dirname, "./js/helpers")}
             }]
          }  
    ]
}
};


