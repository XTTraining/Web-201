const webpack = require( 'webpack' );
const WebpackJasmineHtmlRunnerPlugin = require(
   'webpack-jasmine-html-runner-plugin'
);

// Alternatively, `require` your base `webpack.config.js`
// to add your custom loaders, modules, etc.
const config = {};
 
// In this example, your spec-runners are named
// e.g. 'lib/some-module/spec/spec-runner.js'.
// Pass more string arguments to process additional files.
config.entry = WebpackJasmineHtmlRunnerPlugin.entry(
   './lib/**/spec/spec-runner.js'
);
config.output = {
   path: './spec-output',
   publicPath: '/spec-output/',
   filename: '[name].bundle.js'
};
 
config.plugins = [
   new webpack.SourceMapDevToolPlugin( {
      filename: '[name].bundle.js.map'
   } ),
   new WebpackJasmineHtmlRunnerPlugin( {
      fixupScripts: []
   } )
];
 
module.exports = config;