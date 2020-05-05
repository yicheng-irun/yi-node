
import path from 'path';
import webpackMerge from 'webpack-merge';
import webpack from 'webpack';
import VueSSRClientPlugin from 'vue-server-renderer/client-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { getSSRConfig, getChildPluginInstances } from './webpack-base-config';
import { BuildConfig } from '../build-config';


export default function getConfig (buildConfig: BuildConfig): webpack.Configuration {
    const config = webpackMerge(getSSRConfig('Client', buildConfig), {
        entry: {
            main: `${buildConfig.srcPath}/entry-client.js`,
        },
        output: {
            path: buildConfig.distPath,
            filename: 'assets/[name].js',
            publicPath: '/',
        },
        plugins: [
            new VueSSRClientPlugin({
                filename: path.relative(
                    buildConfig.distPath,
                    path.resolve(buildConfig.distBundlePath, './vue-ssr-client-manifest.json'),
                ),
            }),
            new HtmlWebpackPlugin({
                filename: 'template.html',
                template: `${buildConfig.srcPath}/template.html`,
                chunks: ['main'],

                // inject: false,
                minify: { collapseWhitespace: true, minifyJS: true },

                isProd: buildConfig.isProduction,
                isDev: !buildConfig.isProduction,
                isServer: false,
                isClient: true,
            }),
            ...getChildPluginInstances({}, buildConfig),
        ],
        watch: !buildConfig.isProduction,
    });

    config.optimization.splitChunks = {
        // chunks: 'all',  //async异步代码分割 initial同步代码分割 all同步异步分割都开启
        minSize: 30000, // 字节 引入的文件大于30kb才进行分割
        // maxSize: 100000,         //50kb，尝试将大于50kb的文件拆分成n个50kb的文件
        minChunks: 3, // 模块至少使用次数
        // maxAsyncRequests: 5,    //同时加载的模块数量最多是5个，只分割出同时引入的前5个文件
        maxInitialRequests: 3, // 首页加载的时候引入的文件最多3个
        // automaticNameDelimiter: '~', //缓存组和生成文件名称之间的连接符
        // name: false,                  //缓存组里面的filename生效，覆盖默认命名
        cacheGroups: { // 缓存组，将所有加载模块放在缓存里面一起分割打包
            vendors: { // 自定义打包模块
                test: /[\\/]node_modules[\\/]/,
                priority: 10, // 优先级，先打包到哪个组里面，值越大，优先级越高
                name: 'vendors',
            },
            comps: {
                test: /\/src\/client\/comp\//,
                priority: 6, // 优先级，先打包到哪个组里面，值越大，优先级越高
                name: 'comps',
            },
            pages: {
                test: /\/src\/client\/pages\//,
                priority: 5, // 优先级，先打包到哪个组里面，值越大，优先级越高
                name: 'pages',
            },
            default: { // 默认打包模块
                priority: 2,
                reuseExistingChunk: true, // 模块嵌套引入时，判断是否复用已经被打包的模块
                name: 'common',
            },
        },
    };

    return config;
}
