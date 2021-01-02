"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_merge_1 = __importDefault(require("webpack-merge"));
const server_plugin_1 = __importDefault(require("vue-server-renderer/server-plugin"));
const fs_1 = require("fs");
const webpack_base_config_1 = require("./webpack-base-config");
function getConfig(buildConfig) {
    let entry = `${buildConfig.srcPath}/entry-server.ts`;
    if (!fs_1.existsSync(entry)) {
        entry = `${buildConfig.srcPath}/entry-server.js`;
    }
    const config = webpack_merge_1.default(webpack_base_config_1.getSSRConfig('Server', buildConfig), {
        entry: {
            main: entry,
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
        ],
        target: 'node',
        watch: !buildConfig.isProduction,
    });
    return buildConfig.webpack.serverConfigProcess(config, buildConfig);
}
exports.default = getConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay1zc3Itc2VydmVyLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIiwic291cmNlcyI6WyJ3ZWJwYWNrL3dlYnBhY2stc3NyLXNlcnZlci1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrRUFBeUM7QUFFekMsc0ZBQW1FO0FBQ25FLDJCQUFnQztBQUNoQywrREFBcUQ7QUFJckQsU0FBd0IsU0FBUyxDQUFFLFdBQXdCO0lBQ3hELElBQUksS0FBSyxHQUFHLEdBQUcsV0FBVyxDQUFDLE9BQU8sa0JBQWtCLENBQUM7SUFDckQsSUFBSSxDQUFDLGVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNyQixLQUFLLEdBQUcsR0FBRyxXQUFXLENBQUMsT0FBTyxrQkFBa0IsQ0FBQztLQUNuRDtJQUNELE1BQU0sTUFBTSxHQUFHLHVCQUFZLENBQUMsa0NBQVksQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLEVBQUU7UUFDOUQsS0FBSyxFQUFFO1lBQ0osSUFBSSxFQUFFLEtBQUs7U0FDYjtRQUNELE1BQU0sRUFBRTtZQUNMLElBQUksRUFBRSxHQUFHLFdBQVcsQ0FBQyxjQUFjLEdBQUc7WUFDdEMsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixhQUFhLEVBQUUsV0FBVztZQUMxQixVQUFVLEVBQUUsR0FBRztTQUNqQjtRQUNELE9BQU8sRUFBRTtZQUNOLElBQUksdUJBQWtCLENBQUM7Z0JBQ3BCLFFBQVEsRUFBRSw0QkFBNEI7YUFDeEMsQ0FBQztTQWVKO1FBQ0QsTUFBTSxFQUFFLE1BQU07UUFDZCxLQUFLLEVBQUUsQ0FBQyxXQUFXLENBQUMsWUFBWTtLQUNsQyxDQUFDLENBQUM7SUFFSCxPQUFPLFdBQVcsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQ3ZFLENBQUM7QUF2Q0QsNEJBdUNDIn0=