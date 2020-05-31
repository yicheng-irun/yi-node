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
const json_error_middleware_1 = require("./tools/json-error-middleware");
/**
 * admin站点
 */
class YiAdmin {
    constructor({ permission, serverOrigin }) {
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
        this.koaRouter.post('/site-menu/', async (ctx) => {
            ctx.body = {
                success: true,
                data: this.siteNavMenu,
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
        modelRouter.get('/edit/fields/', json_error_middleware_1.jsonErrorMiddleware, async (ctx) => {
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
        modelRouter.post('/edit/component-action/', json_error_middleware_1.jsonErrorMiddleware, async (ctx) => {
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
                ctx.body = {
                    success: true,
                    data: result,
                };
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
                const result = await listField.action(actionName, actionData);
                ctx.body = {
                    success: true,
                    data: result,
                };
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
            const { pageIndex = '1', pageSize = '10', sort = '' } = ctx.query;
            const pageIndexNumber = Number.parseInt(pageIndex, 10);
            const pageSizeNumber = Number.parseInt(pageSize, 10);
            if (typeof pageIndexNumber !== 'number' || pageIndexNumber < 1)
                throw new Error('pageIndex必须是>=1的整数');
            if (typeof pageSizeNumber !== 'number' || pageSizeNumber < 1)
                throw new Error('pageSize必须是>=1的整数');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWktYWRtaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmVyL2xpYi95aS1hZG1pbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHlEQUFpQztBQUVqQyx3REFBK0I7QUFDL0IsaUVBQTREO0FBQzVELCtCQUErQjtBQUMvQiw4Q0FBc0I7QUFJdEIsbURBQThDO0FBRTlDLG1DQUErQztBQUMvQyxtREFBK0M7QUFDL0MseUVBQW9FO0FBRXBFOztHQUVHO0FBQ0gsTUFBYSxPQUFPO0lBMEJqQixZQUFhLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFPdEM7UUFoQ0Q7OztXQUdHO1FBQ0ssZUFBVSxHQUErQyxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO1lBQ2xGLE1BQU0sSUFBSSxFQUFFLENBQUM7UUFDaEIsQ0FBQyxDQUFBO1FBUUQ7O1dBRUc7UUFDSSxnQkFBVyxHQUFnQixJQUFJLDJCQUFXLENBQUM7WUFDL0MsS0FBSyxFQUFFLE1BQU07U0FDZixDQUFDLENBQUM7UUFFSSxpQkFBWSxHQUFnQixJQUFJLDJCQUFXLENBQUM7WUFDaEQsS0FBSyxFQUFFLFFBQVE7U0FDakIsQ0FBQyxDQUFDO1FBdUZJLG1CQUFjLEdBRWpCLEVBQUUsQ0FBQztRQS9FSixJQUFJLENBQUMsZUFBZSxDQUFDO1lBQ2xCLFlBQVk7U0FDZCxDQUFDLENBQUM7UUFFSCxJQUFJLFVBQVUsRUFBRTtZQUNiLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1NBQy9CO1FBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRXhDLElBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFTyxlQUFlLENBQUUsRUFBRSxZQUFZ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