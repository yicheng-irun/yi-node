import Router from '@koa/router';
import { Context, Next } from 'koa';
import express, { NextFunction } from 'express';
import { ModelAdminBase } from './model-admin-base';
import { SiteNavMenu } from './site-nav-menu';
import { EditTypes, ListTypes } from './types';
import { createKoaRouter } from './router-koa';
import { createExpressRouter } from './router-express';

interface CsrfParamResult {
   query?: {
      [key: string]: string;
   };
   body?: {
      [key: string]: string;
   };
}

/**
 * admin站点
 */
export class YiAdmin {
   /**
    * 判断用户是否有权限
    * 如果没有权限，直接在里侧抛出异常
    */
   public permissionKoa: (ctx: Context, next: Next) => any = async (ctx, next) => {
      await next();
   }

   /**
    * 判断用户是否有权限
    * 如果没有权限，直接在里侧抛出异常
    */
   public permissionExpress: (req: Express.Request, res: Express.Response, next: NextFunction) => any = (req, res, next) => {
      next();
   }


   /**
    * 对应的koa的路由
    */
   koaRouter: Router<any, Context>;

   /**
    * 对应的express路由
    */
   expressRouter: express.Router;

   /**
    * 站点导航菜单
    */
   public siteNavMenu: SiteNavMenu = new SiteNavMenu({
      title: 'root',
   });

   public siteConfig: {
      siteName: string;
   };

   public options: {
      csrfParamKoa?: (ctx: Context) => CsrfParamResult;

      csrfParamExpress?: (req: express.Request,
         res: express.Response) => CsrfParamResult;
   }

   public modelNavMenu: SiteNavMenu = new SiteNavMenu({
      title: '数据模型管理',
   });

   constructor ({
      permissionKoa,
      permissionExpress,
      serverOrigin,
      siteConfig = {},
      csrfParamKoa,
      csrfParamExpress,
   }: {
      permissionKoa?: (ctx: Context, next: Next) => Promise<any>;
      permissionExpress?: (req: Express.Request, res: Express.Response, next: NextFunction) => any;
      /**
       * example: "http://127.0.0.1:80"
       * 请返回koa.listen(SSR)中进行数据接口请求
       */
      serverOrigin: string;

      siteConfig?: {
         siteName?: string;
      };

      /**
       * 获取csrf参数的回调函数
       * 返回的数据会在post请求发起的时候拼入post请求的body或者query中
       */
      csrfParamKoa?: (ctx: Context) => CsrfParamResult;
      /**
       * 获取csrf参数的回调函数
       * 返回的数据会在post请求发起的时候拼入post请求的body或者query中
       */
      csrfParamExpress?: (req: express.Request,
         res: express.Response) => CsrfParamResult;
   }) {
      this.options = {
         csrfParamKoa,
         csrfParamExpress,
      };

      if (permissionKoa) {
         this.permissionKoa = permissionKoa;
      }
      if (permissionExpress) {
         this.permissionExpress = permissionExpress;
      }

      this.koaRouter = createKoaRouter({
         serverOrigin,
         yiAdmin: this,
      });

      this.expressRouter = createExpressRouter({
         serverOrigin,
         yiAdmin: this,
      });

      this.siteNavMenu.add(this.modelNavMenu);

      this.siteConfig = {
         siteName: siteConfig.siteName ?? 'yi-admin',
      };
   }

   public modelAdminsMap: {
      [name: string]: ModelAdminBase;
   } = {};

   /**
    * 添加一个modelAdmin到yi-admin实例中
    * @param modelAdmin
    */
   addModelAdmin (modelAdmin: ModelAdminBase, {
      addToSiteNavMenu = true,
   }: {
      addToSiteNavMenu?: boolean;
   } = {}): void {
      if (this.modelAdminsMap[modelAdmin.name]) {
         throw new Error(`已经存在一个name为${modelAdmin.name}的model-admin实体在本站点中`);
      }
      this.modelAdminsMap[modelAdmin.name] = modelAdmin;

      if (addToSiteNavMenu) {
         this.modelNavMenu.add(new SiteNavMenu({
            title: `管理 ${modelAdmin.title || modelAdmin.name}`,
            link: `model-admin/${modelAdmin.name}/`,
         }));
      }
   }


   static EditTypes = EditTypes;

   static ListTypes = ListTypes;
}
