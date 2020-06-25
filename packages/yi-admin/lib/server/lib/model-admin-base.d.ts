import { Context, Next } from 'koa';
import { EditBaseType } from './edit-types/edit-base-type';
import { ListBaseType } from './list-types/list-base-type';
import { ModelAdminListAction } from './model-admin-list-action';
import { FilterBaseType } from './filter-types/filter-base-type';
export interface ModelAdminBaseParams {
    /**
     * 用来判断用户是否有权限
     */
    permission?: (ctx: Context, next: Next) => Promise<void>;
    /**
     * model的name
     */
    name: string;
    /**
     * 标题，通常用于菜单中展示
     */
    title?: string;
    /**
     * 用于出现在表单中的字段，默认是全部，主要通过这个list可控制表单字段的出现顺序
     */
    formFields?: string[];
    /**
     * 优先级比 formFields 高，用于排除在表单中显示的字段
     */
    formFieldsExclude?: string[];
    /**
     * 显示在列表中的字段，默认是全部，可通过这个list可控制列表字段左右顺序
     */
    listFields?: string[];
    /**
     * 优先级比 listFields 高，用于排除在列表页中显示的字段
     */
    listFieldsExclude?: string[];
    /**
     * 列表动作
     */
    listActions?: ModelAdminListAction[];
}
export interface ModelDataItem {
    /**
     * id 是必须项
     */
    id: string;
    values: {
        [key: string]: any;
    };
}
export interface DataListRequestBody {
    /**
     * 分页大小
     */
    pageSize: number;
    /**
     * 分页
     */
    pageIndex: number;
    /**
     * '-id', 'name', '-field'
     */
    sort: string;
    /**
     * 过滤条件
     */
    conditions: {
        [key: string]: any;
    };
}
export interface DataListResponseBody {
    /**
     * 分页大小
     */
    total: number;
    /**
     * 分页
     */
    dataList: ModelDataItem[];
}
export declare class ModelAdminBase {
    /**
     * 判断用户是否有权限
     * 如果没有权限，直接在里侧抛出异常或者返回false
     */
    permission?: (ctx: Context, next: Next) => Promise<void>;
    /**
     * model的name，用户路径中，不能重复，且不能更改
     */
    private $name;
    /**
     * 通常用于菜单中
     */
    title: string;
    /**
     * 列表页中的用户按钮或者批量操作项
     */
    listActions: ModelAdminListAction[];
    /**
     * 用于出现在表单中的字段，默认是全部，主要通过这个list可控制表单字段的出现顺序
     */
    formFields?: string[];
    /**
     * 优先级比 formFields 高，用于排除在表单中显示的字段
     */
    formFieldsExclude?: string[];
    /**
     * 显示在列表中的字段，默认是全部，可通过这个list可控制列表字段左右顺序
     */
    listFields?: string[];
    /**
     * 优先级比 listFields 高，用于排除在列表页中显示的字段
     */
    listFieldsExclude?: string[];
    constructor({ permission, name, listActions, title, formFields, formFieldsExclude, listFields, listFieldsExclude, }: ModelAdminBaseParams);
    /**
     * model的name，用户路径中，不能重复，不能更改
     */
    get name(): string;
    /**
     * 获取表单编辑页的字段列表 [未过滤的]
     */
    getEditFormFields(): EditBaseType[];
    getEditFormFieldsAfterFilter(): EditBaseType[];
    /**
     * edit-form中拉取数据的函数
     */
    getEditData(id: string, ctx: Context): Promise<ModelDataItem>;
    /**
     * 用户提交数据时，编辑时id是非空，新建时id是空的
     * @param id
     * @param forData
     * @param ctx
     */
    formSubmit(id: string, forData: object, ctx: Context): Promise<ModelDataItem>;
    /**
     * 获取列表页字段列表
     */
    getDataListFields(): ListBaseType[];
    getDataListFieldsAfterFilter(): ListBaseType[];
    private getExtraDataListFileds;
    /**
     * data-list中拉取数据的函数
     */
    getDataList(req: DataListRequestBody, ctx: Context): Promise<DataListResponseBody>;
    getDataListAfterFilter(req: DataListRequestBody, ctx: Context): Promise<DataListResponseBody>;
    /**
     * 删除除某一项，用于提供默认的删除功能
     */
    removeItem(id: string, ctx: Context): Promise<void>;
    /**
     * 获取列表页过滤的参数
     */
    getFilterFields(): FilterBaseType[];
}
