/**
 * @author happyhaha
 * Created on 2016-09-07 08:50
 */
const path = require('path');
//加载Node的fs模块
const fs = require('fs');
//加载webpack模块
const webpack = require('webpack');

const srcDir = path.resolve(process.cwd(),'src');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
//设置需要排除单独打包的插件
const singleModule = ['react', 'react-dom', 'jquery', 'Raphael'];
//排除的页面入口js
const jsExtract = [];

const ip = () => {
    let interfaces = require('os').networkInterfaces();
    for (let devName in interfaces) {
        let iface = interfaces[devName];
        for (let i = 0; i < iface.length; i++) {
            let alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
};

var entry = () => {
    let jsDir = path.resolve(srcDir, 'dist/js');
    let names = fs.readdirSync(jsDir);
    let map = {};
    names.forEach((name) => {
        let m = name.match(/(.+)\.js$/);
        let entry = m ? m[1] : '';
        let entryPath = entry ? path.resolve(jsDir, name) : '';
        let entryArr = [];
        entryArr.push(entryPath);
        entryArr.push('eventsource-polyfill');
        entryArr.push('webpack-hot-middleware/client');
        jsExtract.push(name);
        if (entry) {
            jsExtract.push(name.substring(0, name.length - 3));
            map[entry] = entryArr;
        }
    });
    //自定义额外加载包,不会合并在页面对应js中
    map['lib'] = singleModule;
    return map;
};


//加载webpack目录参数配置
var config = {
    devtool: 'cheap-module-eval-source-map',
    entry: entry(),
    output: {
        path: path.join(process.cwd(), 'assets'),
        filename: 'dist/js/[name].js',
        publicPath: 'http://' + ip() + ':5000/'
    },
    plugins: [
        //排除css压缩加载在页面
        new ExtractTextPlugin('dist/css/[name].css'),
        //合并额外的js包
        new CommonsChunkPlugin('lib', './dist/js/lib.js', jsExtract),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery'
        })
    ],
    module: {
        //加载器配置
        loaders: [{
            test: /\.css$/,
            exclude: [path.resolve(process.cwd(), 'src/dist/css/common'),
                path.resolve(process.cwd(), 'node_modules/')],
            loaders: [
                'style-loader',
                'css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]&sourceMap&importLoaders=1',
                'postcss-loader?sourceMap=true'
            ]
        }, {
            test: /\.css$/,
            include: [path.resolve(process.cwd(), 'src/dist/css/common'),
                path.resolve(process.cwd(), 'node_modules/')],
            loaders: [
                'style-loader',
                'css-loader?sourceMap&importLoaders=1',
                'postcss-loader?sourceMap=true'
            ]
        }, {
            test: /\.js$/,
            loaders: ['react-hot', 'babel'],
            exclude: /node_modules/, // 匹配不希望处理文件的路径
            include: path.join(process.cwd(), 'src')
        }, {
            test: /\.(png|jpeg|jpg|gif)$/,
            loader: 'file?name=dist/img/[name].[ext]'
        }, {
            test: /\.(woff|eot|ttf)$/i,
            loader: 'url?limit=10000&name=dist/fonts/[name].[ext]'
        }, {
            test: /\.json$/,
            loader: 'file'
        },{
            test: /\.scss$/,
            loaders: ["style", "css", "sass"]
        }]
    },
    sassLoader: {
        includePaths: [path.resolve(process.cwd(), "src/dist/sass")]
    },
    postcss: function(webpack) {
        return {
            plugins: [
                require('postcss-import')({
                    addDependencyTo: webpack
                }),
                require('postcss-display-inline-block'),
                require('autoprefixer'),
                require('precss'),
                require('postcss-easysprites')({
                    imagePath: '../img',
                    spritePath: './assets/dist/img'
                })
            ]
        };
    }
};

let pages = fs.readdirSync(srcDir);
pages.filter(it => it.match(/(.+)\.html$/)).map(filename => {
    let conf = {
        template: path.resolve(srcDir, filename),
        inject: true, //允许插件修改哪些内容，包括head与body
        hash: true, //为静态资源生成hash值
        minify: { //压缩HTML文件
            removeComments: true, //移除HTML中的注释
            collapseWhitespace: false //删除空白符与换行符
        },
        filename: filename
    };

    let m = filename.match(/(.+)\.html$/);
    if (m[1] in config.entry) {
        conf.chunks = ['vendors', m[1]];
    }

    config.plugins.push(new HtmlWebpackPlugin(conf));
});

module.exports = config;