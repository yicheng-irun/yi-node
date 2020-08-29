"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExpressRouter = void 0;
const express_1 = __importDefault(require("express"));
const yi_vue_ssr_middleware_1 = require("yi-vue-ssr-middleware");
const path_1 = require("path");
const url_1 = __importDefault(require("url"));
const co_body_1 = __importDefault(require("co-body"));
const formidable_1 = require("formidable");
function getFieldsAndFiles(req) {
    return new Promise((resolveFunc, reject) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        const form = formidable_1.IncomingForm({ multiples: true });
        form.parse(req, (err, fields, files) => {
            if (err) {
                reject(err);
                return;
            }
            resolveFunc({
                fields,
                files,
            });
        });
    });
}
function safeJson(func) {
    return async (req, res) => {
        var _a;
        try {
            await func(req, res);
        }
        catch (e) {
            console.error(e);
            res.json({
                success: false,
                data: null,
                message: (_a = e === null || e === void 0 ? void 0 : e.message) !== null && _a !== void 0 ? _a : '',
            });
        }
    };
}
function getBaseRenderSSRParams(yiAdmin, req, res, rootPath = '../') {
    return {
        assetsPath: rootPath ? url_1.default.resolve(req.baseUrl, `${rootPath}__yi-admin-assets__/`) : `${req.baseUrl}/__yi-admin-assets__/`,
        csrfParam: yiAdmin.options.csrfParamExpress ? yiAdmin.options.csrfParamExpress(req, res) : {},
    };
}
function appendModelAdminRouter(yiAdmin, router) {
    const modelRouter = express_1.default.Router({
        mergeParams: true,
    });
    modelRouter.get('/', async (req, res) => {
        if (res.yiAdminSSRRender) {
            await res.yiAdminSSRRender('yi-admin/model-admin-list', getBaseRenderSSRParams(yiAdmin, req, res));
        }
    });
    modelRouter.get('/edit/', async (req, res) => {
        if (res.yiAdminSSRRender) {
            await res.yiAdminSSRRender('yi-admin/model-admin-edit', getBaseRenderSSRParams(yiAdmin, req, res));
        }
    });
    // 获取表单编辑页的字段
    modelRouter.get('/edit/fields/', safeJson((req, res) => {
        const { modelName } = req.params;
        const modelAdmin = yiAdmin.modelAdminsMap[modelName];
        const fields = modelAdmin.getEditFormFieldsAfterFilter();
        res.json({
            success: true,
            data: {
                fields,
                modelInfo: {
                    title: modelAdmin.title,
                    name: modelAdmin.name,
                },
            },
        });
    }));
    modelRouter.get('/edit/values/', safeJson(async (req, res) => {
        const { modelName } = req.params;
        const { id } = req.query;
        const values = await yiAdmin.modelAdminsMap[modelName].getEditData(String(id), {
            req, res,
        });
        res.json({
            success: true,
            data: values,
        });
    }));
    // 表单组件的请求
    modelRouter.all('/edit/component-action/', safeJson(async (req, res) => {
        const { modelName } = req.params;
        const fields = yiAdmin.modelAdminsMap[modelName].getEditFormFields();
        const { fieldName, actionName, actionData } = Object.assign(Object.assign({}, req.query), req.body);
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
                method: req.method.toUpperCase(),
                query: req.query,
                body: req.body,
                files: req.files,
            });
            if (result !== undefined) {
                res.json(result);
                return;
            }
        }
        res.json({
            success: false,
            message: '未找到该字段对应的组件',
        });
    }));
    modelRouter.post('/edit/submit/', safeJson(async (req, res) => {
        const { modelName } = req.params;
        const { editId = '', formData = {} } = req.body;
        const value = await yiAdmin.modelAdminsMap[modelName].formSubmit(editId, formData, { req, res });
        res.json({
            success: true,
            data: value,
        });
    }));
    /**
     * 拉取列表页的字段信息
     */
    modelRouter.get('/list/fields/', safeJson((req, res) => {
        const { modelName } = req.params;
        const modelAdmin = yiAdmin.modelAdminsMap[modelName];
        const fields = modelAdmin.getDataListFieldsAfterFilter();
        const filterFields = modelAdmin.getFilterFields();
        res.json({
            success: true,
            data: {
                fields,
                filterFields,
                modelInfo: {
                    title: modelAdmin.title,
                    name: modelAdmin.name,
                },
            },
        });
    }));
    /**
        * 拉取列表页的字段信息
        */
    modelRouter.get('/list/actions/', safeJson((req, res) => {
        const { modelName } = req.params;
        const actions = yiAdmin.modelAdminsMap[modelName].listActions;
        res.json({
            success: true,
            data: actions,
        });
    }));
    // 表单组件的请求
    modelRouter.post('/list/component-action/', safeJson(async (req, res) => {
        const { modelName } = req.params;
        const fields = yiAdmin.modelAdminsMap[modelName].getDataListFields();
        const { fieldName, actionName, actionData } = Object.assign(Object.assign({}, req.query), req.body);
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
                method: req.method.toUpperCase(),
                query: req.query,
                body: req.body,
                files: req.files,
            });
            if (result !== undefined) {
                res.json(result);
            }
            return;
        }
        res.json({
            success: false,
            message: '未找到该字段对应的组件',
        });
    }));
    // filter组件的请求
    modelRouter.post('/list/filter-component-action/', safeJson(async (req, res) => {
        const { modelName } = req.params;
        const fields = yiAdmin.modelAdminsMap[modelName].getFilterFields();
        const { fieldName, actionName, actionData } = Object.assign(Object.assign({}, req.query), req.body);
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
                method: req.method.toUpperCase(),
                query: req.query,
                body: req.body,
                files: req.files,
            }, yiAdmin.modelAdminsMap[modelName]);
            if (result !== undefined) {
                res.json(result);
            }
            return;
        }
        res.json({
            success: false,
            message: '未找到该字段对应的组件',
        });
    }));
    /**
        * 拉取列表页的数据
        */
    modelRouter.get('/list/data/', safeJson(async (req, res) => {
        const { modelName } = req.params;
        const { pageIndex = '1', pageSize = '10', sort = '', filter = '{}', } = req.query;
        const pageIndexNumber = Number.parseInt(String(pageIndex), 10);
        const pageSizeNumber = Number.parseInt(String(pageSize), 10);
        if (typeof pageIndexNumber !== 'number' || pageIndexNumber < 1)
            throw new Error('pageIndex必须是>=1的整数');
        if (typeof pageSizeNumber !== 'number' || pageSizeNumber < 1)
            throw new Error('pageSize必须是>=1的整数');
        const filterData = JSON.parse(String(filter));
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
            sort: String(sort),
            conditions: parsedFilter,
        }, { req, res });
        res.json({
            success: true,
            data: afterFilterData,
        });
    }));
    /**
     * 执行列表操作
     */
    modelRouter.post('/list/action/', safeJson(async (req, res) => {
        const { modelName } = req.params;
        const actions = yiAdmin.modelAdminsMap[modelName].listActions;
        const { actionName = '', idList = [], } = req.body;
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
        res.json({
            success: true,
            data: result || {
                successfulNum: 0,
                failedNum: 0,
            },
        });
    }));
    /**
     * 挂载统一路由
     */
    router.use('/model-admin/:modelName', async (req, res, next) => {
        const { modelName } = req.params;
        if (Object.prototype.hasOwnProperty.call(yiAdmin.modelAdminsMap, modelName)) {
            next();
        }
        else {
            res.sendStatus(404);
        }
    }, modelRouter);
}
function createExpressRouter({ serverOrigin, yiAdmin, }) {
    const router = express_1.default.Router();
    const clientAssetsPath = path_1.resolve(__dirname, '../../../lib/client/assets');
    router.use('/__yi-admin-assets__/assets', express_1.default.static(clientAssetsPath));
    const clientStaticPath = path_1.resolve(__dirname, '../../../static');
    router.use('/__yi-admin-assets__/static', express_1.default.static(clientStaticPath));
    // const bodyMiddleware = bodyParser.json({
    //    limit: '10mb',
    // });
    router.use(async (req, res, next) => {
        var _a;
        if (req.body) {
            next();
            return;
        }
        try {
            const contentType = (_a = req.headers['content-type']) !== null && _a !== void 0 ? _a : '';
            if (/^multipart\/form-data;/.test(contentType)) {
                const t = await getFieldsAndFiles(req);
                req.body = t.fields;
                req.files = t.files;
            }
            else if (/^application\/json/.test(contentType)) {
                req.body = await co_body_1.default.json(req, {
                    limit: '10mb',
                });
            }
        }
        catch (e) {
            next(e);
            return;
        }
        next();
    });
    router.use(yi_vue_ssr_middleware_1.vueSSRExpressMiddleware({
        renderFunctionName: 'yiAdminSSRRender',
        bundlePath: path_1.resolve(__dirname, '../../../lib/server-bundle'),
        serverOrigin,
        isCacheRenderer: process.env.NODE_ENV !== 'development',
    }));
    router.use((req, res, next) => {
        // if (!/\/$/.test(req.path)) { // 使强制加/
        //    res.redirect(req.originalUrl.replace(req.path, () => `${req.path}/`));
        //    return;
        // }
        yiAdmin.permissionExpress(req, res, next);
    });
    router.get('/', async (req, res) => {
        if (res.yiAdminSSRRender) {
            await res.yiAdminSSRRender('yi-admin/site', getBaseRenderSSRParams(yiAdmin, req, res, ''));
        }
    });
    router.get('/site-menu/', safeJson(async (req, res) => {
        res.json({
            success: true,
            data: yiAdmin.siteNavMenu,
        });
    }));
    router.get('/site-config/', safeJson(async (req, res) => {
        res.json({
            success: true,
            data: yiAdmin.siteConfig,
        });
    }));
    appendModelAdminRouter(yiAdmin, router);
    return router;
}
exports.createExpressRouter = createExpressRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLWV4cHJlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmVyL2xpYi9yb3V0ZXItZXhwcmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxzREFBZ0Q7QUFDaEQsaUVBQXVGO0FBQ3ZGLCtCQUErQjtBQUMvQiw4Q0FBc0I7QUFDdEIsc0RBQWdDO0FBQ2hDLDJDQUF5RDtBQWV6RCxTQUFTLGlCQUFpQixDQUFFLEdBQW9CO0lBSTdDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDeEMsNERBQTREO1FBQzVELGFBQWE7UUFDYixNQUFNLElBQUksR0FBRyx5QkFBWSxDQUFDLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFVLEVBQUUsTUFBVyxFQUFFLEtBQVksRUFBRSxFQUFFO1lBQ3ZELElBQUksR0FBRyxFQUFFO2dCQUNOLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDWixPQUFPO2FBQ1Q7WUFDRCxXQUFXLENBQUM7Z0JBQ1QsTUFBTTtnQkFDTixLQUFLO2FBQ1AsQ0FBQyxDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztBQUNOLENBQUM7QUFFRCxTQUFTLFFBQVEsQ0FBRSxJQUEwRDtJQUMxRSxPQUFPLEtBQUssRUFBRSxHQUFvQixFQUFFLEdBQXFCLEVBQWlCLEVBQUU7O1FBQ3pFLElBQUk7WUFDRCxNQUFNLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDdkI7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNULE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakIsR0FBRyxDQUFDLElBQUksQ0FBQztnQkFDTixPQUFPLEVBQUUsS0FBSztnQkFDZCxJQUFJLEVBQUUs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