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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay1iYXNlLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIiwic291cmNlcyI6WyJ3ZWJwYWNrL3dlYnBhY2stYmFzZS1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxnREFBd0I7QUFDeEIsMkNBQTZDO0FBQzdDLHNEQUE4QjtBQUM5QixzRkFBMkQ7QUFDM0QsOEVBQW9EO0FBQ3BELGdFQUF3QztBQUN4QyxzREFBOEI7QUFJOUI7Ozs7R0FJRztBQUNILFNBQWdCLFlBQVksQ0FBRSxNQUFjLEVBQUUsV0FBd0I7SUFDbkUsTUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDLFlBQVksQ0FBQztJQUV4QyxNQUFNLGFBQWEsR0FBRyxHQUEyQixFQUFFLENBQUMsQ0FBQztRQUNsRCxNQUFNLEVBQUUsZ0JBQWdCO1FBQ3hCLE9BQU8sRUFBRTtZQUNOLE9BQU8sRUFBRTtnQkFDTixzQkFBWTtnQkFDWixpQkFBTzthQUNUO1lBQ0QsU0FBUyxFQUFFLENBQUMsTUFBTTtTQUNwQjtLQUNILENBQUMsQ0FBQztJQUVILE1BQU0sWUFBWSxHQUFHLEdBQTJCLEVBQUUsQ0FBQyxDQUFDO1FBQ2pELE1BQU0sRUFBRSxlQUFlO1FBQ3ZCLE9BQU8sRUFBRTtZQUNOLFNBQVMsRUFBRSxDQUFDLE1BQU07U0FDcEI7S0FDSCxDQUFDLENBQUM7SUFFSCxNQUFNLFVBQVUsR0FBRyxHQUEyQixFQUFFLENBQUMsQ0FBQztRQUMvQyxNQUFNLEVBQUUsYUFBYTtRQUNyQixPQUFPLEVBQUU7WUFDTixTQUFTLEVBQUUsQ0FBQyxNQUFNO1NBQ3BCO0tBQ0gsQ0FBQyxDQUFDO0lBRUgsTUFBTSxTQUFTLEdBQUcsR0FBMkIsRUFBRSxDQUFDLENBQUM7UUFDOUMsNENBQTRDO1FBQzVDLE1BQU0sRUFBRSxZQUFZO1FBQ3BCLE9BQU8sRUFBRTtZQUNOLG9DQUFvQztZQUNwQyxhQUFhLEVBQUUsQ0FBQztZQUNoQixTQUFTLEVBQUUsQ0FBQyxNQUFNO1NBQ3BCO0tBQ0gsQ0FBQyxDQUFDO0lBRUgsTUFBTSxjQUFjLEdBQUcsR0FBMkIsRUFBRSxDQUFDLENBQUM7UUFDbkQsTUFBTSxFQUFFLGtCQUFrQjtRQUMxQixPQUFPLEVBQUU7WUFDTixTQUFTLEVBQUUsQ0FBQyxNQUFNO1NBQ3BCO0tBQ0gsQ0FBQyxDQUFDO0lBRUgsU0FBUyxpQkFBaUI7UUFDdkIsTUFBTSxhQUFhLEdBQTZCLENBQUMsY0FBYyxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQztRQUNqRyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1YsYUFBYSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1NBQzFDO1FBQ0QsT0FBTyxhQUFhLENBQUM7SUFDeEIsQ0FBQztJQUVELE1BQU0sTUFBTSxHQUEwQjtRQUNuQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLGFBQWE7UUFDM0MsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyw4QkFBOEI7UUFDeEQsT0FBTyxFQUFFO1lBQ04sVUFBVSxFQUFFLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUM7WUFDcEMsS0FBSyxFQUFFO2dCQUNKLEdBQUcsRUFBRSxXQUFXLENBQUMsT0FBTzthQUMxQjtTQUNIO1FBQ0QsU0FBUyxFQUFFLEVBQ1Y7UUFDRCxNQUFNLEVBQUU7WUFDTCxLQUFLLEVBQUU7Z0JBQ0o7b0JBQ0csSUFBSSxFQUFFLFFBQVE7b0JBQ2QsTUFBTSxFQUFFLFlBQVk7b0JBQ3BCLE9BQU8sRUFBRTt3QkFDTixlQUFlLEVBQUU7NEJBQ2Qsa0JBQWtCLEVBQUUsS0FBSzt5QkFDM0I7cUJBQ0g7aUJBQ0g7Z0JBQ0Q7b0JBQ0csSUFBSSxFQUFFLGFBQWE7b0JBQ25CLE1BQU0sRUFBRSxjQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxvQ0FBb0MsQ0FBQztvQkFDckUsT0FBTyxFQUFFO3dCQUNOLE1BQU07cUJBQ1I7b0JBQ0QsT0FBTyxFQUFFLGNBQWM7aUJBQ3pCO2dCQUNEO29CQUNHLElBQUksRUFBRSxTQUFTO29CQUNmLE1BQU0sRUFBRSxhQUFhO29CQUNyQixPQUFPLEVBQUUsRUFDUjtpQkFDSDtnQkFDRDtvQkFDRyxJQUFJLEVBQUUsT0FBTztvQkFDYixHQUFHLEVBQUUsY0FBYztvQkFDbkIsT0FBTyxFQUFFLGNBQWM7aUJBQ3pCO2dCQUNEO29CQUNHLElBQUksRUFBRSxRQUFRO29CQUNkLEdBQUcsRUFBRSxpQkFBaUIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7aUJBQ3JDO2dCQUNEO29CQUNHLElBQUksRUFBRSxrQkFBa0I7b0JBQ3hCLEdBQUcsRUFBRSxpQkFBaUIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7aUJBQ25EO2dCQUNEO29CQUNHLElBQUksRUFBRSxTQUFTO29CQUNmLEdBQUcsRUFBRSxpQkFBaUIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7aUJBQ2pEO2dCQUNEO29CQUNHLElBQUksRUFBRSwwREFBMEQ7b0JBQ2hFLE9BQU8sRUFBRSxlQUFlO29CQUN4QixHQUFHLEVBQUUsQ0FBQzs0QkFDSCxNQUFNLEVBQUUsWUFBWTs0QkFDcEIsT0FBTyxFQUFFO2dDQUNOLEtBQUssRUFBRSxLQUFLO2dDQUNaLElBQUksRUFBRSxrQ0FBa0M7Z0NBQ3hDLFFBQVEsRUFBRSxLQUFLOzZCQUNqQjt5QkFDSCxDQUFDO2lCQUNKO2FBQ0g7U0FDSDtRQUNELFlBQVksRUFBRTtZQUNYLFdBQVcsRUFBRTtnQkFDVixNQUFNLEVBQUUsT0FBTztnQkFDZixJQUFJLEVBQUUsUUFBUTthQUNoQjtTQUNIO1FBQ0QsT0FBTyxFQUFFO1lBQ04sSUFBSSw0QkFBZSxFQUFFO1lBQ3JCLElBQUksaUJBQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRTtnQkFDdkMsOENBQThDO2dCQUM5QyxzREFBc0Q7Z0JBQ3RELG9EQUFvRDtnQkFDcEQsSUFBSSxVQUFVLEtBQUssQ0FBQyxFQUFFO29CQUNuQixPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxPQUFPLENBQUMsQ0FBQztpQkFDakM7WUFDSixDQUFDLENBQUM7WUFDRixJQUFJLGlDQUFvQixDQUFDO2dCQUN0QixRQUFRLEVBQUUsWUFBWTtnQkFDdEIsYUFBYSxFQUFFLFVBQVU7YUFDM0IsQ0FBQztTQUNKO0tBQ0gsQ0FBQztJQUVGLE9BQU8sV0FBVyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQzdFLENBQUM7QUFoSkQsb0NBZ0pDO0FBR0QsU0FBZ0IsdUJBQXVCLENBQUUsT0FBTyxHQUFHLEVBQUUsRUFBRSxXQUF3QjtJQUM1RSxNQUFNLE9BQU8sR0FBd0IsRUFBRSxDQUFDO0lBQ3hDLE1BQU0sZUFBZSxHQUFHLFdBQVcsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQzFELGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUMvQixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksNkJBQWlCO1lBQy9CLHVDQUF1QztZQUN2QyxRQUFRLEVBQUUsY0FBSSxDQUFDLFFBQVEsQ0FDcEIsV0FBVyxDQUFDLFFBQVEsRUFDcEIsY0FBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLGFBQWEsS0FBSyxPQUFPLENBQUMsQ0FDckUsRUFDRCxRQUFRLEVBQUUsR0FBRyxXQUFXLENBQUMsT0FBTyxVQUFVLEtBQUssZ0JBQWdCO1lBQy9ELG9CQUFvQjtZQUVwQixpQkFBaUI7WUFDakIsTUFBTSxFQUFFLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFFcEQsSUFBSSxFQUFFLEtBQUssRUFDWCxNQUFNLEVBQUUsV0FBVyxDQUFDLFlBQVksRUFDaEMsS0FBSyxFQUFFLENBQUMsV0FBVyxDQUFDLFlBQVksRUFDaEMsUUFBUSxFQUFFLEtBQUssRUFDZixRQUFRLEVBQUUsSUFBSSxJQUNYLE9BQU8sRUFDWCxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sT0FBTyxDQUFDO0FBQ2xCLENBQUM7QUF6QkQsMERBeUJDIn0=