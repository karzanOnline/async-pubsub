/**
 * Created by caozheng on 2016/12/7.
 */

let webpack = require('webpack');
let path = require('path');
var babelpolyfill = require("babel-polyfill");

let node_modules = path.resolve(__dirname, 'node_modules');
let publicPath = 'http://localhost:9090/';

let devConfig = {
    entry: {
        'pubsub':'./pubsub.js',
        'asyncPubsub':'./asyncPubsub.js'
    },
    output: {
        publicPath,
        path: './dist/',
        filename: '[name].js',
        chunkFilename: 'chunk/[chunkhash:8].chunk.js',
    },
    externals :[
        require('webpack-require-http')
    ],
    module: {
        loaders: [
            {
                test: /\.(js)$/,
                loader: 'babel',
                exclude: /node_modules/,
            }      /* es6 to es5*/
        ]
    },
    plugins: [
         //new webpack.HotModuleReplacementPlugin()
        new webpack.optimize.UglifyJsPlugin({ output: { comments: false, }, compress: { warnings: false } })
    ]
};
module.exports = devConfig;
