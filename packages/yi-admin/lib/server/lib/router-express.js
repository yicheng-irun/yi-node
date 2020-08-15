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
function getBaseRenderSSRParams(yiAdmin, req, res) {
    return {
        assetsPath: url_1.default.resolve(req.baseUrl, '../__yi-admin-assets__/'),
        csrfParam: yiAdmin.options.csrfParamExpress ? yiAdmin.options.csrfParamExpress(req, res) : {},
    };
}
function appendModelAdminRouter(yiAdmin, router) {
    const modelRouter = express_1.default.Router({
        mergeParams: true,
    });
    modelRouter.get('/', async (req, res) => {
        if (res.ssrRender) {
            await res.ssrRender('yi-admin/model-admin-list', getBaseRenderSSRParams(yiAdmin, req, res));
        }
    });
    modelRouter.get('/edit/', async (req, res) => {
        if (res.ssrRender) {
            await res.ssrRender('yi-admin/model-admin-edit', getBaseRenderSSRParams(yiAdmin, req, res));
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
        renderFunctionName: 'ssrRender',
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
        if (res.ssrRender) {
            await res.ssrRender('yi-admin/site', getBaseRenderSSRParams(yiAdmin, req, res));
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