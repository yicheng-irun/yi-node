import { BuildConfig } from './build-config';
export declare class Builder {
    isProduction: boolean;
    config: BuildConfig;
    constructor();
    startBuild(): void;
}
export default Builder;
