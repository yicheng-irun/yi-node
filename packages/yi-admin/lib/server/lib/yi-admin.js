"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("@koa/router"));
const koa_body_1 = __importDefault(require("koa-body"));
const yi_vue_ssr_middleware_1 = require("yi-vue-ssr-middleware");
const path_1 = require("path");
const url_1 = __importDefault(require("url"));
const site_nav_menu_1 = require("./site-nav-menu");
const types_1 = require("./types");
const assets_router_1 = require("./assets-router");
const json_error_middleware_1 = require("../tools/json-error-middleware");
/**
 * admin站点
 */
class YiAdmin {
    constructor({ permission, serverOrigin, siteConfig = {} }) {
        /**
         * 判断用户是否有权限
         * 如果没有权限，直接在里侧抛出异常或者返回false
         */
        this.permission = async (ctx, next) => {
            await next();
        };
        /**
         * 站点导航菜单
         */
        this.siteNavMenu = new site_nav_menu_1.SiteNavMenu({
            title: 'root',
        });
        this.modelNavMenu = new site_nav_menu_1.SiteNavMenu({
            title: '数据模型管理',
        });
        this.modelAdminsMap = {};
        this.createKoaRouter({
            serverOrigin,
        });
        if (permission) {
            this.permission = permission;
        }
        this.siteNavMenu.add(this.modelNavMenu);
        this.siteConfig = {
            siteName: (siteConfig === null || siteConfig === void 0 ? void 0 : siteConfig.siteName) || 'yi-admin',
        };
        this.appendPermissionCheckRouter();
        this.appendSiteHomeRouter();
        this.appendModelAdminRouter();
    }
    createKoaRouter({ serverOrigin }) {
        this.koaRouter = new router_1.default();
        this.koaRouter.use(assets_router_1.assetsRouter.middleware(), assets_router_1.assetsRouter.allowedMethods());
        const koaBodyMiddleware = koa_body_1.default({
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
            }
            else {
                await koaBodyMiddleware(ctx, next);
            }
        });
        this.koaRouter.use(yi_vue_ssr_middleware_1.vueSSRKoaMiddleware({
            bundlePath: path_1.resolve(__dirname, '../../../lib/server-bundle'),
            serverOrigin,
            isCacheRenderer: process.env.NODE_ENV !== 'development',
        }));
    }
    appendPermissionCheckRouter() {
        // check permissionResult
        this.koaRouter.use(async (ctx, next) => {
            if (!/\/$/.test(ctx.path)) { // 使强制加/
                ctx.redirect(ctx.originalUrl.replace(ctx.path, () => `${ctx.path}/`));
                return;
            }
            await this.permission(ctx, next);
        });
    }
    appendSiteHomeRouter() {
        this.koaRouter.get('/', async (ctx) => {
            if (ctx.render) {
                await ctx.render('yi-admin/site', {
                    assetsPath: url_1.default.resolve(ctx.path, '__yi-admin-assets__/'),
                });
            }
        });
        this.koaRouter.get('/site-menu/', async (ctx) => {
            ctx.body = {
                success: true,
                data: this.siteNavMenu,
            };
        });
        this.koaRouter.get('/site-config/', async (ctx) => {
            ctx.body = {
                success: true,
                data: this.siteConfig,
            };
        });
    }
    appendModelAdminRouter() {
        const modelRouter = new router_1.default();
        modelRouter.get('/', async (ctx) => {
            if (ctx.render) {
                await ctx.render('yi-admin/model-admin-list', {
                    assetsPath: url_1.default.resolve(ctx.path, '../../__yi-admin-assets__/'),
                });
            }
        });
        modelRouter.get('/edit/', async (ctx) => {
            if (ctx.render) {
                await ctx.render('yi-admin/model-admin-edit', {
                    assetsPath: url_1.default.resolve(ctx.path, '../../../__yi-admin-assets__/'),
                });
            }
        });
        // 获取表单编辑页的字段
        modelRouter.get('/edit/fields/', json_error_middleware_1.jsonErrorMiddleware, async (ctx) => {
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
        modelRouter.get('/edit/values/', json_error_middleware_1.jsonErrorMiddleware, async (ctx) => {
            const { modelName } = ctx.params;
            const { id } = ctx.query;
            const values = await this.modelAdminsMap[modelName].getEditData(id, ctx);
            ctx.body = {
                success: true,
                data: values,
            };
        });
        // 表单组件的请求
        modelRouter.all('/edit/component-action/', json_error_middleware_1.jsonErrorMiddleware, async (ctx) => {
            const { modelName } = ctx.params;
            const fields = this.modelAdminsMap[modelName].getEditFormFields();
            const { fieldName, actionName, actionData } = Object.assign(Object.assign({}, ctx.query), ctx.request.body);
            let editField = null;
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
        modelRouter.post('/edit/submit/', json_error_middleware_1.jsonErrorMiddleware, async (ctx) => {
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
        modelRouter.get('/list/fields/', json_error_middleware_1.jsonErrorMiddleware, async (ctx) => {
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
        modelRouter.get('/list/actions/', json_error_middleware_1.jsonErrorMiddleware, async (ctx) => {
            const { modelName } = ctx.params;
            const actions = this.modelAdminsMap[modelName].listActions;
            ctx.body = {
                success: true,
                data: actions,
            };
        });
        // 表单组件的请求
        modelRouter.post('/list/component-action/', json_error_middleware_1.jsonErrorMiddleware, async (ctx) => {
            const { modelName } = ctx.params;
            const fields = this.modelAdminsMap[modelName].getDataListFields();
            const { fieldName, actionName, actionData } = Object.assign(Object.assign({}, ctx.query), ctx.request.body);
            let listField = null;
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
        // filter组件的请求
        modelRouter.post('/list/filter-component-action/', json_error_middleware_1.jsonErrorMiddleware, async (ctx) => {
            const { modelName } = ctx.params;
            const fields = this.modelAdminsMap[modelName].getFilterFields();
            const { fieldName, actionName, actionData } = Object.assign(Object.assign({}, ctx.query), ctx.request.body);
            let listFilterField = null;
            for (let i = 0; i < fields.length; i += 1) {
                const fitem = fields[i];
                if (fitem.fieldName === fieldName) {
                    listFilterField = fitem;
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
            const filterFields = this.modelAdminsMap[modelName].getFilterFields();
            filterFields.forEach((filterItem) => {
                if (Object.prototype.hasOwnProperty.call(filterData, filterItem.fieldName)) {
                    const codition = filterItem.getConditions(filterData[filterItem.fieldName]);
                    delete parsedFilter[filterItem.fieldName];
                    Object.assign(parsedFilter, codition);
                }
            });
            const datas = await this.modelAdminsMap[modelName].getDataListAfterFilter({
                pageIndex: pageIndexNumber,
                pageSize: pageSizeNumber,
                sort,
                conditions: parsedFilter,
            }, ctx);
            ctx.body = {
                success: true,
                data: datas,
            };
        });
        /**
         * 执行列表操作
         */
        modelRouter.post('/list/action/', json_error_middleware_1.jsonErrorMiddleware, async (ctx) => {
            const { modelName } = ctx.params;
            const actions = this.modelAdminsMap[modelName].listActions;
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
        this.koaRouter.use('/model-admin/:modelName', async (ctx, next) => {
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
    addModelAdmin(modelAdmin, { addToSiteNavMenu = true, } = {}) {
        if (this.modelAdminsMap[modelAdmin.name]) {
            throw new Error(`已经存在一个name为${modelAdmin.name}的model-admin实体在本站点中`);
        }
        this.modelAdminsMap[modelAdmin.name] = modelAdmin;
        if (addToSiteNavMenu) {
            this.modelNavMenu.add(new site_nav_menu_1.SiteNavMenu({
                title: `管理 ${modelAdmin.title || modelAdmin.name}`,
                link: `model-admin/${modelAdmin.name}/`,
            }));
        }
    }
}
exports.YiAdmin = YiAdmin;
YiAdmin.EditTypes = types_1.EditTypes;
YiAdmin.ListTypes = types_1.ListTypes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWktYWRtaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmVyL2xpYi95aS1hZG1pbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHlEQUFpQztBQUVqQyx3REFBK0I7QUFDL0IsaUVBQTREO0FBQzVELCtCQUErQjtBQUMvQiw4Q0FBc0I7QUFJdEIsbURBQThDO0FBRTlDLG1DQUErQztBQUMvQyxtREFBK0M7QUFDL0MsMEVBQXFFO0FBR3JFOztHQUVHO0FBQ0gsTUFBYSxPQUFPO0lBOEJqQixZQUFhLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxVQUFVLEdBQUcsRUFBRSxFQVd2RDtRQXhDRDs7O1dBR0c7UUFDSyxlQUFVLEdBQStDLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7WUFDbEYsTUFBTSxJQUFJLEVBQUUsQ0FBQztRQUNoQixDQUFDLENBQUE7UUFRRDs7V0FFRztRQUNJLGdCQUFXLEdBQWdCLElBQUksMkJBQVcsQ0FBQztZQUMvQyxLQUFLLEVBQUUsTUFBTTtTQUNmLENBQUMsQ0FBQztRQU1JLGlCQUFZLEdBQWdCLElBQUksMkJBQVcsQ0FBQztZQUNoRCxLQUFLLEVBQUUsUUFBUTtTQUNqQixDQUFDLENBQUM7UUErRkksbUJBQWMsR0FFakIsRUFBRSxDQUFDO1FBbkZKLElBQUksQ0FBQyxlQUFlLENBQUM7WUFDbEIsWUFBWTtTQUNkLENBQUMsQ0FBQztRQUVILElBQUksVUFBVSxFQUFFO1lBQ2IsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7U0FDL0I7UUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFeEMsSUFBSSxDQUFDLFVBQVUsR0FBRztZQUNmLFFBQVEsRUFBRSxDQUFBLFVBQVUsYUFBVixVQUFVLHVCQUFWLFVBQVUsQ0FBRSxRQUFRLEtBQUksVUFBVTtTQUM5QyxDQUFDO1FBRUYsSUFBSSxD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