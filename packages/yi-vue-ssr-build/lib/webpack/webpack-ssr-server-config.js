"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_merge_1 = __importDefault(require("webpack-merge"));
const server_plugin_1 = __importDefault(require("vue-server-renderer/server-plugin"));
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
        ],
        target: 'node',
        watch: !buildConfig.isProduction,
    });
    return buildConfig.webpack.serverConfigProcess(config, buildConfig);
}
exports.default = getConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay1zc3Itc2VydmVyLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIiwic291cmNlcyI6WyJ3ZWJwYWNrL3dlYnBhY2stc3NyLXNlcnZlci1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrRUFBeUM7QUFFekMsc0ZBQW1FO0FBRW5FLCtEQUE4RTtBQUk5RSxTQUF3QixTQUFTLENBQUUsV0FBd0I7SUFDeEQsTUFBTSxNQUFNLEdBQUcsdUJBQVksQ0FBQyxrQ0FBWSxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsRUFBRTtRQUM5RCxLQUFLLEVBQUU7WUFDSixJQUFJLEVBQUUsR0FBRyxXQUFXLENBQUMsT0FBTyxrQkFBa0I7U0FDaEQ7UUFDRCxNQUFNLEVBQUU7WUFDTCxJQUFJLEVBQUUsR0FBRyxXQUFXLENBQUMsY0FBYyxHQUFHO1lBQ3RDLFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsYUFBYSxFQUFFLFdBQVc7WUFDMUIsVUFBVSxFQUFFLEdBQUc7U0FDakI7UUFDRCxPQUFPLEVBQUU7WUFDTixJQUFJLHVCQUFrQixDQUFDO2dCQUNwQixRQUFRLEVBQUUsNEJBQTRCO2FBQ3hDLENBQUM7U0FlSjtRQUNELE1BQU0sRUFBRSxNQUFNO1FBQ2QsS0FBSyxFQUFFLENBQUMsV0FBVyxDQUFDLFlBQVk7S0FDbEMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxXQUFXLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQztBQUN2RSxDQUFDO0FBbkNELDRCQW1DQyJ9