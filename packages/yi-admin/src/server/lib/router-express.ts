import express from 'express';
import { vueSSRExpressMiddleware, expressRenderFunction } from 'yi-vue-ssr-middleware';
import { resolve } from 'path';
import url from 'url';
import { YiAdmin } from './yi-admin';

type Response = express.Response & {
   ssrRender?: expressRenderFunction;
}

function getBaseRenderSSRParams (yiAdmin: YiAdmin, req: express.Request, res: express.Response): {
   assetsPath: string;
   csrfParam: {
      query?: {
         [key: string]: string;
      };
      body?: {
         [key: string]: string;
      };
   };
} {
   return {
      assetsPath: url.resolve(req.path, '__yi-admin-assets__/'),
      csrfParam: yiAdmin.options.csrfParamExpress ? yiAdmin.options.csrfParamExpress(
         req,
         res,
      ) : {},
   };
}


export function createExpressRouter ({
   serverOrigin,
   yiAdmin,
}: {
     serverOrigin: string;
     yiAdmin: YiAdmin;
 }): express.Router {
   const router = express.Router();


   router.use(vueSSRExpressMiddleware({
      renderFunctionName: 'ssrRender',
      bundlePath: resolve(__dirname, '../../../lib/server-bundle'),
      serverOrigin,
      isCacheRenderer: process.env.NODE_ENV !== 'development',
   }));

   router.use((req, res, next) => {
      if (!/\/$/.test(req.path)) { // 使强制加/
         res.redirect(req.originalUrl.replace(req.path, () => `${req.path}/`));
         return;
      }
      yiAdmin.permissionExpress(req, res, next);
   });

   router.get('/', async (req: express.Request, res: Response) => {
      if (res.ssrRender) {
         await res.ssrRender('yi-admin/site', getBaseRenderSSRParams(yiAdmin, req, res));
      }
   });
   router.get('/site-menu/', async (req, res) => {
      res.json({
         success: true,
         data: yiAdmin.siteNavMenu,
      });
   });
   router.get('/site-config/', async (req, res) => {
      res.json({
         success: true,
         data: yiAdmin.siteConfig,
      });
   });

   return router;
}
