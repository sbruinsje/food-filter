const CopyWebpackPlugin = require('copy-webpack-plugin');
const ServiceWorkerWebpackPlugin  = require('serviceworker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path');
const title = "Spoonfeedr";

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].[hash].bundle.js"
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new ServiceWorkerWebpackPlugin({
            entry: path.join(__dirname, '/src/sw.js')
        }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title,
            template: path.resolve(__dirname, 'public', 'index.html')
        }),
        new CopyWebpackPlugin([{
            from: 'public',
            to: './', // note: 'to' is relative to the output path (in our case the dist folder)
            toType: 'dir',
            ignore: ['.DS_Store'],
        }])
    ],
    module: {
        rules: [{
            test: /\.less$/, 
            use: [
                {loader: 'style-loader'},       // creates style nodes from JS strings
                {loader: 'css-loader'},         // translates CSS into CommonJS
                {loader: 'postcss-loader'},     // runs some transformations on the css like adding vendor prefixes
                {loader: 'less-loader'}         // compiles Less to CSS
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
            loader: 'vue-loader',
            options: {
                hotReload: true
            }
        }, {
            test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 4096,
                        fallback: {
                            loader: 'file-loader',
                            options: {
                                name: 'assets/images/[name].[hash:8].[ext]'
                            }
                        }
                    }
                }
            ]
        }, {
            test: /\.(svg)(\?.*)?$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: 'assets/images/[name].[hash:8].[ext]'
                    }
                }
            ]
        }, {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 4096,
                        fallback: {
                            loader: 'file-loader',
                            options: {
                                name: 'assets/media/[name].[hash:8].[ext]'
                            }
                        }
                    }
                }
            ]
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 4096,
                        fallback: {
                            loader: 'file-loader',
                            options: {
                                name: 'assets/fonts/[name].[hash:8].[ext]'
                            }
                        }
                    }
                }
            ]
        }]
    }
};