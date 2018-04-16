/* jshint esversion: 6 */

const path = require('path');
const webpack = require('webpack'); // to access built-in plugins
const HtmlWebpackPlugin = require('html-webpack-plugin'); // installed via npm
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const sassPlugin = new ExtractTextPlugin({
    filename: 'css/[name].css'
});

const config = {
    mode: 'development', // 'production'
    entry: {
        app: './src/app/app.js',
        style: './src/scss/app.scss',
        vendors: './src/vendors/vendors.js',
    },
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: sassPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            })
        }, {
            test: /\.txt$/,
            use: 'raw-loader'
        }]
    },
    resolve: {
        alias: {
            jquery: "jquery/src/jquery"
        }
    },
    devServer: {
        open: true, // will open the browser
        hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
        inline: true, // inline module replacement.
        noInfo: true, // only errors & warns on hot reload
        contentBase: path.join(__dirname, 'docs'), // boolean | string | array, static file location
        compress: true, // enable gzip compression
        historyApiFallback: true, // true for index.html upon 404, object for multiple paths
        https: false, // true for self-signed, object for cert authority
        proxy: { // proxy URLs to backend development server
            '/api': 'http://localhost:3000'
        },
        // ...
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        sassPlugin,
    ],
    optimization: {
        minimizer: [
            // we specify a custom UglifyJsPlugin here to get source maps in production
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    compress: false,
                    ecma: 5,
                    mangle: true
                },
                sourceMap: true
            })
        ]
    }
    /*
    noParse: [
        /[\/\\]node_modules[\/\\]angular[\/\\]angular\.js$/
    ]
    */
};

module.exports = config;