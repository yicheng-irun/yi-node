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
            res.json({
                success: false,
                data: null,
                msg: (_a = e === null || e === void 0 ? void 0 : e.message) !== null && _a !== void 0 ? _a : '',
            });
        }
        if (!res.finished) {
            res.json({
                success: false,
                data: null,
                msg: 'not found',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLWV4cHJlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmVyL2xpYi9yb3V0ZXItZXhwcmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxzREFBZ0Q7QUFDaEQsaUVBQXVGO0FBQ3ZGLCtCQUErQjtBQUMvQiw4Q0FBc0I7QUFDdEIsc0RBQWdDO0FBQ2hDLDJDQUF5RDtBQWV6RCxTQUFTLGlCQUFpQixDQUFFLEdBQW9CO0lBSTdDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDeEMsNERBQTREO1FBQzVELGFBQWE7UUFDYixNQUFNLElBQUksR0FBRyx5QkFBWSxDQUFDLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFVLEVBQUUsTUFBVyxFQUFFLEtBQVksRUFBRSxFQUFFO1lBQ3ZELElBQUksR0FBRyxFQUFFO2dCQUNOLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDWixPQUFPO2FBQ1Q7WUFDRCxXQUFXLENBQUM7Z0JBQ1QsTUFBTTtnQkFDTixLQUFLO2FBQ1AsQ0FBQyxDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztBQUNOLENBQUM7QUFFRCxTQUFTLFFBQVEsQ0FBRSxJQUEwRDtJQUMxRSxPQUFPLEtBQUssRUFBRSxHQUFvQixFQUFFLEdBQXFCLEVBQWlCLEVBQUU7O1FBQ3pFLElBQUk7WUFDRCxNQUFNLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDdkI7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNULEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0JBQ04sT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsR0FBRyxRQUFFLENBQUMsYUFBRCxDQUFDLHVCQUFE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