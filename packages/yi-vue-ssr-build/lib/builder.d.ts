import { BuildConfig } from './build-config';
export declare class Builder {
    isProduction: boolean;
    ssrBuildConfigFile: string;
    config: BuildConfig;
    constructor({ isProduction, ssrBuildConfigFile, }?: {
        isProduction?: boolean;
        ssrBuildConfigFile?: string;
    });
    loadConfig(): Promise<void>;
    startBuild(): void;
}
export default Builder;
