var webpack = require('webpack')
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var dev = true;


module.exports = {
    entry: {
        main: ["webpack/hot/only-dev-server", "./src/js/main.js"],
        vendors: ['./src/js/containers/header/Header.js', './src/js/core/md5.js', 'redux', 'react-redux', 'react-router', 'superagent']
    },
//    entry: [
////        'webpack-dev-server/client?http://127.0.0.1:3000',
////        'webpack/hot/only-dev-server',
//        './src/js/main.js'
//    ],
    output: {
        path: dev ? 'src/__build' : path.resolve(__dirname + '/src/dist/'),
        publicPath: '/weixin/',
        filename: 'js/[name].js',
        chunkFilename: "js/[chunkhash:4].chunk.js"
    },
    module: {
        loaders: [
            {test:/\.js$/, loaders: ["react-hot", "babel?presets[]=es2015&presets[]=react"], exclude: /(node_modules|bower_components)/},
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css")},
            {test: /\.scss$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")},
            {test: /\.(jpg|png)$/, loaders: [
                "url?name=images/[hash:7]-[name].[ext]&limit=8192"
            ]}
        ]
    },
    resolve: {
        extensions :['', '.js', '.json']
    },
    plugins: [
//        new HtmlWebpackPlugin({
//            template: 'src/index.html',
//            filename: 'index.html',
//            inject: 'body'
//        }),
        new webpack.optimize.UglifyJsPlugin({	//压缩代码
            compress: {
                warnings: false
            },
            except: ['$super', '$', 'exports', 'require']	//排除关键字
        }),
        new webpack.HotModuleReplacementPlugin(),
        // 按需加载就不生成
        new ExtractTextPlugin("css/[name].css")
//        new webpack.optimize.CommonsChunkPlugin('js/common.js')
    ]
}