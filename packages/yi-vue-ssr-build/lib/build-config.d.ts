/// <reference types="webpack-dev-server" />
import webpack from 'webpack';
export interface UserConfig {
    projectPath?: string;
    srcPath?: string;
    distPath?: string;
    distBundlePath?: string;
    devServerPort?: number;
    devNodeServerPort?: number;
    webpack?: {
        baseConfigProcess?(config: webpack.Configuration, buildConfig: BuildConfig, chunks: string): webpack.Configuration;
        clientConfigProcess?(config: webpack.Configuration, buildConfig: BuildConfig): webpack.Configuration;
        serverConfigProcess?(config: webpack.Configuration, buildConfig: BuildConfig): webpack.Configuration;
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
        baseConfigProcess(config: webpack.Configuration, buildConfig: BuildConfig, chunks: string): webpack.Configuration;
        clientConfigProcess(config: webpack.Configuration, buildConfig: BuildConfig): webpack.Configuration;
        serverConfigProcess(config: webpack.Configuration, buildConfig: BuildConfig): webpack.Configuration;
    };
}
/**
 * 获取构建配置
 * @param param0
 */
export default function createBuildConfig({ isProduction, ssrBuildConfigFile, }: {
    isProduction?: boolean;
    ssrBuildConfigFile: string;
}): Promise<BuildConfig>;
