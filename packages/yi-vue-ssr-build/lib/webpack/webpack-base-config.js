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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay1iYXNlLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIiwic291cmNlcyI6WyJ3ZWJwYWNrL3dlYnBhY2stYmFzZS1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxnREFBd0I7QUFDeEIsMkNBQTZDO0FBQzdDLHNEQUE4QjtBQUM5QixzRkFBMkQ7QUFDM0QsOEVBQW9EO0FBQ3BELGdFQUF3QztBQUN4QyxzREFBOEI7QUFJOUI7Ozs7R0FJRztBQUNILFNBQVMsU0FBUyxDQUFFLE1BQWMsRUFBRSxXQUF3QjtJQUN4RCxNQUFNLE1BQU0sR0FBRyxXQUFXLENBQUMsWUFBWSxDQUFDO0lBRXhDLE1BQU0sYUFBYSxHQUFHLEdBQTJCLEVBQUUsQ0FBQyxDQUFDO1FBQ2pELE1BQU0sRUFBRSxnQkFBZ0I7UUFDeEIsT0FBTyxFQUFFO1lBQ0wsT0FBTyxFQUFFO2dCQUNMLHNCQUFZO2dCQUNaLGlCQUFPO2FBQ1Y7WUFDRCxTQUFTLEVBQUUsQ0FBQyxNQUFNO1NBQ3JCO0tBQ0osQ0FBQyxDQUFDO0lBRUgsTUFBTSxZQUFZLEdBQUcsR0FBMkIsRUFBRSxDQUFDLENBQUM7UUFDaEQsTUFBTSxFQUFFLGVBQWU7UUFDdkIsT0FBTyxFQUFFO1lBQ0wsU0FBUyxFQUFFLENBQUMsTUFBTTtTQUNyQjtLQUNKLENBQUMsQ0FBQztJQUVILE1BQU0sU0FBUyxHQUFHLEdBQTJCLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLDRDQUE0QztRQUM1QyxNQUFNLEVBQUUsWUFBWTtRQUNwQixPQUFPLEVBQUU7WUFDTCxvQ0FBb0M7WUFDcEMsYUFBYSxFQUFFLENBQUM7WUFDaEIsU0FBUyxFQUFFLENBQUMsTUFBTTtTQUNyQjtLQUNKLENBQUMsQ0FBQztJQUVILE1BQU0sY0FBYyxHQUFHLEdBQTJCLEVBQUUsQ0FBQyxDQUFDO1FBQ2xELE1BQU0sRUFBRSxrQkFBa0I7UUFDMUIsT0FBTyxFQUFFO1lBQ0wsU0FBUyxFQUFFLENBQUMsTUFBTTtTQUNyQjtLQUNK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