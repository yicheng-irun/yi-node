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
function getSSRConfig(chunks, buildConfig) {
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
            new mini_css_extract_plugin_1.default({
                filename: '[name].css',
                chunkFilename: '[id].css',
            }),
        ],
    };
    return buildConfig.webpack.baseConfigProcess(config, buildConfig, chunks);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay1iYXNlLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIiwic291cmNlcyI6WyJ3ZWJwYWNrL3dlYnBhY2stYmFzZS1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxnREFBd0I7QUFDeEIsMkNBQTZDO0FBQzdDLHNEQUE4QjtBQUM5QixzRkFBMkQ7QUFDM0QsOEVBQW9EO0FBQ3BELGdFQUF3QztBQUN4QyxzREFBOEI7QUFJOUI7Ozs7R0FJRztBQUNILFNBQWdCLFlBQVksQ0FBRSxNQUFjLEVBQUUsV0FBd0I7SUFDbEUsTUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDLFlBQVksQ0FBQztJQUV4QyxNQUFNLGFBQWEsR0FBRyxHQUEyQixFQUFFLENBQUMsQ0FBQztRQUNqRCxNQUFNLEVBQUUsZ0JBQWdCO1FBQ3hCLE9BQU8sRUFBRTtZQUNMLE9BQU8sRUFBRTtnQkFDTCxzQkFBWTtnQkFDWixpQkFBTzthQUNWO1lBQ0QsU0FBUyxFQUFFLENBQUMsTUFBTTtTQUNyQjtLQUNKLENBQUMsQ0FBQztJQUVILE1BQU0sWUFBWSxHQUFHLEdBQTJCLEVBQUUsQ0FBQyxDQUFDO1FBQ2hELE1BQU0sRUFBRSxlQUFlO1FBQ3ZCLE9BQU8sRUFBRTtZQUNMLFNBQVMsRUFBRSxDQUFDLE1BQU07U0FDckI7S0FDSixDQUFDLENBQUM7SUFFSCxNQUFNLFNBQVMsR0FBRyxHQUEyQixFQUFFLENBQUMsQ0FBQztRQUM3Qyw0Q0FBNEM7UUFDNUMsTUFBTSxFQUFFLFlBQVk7UUFDcEIsT0FBTyxFQUFFO1lBQ0wsb0NBQW9DO1lBQ3BDLGFBQWEsRUFBRSxDQUFDO1lBQ2hCLFNBQVMsRUFBRSxDQUFDLE1BQU07U0FDckI7S0FDSixDQUFDLENBQUM7SUFFSCxNQUFNLGNBQWMsR0FBRyxHQUEyQixFQUFFLENBQUMsQ0FBQztRQUNsRCxNQUFNLEVBQUUsa0JBQWtCO1FBQzFCLE9BQU8sRUFBRTtZQUNMLFNBQVMsRUFBRSxDQUFDLE1BQU07U0FDckI7S0FD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