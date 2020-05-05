import dotenv from 'dotenv';
import createBuildConfig, { BuildConfig } from './build-config';
import build from './webpack/webpack-ssr-build';

dotenv.config();

export class Builder {
    public isProduction = false;

    public config: BuildConfig = null;

    constructor () {
        this.isProduction = process.argv.indexOf('--production') >= 0;
        console.log(`build for production: ${this.isProduction}`);
        this.config = createBuildConfig({
            isProduction: this.isProduction,
        });
    }

    public startBuild (): void {
        build(this.config);
    }
}

export default Builder;
