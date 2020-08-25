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
        if (ctx.yiAdminSSRRender) {
            await ctx.yiAdminSSRRender('yi-admin/model-admin-list', getBaseRenderSSRParams(yiAdmin, ctx));
        }
    });
    modelRouter.get('/edit/', async (ctx) => {
        if (ctx.yiAdminSSRRender) {
            await ctx.yiAdminSSRRender('yi-admin/model-admin-edit', getBaseRenderSSRParams(yiAdmin, ctx));
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
        renderFunctionName: 'yiAdminSSRRender',
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
        if (ctx.yiAdminSSRRender) {
            await ctx.yiAdminSSRRender('yi-admin/site', getBaseRenderSSRParams(yiAdmin, ctx));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLWtvYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvbGliL3JvdXRlci1rb2EudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEseURBQWlDO0FBQ2pDLDhEQUFrQztBQUVsQyxpRUFBNEQ7QUFDNUQsK0JBQStCO0FBQy9CLDhDQUFzQjtBQUN0Qix3REFBK0I7QUFDL0IsMkRBQW1EO0FBRW5ELDBFQUFxRTtBQU9yRSxTQUFTLHNCQUFzQixDQUFFLE9BQWdCLEVBQUUsR0FBWTtJQVc1RCxPQUFPO1FBQ0osVUFBVSxFQUFFLGFBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxzQkFBc0IsQ0FBQztRQUN6RCxTQUFTLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0tBQ2xGLENBQUM7QUFDTCxDQUFDO0FBRUQsU0FBUyxzQkFBc0IsQ0FBRSxPQUFnQixFQUFFLFNBQThCO0lBQzlFLE1BQU0sV0FBVyxHQUFHLElBQUksZ0JBQU0sRUFBZ0IsQ0FBQztJQUUvQyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDaEMsSUFBSSxHQUFHLENBQUMsZ0JBQWdCLEVBQUU7WUFDdkIsTUFBTSxHQUFHLENBQUMsZ0JBQWdCLENBQUMsMkJBQTJCLEVBQUUsc0JBQXNCLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDaEc7SUFDSixDQUFDLENBQUMsQ0FBQztJQUVILFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxHQUFZLEVBQUUsRUFBRTtRQUM5QyxJQUFJLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRTtZQUN2QixNQUFNLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQywyQkFBMkIsRUFBRSxzQkFBc0IsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNoRztJQUNKLENBQUMsQ0FBQyxDQUFDO0lBRUgsYUFBYTtJQUNiLFdBQVcsQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLDJDQUFtQixFQUFFLEtBQUssRUFBRSxHQUFZLEVBQUUsRUFBRTtRQUMxRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUNqQyxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JELE1BQU0sTUFBTSxHQUFHLFVBQVUsQ0FBQyw0QkFBNEIsRUFBRSxDQUFDO1FBQ3pELEdBQUcsQ0FBQyxJQUFJLEdBQUc7WUFDUixPQUFPLEVBQUUsSUFBSTtZQUNiLElBQUksRUFBRTtnQkFDSCxNQUFNO2dCQUNOLFNBQVMsRUFBRTtvQkFDUixLQUFLLEVBQUUsVUFBVSxDQUFDLEtBQUs7b0JBQ3ZCLElBQUksRUFBRSxVQUFVLENBQUMsSUFBSTtpQkFDdkI7YUFDSDtTQUNILENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILFdBQVcsQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLDJDQUFtQixFQUFFLEtBQUssRUFBRSxHQUFZLEVBQUUsRUFBRTtRQUMxRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUNqQyxNQUFNLEVBQUUsRUFBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUN6QixNQUFNLE1BQU0sR0FBRyxNQUFNLE9BQU8sQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM1RSxHQUFHLENBQUMsSUFBSSxHQUFHO1lBQ1IsT0FBTyxFQUFFLElBQUk7WUFDYixJQUFJLEVBQUUsTUFBTTtTQUNkLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILFVBQVU7SUFDVixXQUFXLENBQUMsR0FBRyxDQUFDLHlCQUF5QixFQUFFLDJDQUFtQixFQUFFLEtBQUssRUFBRSxHQUFZLEVBQUUsRUFBRTtRQUNwRixNQUFNLEVBQUUsU0FBUyxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUNqQyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDckUsTUFBTSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLEdBQUcsZ0NBQ3hDLEdBQUcsQ0FBQyxLQUFLLEdBQ1QsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQ0UsQ0FBQztRQUV6QixJQUFJLFNBQVMsR0FBd0IsSUFBSSxDQUFDO1FBRTFDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDeEMsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUU7Z0JBQzVCLFNBQVMsR0FBRyxDQUFDLENBQUM7Z0JBQ2QsTUFBTTthQUNSO1NBQ0g7UUFFRCxJQUFJLFNBQVMsRUFBRTtZQUNaLE1BQU0sTUFBTSxHQUFHLE1BQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsVUFBVSxFQUFFO2dCQUMzRCxNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU07Z0JBQ2xCLEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSztnQkFDaEIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSTtnQkFDdEIsS0FBSyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSzthQUMxQixDQUFDLENBQUM7WUFDSCxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7Z0JBQ3ZCLEdBQUcsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO2dCQUNsQixPQUFPO2FBQ1Q7U0FDSDtRQUVELEdBQUcsQ0FBQyxJQUFJLEdBQUc7WUFDUixPQUFPLEVBQUUsS0FBSztZQUNkLE9BQU8sRUFBRSxhQUFhO1NBQ3hCLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILFdBQVcsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLDJDQUFtQixFQUFFLEtBQUssRUFBRSxHQUFZLEVBQUUsRUFBRTtRQUMzRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUNqQyxNQUFNLEVBQUUsTUFBTSxHQUFHLEVBQUUsRUFBRSxRQUFRLEdBQUcsRUFBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDeEQsTUFBTSxLQUFLLEdBQUcsTUFBTSxPQUFPLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3hGLEdBQUcsQ0FBQyxJQUFJLEdBQUc7WUFDUixPQUFPLEVBQUUsSUFBSTtZQUNiLElBQUksRUFBRSxLQUFLO1NBQ2IsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUg7O1VBRU07SUFDTixXQUFXLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSwyQ0FBbUIsRUFBRSxLQUFLLEVBQUUsR0FBWSxFQUFFLEVBQUU7UUFDMUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFDakMsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyRCxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsNEJBQTRCLEVBQUUsQ0FBQztRQUN6RCxNQUFNLFlBQVksR0FBRyxVQUFVLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDbEQsR0FBRyxDQUFDLElBQUksR0FBRztZQUNSLE9BQU8sRUFBRSxJQUFJO1lBQ2IsSUFBSSxFQUFFO2dCQUNILE1BQU07Z0JBQ04sWUFBWTtnQkFDWixTQUFTLEVBQUU7b0JBQ1IsS0FBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLO29CQUN2QixJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUk7aUJBQ3ZCO2FBQ0g7U0FDSCxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSDs7VUFFTTtJQUNOLFdBQVcsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsMkNBQW1CLEVBQUUsS0FBSyxFQUFFLEdBQVksRUFBRSxFQUFFO1FBQzNFLE1BQU0sRUFBRSxTQUFTLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO1FBQ2pDLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsV0FBVyxDQUFDO1FBQzlELEdBQUcsQ0FBQyxJQUFJLEdBQUc7WUFDUixPQUFPLEVBQUUsSUFBSTtZQUNiLElBQUksRUFBRSxPQUFPO1NBQ2YsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsVUFBVTtJQUNWLFdBQVcsQ0FBQyxJQUFJLENBQUMseUJBQXlCLEVBQUUsMkNBQW1CLEVBQUUsS0FBSyxFQUFFLEdBQVksRUFBRSxFQUFFO1FBQ3JGLE1BQU0sRUFBRSxTQUFTLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO1FBQ2pDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUVyRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsR0FBRyxnQ0FDeEMsR0FBRyxDQUFDLEtBQUssR0FDVCxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDRSxDQUFDO1FBQ3pCLElBQUksU0FBUyxHQUF3QixJQUFJLENBQUM7UUFFMUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN4QyxNQUFNLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBRTtnQkFDNUIsU0FBUyxHQUFHLENBQUMsQ0FBQztnQkFDZCxNQUFNO2FBQ1I7U0FDSDtRQUVELElBQUksU0FBUyxFQUFFO1lBQ1osTUFBTSxNQUFNLEdBQUcsTUFBTSxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUU7Z0JBQzNELE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTTtnQkFDbEIsS0FBSyxFQUFFLEdBQUcsQ0FBQyxLQUFLO2dCQUNoQixJQUFJLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJO2dCQUN0QixLQUFLLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLO2FBQzFCLENBQUMsQ0FBQztZQUNILElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtnQkFDdkIsR0FBRyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7YUFDcEI7WUFDRCxPQUFPO1NBQ1Q7UUFFRCxHQUFHLENBQUMsSUFBSSxHQUFHO1lBQ1IsT0FBTyxFQUFFLEtBQUs7WUFDZCxPQUFPLEVBQUUsYUFBYTtTQUN4QixDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxjQUFjO0lBQ2QsV0FBVyxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsRUFBRSwyQ0FBbUIsRUFBRSxLQUFLLEVBQUUsR0FBWSxFQUFFLEVBQUU7UUFDNUYsTUFBTSxFQUFFLFNBQVMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFDakMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUVuRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsR0FBRyxnQ0FDeEMsR0FBRyxDQUFDLEtBQUssR0FDVCxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDRSxDQUFDO1FBQ3pCLElBQUksZUFBZSxHQUEwQixJQUFJLENBQUM7UUFFbEQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN4QyxNQUFNLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBRTtnQkFDNUIsZUFBZSxHQUFHLENBQUMsQ0FBQztnQkFDcEIsTUFBTTthQUNSO1NBQ0g7UUFFRCxJQUFJLGVBQWUsRUFBRTtZQUNsQixNQUFNLE1BQU0sR0FBRyxNQUFNLGVBQWUsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRTtnQkFDakUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNO2dCQUNsQixLQUFLLEVBQUUsR0FBRyxDQUFDLEtBQUs7Z0JBQ2hCLElBQUksRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUk7Z0JBQ3RCLEtBQUssRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUs7YUFDMUIsRUFBRSxPQUFPLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDdEMsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO2dCQUN2QixHQUFHLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQzthQUNwQjtZQUNELE9BQU87U0FDVDtRQUVELEdBQUcsQ0FBQyxJQUFJLEdBQUc7WUFDUixPQUFPLEVBQUUsS0FBSztZQUNkLE9BQU8sRUFBRSxhQUFhO1NBQ3hCLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVIOztVQUVNO0lBQ04sV0FBVyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsMkNBQW1CLEVBQUUsS0FBSyxFQUFFLEdBQVksRUFBRSxFQUFFO1FBQ3hFLE1BQU0sRUFBRSxTQUFTLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO1FBQ2pDLE1BQU0sRUFDSCxTQUFTLEdBQUcsR0FBRyxFQUFFLFFBQVEsR0FBRyxJQUFJLEVBQUUsSUFBSSxHQUFHLEVBQUUsRUFBRSxNQUFNLEdBQUcsSUFBSSxHQUM1RCxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7UUFDZCxNQUFNLGVBQWUsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN2RCxNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNyRCxJQUFJLE9BQU8sZUFBZSxLQUFLLFFBQVEsSUFBSSxlQUFlLEdBQUcsQ0FBQztZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUN0RyxJQUFJLE9BQU8sY0FBYyxLQUFLLFFBQVEsSUFBSSxjQUFjLEdBQUcsQ0FBQztZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUVuRyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sWUFBWSxxQkFHVCxVQUFVLENBQ2YsQ0FBQztRQUNMLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDekUsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQTZFLEVBQUUsRUFBRTtZQUNwRyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUN6RSxNQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDN0UsT0FBTyxZQUFZLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUMxQyxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQzthQUN6QztRQUNKLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxlQUFlLEdBQUcsTUFBTSxPQUFPLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDO1lBQ3BGLFNBQVMsRUFBRSxlQUFlO1lBQzFCLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLElBQUk7WUFDSixVQUFVLEVBQUUsWUFBWTtTQUMxQixFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1IsR0FBRyxDQUFDLElBQUksR0FBRztZQUNSLE9BQU8sRUFBRSxJQUFJO1lBQ2IsSUFBSSxFQUFFLGVBQWU7U0FDdkIsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUg7O1VBRU07SUFDTixXQUFXLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSwyQ0FBbUIsRUFBRSxLQUFLLEVBQUUsR0FBWSxFQUFFLEVBQUU7UUFDM0UsTUFBTSxFQUFFLFNBQVMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFDakMsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxXQUFXLENBQUM7UUFDOUQsTUFBTSxFQUNILFVBQVUsR0FBRyxFQUFFLEVBQ2YsTUFBTSxHQUFHLEVBQUUsR0FDYixHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBRXJCLElBQUksTUFBTSxHQUFnQyxJQUFJLENBQUM7UUFDL0MsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN6QyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEtBQUssVUFBVSxFQUFFO2dCQUN2QyxNQUFNLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixNQUFNO2FBQ1I7U0FDSDtRQUVELElBQUksQ0FBQyxNQUFNO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUUzQyxNQUFNLE1BQU0sR0FBRyxNQUFNLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFL0MsR0FBRyxDQUFDLElBQUksR0FBRztZQUNSLE9BQU8sRUFBRSxJQUFJO1lBQ2IsSUFBSSxFQUFFLE1BQU0sSUFBSTtnQkFDYixhQUFhLEVBQUUsQ0FBQztnQkFDaEIsU0FBUyxFQUFFLENBQUM7YUFDZDtTQUNILENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVIOztVQUVNO0lBQ04sU0FBUyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsRUFBRSxLQUFLLEVBQUUsR0FBWSxFQUFFLElBQVUsRUFBRSxFQUFFO1FBQ3pFLE1BQU0sRUFBRSxTQUFTLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO1FBQ2pDLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsU0FBUyxDQUFDLEVBQUU7WUFDMUUsTUFBTSxJQUFJLEVBQUUsQ0FBQztTQUNmO0lBQ0osQ0FBQyxFQUFFLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO0FBQ2hDLENBQUM7QUFFRCxTQUFnQixlQUFlLENBQUUsRUFDOUIsWUFBWSxFQUNaLE9BQU8sR0FJVDtJQUNFLE1BQU0sU0FBUyxHQUFHLElBQUksZ0JBQU0sRUFBZSxDQUFDO0lBRTVDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFbkIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxxQkFBTyxDQUFDLENBQUMsZ0NBQVksQ0FBQyxVQUFVLEVBQUUsRUFBRSxnQ0FBWSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRW5GLE1BQU0saUJBQWlCLEdBQUcsa0JBQU8sQ0FBQztRQUMvQixTQUFTLEVBQUUsTUFBTTtRQUNqQixTQUFTLEVBQUUsSUFBSTtRQUNmLFVBQVUsRUFBRTtRQUNULHdCQUF3QjtTQUMxQjtLQUNILENBQUMsQ0FBQztJQUNILGlCQUFpQjtJQUNqQixTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDL0IsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtZQUNuQixNQUFNLElBQUksRUFBRSxDQUFDO1NBQ2Y7YUFBTTtZQUNKLE1BQU0saUJBQWlCLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3JDO0lBQ0osQ0FBQyxDQUFDLENBQUM7SUFFSCxTQUFTLENBQUMsR0FBRyxDQUFDLDJDQUFtQixDQUFDO1FBQy9CLGtCQUFrQixFQUFFLGtCQUFrQjtRQUN0QyxVQUFVLEVBQUUsY0FBTyxDQUFDLFNBQVMsRUFBRSw0QkFBNEIsQ0FBQztRQUM1RCxZQUFZO1FBQ1osZUFBZSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLGFBQWE7S0FDekQsQ0FBQyxDQUFDLENBQUM7SUFHSix5QkFBeUI7SUFDekIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO1FBQy9CLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLFFBQVE7WUFDbEMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN0RSxPQUFPO1NBQ1Q7UUFDRCxNQUFNLE9BQU8sQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzFDLENBQUMsQ0FBQyxDQUFDO0lBR0gsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQzlCLElBQUksR0FBRyxDQUFDLGdCQUFnQixFQUFFO1lBQ3ZCLE1BQU0sR0FBRyxDQUFDLGdCQUFnQixDQUFDLGVBQWUsRUFBRSxzQkFBc0IsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNwRjtJQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0gsU0FBUyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLEdBQVksRUFBRSxFQUFFO1FBQ2pELEdBQUcsQ0FBQyxJQUFJLEdBQUc7WUFDUixPQUFPLEVBQUUsSUFBSTtZQUNiLElBQUksRUFBRSxPQUFPLENBQUMsV0FBVztTQUMzQixDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDSCxTQUFTLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxLQUFLLEVBQUUsR0FBWSxFQUFFLEVBQUU7UUFDbkQsR0FBRyxDQUFDLElBQUksR0FBRztZQUNSLE9BQU8sRUFBRSxJQUFJO1lBQ2IsSUFBSSxFQUFFLE9BQU8sQ0FBQyxVQUFVO1NBQzFCLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUdILHNCQUFzQixDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztJQUczQyxPQUFPLFNBQVMsQ0FBQztBQUNwQixDQUFDO0FBdEVELDBDQXNFQyJ9