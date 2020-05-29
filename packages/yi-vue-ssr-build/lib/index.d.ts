import Builder from './builder';
import { BuildConfig } from './build-config';
export default Builder;
declare function startBuild({ isProduction, ssrBuildConfigFile, }?: {
    isProduction?: boolean;
    ssrBuildConfigFile?: string;
}): Promise<Builder>;
export { Builder, BuildConfig, startBuild, };
