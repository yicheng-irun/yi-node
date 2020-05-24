import { Model, Document } from 'mongoose';
import { Context } from 'koa';
import ModelAdminBase, { ModelAdminBaseParams, ModelDataItem, DataListRequestBody, DataListResponseBody } from './model-admin-base';
import EditBaseType from './edit-types/edit-base-type';
import ListBaseType from './list-types/list-base-type';
export default class MongooseModelAdmin extends ModelAdminBase {
    model: Model<Document, {}>;
    constructor(options: ModelAdminBaseParams & {
        model: Model<Document, {}>;
    });
    private appendDeleteListAction;
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
}
