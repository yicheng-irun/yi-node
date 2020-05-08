
import Builder from './builder';
import { BuildConfig } from './build-config';

export default Builder;

async function startBuild (): Promise<Builder> {
    const b = new Builder();
    await b.loadConfig();
    b.startBuild();
    return b;
}

export {
    Builder,
    BuildConfig,
    startBuild,
};
