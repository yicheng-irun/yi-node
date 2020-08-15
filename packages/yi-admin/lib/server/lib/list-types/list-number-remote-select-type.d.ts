import { ListBaseType, ListBaseTypeConfig } from './list-base-type';
import { JsonReturnType } from '../common-types';
export declare class ListNumberRemoteSelectType extends ListBaseType {
    /**
     * 前端的组件名称
     */
    componentName: string;
    constructor(config: ListBaseTypeConfig & {
        /**
         * 通过value获取label，用户表单初始化时，传了value给组件但是其实应该显示一个对应的名称
         */
        getLabelByValue?: (value: number) => Promise<string>;
    });
    getLabelByValue?: (value: number) => Promise<string>;
    action(actionName: string, actionData: any): Promise<JsonReturnType<string>>;
}
