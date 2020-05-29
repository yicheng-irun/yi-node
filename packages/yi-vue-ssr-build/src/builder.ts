import dotenv from 'dotenv';
import path from 'path';
import createBuildConfig, { BuildConfig } from './build-config';
import build from './webpack/webpack-ssr-build';

dotenv.config();

export class Builder {
    public isProduction = false;

    public ssrBuildConfigFile: string;

    public config: BuildConfig = null;

    constructor ({
        isProduction = true,
        ssrBuildConfigFile = path.join(process.cwd(), 'yi-vue-ssr-config.js'),
    }: {
        isProduction?: boolean;
        ssrBuildConfigFile?: string;
    } = {}) {
        this.isProduction = isProduction;
        this.ssrBuildConfigFile = ssrBuildConfigFile;
        console.log(`build for production: ${this.isProduction}`);
    }

    public async loadConfig (): Promise<void> {
        this.config = await createBuildConfig({
            isProduction: this.isProduction,
            ssrBuildConfigFile: this.ssrBuildConfigFile,
        });
    }

    public startBuild (): void {
        build(this.config);
    }
}

export default Builder;
