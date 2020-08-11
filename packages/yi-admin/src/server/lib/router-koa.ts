import Router from '@koa/router';
import compose from 'koa-compose';
import { Context, Next } from 'koa';
import { vueSSRKoaMiddleware } from 'yi-vue-ssr-middleware';
import { resolve } from 'path';
import url from 'url';
import koaBody from 'koa-body';
import { assetsRouter } from './router-koa-assets';
import { YiAdmin } from './yi-admin';
import { jsonErrorMiddleware } from '../tools/json-error-middleware';
import { EditBaseType } from './edit-types/edit-base-type';
import { ListBaseType } from './list-types/list-base-type';
import { FilterBaseType } from './filter-types/filter-base-type';
import { ModelAdminListAction } from '..';


function getBaseRenderSSRParams (yiAdmin: YiAdmin, ctx: Context): {
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
      csrfParam: yiAdmin.options.csrfParamKoa ? yiAdmin.options.csrfParamKoa(ctx) : {},
   };
}

function appendModelAdminRouter (yiAdmin: YiAdmin, koaRouter: Router<{}, Context>): void {
   const modelRouter = new Router<any, Context>();

   modelRouter.get('/', async (ctx) => {
      if (ctx.render) {
         await ctx.render('yi-admin/model-admin-list', getBaseRenderSSRParams(yiAdmin, ctx));
      }
   });

   modelRouter.get('/edit/', async (ctx: Context) => {
      if (ctx.render) {
         await ctx.render('yi-admin/model-admin-edit', getBaseRenderSSRParams(yiAdmin, ctx));
      }
   });

   // 获取表单编辑页的字段
   modelRouter.get('/edit/fields/', jsonErrorMiddleware, async (ctx: Context) => {
      const { modelName } = ctx.params;
      const modelAdmin = yiAdmin.modelAdminsMap[modelName];
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
      const values = await yiAdmin.modelAdminsMap[modelName].getEditData(id, ctx);
      ctx.body = {
         success: true,
         data: values,
      };
   });

   // 表单组件的请求
   modelRouter.all('/edit/component-action/', jsonErrorMiddleware, async (ctx: Context) => {
      const { modelName } = ctx.params;
      const fields = yiAdmin.modelAdminsMap[modelName].getEditFormFields();
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
      const value = await yiAdmin.modelAdminsMap[modelName].formSubmit(editId, formData, ctx);
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
      const modelAdmin = yiAdmin.modelAdminsMap[modelName];
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
      const actions = yiAdmin.modelAdminsMap[modelName].listActions;
      ctx.body = {
         success: true,
         data: actions,
      };
   });

   // 表单组件的请求
   modelRouter.post('/list/component-action/', jsonErrorMiddleware, async (ctx: Context) => {
      const { modelName } = ctx.params;
      const fields = yiAdmin.modelAdminsMap[modelName].getDataListFields();

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
      const fields = yiAdmin.modelAdminsMap[modelName].getFilterFields();

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
         const result = await listFilterField.action(actionName, actionData, ctx, yiAdmin.modelAdminsMap[modelName]);
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
      const filterFields = yiAdmin.modelAdminsMap[modelName].getFilterFields();
      filterFields.forEach((filterItem: { fieldName: string | number; getConditions: (arg0: any) => any }) => {
         if (Object.prototype.hasOwnProperty.call(filterData, filterItem.fieldName)) {
            const condition = filterItem.getConditions(filterData[filterItem.fieldName]);
            delete parsedFilter[filterItem.fieldName];
            Object.assign(parsedFilter, condition);
         }
      });

      const afterFilterData = await yiAdmin.modelAdminsMap[modelName].getDataListAfterFilter({
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
      const actions = yiAdmin.modelAdminsMap[modelName].listActions;
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
   koaRouter.use('/model-admin/:modelName', async (ctx: Context, next: Next) => {
      const { modelName } = ctx.params;
      if (Object.prototype.hasOwnProperty.call(yiAdmin.modelAdminsMap, modelName)) {
         await next();
      }
   }, modelRouter.middleware());
}

export function createKoaRouter ({
   serverOrigin,
   yiAdmin,
}: {
    serverOrigin: string;
    yiAdmin: YiAdmin;
}): Router<any, Context> {
   const koaRouter = new Router<{}, Context>();

   koaRouter.all('*');

   koaRouter.use(compose([assetsRouter.middleware(), assetsRouter.allowedMethods()]));

   const koaBodyMiddleware = koaBody({
      jsonLimit: '10mb',
      multipart: true,
      formidable: {
         // keepExtensions: true,
      },
   });
   // 允许用户自定义koaBody
   koaRouter.use(async (ctx, next) => {
      if (ctx.request.body) {
         await next();
      } else {
         await koaBodyMiddleware(ctx, next);
      }
   });

   koaRouter.use(vueSSRKoaMiddleware({
      bundlePath: resolve(__dirname, '../../../lib/server-bundle'),
      serverOrigin,
      isCacheRenderer: process.env.NODE_ENV !== 'development',
   }));


   // check permissionResult
   koaRouter.use(async (ctx, next) => {
      if (!/\/$/.test(ctx.path)) { // 使强制加/
         ctx.redirect(ctx.originalUrl.replace(ctx.path, () => `${ctx.path}/`));
         return;
      }
      await yiAdmin.permissionKoa(ctx, next);
   });


   koaRouter.get('/', async (ctx) => {
      if (ctx.render) {
         await ctx.render('yi-admin/site', getBaseRenderSSRParams(yiAdmin, ctx));
      }
   });
   koaRouter.get('/site-menu/', async (ctx: Context) => {
      ctx.body = {
         success: true,
         data: yiAdmin.siteNavMenu,
      };
   });
   koaRouter.get('/site-config/', async (ctx: Context) => {
      ctx.body = {
         success: true,
         data: yiAdmin.siteConfig,
      };
   });


   appendModelAdminRouter(yiAdmin, koaRouter);


   return koaRouter;
}
