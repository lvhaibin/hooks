const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        main: './src/main.js'
    },
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        filename: '[name].js',
        chunkFilename: '[name].[chunkhash:8].js',
        publicPath: '/'
    },

    devServer: {
        port: 9000,
        hot: true,
        compress: true,
        historyApiFallback: true
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                // use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
                use: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },

    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: "all",
            minSize: 30000,
            minChunks: 1,
            cacheGroups: {
                commons: {
                    name: 'vendors0',
                    chunks: 'all',
                    minChunks: 2
                },
                vendors: {
                    test: /react/,
                    name: 'vendors1'
                },
                moment: {
                    test: /moment/,
                    name: 'vendors2'
                },
                default: false
            }
        },
    },

    plugins: [
        new CleanWebpackPlugin(),
        new webpack.ids.HashedModuleIdsPlugin(),
        new HtmlWebpackPlugin({
            title: '如风少年~',
            template: 'src/public/index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        // new BundleAnalyzerPlugin(),
        // new MiniCssExtractPlugin({
        //     filename: '[name].css',// 分离后的文件名
        //     chunkFilename: '[id].css',//
        //     ignoreOrder: false
        // })
    ],

    resolve: {
        extensions: ['.js', '.css', '.jsx', '.less']
    },
}
