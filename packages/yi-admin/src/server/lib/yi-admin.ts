import Router from '@koa/router';
import { Context, Next } from 'koa';
import compose from 'koa-compose';
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
import { FilterBaseType } from './filter-types/filter-base-type';

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

   public options: {
      csrfParam?: (ctx: Context) => {
         query?: {
            [key: string]: string;
         };
         body?: {
            [key: string]: string;
         };
      };
   }

   public modelNavMenu: SiteNavMenu = new SiteNavMenu({
      title: '数据模型管理',
   });

   constructor ({
      permission, serverOrigin, siteConfig = {}, csrfParam,
   }: {
      permission?: (ctx: Context, next: Next) => Promise<any>;
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
      csrfParam?: (ctx: Context) => {
         query?: {
            [key: string]: string;
         };
         body?: {
            [key: string]: string;
         };
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
         siteName: siteConfig.siteName ?? 'yi-admin',
      };
      this.options = {
         csrfParam,
      };

      this.appendPermissionCheckRouter();
      this.appendSiteHomeRouter();
      this.appendModelAdminRouter();
   }

   private createKoaRouter ({ serverOrigin }: {
      serverOrigin: string;
   }): void {
      this.koaRouter = new Router();
      this.koaRouter.use(compose([assetsRouter.middleware(), assetsRouter.allowedMethods()]));

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

   private getBaseRenderSSRParams (ctx: Context): {
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
         assetsPath: url.resolve(ctx.path, '__yi-admin-assets__/'),
         csrfParam: this.options.csrfParam ? this.options.csrfParam(ctx) : {},
      };
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
            await ctx.render('yi-admin/site', this.getBaseRenderSSRParams(ctx));
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
            await ctx.render('yi-admin/model-admin-list', this.getBaseRenderSSRParams(ctx));
         }
      });

      modelRouter.get('/edit/', async (ctx: Context) => {
         if (ctx.render) {
            await ctx.render('yi-admin/model-admin-edit', this.getBaseRenderSSRParams(ctx));
         }
      });

      // 获取表单编辑页的字段
      modelRouter.get('/edit/fields/', jsonErrorMiddleware, async (ctx: Context) => {
         const { modelName } = ctx.params;
         const modelAdmin = this.modelAdminsMap[modelName];
         const fields = modelAdmin.getEditFormFieldsAfterFilter();
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
            const f = fields[i];
            if (f.fieldName === fieldName) {
               editField = f;
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
         const fields = modelAdmin.getDataListFieldsAfterFilter();
         const filterFields = modelAdmin.getFilterFields();
         ctx.body = {
            success: true,
            data: {
               fields,
               filterFields,
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
            const f = fields[i];
            if (f.fieldName === fieldName) {
               listField = f;
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

      // filter组件的请求
      modelRouter.post('/list/filter-component-action/', jsonErrorMiddleware, async (ctx: Context) => {
         const { modelName } = ctx.params;
         const fields = this.modelAdminsMap[modelName].getFilterFields();

         const { fieldName, actionName, actionData } = {
            ...ctx.query,
            ...ctx.request.body,
         } as Record<string, any>;
         let listFilterField: FilterBaseType | null = null;

         for (let i = 0; i < fields.length; i += 1) {
            const f = fields[i];
            if (f.fieldName === fieldName) {
               listFilterField = f;
            }
         }

         if (listFilterField) {
            const result = await listFilterField.action(actionName, actionData, ctx, this.modelAdminsMap[modelName]);
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
         const {
            pageIndex = '1', pageSize = '10', sort = '', filter = '{}',
         } = ctx.query;
         const pageIndexNumber = Number.parseInt(pageIndex, 10);
         const pageSizeNumber = Number.parseInt(pageSize, 10);
         if (typeof pageIndexNumber !== 'number' || pageIndexNumber < 1) throw new Error('pageIndex必须是>=1的整数');
         if (typeof pageSizeNumber !== 'number' || pageSizeNumber < 1) throw new Error('pageSize必须是>=1的整数');

         const filterData = JSON.parse(filter);
         const parsedFilter: {
            [key: string]: any;
         } = {
            ...filterData,
         };
         const filterFields = this.modelAdminsMap[modelName].getFilterFields();
         filterFields.forEach((filterItem) => {
            if (Object.prototype.hasOwnProperty.call(filterData, filterItem.fieldName)) {
               const condition = filterItem.getConditions(filterData[filterItem.fieldName]);
               delete parsedFilter[filterItem.fieldName];
               Object.assign(parsedFilter, condition);
            }
         });

         const afterFilterData = await this.modelAdminsMap[modelName].getDataListAfterFilter({
            pageIndex: pageIndexNumber,
            pageSize: pageSizeNumber,
            sort,
            conditions: parsedFilter,
         }, ctx);
         ctx.body = {
            success: true,
            data: afterFilterData,
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
