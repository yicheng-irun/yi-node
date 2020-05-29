"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_merge_1 = __importDefault(require("webpack-merge"));
const server_plugin_1 = __importDefault(require("vue-server-renderer/server-plugin"));
const html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
const webpack_base_config_1 = require("./webpack-base-config");
function getConfig(buildConfig) {
    const config = webpack_merge_1.default(webpack_base_config_1.getSSRConfig('Server', buildConfig), {
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
            new server_plugin_1.default({
                filename: 'vue-ssr-server-bundle.json',
            }),
            new html_webpack_plugin_1.default({
                filename: 'template.html',
                template: `${buildConfig.srcPath}/template.html`,
                minify: { collapseWhitespace: true, minifyJS: true },
                isProd: buildConfig.isProduction,
                isDev: !buildConfig.isProduction,
                isServer: true,
                isClient: false,
            }),
            ...webpack_base_config_1.getChildPluginInstances({
                isServer: true,
                isClient: false,
            }, buildConfig),
        ],
        target: 'node',
        watch: !buildConfig.isProduction,
    });
    return buildConfig.webpack.serverConfigProcess(config, buildConfig);
}
exports.default = getConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay1zc3Itc2VydmVyLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIiwic291cmNlcyI6WyJ3ZWJwYWNrL3dlYnBhY2stc3NyLXNlcnZlci1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrRUFBeUM7QUFFekMsc0ZBQW1FO0FBQ25FLDhFQUFvRDtBQUNwRCwrREFBOEU7QUFJOUUsU0FBd0IsU0FBUyxDQUFFLFdBQXdCO0lBQ3ZELE1BQU0sTUFBTSxHQUFHLHVCQUFZLENBQUMsa0NBQVksQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLEVBQUU7UUFDN0QsS0FBSyxFQUFFO1lBQ0gsSUFBSSxFQUFFLEdBQUcsV0FBVyxDQUFDLE9BQU8sa0JBQWtCO1NBQ2pEO1FBQ0QsTUFBTSxFQUFFO1lBQ0osSUFBSSxFQUFFLEdBQUcsV0FBVyxDQUFDLGNBQWMsR0FBRztZQUN0QyxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLGFBQWEsRUFBRSxXQUFXO1lBQzFCLFVBQVUsRUFBRSxHQUFHO1NBQ2xCO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsSUFBSSx1QkFBa0IsQ0FBQztnQkFDbkIsUUFBUSxFQUFFLDRCQUE0QjthQUN6QyxDQUFDO1lBQ0YsSUFBSSw2QkFBaUIsQ0FBQztnQkFDbEIsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLFFBQVEsRUFBRSxHQUFHLFdBQVcsQ0FBQyxPQUFPLGdCQUFnQjtnQkFDaEQsTUFBTSxFQUFFLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7Z0JBRXBELE1BQU0sRUFBRSxXQUFXLENBQUMsWUFBWTtnQkFDaEMsS0FBSyxFQUFFLENBQUMsV0FBVyxDQUFDLFlBQVk7Z0JBQ2hDLFFBQVEsRUFBRSxJQUFJO2dCQUNkLFFBQVEsRUFBRSxLQUFLO2FBQ2xCLENBQUM7WUFDRixHQUFHLDZDQUF1QixDQUFDO2dCQUN2QixRQUFRLEVBQUUsSUFBSTtnQkFDZCxRQUFRLEVBQUUsS0FBSzthQUNsQixFQUFFLFdBQVcsQ0FBQztTQUNsQjtRQUNELE1BQU0sRUFBRSxNQUFNO1FBQ2QsS0FBSyxFQUFFLENBQUMsV0FBVyxDQUFDLFlBQVk7S0FDbkMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxXQUFXLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQztBQUN4RSxDQUFDO0FBbkNELDRCQW1DQyJ9