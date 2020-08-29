"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const glob_1 = __importDefault(require("glob"));
const projectRootPath = process.cwd();
const defaultConfigJSCode = `// 感谢使用yi-vue-ssr-build工具
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const projectPath = process.cwd();
module.exports = {
    projectPath,

    /**
     * 默认情况下是 src/client
     */
    srcPath: path.resolve(projectPath, './src/client'),

    /**
     * 默认情况下是 dist/client
     */
    distPath: path.resolve(projectPath, './dist/client'),

    /**
     * 默认情况下是 dist/server-bundle
     * 路径最终需要传给yi-vue-ssr-middleware库来使用
     */
    distBundlePath: path.resolve(projectPath, './dist/server-bundle'),

    /**
     * 开发时，请访问devServerPort
     */
    devServerPort: Number.parseInt(process.env.DEV_SERVER_PORT || '20000', 10),

    /**
     * node server 在开发模式下监听的端口，用于webpack devServer 的proxy
     */
    devNodeServerPort: Number.parseInt(process.env.HTTP_PORT || '80', 10),

    webpack: {
        /**
         * baseConfig 是生成clientContig和serverConfig的基础配置，有些配置项改这个是一箭双雕
         * @param configuration webpack.Configuration
         * @param buildConfig BuildConfig
         * @param chunks client|server
         */
        baseConfigProcess (configuration, buildConfig, chunks) {
            return configuration;
        },

        /**
         * clientConfig 基于baseConfig生成的clientConfig，用于给客户端使用的
         * @param configuration webpack.Configuration
         * @param buildConfig BuildConfig
         */
        clientConfigProcess (configuration, buildConfig) {
            return configuration;
        },

        /**
         * serverConfig 基于baseConfig生成的serverConfig，用于给服务端使用的
         * @param configuration webpack.Configuration
         * @param buildConfig BuildConfig
         */
        serverConfigProcess (configuration, buildConfig) {
            return configuration;
        },
    },
};
`;
async function getUserBuildConfig(ssrBuildConfigFile) {
    const configFile = path_1.default.resolve(projectRootPath, ssrBuildConfigFile);
    // 不存在则创建配置文件
    if (!fs_1.default.existsSync(configFile)) {
        fs_1.default.writeFileSync(configFile, defaultConfigJSCode);
    }
    const config = await Promise.resolve().then(() => __importStar(require(configFile)));
    return config;
}
/**
 * 获取构建配置
 * @param param0
 */
