"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const vue_loader_1 = require("vue-loader");
const webpack_1 = __importDefault(require("webpack"));
const mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
const html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
const autoprefixer_1 = __importDefault(require("autoprefixer"));
const cssnano_1 = __importDefault(require("cssnano"));
/**
 * 获取基础webpack配置
 * @param chunks
 * @param buildConfig
 */
function getConfig(chunks, buildConfig) {
    const isProd = buildConfig.isProduction;
    const PostCSSLoader = () => ({
        loader: 'postcss-loader',
        options: {
            plugins: [
                autoprefixer_1.default,
                cssnano_1.default,
            ],
            sourceMap: !isProd,
        },
    });
    const StylusLoader = () => ({
        loader: 'stylus-loader',
        options: {
            sourceMap: !isProd,
        },
    });
    const CSSLoader = () => ({
        // pre render 时需要用css-loader/locals，SSR 时不需要
        loader: 'css-loader',
        options: {
            // css中的 @import 只需要通过postcss-loader
            importLoaders: 1,
            localIdentName: '[local]_[hash:base64:8]',
            sourceMap: !isProd,
        },
    });
    const VueStyleLoader = () => ({
        loader: 'vue-style-loader',
        options: {
            sourceMap: !isProd,
        },
    });
    function getBaseCssLoaders() {
        const baseCssLoader = [VueStyleLoader(), CSSLoader(), PostCSSLoader()];
        if (!isProd) {
            baseCssLoader.unshift('css-hot-loader');
        }
        return baseCssLoader;
    }
    const config = {
        mode: isProd ? 'production' : 'development',
        devtool: isProd ? false : 'cheap-module-eval-source-map',
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                '@': buildConfig.srcPath,
            },
        },
        externals: {},
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
                    loader: path_1.default.resolve(__dirname, './loaders/condition-comment-loader'),
                    options: {
                        isProd,
                    },
                    exclude: /node_modules/,
                },
                {
                    test: /\.html$/,
                    loader: 'twig-loader',
                    options: {},
                },
                {
                    test: /\.js$/,
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
            new vue_loader_1.VueLoaderPlugin(),
            new webpack_1.default.ProgressPlugin((percentage) => {
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
function getSSRConfig(chunks, buildConfig) {
    const config = getConfig(chunks, buildConfig);
    // 使页面的顶部有vue ssr预渲染的style标签
    config.plugins.push(new mini_css_extract_plugin_1.default({
        filename: '[name].css',
        chunkFilename: '[id].css',
    }));
    return config;
}
exports.getSSRConfig = getSSRConfig;
function getChildPluginInstances(options = {}, buildConfig) {
    const plugins = [];
    const templatesChunks = buildConfig.getAllPageTemplates();
    templatesChunks.forEach((chunk) => {
        plugins.push(new html_webpack_plugin_1.default(Object.assign({ filename: `templates/${chunk}.html`, template: `${buildConfig.srcPath}/pages/${chunk}/template.html`, 
            // chunks: ['main'],
            // inject: false,
            minify: { collapseWhitespace: true, minifyJS: true }, page: chunk, isProd: buildConfig.isProduction, isDev: !buildConfig.isProduction, isServer: false, isClient: true }, options)));
    });
    return plugins;
}
exports.getChildPluginInstances = getChildPluginInstances;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay1iYXNlLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIiwic291cmNlcyI6WyJ3ZWJwYWNrL3dlYnBhY2stYmFzZS1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxnREFBd0I7QUFDeEIsMkNBQTZDO0FBQzdDLHNEQUE4QjtBQUM5QixzRkFBMkQ7QUFDM0QsOEVBQW9EO0FBQ3BELGdFQUF3QztBQUN4QyxzREFBOEI7QUFLOUI7Ozs7R0FJRztBQUNILFNBQVMsU0FBUyxDQUFFLE1BQWMsRUFBRSxXQUF3QjtJQUN4RCxNQUFNLE1BQU0sR0FBRyxXQUFXLENBQUMsWUFBWSxDQUFDO0lBRXhDLE1BQU0sYUFBYSxHQUFHLEdBQTJCLEVBQUUsQ0FBQyxDQUFDO1FBQ2pELE1BQU0sRUFBRSxnQkFBZ0I7UUFDeEIsT0FBTyxFQUFFO1lBQ0wsT0FBTyxFQUFFO2dCQUNMLHNCQUFZO2dCQUNaLGlCQUFPO2FBQ1Y7WUFDRCxTQUFTLEVBQUUsQ0FBQyxNQUFNO1NBQ3JCO0tBQ0osQ0FBQyxDQUFDO0lBRUgsTUFBTSxZQUFZLEdBQUcsR0FBMkIsRUFBRSxDQUFDLENBQUM7UUFDaEQsTUFBTSxFQUFFLGVBQWU7UUFDdkIsT0FBTyxFQUFFO1lBQ0wsU0FBUyxFQUFFLENBQUMsTUFBTTtTQUNyQjtLQUNKLENBQUMsQ0FBQztJQUVILE1BQU0sU0FBUyxHQUFHLEdBQTJCLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLDRDQUE0QztRQUM1QyxNQUFNLEVBQUUsWUFBWTtRQUNwQixPQUFPLEVBQUU7WUFDTCxvQ0FBb0M7WUFDcEMsYUFBYSxFQUFFLENBQUM7WUFDaEIsY0FBYyxFQUFFLHlCQUF5QjtZQUN6QyxTQUFTLEVBQUUsQ0FBQyxNQUFNO1NBQ3JCO0tBQ0osQ0FBQyxDQUFDO0lBRUgsTUFBTSxjQUFjLEdBQUcsR0FBMkIsRUFBRSxDQUFDLENBQUM7UUFDbEQsTUFBTSxFQUFFLGtCQUFrQjtRQUMxQixPQUFPLEVBQUU7WUFDTCxTQUFTLEVB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