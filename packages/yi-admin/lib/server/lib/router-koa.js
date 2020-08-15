"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createKoaRouter = void 0;
const router_1 = __importDefault(require("@koa/router"));
const koa_compose_1 = __importDefault(require("koa-compose"));
const yi_vue_ssr_middleware_1 = require("yi-vue-ssr-middleware");
const path_1 = require("path");
const url_1 = __importDefault(require("url"));
const koa_body_1 = __importDefault(require("koa-body"));
const router_koa_assets_1 = require("./router-koa-assets");
const json_error_middleware_1 = require("../tools/json-error-middleware");
function getBaseRenderSSRParams(yiAdmin, ctx) {
    return {
        assetsPath: url_1.default.resolve(ctx.path, '__yi-admin-assets__/'),
        csrfParam: yiAdmin.options.csrfParamKoa ? yiAdmin.options.csrfParamKoa(ctx) : {},
    };
}
function appendModelAdminRouter(yiAdmin, koaRouter) {
    const modelRouter = new router_1.default();
    modelRouter.get('/', async (ctx) => {
        if (ctx.render) {
            await ctx.render('yi-admin/model-admin-list', getBaseRenderSSRParams(yiAdmin, ctx));
        }
    });
    modelRouter.get('/edit/', async (ctx) => {
        if (ctx.render) {
            await ctx.render('yi-admin/model-admin-edit', getBaseRenderSSRParams(yiAdmin, ctx));
        }
    });
    // 获取表单编辑页的字段
    modelRouter.get('/edit/fields/', json_error_middleware_1.jsonErrorMiddleware, async (ctx) => {
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
    modelRouter.get('/edit/values/', json_error_middleware_1.jsonErrorMiddleware, async (ctx) => {
        const { modelName } = ctx.params;
        const { id } = ctx.query;
        const values = await yiAdmin.modelAdminsMap[modelName].getEditData(id, ctx);
        ctx.body = {
            success: true,
            data: values,
        };
    });
    // 表单组件的请求
    modelRouter.all('/edit/component-action/', json_error_middleware_1.jsonErrorMiddleware, async (ctx) => {
        const { modelName } = ctx.params;
        const fields = yiAdmin.modelAdminsMap[modelName].getEditFormFields();
        const { fieldName, actionName, actionData } = Object.assign(Object.assign({}, ctx.query), ctx.request.body);
        let editField = null;
        for (let i = 0; i < fields.length; i += 1) {
            const f = fields[i];
            if (f.fieldName === fieldName) {
                editField = f;
                break;
            }
        }
        if (editField) {
            const result = await editField.action(actionName, actionData, {
                method: ctx.method,
                query: ctx.query,
                body: ctx.request.body,
                files: ctx.request.files,
            });
            if (result !== undefined) {
                ctx.body = result;
                return;
            }
        }
        ctx.body = {
            success: false,
            message: '未找到该字段对应的组件',
        };
    });
    modelRouter.post('/edit/submit/', json_error_middleware_1.jsonErrorMiddleware, async (ctx) => {
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
    modelRouter.get('/list/fields/', json_error_middleware_1.jsonErrorMiddleware, async (ctx) => {
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
    modelRouter.get('/list/actions/', json_error_middleware_1.jsonErrorMiddleware, async (ctx) => {
        const { modelName } = ctx.params;
        const actions = yiAdmin.modelAdminsMap[modelName].listActions;
        ctx.body = {
            success: true,
            data: actions,
        };
    });
    // 表单组件的请求
    modelRouter.post('/list/component-action/', json_error_middleware_1.jsonErrorMiddleware, async (ctx) => {
        const { modelName } = ctx.params;
        const fields = yiAdmin.modelAdminsMap[modelName].getDataListFields();
        const { fieldName, actionName, actionData } = Object.assign(Object.assign({}, ctx.query), ctx.request.body);
        let listField = null;
        for (let i = 0; i < fields.length; i += 1) {
            const f = fields[i];
            if (f.fieldName === fieldName) {
                listField = f;
                break;
            }
        }
        if (listField) {
            const result = await listField.action(actionName, actionData, {
                method: ctx.method,
                query: ctx.query,
                body: ctx.request.body,
                files: ctx.request.files,
            });
            if (result !== undefined) {
                ctx.body = result;
            }
            return;
        }
        ctx.body = {
            success: false,
            message: '未找到该字段对应的组件',
        };
    });
    // filter组件的请求
    modelRouter.post('/list/filter-component-action/', json_error_middleware_1.jsonErrorMiddleware, async (ctx) => {
        const { modelName } = ctx.params;
        const fields = yiAdmin.modelAdminsMap[modelName].getFilterFields();
        const { fieldName, actionName, actionData } = Object.assign(Object.assign({}, ctx.query), ctx.request.body);
        let listFilterField = null;
        for (let i = 0; i < fields.length; i += 1) {
            const f = fields[i];
            if (f.fieldName === fieldName) {
                listFilterField = f;
                break;
            }
        }
        if (listFilterField) {
            const result = await listFilterField.action(actionName, actionData, {
                method: ctx.method,
                query: ctx.query,
                body: ctx.request.body,
                files: ctx.request.files,
            }, yiAdmin.modelAdminsMap[modelName]);
            if (result !== undefined) {
                ctx.body = result;
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
    modelRouter.get('/list/data/', json_error_middleware_1.jsonErrorMiddleware, async (ctx) => {
        const { modelName } = ctx.params;
        const { pageIndex = '1', pageSize = '10', sort = '', filter = '{}', } = ctx.query;
        const pageIndexNumber = Number.parseInt(pageIndex, 10);
        const pageSizeNumber = Number.parseInt(pageSize, 10);
        if (typeof pageIndexNumber !== 'number' || pageIndexNumber < 1)
            throw new Error('pageIndex必须是>=1的整数');
        if (typeof pageSizeNumber !== 'number' || pageSizeNumber < 1)
            throw new Error('pageSize必须是>=1的整数');
        const filterData = JSON.parse(filter);
        const parsedFilter = Object.assign({}, filterData);
        const filterFields = yiAdmin.modelAdminsMap[modelName].getFilterFields();
        filterFields.forEach((filterItem) => {
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
    modelRouter.post('/list/action/', json_error_middleware_1.jsonErrorMiddleware, async (ctx) => {
        const { modelName } = ctx.params;
        const actions = yiAdmin.modelAdminsMap[modelName].listActions;
        const { actionName = '', idList = [], } = ctx.request.body;
        let action = null;
        for (let i = 0; i < actions.length; i += 1) {
            if (actions[i].actionName === actionName) {
                action = actions[i];
                break;
            }
        }
        if (!action)
            throw new Error('未找到对应的操作动作');
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
    koaRouter.use('/model-admin/:modelName', async (ctx, next) => {
        const { modelName } = ctx.params;
        if (Object.prototype.hasOwnProperty.call(yiAdmin.modelAdminsMap, modelName)) {
            await next();
        }
    }, modelRouter.middleware());
}
function createKoaRouter({ serverOrigin, yiAdmin, }) {
    const koaRouter = new router_1.default();
    koaRouter.all('*');
    koaRouter.use(koa_compose_1.default([router_koa_assets_1.assetsRouter.middleware(), router_koa_assets_1.assetsRouter.allowedMethods()]));
    const koaBodyMiddleware = koa_body_1.default({
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
        }
        else {
            await koaBodyMiddleware(ctx, next);
        }
    });
    koaRouter.use(yi_vue_ssr_middleware_1.vueSSRKoaMiddleware({
        bundlePath: path_1.resolve(__dirname, '../../../lib/server-bundle'),
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
    koaRouter.get('/site-menu/', async (ctx) => {
        ctx.body = {
            success: true,
            data: yiAdmin.siteNavMenu,
        };
    });
    koaRouter.get('/site-config/', async (ctx) => {
        ctx.body = {
            success: true,
            data: yiAdmin.siteConfig,
        };
    });
    appendModelAdminRouter(yiAdmin, koaRouter);
    return koaRouter;
}
exports.createKoaRouter = createKoaRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLWtvYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvbGliL3JvdXRlci1rb2EudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEseURBQWlDO0FBQ2pDLDhEQUFrQztBQUVsQyxpRUFBNEQ7QUFDNUQsK0JBQStCO0FBQy9CLDhDQUFzQjtBQUN0Qix3REFBK0I7QUFDL0IsMkRBQW1EO0FBRW5ELDBFQUFxRTtBQU9yRSxTQUFTLHNCQUFzQixDQUFFLE9BQWdCLEVBQUUsR0FBWTtJQVc1RCxPQUFPO1FBQ0osVUFBVSxFQUFFLGFBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxzQkFBc0IsQ0FBQztRQUN6RCxTQUFTLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0tBQ2xGLENBQUM7QUFDTCxDQUFDO0FBRUQsU0FBUyxzQkFBc0IsQ0FBRSxPQUFnQixFQUFFLFNBQThCO0lBQzlFLE1BQU0sV0FBVyxHQUFHLElBQUksZ0JBQU0sRUFBZ0IsQ0FBQztJQUUvQyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDaEMsSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFO1lBQ2IsTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLDJCQUEyQixFQUFFLHNCQUFzQixDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ3RGO0lBQ0osQ0FBQyxDQUFDLENBQUM7SUFFSCxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsR0FBWSxFQUFFLEVBQUU7UUFDOUMsSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFO1lBQ2IsTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLDJCQUEy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