import { Context } from 'koa';
import { FilterBaseType } from '../../lib/filter-types/filter-base-type';
import { FilterRemoteSelectInterface } from '../../lib/filter-types/filter-remote-select-interface';
import { ModelAdminBase } from '../../lib/model-admin-base';
import { FilterBaseTypeConfig } from '../../lib/filter-types/filter-base-interface';
import { MongooseModelAdmin } from '../mongoose-model-admin';
export interface FilterRemoteSelectTypeParam {
    /**
     * 通过value获取label，用户表单初始化时，传了value给组件但是其实应该显示一个对应的名称
     */
    getLabelByValue?: (value: string | number | boolean) => Promise<string>;
    /**
     * 获取可选项
     */
    getOptions?: (search: string, ctx: Context, modelAdmin: MongooseModelAdmin) => Promise<({
        /**
         * 值
         */
        value: string | number | boolean;
        /**
         * 显示的标签
         */
        label: string;
    })[]>;
}
/**
 * 字符串远程选择类型，也可用于数组内的字符串的选择
 */
export declare class FilterRemoteSelectType extends FilterBaseType implements FilterRemoteSelectInterface {
    componentName: 'remote-select';
    componentConfig: FilterBaseTypeConfig & {
        multiSelect: boolean;
    };
    constructor(config?: FilterBaseTypeConfig & FilterRemoteSelectTypeParam & {
        multiSelect?: boolean;
    });
    getLabelByValue: (value: string | number | boolean) => Promise<string>;
    getOptions: (search: string, ctx: Context, modelAdmin: MongooseModelAdmin) => Promise<({
        /**
         * 值
         */
        value: string | number | boolean;
        /**
         * 显示的标签
         */
        label: string;
    })[]>;
    /**
     * 前端组件依靠这个来获取action
     * @param actionName
     * @param actionData
     */
    action(actionName: string, actionData: any, ctx: Context, modelAdmin: ModelAdminBase): Promise<({
        label: string;
        value: string | number | boolean;
    }[]) | string>;
    getConditions(fieldParam: (string | number | boolean) | (string | number | boolean)[]): {
        [key: string]: any;
    };
}
