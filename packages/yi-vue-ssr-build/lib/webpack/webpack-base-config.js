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
    const LessLoader = () => ({
        loader: 'less-loader',
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
            extensions: ['.js', '.vue', '.json', '.ts', '.tsx'],
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
                    test: /\.(js|ts|vue)$/,
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
                    test: /\.(ts|js)(x?)$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                        },
                        {
                            options: {
                                transpileOnly: true,
                                appendTsSuffixTo: ['\\.vue$'],
                                happyPackMode: false,
                            },
                            loader: 'ts-loader',
                        },
                    ],
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
                    test: /\.less$/,
                    use: getBaseCssLoaders().concat([LessLoader()]),
                },
                {
                    test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                    exclude: /favicon\.png$/,
                    use: [{
                            loader: 'url-loader',
                            options: {
                                limit: 10000,
                                name: 'assets/img/[name].[hash:7].[ext]',
                                esModule: false,
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
        plugins.push(new html_webpack_plugin_1.default(Object.assign({ 
            // filename: `templates/${chunk}.html`,
            filename: path_1.default.relative(buildConfig.distPath, path_1.default.resolve(buildConfig.distBundlePath, `templates/${chunk}.html`)), template: `${buildConfig.srcPath}/pages/${chunk}/template.html`, 
            // chunks: ['main'],
            // inject: false,
            minify: { collapseWhitespace: true, minifyJS: true }, page: chunk, isProd: buildConfig.isProduction, isDev: !buildConfig.isProduction, isServer: false, isClient: true }, options)));
    });
    return plugins;
}
exports.getChildPluginInstances = getChildPluginInstances;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay1iYXNlLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIiwic291cmNlcyI6WyJ3ZWJwYWNrL3dlYnBhY2stYmFzZS1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxnREFBd0I7QUFDeEIsMkNBQTZDO0FBQzdDLHNEQUE4QjtBQUM5QixzRkFBMkQ7QUFDM0QsOEVBQW9EO0FBQ3BELGdFQUF3QztBQUN4QyxzREFBOEI7QUFJOUI7Ozs7R0FJRztBQUNILFNBQWdCLFlBQVksQ0FBRSxNQUFjLEVBQUUsV0FBd0I7SUFDbkUsTUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDLFlBQVksQ0FBQztJQUV4QyxNQUFNLGFBQWEsR0FBRyxHQUEyQixFQUFFLENBQUMsQ0FBQztRQUNsRCxNQUFNLEVBQUUsZ0JBQWdCO1FBQ3hCLE9BQU8sRUFBRTtZQUNOLE9BQU8sRUFBRTtnQkFDTixzQkFBWTtnQkFDWixpQkFBTzthQUNUO1lBQ0QsU0FBUyxFQUFFLENBQUMsTUFBTTtTQUNwQjtLQUNILENBQUMsQ0FBQztJQUVILE1BQU0sWUFBWSxHQUFHLEdBQTJCLEVBQUUsQ0FBQyxDQUFDO1FBQ2pELE1BQU0sRUFBRSxlQUFlO1FBQ3ZCLE9BQU8sRUFBRTtZQUNOLFNBQVMsRUFBRSxDQUFDLE1BQU07U0FDcEI7S0FDSCxDQUFDLENBQUM7SUFFSCxNQUFNLFVBQVUsR0FBRyxHQUEyQixFQUFFLENBQUMsQ0FBQztRQUMvQyxNQUFNLEVBQUUsYUFBYTtRQUNyQixPQUFPLEVBQUU7WUFDTixTQUFTLEVBQUUsQ0FBQyxNQUFNO1NBQ3BCO0tBQ0gsQ0FBQyxDQUFDO0lBRUgsTUFBTSxTQUFTLEdBQUcsR0FBMkIsRUFBRSxDQUFDLENBQUM7UUFDOUMsNENBQTRDO1FBQzVDLE1BQU0sRUFBRSxZQUFZO1FBQ3BCLE9BQU8sRUFBRTtZQUNOLG9DQUFvQztZQUNwQyxhQUFhLEVBQUUsQ0FBQztZQUNoQixTQUFTLEVBQUUsQ0FBQyxNQUFNO1NBQ3BCO0tBQ0gs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