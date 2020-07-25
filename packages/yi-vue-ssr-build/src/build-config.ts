import path from 'path';
import fs from 'fs';
import glob from 'glob';
import webpack from 'webpack';

export interface UserConfig {
    projectPath?: string;

    srcPath?: string;

    distPath?: string;

    distBundlePath?: string;

    devServerPort?: number;

    devNodeServerPort?: number;

    webpack?: {
        baseConfigProcess? (config: webpack.Configuration, buildConfig: BuildConfig, chunks: string): webpack.Configuration;

        clientConfigProcess? (config: webpack.Configuration, buildConfig: BuildConfig): webpack.Configuration;

        serverConfigProcess? (config: webpack.Configuration, buildConfig: BuildConfig): webpack.Configuration;
    };
}

export interface BuildConfig {
    isProduction: boolean;
    projectPath: string;
    srcPath: string;
    distPath: string;
    distBundlePath: string;
    /**
     * web开发服务监听的端口
     */
    devServerPort: number;

    /**
     * 开发环境下nodeServer的端口
     */
    devNodeServerPort: number;

    getAllPageTemplates: () => string[];

    webpack: {
        baseConfigProcess (config: webpack.Configuration, buildConfig: BuildConfig, chunks: string): webpack.Configuration;

        clientConfigProcess (config: webpack.Configuration, buildConfig: BuildConfig): webpack.Configuration;

        serverConfigProcess (config: webpack.Configuration, buildConfig: BuildConfig): webpack.Configuration;
    };
}

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


async function getUserBuildConfig (ssrBuildConfigFile: string): Promise<UserConfig> {
   const configFile = path.resolve(projectRootPath, ssrBuildConfigFile);

   // 不存在则创建配置文件
   if (!fs.existsSync(configFile)) {
      fs.writeFileSync(configFile, defaultConfigJSCode);
   }

   const config: UserConfig = await import(configFile);
   return config;
}

/**
 * 获取构建配置
 * @param param0
 */
export default async function createBuildConfig ({
   isProduction = false,
   ssrBuildConfigFile,
}: {
    isProduction?: boolean;
    ssrBuildConfigFile: string;
}): Promise<BuildConfig> {
   const userConfig = await getUserBuildConfig(ssrBuildConfigFile);

   const projectPath = userConfig.projectPath || projectRootPath;

   const config: BuildConfig = {
      isProduction,
      projectPath,

      /**
         * 默认情况下是 src/client
         */
      srcPath: userConfig.srcPath || path.resolve(projectPath, './src/client'),

      /**
         * 默认情况下是 dist/client
         */
      distPath: userConfig.distPath || path.resolve(projectPath, './dist/client'),

      /**
         * 默认情况下是 dist/server-bundle
         */
      distBundlePath: userConfig.distBundlePath || path.resolve(projectPath, './dist/server-bundle'),
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
      getAllPageTemplates (): string[] {
         const pages = glob.sync(`${config.srcPath}/pages/**/template.html`).map((page) => page.replace(/^.*src\/client\/pages\/(.*)\/template.html$/, '$1'));
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
         baseConfigProcess: userConfig.webpack?.baseConfigProcess || function _ (configuration, buildConfig, chunks) {
            return configuration;
         },

         /**
             * clientConfig 基于baseConfig生成的clientConfig，用于给客户端使用的
             * @param configuration webpack.Configuration
             * @param buildConfig BuildConfig
             */
         // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/no-unused-vars
         clientConfigProcess: userConfig.webpack?.clientConfigProcess || function _ (configuration, buildConfig) {
            return configuration;
         },

         /**
             * serverConfig 基于baseConfig生成的serverConfig，用于给服务端使用的
             * @param configuration webpack.Configuration
             * @param buildConfig BuildConfig
             */
         // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/no-unused-vars
         serverConfigProcess: userConfig.webpack?.serverConfigProcess || function _ (configuration, buildConfig) {
            return configuration;
         },
      },
   };
   return config;
}
