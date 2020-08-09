import koaSSRHandler from './koa-middleware';
import expressSSRHandler from './express-middleware';
export { koaRenderFunction } from './koa-middleware';
export { expressRenderFunction } from './express-middleware';
export declare const vueSSRKoaMiddleware: typeof koaSSRHandler;
export declare const vueSSRExpressMiddleware: typeof expressSSRHandler;
declare const _default: {
    vueSSRKoaMiddleware: typeof koaSSRHandler;
    vueSSRExpressMiddleware: typeof expressSSRHandler;
};
export default _default;
