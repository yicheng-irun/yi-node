
import Builder from './builder';
import { BuildConfig } from './build-config';

export default Builder;

async function startBuild ({
    isProduction = true,
    ssrBuildConfigFile,
}: {
    isProduction?: boolean;
    ssrBuildConfigFile?: string;
} = {}): Promise<Builder> {
    const b = new Builder({
        isProduction,
        ssrBuildConfigFile,
    });
    await b.loadConfig();
    b.startBuild();
    return b;
}

export {
    Builder,
    BuildConfig,
    startBuild,
};
