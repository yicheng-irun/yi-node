import { BuildConfig } from './build-config';
export declare class Builder {
    isProduction: boolean;
    config: BuildConfig;
    constructor();
    loadConfig(): Promise<void>;
    startBuild(): void;
}
export default Builder;
