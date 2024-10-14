const historyApiFallback = require('connect-history-api-fallback');
const path = require('path')
       , htmlWebpackPlugin = require('html-webpack-plugin')
       , webpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    
    mode: 'development',
    entry: path.resolve(__dirname, 'src/app.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true,
        assetModuleFilename: '[name][ext]'
    },
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        port: 3220,
        open: 'firefox',
        hot: true,
        compress: true,
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [ 'style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpeg|jpg|gif)$/i,
                type: 'asset/resource'
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            title: 'Webpack',
            filename: 'index.html',
            template: 'src/template.html'
        }),
        // new webpackBundleAnalyzer()
    ]
}