import { JsonReturnType, ReqData } from '../common-types';
export interface ListBaseTypeConfig {
    /**
     * 字段显示名称，对应表单中的label中的名称
     */
    fieldNameAlias?: string;
}
export declare class ListBaseType {
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
    componentConfig: {};
    constructor(config: ListBaseTypeConfig);
    action(actionName: string, actionData: any, reqData: ReqData): Promise<JsonReturnType>;
}
