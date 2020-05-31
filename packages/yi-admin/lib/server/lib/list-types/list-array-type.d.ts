import { Context } from 'koa';
import { ListBaseType, ListBaseTypeConfig } from './list-base-type';
export declare class ListArrayType extends ListBaseType {
    /**
     * 前端的组件名称
     */
    componentName: string;
    /**
     * 前端组件的参数
     */
    componentConfig: ListBaseTypeConfig & {
        /**
         * 数组的子类型
         */
        childrenType: ListBaseType;
        /**
         * 在列表中展示时使用inline的方式
         */
        listStyleInline: boolean;
    };
    constructor(config: ListBaseTypeConfig & {
        /**
         * 数组的子类型
         */
        childrenType: ListBaseType;
        /**
         * 在列表中展示时使用inline的方式
         */
        listStyleInline?: boolean;
    });
    /**
     * 交给子组件去处理
     * @param actionName
     * @param actionData
     * @param ctx
     */
    action(actionName: string, actionData: any, ctx: Context): Promise<{
        url: string;
    }>;
}
