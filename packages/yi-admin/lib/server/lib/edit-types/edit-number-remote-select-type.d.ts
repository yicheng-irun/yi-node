import EditBaseType, { EditBaseTypeConfig } from './edit-base-type';
import ListBaseType from '../list-types/list-base-type';
export default class EditNumberRemoteSelectType extends EditBaseType {
    /**
     * 前端的组件名称
     */
    componentName: string;
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
    action(actionName: string, actionData: any): Promise<((number | {
        value: number;
        label: string;
    })[]) | string>;
    getListType(): ListBaseType;
}
