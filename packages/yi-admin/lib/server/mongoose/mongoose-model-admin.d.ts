import { Model, Document } from 'mongoose';
import { Context } from 'koa';
import { ModelAdminBase, ModelAdminBaseParams, ModelDataItem, DataListRequestBody, DataListResponseBody } from '../lib/model-admin-base';
import { EditBaseType } from '../lib/edit-types/edit-base-type';
import { ListBaseType } from '../lib/list-types/list-base-type';
import { FilterBaseType } from '../lib/filter-types/filter-base-type';
export declare class MongooseModelAdmin extends ModelAdminBase {
    model: Model<Document, {}>;
    constructor(options: ModelAdminBaseParams & {
        model: Model<Document, {}>;
    });
    private appendDeleteListAction;
    /**
     * 全量的表单字段
     */
    getEditFormFields(): EditBaseType[];
    /**
     * edit-form中拉取数据的函数
     */
    getEditData(id: string, ctx: Context): Promise<ModelDataItem>;
    formSubmit(id: string, formData: {
        [key: string]: any;
    }, ctx: Context): Promise<ModelDataItem>;
    /**
     * 获取列表页字段列表
     */
    getDataListFields(): ListBaseType[];
    /**
     * data-list中拉取数据的函数
     */
    getDataList(req: DataListRequestBody, ctx: Context): Promise<DataListResponseBody>;
    removeItem(id: string, ctx: Context): Promise<void>;
    /**
     * 获取列表页过滤的参数
     */
    getFilterFields(): FilterBaseType[];
    /**
     * mongoose 的filter types
     */
    static FilterTypes: {
        FilterBooleanType: typeof import("./filter-types/filter-boolean-type").FilterBooleanType;
        FilterRemoteSelectType: typeof import("./filter-types/filter-remote-select-type").FilterRemoteSelectType;
        FilterSelectType: typeof import("./filter-types/filter-select-type").FilterSelectType;
        FilterStringSearchType: typeof import("./filter-types/filter-string-search-type").FilterStringSearchType;
        FilterStringRegExpType: typeof import("./filter-types/filter-string-regexp-type").FilterStringRegExpType;
    };
}
