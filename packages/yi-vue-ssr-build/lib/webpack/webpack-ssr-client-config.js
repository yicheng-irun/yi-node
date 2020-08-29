"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const webpack_merge_1 = __importDefault(require("webpack-merge"));
const client_plugin_1 = __importDefault(require("vue-server-renderer/client-plugin"));
const html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
const webpack_base_config_1 = require("./webpack-base-config");
function getConfig(buildConfig) {
    const config = webpack_merge_1.default(webpack_base_config_1.getSSRConfig('Client', buildConfig), {
        entry: {
            main: `${buildConfig.srcPath}/entry-client.js`,
        },
        output: {
            path: buildConfig.distPath,
            filename: 'assets/[name].js',
            publicPath: '/',
        },
        plugins: [
            new client_plugin_1.default({
                filename: path_1.default.relative(buildConfig.distPath, path_1.default.resolve(buildConfig.distBundlePath, './vue-ssr-client-manifest.json')),
            }),
            new html_webpack_plugin_1.default({
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
            ...webpack_base_config_1.getChildPluginInstances({}, buildConfig),
        ],
        watch: !buildConfig.isProduction,
    });
    config.optimization.splitChunks = {
        // chunks: 'all',  //async异步代码分割 initial同步代码分割 all同步异步分割都开启
        minSize: 30000,
        // maxSize: 100000,         //50kb，尝试将大于50kb的文件拆分成n个50kb的文件
        minChunks: 3,
        // maxAsyncRequests: 5,    //同时加载的模块数量最多是5个，只分割出同时引入的前5个文件
        maxInitialRequests: 3,
        // automaticNameDelimiter: '~', //缓存组和生成文件名称之间的连接符
        // name: false,                  //缓存组里面的filename生效，覆盖默认命名
        cacheGroups: {
            vendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: 10,
                name: 'vendors',
            },
            comps: {
                test: /\/src\/client\/comp\//,
                priority: 6,
                name: 'comps',
            },
            pages: {
                test: /\/src\/client\/pages\//,
                priority: 5,
                name: 'pages',
            },
            default: {
                priority: 2,
                reuseExistingChunk: true,
                name: 'common',
            },
        },
    };
    return buildConfig.webpack.clientConfigProcess(config, buildConfig);
}
exports.default = getConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay1zc3ItY2xpZW50LWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIiwic291cmNlcyI6WyJ3ZWJwYWNrL3dlYnBhY2stc3NyLWNsaWVudC1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxnREFBd0I7QUFDeEIsa0VBQXlDO0FBRXpDLHNGQUFtRTtBQUNuRSw4RUFBb0Q7QUFDcEQsK0RBQThFO0FBSTlFLFNBQXdCLFNBQVMsQ0FBRSxXQUF3QjtJQUN4RCxNQUFNLE1BQU0sR0FBRyx1QkFBWSxDQUFDLGtDQUFZLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxFQUFFO1FBQzlELEtBQUssRUFBRTtZQUNKLElBQUksRUFBRSxHQUFHLFdBQVcsQ0FBQyxPQUFPLGtCQUFrQjtTQUNoRDtRQUNELE1BQU0sRUFBRTtZQUNMLElBQUksRUFBRSxXQUFXLENBQUMsUUFBUTtZQUMxQixRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLFVBQVUsRUFBRSxHQUFHO1NBQ2pCO1FBQ0QsT0FBTyxFQUFFO1lBQ04sSUFBSSx1QkFBa0IsQ0FBQztnQkFDcEIsUUFBUSxFQUFFLGNBQUksQ0FBQyxRQUFRLENBQ3BCLFdBQVcsQ0FBQyxRQUFRLEVBQ3BCLGNBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRSxnQ0FBZ0MsQ0FBQyxDQUM1RTthQUNILENBQUM7WUFDRixJQUFJLDZCQUFpQixDQUFDO2dCQUNuQixRQUFRLEVBQUUsZUFBZTtnQkFDekIsUUFBUSxFQUFFLEdBQUcsV0FBVyxDQUFDLE9BQU8sZ0JBQWdCO2dCQUNoRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUM7Z0JBRWhCLGlCQUFpQjtnQkFDakIsTUFBTSxFQUFFLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7Z0JBRXBELE1BQU0sRUFBRSxXQUFXLENBQUMsWUFBWTtnQkFDaEMsS0FBSyxFQUFFLENBQUMsV0FBVyxDQUFDLFlBQVk7Z0JBQ2hDLFFBQVEsRUFBRSxLQUFLO2dCQUNmLFFBQVEsRUFBRSxJQUFJO2FBQ2hCLENBQUM7WUFDRixHQUFHLDZDQUF1QixDQUFDLEVBQUUsRUFBRSxXQUFXLENBQUM7U0FDN0M7UUFDRCxLQUFLLEVBQUUsQ0FBQyxXQUFXLENBQUMsWUFBWTtLQUNsQyxDQUFDLENBQUM7SUFFSCxNQUFNLENBQUMsWUFBWSxDQUFDLFdBQVcsR0FBRztRQUMvQiwyREFBMkQ7UUFDM0QsT0FBTyxFQUFFLEtBQUs7UUFDZCwyREFBMkQ7UUFDM0QsU0FBUyxFQUFFLENBQUM7UUFDWiwwREFBMEQ7UUFDMUQsa0JBQWtCLEVBQUUsQ0FBQztRQUNyQixrREFBa0Q7UUFDbEQsMERBQTBEO1FBQzFELFdBQVcsRUFBRTtZQUNWLE9BQU8sRUFBRTtnQkFDTixJQUFJLEVBQUUsd0JBQXdCO2dCQUM5QixRQUFRLEVBQUUsRUFBRTtnQkFDWixJQUFJLEVBQUUsU0FBUzthQUNqQjtZQUNELEtBQUssRUFBRTtnQkFDSixJQUFJLEVBQUUsdUJBQXVCO2dCQUM3QixRQUFRLEVBQUUsQ0FBQztnQkFDWCxJQUFJLEVBQUUsT0FBTzthQUNmO1lBQ0QsS0FBSyxFQUFFO2dCQUNKLElBQUksRUFBRSx3QkFBd0I7Z0JBQzlCLFFBQVEsRUFBRSxDQUFDO2dCQUNYLElBQUksRUFBRSxPQUFPO2FBQ2Y7WUFDRCxPQUFPLEVBQUU7Z0JBQ04sUUFBUSxFQUFFLENBQUM7Z0JBQ1gsa0JBQWtCLEVBQUUsSUFBSTtnQkFDeEIsSUFBSSxFQUFFLFFBQVE7YUFDaEI7U0FDSDtLQUNILENBQUM7SUFFRixPQUFPLFdBQVcsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQ3ZFLENBQUM7QUFyRUQsNEJBcUVDIn0=