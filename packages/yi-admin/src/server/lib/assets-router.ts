import Router from '@koa/router';
import { join, resolve, extname } from 'path';
import { existsSync, createReadStream } from 'fs';
import { Context } from 'koa';

export const assetsRouter = new Router<{}, Context>();


const allowFile = ['.js', '.css', '.html', '.tff', '.woff'];

const clientAssetsPath = resolve(__dirname, '../../client/assets');
assetsRouter.get(/__yi-admin-assets__\/assets\/(.*)/, async (ctx) => {
   const file = ctx.params['0'];
   const filePath = join(clientAssetsPath, file);
   if (filePath.startsWith(clientAssetsPath) && existsSync(filePath)) {
      const extName = extname(filePath);
      if (allowFile.includes(extName)) {
         ctx.type = extName;
         ctx.body = createReadStream(filePath);
      }
   }
});

const elementUiFolder = resolve(require.resolve('element-ui'), '../');
assetsRouter.get(/__yi-admin-assets__\/element-ui\/(.*)/, async (ctx) => {
   const file = ctx.params['0'];
   const filePath = join(elementUiFolder, file);
   if (filePath.startsWith(elementUiFolder) && existsSync(filePath)) {
      const extName = extname(filePath);
      if (allowFile.includes(extName)) {
         ctx.type = extName;
         ctx.body = createReadStream(filePath);
      }
   }
});

const clientStaticPath = resolve(__dirname, '../../../static');
assetsRouter.get(/__yi-admin-assets__\/static\/(.*)/, async (ctx) => {
   const file = ctx.params['0'];
   const filePath = join(clientStaticPath, file);
   if (filePath.startsWith(clientStaticPath) && existsSync(filePath)) {
      const extName = extname(filePath);
      if (allowFile.includes(extName)) {
         ctx.type = extName;
         ctx.body = createReadStream(filePath);
      }
   }
});
