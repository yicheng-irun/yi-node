import fs from 'fs';
import path from 'path';
import * as vueServerRender from 'vue-server-renderer';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
   Request, Response, Handler, NextFunction,
} from 'express';

export type expressRenderFunction = (pagePath: string, ssrParams?: any, cacheOptions?: {
   key: string;
   time: number;
}) => Promise<void>;

/**
 * 获取中间件
 * @param options 参数
 */
function ssrHandler ({
   renderFunctionName = 'render',
   bundlePath,
   isCacheRenderer,
   serverOrigin = 'http://127.0.0.1:80',
}: {
   renderFunctionName?: string;

    /**
     * bundlePath  vue ssr bundle 的路径
     * 通常情况下，配合yi-vue-ssr-builder,此值应该设置为 dist/server-bundle
     */
    bundlePath: string;

    /**
     * 是否缓存renderer，在正式环境下开启，在开发测试环境下关闭
     */
    isCacheRenderer: boolean;

    /**
     * 这个是一个必传值
     * 默认是：http://127.0.0.1:80
     * 此值用于传给vue ssr context, 用于服务端渲染时访问本服务器接口
     */
    serverOrigin: string;
}): Handler {
   if (!bundlePath) {
      throw new Error(`bundlePath "${bundlePath}" is not available`);
   }

   const CACHE = {
      map: {},
      timeMap: {},
      set (key: string, value: string, time: number): void {
         this.map[key] = value;
         const t = time;
         this.timeMap[key] = Date.now() + t;
      },
      get (key: string): string | null {
         const now = Date.now();
         if (this.map[key]) {
            const t = parseFloat(this.timeMap[key]);
            if (t > now) {
               return this.map[key];
            }
         }
         return null;
      },
   };

   const cachedRenderers: {
        [key: string]: vueServerRender.BundleRenderer;
    } = {};

   let cachedBundle: {} = null;

   /**
     * 获取bundle
     */
   function getBundle (): Record<string, any> {
      if (cachedBundle) {
         return cachedBundle;
      }

      const jsonPath = path.join(bundlePath, 'vue-ssr-server-bundle.json');
      if (!fs.existsSync(jsonPath)) {
         throw new Error(`file: '${jsonPath}' is not exists`);
      }
      const serverBundle = JSON.parse(fs.readFileSync(jsonPath).toString());
      if (isCacheRenderer) {
         cachedBundle = serverBundle;
      }
      return serverBundle;
   }

   function getRenderer (pagePathArg: string): vueServerRender.BundleRenderer {
      const pagePath = pagePathArg.replace(/^\/+/, '');

      if (cachedRenderers[pagePath]) {
         return cachedRenderers[pagePath];
      }

      let templatePath = path.join(bundlePath, 'template.html');

      const custTemplatePath = path.join(bundlePath, 'templates', `${pagePath}.html`);
      if (fs.existsSync(custTemplatePath)) {
         templatePath = custTemplatePath;
      } else if (!fs.existsSync(templatePath)) {
         throw new Error(`file: '${templatePath}' is not exists`);
      }

      const serverBundle = getBundle();
      const template = fs.readFileSync(templatePath).toString();

      const renderer = vueServerRender.createBundleRenderer(serverBundle, {
         runInNewContext: true, // 推荐
         template, // （可选）页面模板
         // clientManifest // （可选）客户端构建 manifest
      });

      if (isCacheRenderer) {
         cachedRenderers[pagePath] = renderer;
      }

      return renderer;
   }


   async function middleWare (req: Request, res: Response, next: NextFunction): Promise<void> {
      res[renderFunctionName] = async (pagePath: string, ssrParams: Record<string, any> = {}, cacheOptions?: {
         key: string;
         time: number;
      }): Promise<void> => {
         let useCache = false;
         let cacheKey = '';
         let cacheTime = 0;
         if (cacheOptions) {
            useCache = true;
            cacheKey = cacheOptions.key || '';
            cacheTime = cacheOptions.time || 1000 * 60; // 默认缓存1分钟
         }
         const key = `${pagePath}::${cacheKey}`;

         function render (): void {
            const renderer = getRenderer(pagePath || '');
            let ignoreByNext = false;
            const context = {
               ssrParams,
               serverOrigin,
               pagePath,
               query: req.query,
               next (...args): void {
                  ignoreByNext = true;
                  req.next(...args);
               },
               req,
               res,
               ctx: {
                  req,
                  res,
               },
            };
            renderer.renderToString(context, (err, html) => {
               if (ignoreByNext) {
                  return;
               }
               if (err) {
                  req.next(err);
                  return;
               }
               res.end(html);
               if (useCache) {
                  CACHE.set(key, html, cacheTime);
               }
            });
         }
         if (useCache) {
            const result = CACHE.get(key);
            if (result) {
               res.end(result);
               return;
            }
            render();
         } else {
            render();
         }
      };
      next();
   }

   return middleWare;
}

export default ssrHandler;
