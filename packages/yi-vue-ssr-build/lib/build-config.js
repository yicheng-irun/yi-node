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
const projectConfigFile = path_1.default.join(projectRootPath, 'yi-vue-ssr-config.js');
const defaultConfigJSCode = `/// 感谢使用yi-vue-ssr-build工具
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
async function getUserBuildConfig() {
    // 不存在则创建配置文件
    if (!fs_1.default.existsSync(projectConfigFile)) {
        fs_1.default.writeFileSync(projectConfigFile, defaultConfigJSCode);
    }
    const config = await Promise.resolve().then(() => __importStar(require(projectConfigFile)));
    return config;
}
/**
 * 获取构建配置
 * @param param0
 */
async function createBuildConfig({ isProduction = false, } = {}) {
    var _a, _b, _c;
    const userConfig = await getUserBuildConfig();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQtY29uZmlnLmpzIiwic291cmNlUm9vdCI6InNyYy8iLCJzb3VyY2VzIjpbImJ1aWxkLWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxnREFBd0I7QUFDeEIsNENBQW9CO0FBQ3BCLGdEQUF3QjtBQW9EeEIsTUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBRXRDLE1BQU0saUJBQWlCLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztBQUU3RSxNQUFNLG1CQUFtQixHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0ErRDNCLENBQUM7QUFHRixLQUFLLFVBQVUsa0JBQWtCO0lBQzdCLGFBQWE7SUFDYixJQUFJLENBQUMsWUFBRSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO1FBQ25DLFlBQUUsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztLQUM1RDtJQUVELE1BQU0sTUFBTSxHQUFlLHdEQUFhLGlCQUFpQixHQUFDLENBQUM7SUFDM0QsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQUVEOzs7R0FHRztBQUNZLEtBQUssVUFBVSxpQkFBaUIsQ0FBRSxFQUM3QyxZQUFZLEdBQUcsS0FBSyxNQUdwQixFQUFFOztJQUNGLE1BQU0sVUFBVSxHQUFHLE1BQU0sa0JBQWtCLEVBQUUsQ0FBQztJQUU5QyxNQUFNLFdBQVcsR0FBRyxVQUFVLENBQUMsV0FBVyxJQUFJLGVBQWUsQ0FBQztJQUU5RCxNQUFNLE1BQU0sR0FBZ0I7UUFDeEIsWUFBWTtRQUNaLFdBQVc7UUFFWDs7V0FFRztRQUNILE9BQU8sRUFBRSxVQUFVLENBQUMsT0FBTyxJQUFJLGNBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLGNBQWMsQ0FBQztRQUV4RTs7V0FFRztRQUNILFFBQVEsRUFBRSxVQUFVLENBQUMsUUFBUSxJQUFJLGNBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLGVBQWUsQ0FBQztRQUUzRTs7V0FFRztRQUNILGNBQWMsRUFBRSxVQUFVLENBQUMsY0FBYyxJQUFJLGNBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLHNCQUFzQixDQUFDO1FBQzlGOztXQUVHO1FBQ0gsYUFBYSxFQUFFLFVBQVUsQ0FBQyxhQUFhLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsSUFBSSxPQUFPLEVBQUUsRUFBRSxDQUFDO1FBQ3RHOztXQUVHO1FBQ0gsaUJBQWlCLEVBQUUsVUFBVSxDQUFDLGlCQUFpQixJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLElBQUksSUFBSSxFQUFFLEVBQUUsQ0FBQztRQUVyRzs7V0FFRztRQUNILG1CQUFtQjtZQUNmLE1BQU0sS0FBSyxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsT0FBTyx5QkFBeUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyw2Q0FBNkMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3JKLE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFFRCxPQUFPLEVBQUU7WUFDTDs7Ozs7ZUFLRztZQUNILDhHQUE4RztZQUM5RyxpQkFBaUIsRUFBRSxPQUFBLFVBQVUsQ0FBQyxPQUFPLDBDQUFFLGlCQUFpQixLQUFJLFNBQVMsQ0FBQyxDQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsTUFBTTtnQkFDdEcsT0FBTyxhQUFhLENBQUM7WUFDekIsQ0FBQztZQUVEOzs7O2VBSUc7WUFDSCw4R0FBOEc7WUFDOUcsbUJBQW1CLEVBQUUsT0FBQSxVQUFVLENBQUMsT0FBTywwQ0FBRSxtQkFBbUIsS0FBSSxTQUFTLENBQUMsQ0FBRSxhQUFhLEVBQUUsV0FBVztnQkFDbEcsT0FBTyxhQUFhLENBQUM7WUFDekIsQ0FBQztZQUVEOzs7O2VBSUc7WUFDSCw4R0FBOEc7WUFDOUcsbUJBQW1CLEVBQUUsT0FBQSxVQUFVLENBQUMsT0FBTywwQ0FBRSxtQkFBbUIsS0FBSSxTQUFTLENBQUMsQ0FBRSxhQUFhLEVBQUUsV0FBVztnQkFDbEcsT0FBTyxhQUFhLENBQUM7WUFDekIsQ0FBQztTQUNKO0tBQ0osQ0FBQztJQUNGLE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUM7QUE5RUQsb0NBOEVDIn0=