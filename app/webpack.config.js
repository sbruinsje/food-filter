const ServiceWorkerWebpackPlugin  = require('serviceworker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path');

const title = "Project test";

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].[hash].bundle.js"
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new ServiceWorkerWebpackPlugin({
            entry: path.join(__dirname, '/src/serviceworker.js'),
            filename: "serviceworker.js",
            publicPath: "/dist/"
        }),
        new HtmlWebpackPlugin({
            title,
            template: path.resolve(__dirname, 'src', 'index.ejs')
        }),
        new VueLoaderPlugin()
    ],
    module: {
        rules: [{
            test: /\.less$/, 
            use: [
                {loader: 'style-loader'},
                {loader: 'css-loader'},
                {loader: 'less-loader'}
            ]
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"]
                }
            }
        }, {
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.jpg$/,
            loader: 'file-loader?name=images/[name].[hash].[ext]',
        }]
    }
};