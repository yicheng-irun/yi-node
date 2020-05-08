import Builder from './builder';
import { BuildConfig } from './build-config';
export default Builder;
declare function startBuild(): Promise<Builder>;
export { Builder, BuildConfig, startBuild, };
