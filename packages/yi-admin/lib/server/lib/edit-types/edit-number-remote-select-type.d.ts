import { EditBaseType, EditBaseTypeConfig } from './edit-base-type';
import { ListBaseType } from '../list-types/list-base-type';
import { JsonReturnType } from '../common-types';
export declare class EditNumberRemoteSelectType extends EditBaseType {
    /**
     * 前端的组件名称
     */
    componentName: string;
    /**
     * 获取可选项
     */
    constructor(config: EditBaseTypeConfig & {
        /**
         * 通过value获取label，用户表单初始化时，传了value给组件但是其实应该显示一个对应的名称
         */
        getLabelByValue?: (value: number) => Promise<string>;
        getOptions: (search: string) => Promise<(number | {
            /**
             * 值
             */
            value: number;
            /**
             * 显示的标签
             */
            label: string;
        })[]>;
    });
    getLabelByValue?: (value: number) => Promise<string>;
    getOptions: (search: string) => Promise<(number | {
        /**
         * 值
         */
        value: number;
        /**
         * 显示的标签
         */
        label: string;
    })[]>;
    action(actionName: string, actionData: any): Promise<JsonReturnType<((number | {
        value: number;
        label: string;
    })[]) | string>>;
    getListType(): ListBaseType;
}
