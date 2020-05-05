import path from 'path';
import glob from 'glob';

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

const projectPath = process.cwd();

/**
 * 获取构建配置
 * @param param0
 */
export default function createBuildConfig ({
    isProduction = false,
}: {
    isProduction?: boolean;
} = {}): BuildConfig {
    const devNodeServerPort = Number.parseInt(process.env.HTTP_PORT || '80', 10);


    const srcPath = path.resolve(projectPath, './src/client');

    const config: BuildConfig = {
        isProduction,
        projectPath,
        distPath: path.resolve(projectPath, './dist/client'),
        distBundlePath: path.resolve(projectPath, './dist/client-bundle'),
        srcPath,
        devServerPort: Number.parseInt(process.env.DEV_SERVER_PORT || '20000', 10),
        devNodeServerPort,
        getAllPageTemplates (): string[] {
            const pages = glob.sync(`${srcPath}/pages/**/template.html`).map((page) => page.replace(/^.*src\/client\/pages\/(.*)\/template.html$/, '$1'));
            return pages;
        },
    };
    return config;
}
