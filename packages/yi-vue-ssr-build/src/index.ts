
import Builder from './builder';

export default Builder;

function startBuild (): Builder {
    const b = new Builder();
    b.startBuild();
    return b;
}

export {
    Builder,

    startBuild,
};
