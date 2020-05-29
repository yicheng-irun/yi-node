import webpackMerge from 'webpack-merge';
import webpack from 'webpack';
import VueSSRServerPlugin from 'vue-server-renderer/server-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { getSSRConfig, getChildPluginInstances } from './webpack-base-config';
import { BuildConfig } from '../build-config';


export default function getConfig (buildConfig: BuildConfig): webpack.Configuration {
    const config = webpackMerge(getSSRConfig('Server', buildConfig), {
        entry: {
            main: `${buildConfig.srcPath}/entry-server.js`,
        },
        output: {
            path: `${buildConfig.distBundlePath}/`,
            filename: 'assets/[name].js',
            libraryTarget: 'commonjs2',
            publicPath: '/',
        },
        plugins: [
            new VueSSRServerPlugin({
                filename: 'vue-ssr-server-bundle.json',
            }),
            new HtmlWebpackPlugin({
                filename: 'template.html',
                template: `${buildConfig.srcPath}/template.html`,
                minify: { collapseWhitespace: true, minifyJS: true },

                isProd: buildConfig.isProduction,
                isDev: !buildConfig.isProduction,
                isServer: true,
                isClient: false,
            }),
            ...getChildPluginInstances({
                isServer: true,
                isClient: false,
            }, buildConfig),
        ],
        target: 'node',
        watch: !buildConfig.isProduction,
    });

    return buildConfig.webpack.serverConfigProcess(config, buildConfig);
}
