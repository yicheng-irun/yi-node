import koaSSRHandler from './koa-middleware';
import expressSSRHandler from './express-middleware';

export { koaRenderFunction } from './koa-middleware';
export { expressRenderFunction } from './express-middleware';

export const vueSSRKoaMiddleware = koaSSRHandler;
export const vueSSRExpressMiddleware = expressSSRHandler;

export default {
   vueSSRKoaMiddleware,
   vueSSRExpressMiddleware,
};
