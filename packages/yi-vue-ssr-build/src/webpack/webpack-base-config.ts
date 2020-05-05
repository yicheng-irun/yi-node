
import path from 'path';
import { VueLoaderPlugin } from 'vue-loader';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import { BuildConfig } from '../build-config';


/**
 * 获取基础webpack配置
 * @param chunks
 * @param buildConfig
 */
function getConfig (chunks: string, buildConfig: BuildConfig): webpack.Configuration {
    const isProd = buildConfig.isProduction;

    const PostCSSLoader = (): webpack.RuleSetUseItem => ({
        loader: 'postcss-loader',
        options: {
            plugins: [
                autoprefixer,
                cssnano,
            ],
            sourceMap: !isProd,
        },
    });

    const StylusLoader = (): webpack.RuleSetUseItem => ({
        loader: 'stylus-loader',
        options: {
            sourceMap: !isProd,
        },
    });

    const CSSLoader = (): webpack.RuleSetUseItem => ({
        // pre render 时需要用css-loader/locals，SSR 时不需要
        loader: 'css-loader',
        options: {
            // css中的 @import 只需要通过postcss-loader
            importLoaders: 1,
            localIdentName: '[local]_[hash:base64:8]',
            sourceMap: !isProd,
        },
    });

    const VueStyleLoader = (): webpack.RuleSetUseItem => ({
        loader: 'vue-style-loader',
        options: {
            sourceMap: !isProd,
        },
    });

    function getBaseCssLoaders (): webpack.RuleSetUseItem[] {
        const baseCssLoader: webpack.RuleSetUseItem[] = [VueStyleLoader(), CSSLoader(), PostCSSLoader()];
        if (!isProd) {
            baseCssLoader.unshift('css-hot-loader');
        }
        return baseCssLoader;
    }

    const config: webpack.Configuration = {
        mode: isProd ? 'production' : 'development',
        devtool: isProd ? false : 'cheap-module-eval-source-map', // nosources-source-map
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                '@': buildConfig.srcPath,
            },
        },
        externals: {
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        compilerOptions: {
                            preserveWhitespace: false,
                        },
                    },
                },
                {
                    test: /\.(js|vue)$/,
                    loader: path.resolve(__dirname, './loaders/condition-comment-loader.ts'),
                    options: {
                        isProd,
                    },
                    exclude: /node_modules/,
                },
                {
                    test: /\.html$/,
                    loader: 'twig-loader',
                    options: {
                    },
                },
                {
                    test: /\.js$/,
                    // use: ['cache-loader', 'babel-loader'],
                    use: 'babel-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    use: getBaseCssLoaders().concat([]),
                },
                {
                    test: /\.(stylus|styl)$/,
                    use: getBaseCssLoaders().concat([StylusLoader()]),
                },
                {
                    test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                    exclude: /favicon\.png$/,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'assets/img/[name].[hash:7].[ext]',
                        },
                    }],
                },
            ],
        },
        optimization: {
            splitChunks: {
                chunks: 'async',
                name: 'vendor',
            },
        },
        plugins: [
            new VueLoaderPlugin(),
            new webpack.ProgressPlugin((percentage) => {
            // console.info(percentage, message, ...args);
            // const percent = Math.floor(percentage * 1000) / 10;
            // console.info(`${chunks} ${percent}% ${message}`);
                if (percentage === 1) {
                    console.info(`${chunks} 构建就绪`);
                }
            }),
        ],
    };

    return config;
}


export function getSSRConfig (chunks: string, buildConfig: BuildConfig): webpack.Configuration {
    const config = getConfig(chunks, buildConfig);

    // 使页面的顶部有vue ssr预渲染的style标签
    config.plugins.push(new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
    }));

    return config;
}


export function getChildPluginInstances (options = {}, buildConfig: BuildConfig): HtmlWebpackPlugin[] {
    const plugins: HtmlWebpackPlugin[] = [];
    const templatesChunks = buildConfig.getAllPageTemplates();
    templatesChunks.forEach((chunk) => {
        plugins.push(new HtmlWebpackPlugin({
            filename: `templates/${chunk}.html`,
            template: `${buildConfig.srcPath}/pages/${chunk}/template.html`,
            // chunks: ['main'],

            // inject: false,
            minify: { collapseWhitespace: true, minifyJS: true },

            page: chunk,
            isProd: buildConfig.isProduction,
            isDev: !buildConfig.isProduction,
            isServer: false,
            isClient: true,
            ...options,
        }));
    });
    return plugins;
}
