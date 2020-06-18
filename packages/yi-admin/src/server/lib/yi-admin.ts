import Router from '@koa/router';
import { Context, Next } from 'koa';
import koaBody from 'koa-body';
import { vueSSRKoaMiddleware } from 'yi-vue-ssr-middleware';
import { resolve } from 'path';
import url from 'url';
import { ModelAdminBase } from './model-admin-base';
import { EditBaseType } from './edit-types/edit-base-type';
import { ModelAdminListAction } from './model-admin-list-action';
import { SiteNavMenu } from './site-nav-menu';
import { ListBaseType } from './list-types/list-base-type';
import { EditTypes, ListTypes } from './types';
import { assetsRouter } from './assets-router';
import { jsonErrorMiddleware } from '../tools/json-error-middleware';

/**
 * admin站点
 */
export class YiAdmin {
   /**
    * 判断用户是否有权限
    * 如果没有权限，直接在里侧抛出异常或者返回false
    */
   private permission: (ctx: Context, next: Next) => Promise<any> = async (ctx, next) => {
      await next();
   }


   /**
    * 对应的koa的路由
    */
   koaRouter: Router<any, Context>;

   /**
    * 站点导航菜单
    */
   public siteNavMenu: SiteNavMenu = new SiteNavMenu({
      title: 'root',
   });

   public siteConfig: {
      siteName: string;
   };

   public modelNavMenu: SiteNavMenu = new SiteNavMenu({
      title: '数据模型管理',
   });

   constructor ({ permission, serverOrigin, siteConfig = {} }: {
      permission?: (ctx: Context, next: Next) => Promise<any>;
      /**
       * example: "http://127.0.0.1:80"
       * 请返回koa.lisen的端口，用于vue服务端渲染(SSR)中进行数据接口请求
       */
      serverOrigin: string;

      siteConfig?: {
         siteName?: string;
      };
   }) {
      this.createKoaRouter({
         serverOrigin,
      });

      if (permission) {
         this.permission = permission;
      }
      this.siteNavMenu.add(this.modelNavMenu);

      this.siteConfig = {
         siteName: siteConfig?.siteName || 'yi-admin',
      };

      this.appendPermissionCheckRouter();
      this.appendSiteHomeRouter();
      this.appendModelAdminRouter();
   }

   private createKoaRouter ({ serverOrigin }: {
      serverOrigin: string;
   }): void {
      this.koaRouter = new Router();
      this.koaRouter.use(assetsRouter.middleware(), assetsRouter.allowedMethods());

      const koaBodyMiddleware = koaBody({
         jsonLimit: '10mb',
         multipart: true,
         formidable: {
            // keepExtensions: true,
         },
      });
      // 允许用户自定义koaBody
      this.koaRouter.use(async (ctx, next) => {
         if (ctx.request.body) {
            await next();
         } else {
            await koaBodyMiddleware(ctx, next);
         }
      });

      this.koaRouter.use(vueSSRKoaMiddleware({
         bundlePath: resolve(__dirname, '../../../lib/server-bundle'),
         serverOrigin,
         isCacheRenderer: process.env.NODE_ENV !== 'development',
      }));
   }

   private appendPermissionCheckRouter (): void {
      // check permissionResult
      this.koaRouter.use(async (ctx, next) => {
         if (!/\/$/.test(ctx.path)) { // 使强制加/
            ctx.redirect(ctx.originalUrl.replace(ctx.path, () => `${ctx.path}/`));
            return;
         }
         await this.permission(ctx, next);
      });
   }

   private appendSiteHomeRouter (): void {
      this.koaRouter.get('/', async (ctx) => {
         if (ctx.render) {
            await ctx.render('yi-admin/site', {
               assetsPath: url.resolve(ctx.path, '__yi-admin-assets__/'),
            });
         }
      });
      this.koaRouter.get('/site-menu/', async (ctx: Context) => {
         ctx.body = {
            success: true,
            data: this.siteNavMenu,
         };
      });
      this.koaRouter.get('/site-config/', async (ctx: Context) => {
         ctx.body = {
            success: true,
            data: this.siteConfig,
         };
      });
   }


   public modelAdminsMap: {
      [name: string]: ModelAdminBase;
   } = {};

