import { EditBaseType, EditBaseTypeConfig } from './edit-base-type';
import { ListBaseType } from '../list-types/list-base-type';
import { JsonReturnType } from '../common-types';
export interface EditStringRemoteSelectTypeParam {
    /**
     * 通过value获取label，用户表单初始化时，传了value给组件但是其实应该显示一个对应的名称
     */
    getLabelByValue?: (value: string) => Promise<string>;
    /**
     * 获取可选项
     */
    getOptions?: (search: string) => Promise<({
        /**
         * 值
         */
        value: string;
        /**
         * 显示的标签
         */
        label: string;
    })[]>;
}
export declare class EditStringRemoteSelectType extends EditBaseType {
    /**
     * 前端的组件名称
     */
    componentName: string;
    constructor(config: EditBaseTypeConfig & EditStringRemoteSelectTypeParam);
    getLabelByValue?: (value: string) => Promise<string>;
    getOptions: (search: string) => Promise<(string | {
        /**
         * 值
         */
        value: string;
        /**
         * 显示的标签
         */
        label: string;
    })[]>;
    action(actionName: string, actionData: any): Promise<JsonReturnType<((string | {
        value: string;
        label: string;
    })[]) | string>>;
    getListType(): ListBaseType;
}
