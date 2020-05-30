import { Context } from 'koa';
import { ListBaseType } from '../list-types/list-base-type';
export interface EditBaseTypeConfig {
    required?: boolean;
    /**
     * 字段显示名称，对应表单中的label中的名称
     */
    fieldNameAlias?: string;
    /**
     * 编辑组件的下方的帮助提示文本
     */
    helpText?: string;
}
export interface EditBaseComponentConfig {
    /**
     * 是否必填
     */
    required: boolean;
    helpText: string;
}
export declare class EditBaseType {
    /**
     * 前端的组件名称
     */
    componentName: string;
    /**
     * 字段名称，对应db中的字段名称
     */
    fieldName: string;
    /**
     * 字段显示名称，对应表单中的label中的名称
     */
    fieldNameAlias: string;
    /**
     * 前端组件的参数
     */
    componentConfig: EditBaseComponentConfig;
    constructor(config: EditBaseTypeConfig);
    action(actionName: string, actionData: any, ctx: Context): Promise<any>;
    /**
     * 实现 edit-type 生成对应的 list-type
     */
    getListType(): ListBaseType;
}