   private appendModelAdminRouter (): void {
      const modelRouter = new Router<any, Context>();

      modelRouter.get('/', async (ctx) => {
         if (ctx.render) {
            await ctx.render('yi-admin/model-admin-list', {
               assetsPath: url.resolve(ctx.path, '../../__yi-admin-assets__/'),
            });
         }
      });

      modelRouter.get('/edit/', async (ctx: Context) => {
         if (ctx.render) {
            await ctx.render('yi-admin/model-admin-edit', {
               assetsPath: url.resolve(ctx.path, '../../../__yi-admin-assets__/'),
            });
         }
      });

      modelRouter.get('/edit/fields/', jsonErrorMiddleware, async (ctx: Context) => {
         const { modelName } = ctx.params;
         const modelAdmin = this.modelAdminsMap[modelName];
         const fields = modelAdmin.getEditFormFields();
         ctx.body = {
            success: true,
            data: {
               fields,
               modelInfo: {
                  title: modelAdmin.title,
                  name: modelAdmin.name,
               },
            },
         };
      });

      modelRouter.get('/edit/values/', jsonErrorMiddleware, async (ctx: Context) => {
         const { modelName } = ctx.params;
         const { id } = ctx.query;
         const values = await this.modelAdminsMap[modelName].getEditData(id, ctx);
         ctx.body = {
            success: true,
            data: values,
         };
      });

      // 表单组件的请求
      modelRouter.all('/edit/component-action/', jsonErrorMiddleware, async (ctx: Context) => {
         const { modelName } = ctx.params;
         const fields = this.modelAdminsMap[modelName].getEditFormFields();
         const { fieldName, actionName, actionData } = {
            ...ctx.query,
            ...ctx.request.body,
         } as Record<string, any>;

         let editField: EditBaseType | null = null;

         for (let i = 0; i < fields.length; i += 1) {
            const fitem = fields[i];
            if (fitem.fieldName === fieldName) {
               editField = fitem;
            }
         }

         if (editField) {
            const result = await editField.action(actionName, actionData, ctx);
            if (result !== undefined) {
               ctx.body = {
                  success: true,
                  data: result,
               };
            }
            return;
         }

         ctx.body = {
            success: false,
            message: '未找到该字段对应的组件',
         };
      });

      modelRouter.post('/edit/submit/', jsonErrorMiddleware, async (ctx: Context) => {
         const { modelName } = ctx.params;
         const { editId = '', formData = {} } = ctx.request.body;
         const value = await this.modelAdminsMap[modelName].formSubmit(editId, formData, ctx);
         ctx.body = {
            success: true,
            data: value,
         };
      });

      /**
       * 拉取列表页的字段信息
       */
      modelRouter.get('/list/fields/', jsonErrorMiddleware, async (ctx: Context) => {
         const { modelName } = ctx.params;
         const modelAdmin = this.modelAdminsMap[modelName];
         const fields = modelAdmin.getDataListFields();
         ctx.body = {
            success: true,
            data: {
               fields,
               modelInfo: {
                  title: modelAdmin.title,
                  name: modelAdmin.name,
               },
            },
         };
      });

      /**
       * 拉取列表页的字段信息
       */
      modelRouter.get('/list/actions/', jsonErrorMiddleware, async (ctx: Context) => {
         const { modelName } = ctx.params;
         const actions = this.modelAdminsMap[modelName].listActions;
         ctx.body = {
            success: true,
            data: actions,
         };
      });

      // 表单组件的请求
      modelRouter.post('/list/component-action/', jsonErrorMiddleware, async (ctx: Context) => {
         const { modelName } = ctx.params;
         const fields = this.modelAdminsMap[modelName].getDataListFields();

         const { fieldName, actionName, actionData } = {
            ...ctx.query,
            ...ctx.request.body,
         } as Record<string, any>;
         let listField: ListBaseType | null = null;

         for (let i = 0; i < fields.length; i += 1) {
            const fitem = fields[i];
            if (fitem.fieldName === fieldName) {
               listField = fitem;
            }
         }

         if (listField) {
            const result = await listField.action(actionName, actionData, ctx);
            if (result !== undefined) {
               ctx.body = {
                  success: true,
                  data: result,
               };
            }
            return;
         }

         ctx.body = {
            success: false,
            message: '未找到该字段对应的组件',
         };
      });

      /**
       * 拉取列表页的数据
       */
      modelRouter.get('/list/data/', jsonErrorMiddleware, async (ctx: Context) => {
         const { modelName } = ctx.params;
         const { pageIndex = '1', pageSize = '10', sort = '' } = ctx.query;
         const pageIndexNumber = Number.parseInt(pageIndex, 10);
         const pageSizeNumber = Number.parseInt(pageSize, 10);
         if (typeof pageIndexNumber !== 'number' || pageIndexNumber < 1) throw new Error('pageIndex必须是>=1的整数');
         if (typeof pageSizeNumber !== 'number' || pageSizeNumber < 1) throw new Error('pageSize必须是>=1的整数');

         const datas = await this.modelAdminsMap[modelName].getDataList({
            pageIndex: pageIndexNumber,
            pageSize: pageSizeNumber,
            sort,
         }, ctx);
         ctx.body = {
            success: true,
            data: datas,
         };
      });

      /**
       * 执行列表操作
       */
      modelRouter.post('/list/action/', jsonErrorMiddleware, async (ctx: Context) => {
         const { modelName } = ctx.params;
         const actions = this.modelAdminsMap[modelName].listActions;
         const {
            actionName = '',
            idList = [],
         } = ctx.request.body;

         let action: ModelAdminListAction | null = null;
         for (let i = 0; i < actions.length; i += 1) {
            if (actions[i].actionName === actionName) {
               action = actions[i];
               break;
            }
         }

         if (!action) throw new Error('未找到对应的操作动作');

         const result = await action.actionFunc(idList);

         ctx.body = {
            success: true,
            data: result || {
               successfulNum: 0,
               failedNum: 0,
            },
         };
      });

      /**
       * 挂载统一路由
       */
      this.koaRouter.use('/model-admin/:modelName', async (ctx: Context, next: Next) => {
         const { modelName } = ctx.params;
         if (Object.prototype.hasOwnProperty.call(this.modelAdminsMap, modelName)) {
            await next();
         }
      }, modelRouter.middleware());
   }

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