async function createBuildConfig({ isProduction = false, ssrBuildConfigFile, }) {
    var _a, _b, _c;
    const userConfig = await getUserBuildConfig(ssrBuildConfigFile);
    const projectPath = userConfig.projectPath || projectRootPath;
    const config = {
        isProduction,
        projectPath,
        /**
           * 默认情况下是 src/client
           */
        srcPath: userConfig.srcPath || path_1.default.resolve(projectPath, './src/client'),
        /**
           * 默认情况下是 dist/client
           */
        distPath: userConfig.distPath || path_1.default.resolve(projectPath, './dist/client'),
        /**
           * 默认情况下是 dist/server-bundle
           */
        distBundlePath: userConfig.distBundlePath || path_1.default.resolve(projectPath, './dist/server-bundle'),
        /**
           * 开发时，请访问devServerPort
           */
        devServerPort: userConfig.devServerPort || Number.parseInt(process.env.DEV_SERVER_PORT || '20000', 10),
        /**
           * node server 在开发模式下监听的端口，用于webpack devServer 的proxy
           */
        devNodeServerPort: userConfig.devNodeServerPort || Number.parseInt(process.env.HTTP_PORT || '80', 10),
        /**
           * 获取所有页面的templates
           */
        getAllPageTemplates() {
            const pages = glob_1.default.sync(`${config.srcPath}/pages/**/template.html`).map((page) => page.replace(/^.*src\/client\/pages\/(.*)\/template.html$/, '$1'));
            return pages;
        },
        webpack: {
            /**
                * baseConfig 是生成clientContig和serverConfig的基础配置，有些配置项改这个是一箭双雕
                * @param configuration webpack.Configuration
                * @param buildConfig BuildConfig
                * @param chunks client|server
                */
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/no-unused-vars
            baseConfigProcess: ((_a = userConfig.webpack) === null || _a === void 0 ? void 0 : _a.baseConfigProcess) || function _(configuration, buildConfig, chunks) {
                return configuration;
            },
            /**
                * clientConfig 基于baseConfig生成的clientConfig，用于给客户端使用的
                * @param configuration webpack.Configuration
                * @param buildConfig BuildConfig
                */
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/no-unused-vars
            clientConfigProcess: ((_b = userConfig.webpack) === null || _b === void 0 ? void 0 : _b.clientConfigProcess) || function _(configuration, buildConfig) {
                return configuration;
            },
            /**
                * serverConfig 基于baseConfig生成的serverConfig，用于给服务端使用的
                * @param configuration webpack.Configuration
                * @param buildConfig BuildConfig
                */
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/no-unused-vars
            serverConfigProcess: ((_c = userConfig.webpack) === null || _c === void 0 ? void 0 : _c.serverConfigProcess) || function _(configuration, buildConfig) {
                return configuration;
            },
        },
    };
    return config;
}
exports.default = createBuildConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQtY29uZmlnLmpzIiwic291cmNlUm9vdCI6InNyYy8iLCJzb3VyY2VzIjpbImJ1aWxkLWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxnREFBd0I7QUFDeEIsNENBQW9CO0FBQ3BCLGdEQUF3QjtBQW9EeEIsTUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBRXRDLE1BQU0sbUJBQW1CLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FnRTNCLENBQUM7QUFHRixLQUFLLFVBQVUsa0JBQWtCLENBQUUsa0JBQTBCO0lBQzFELE1BQU0sVUFBVSxHQUFHLGNBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLGtCQUFrQixDQUFDLENBQUM7SUFFckUsYUFBYTtJQUNiLElBQUksQ0FBQyxZQUFFLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQzdCLFlBQUUsQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLG1CQUFtQixDQUFDLENBQUM7S0FDcEQ7SUFFRCxNQUFNLE1BQU0sR0FBZSx3REFBYSxVQUFVLEdBQUMsQ0FBQztJQUNwRCxPQUFPLE1BQU0sQ0FBQztBQUNqQixDQUFDO0FBRUQ7OztHQUdHO0FBQ1ksS0FBSyxVQUFVLGlCQUFpQixDQUFFLEVBQzlDLFlBQVksR0FBRyxLQUFLLEVBQ3BCLGtCQUFrQixHQUlwQjs7SUFDRSxNQUFNLFVBQVUsR0FBRyxNQUFNLGtCQUFrQixDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFFaEUsTUFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLFdBQVcsSUFBSSxlQUFlLENBQUM7SUFFOUQsTUFBTSxNQUFNLEdBQWdCO1FBQ3pCLFlBQVk7UUFDWixXQUFXO1FBRVg7O2FBRUs7UUFDTCxPQUFPLEVBQUUsVUFBVSxDQUFDLE9BQU8sSUFBSSxjQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxjQUFjLENBQUM7UUFFeEU7O2FBRUs7UUFDTCxRQUFRLEVBQUUsVUFBVSxDQUFDLFFBQVEsSUFBSSxjQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxlQUFlLENBQUM7UUFFM0U7O2FBRUs7UUFDTCxjQUFjLEVBQUUsVUFBVSxDQUFDLGNBQWMsSUFBSSxjQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxzQkFBc0IsQ0FBQztRQUM5Rjs7YUFFSztRQUNMLGFBQWEsRUFBRSxVQUFVLENBQUMsYUFBYSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLElBQUksT0FBTyxFQUFFLEVBQUUsQ0FBQztRQUN0Rzs7YUFFSztRQUNMLGlCQUFpQixFQUFFLFVBQVUsQ0FBQyxpQkFBaUIsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxJQUFJLElBQUksRUFBRSxFQUFFLENBQUM7UUFFckc7O2FBRUs7UUFDTCxtQkFBbUI7WUFDaEIsTUFBTSxLQUFLLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxPQUFPLHlCQUF5QixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLDZDQUE2QyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDckosT0FBTyxLQUFLLENBQUM7UUFDaEIsQ0FBQztRQUVELE9BQU8sRUFBRTtZQUNOOzs7OztrQkFLTTtZQUNOLDhHQUE4RztZQUM5RyxpQkFBaUIsRUFBRSxPQUFBLFVBQVUsQ0FBQyxPQUFPLDBDQUFFLGlCQUFpQixLQUFJLFNBQVMsQ0FBQyxDQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsTUFBTTtnQkFDdkcsT0FBTyxhQUFhLENBQUM7WUFDeEIsQ0FBQztZQUVEOzs7O2tCQUlNO1lBQ04sOEdBQThHO1lBQzlHLG1CQUFtQixFQUFFLE9BQUEsVUFBVSxDQUFDLE9BQU8sMENBQUUsbUJBQW1CLEtBQUksU0FBUyxDQUFDLENBQUUsYUFBYSxFQUFFLFdBQVc7Z0JBQ25HLE9BQU8sYUFBYSxDQUFDO1lBQ3hCLENBQUM7WUFFRDs7OztrQkFJTTtZQUNOLDhHQUE4RztZQUM5RyxtQkFBbUIsRUFBRSxPQUFBLFVBQVUsQ0FBQyxPQUFPLDBDQUFFLG1CQUFtQixLQUFJLFNBQVMsQ0FBQyxDQUFFLGFBQWEsRUFBRSxXQUFXO2dCQUNuRyxPQUFPLGFBQWEsQ0FBQztZQUN4QixDQUFDO1NBQ0g7S0FDSCxDQUFDO0lBQ0YsT0FBTyxNQUFNLENBQUM7QUFDakIsQ0FBQztBQWhGRCxvQ0FnRkMifQ==