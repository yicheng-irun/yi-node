export interface BuildConfig {
    isProduction: boolean;
    projectPath: string;
    distPath: string;
    distBundlePath: string;
    srcPath: string;
    /**
     * web开发服务监听的端口
     */
    devServerPort: number;
    /**
     * 开发环境下nodeServer的端口
     */
    devNodeServerPort: number;
    getAllPageTemplates: () => string[];
}
/**
 * 获取构建配置
 * @param param0
 */
export default function createBuildConfig({ isProduction, }?: {
    isProduction?: boolean;
}): BuildConfig;
