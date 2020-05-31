import { Context } from 'koa';
import { EditBaseType, EditBaseComponentConfig, EditBaseTypeConfig } from './edit-base-type';
import { ListBaseType } from '../list-types/list-base-type';
export declare class EditArrayType extends EditBaseType {
    /**
     * 前端的组件名称
     */
    componentName: string;
    /**
     * 前端组件的参数
     */
    componentConfig: EditBaseComponentConfig & {
        /**
        * 最小长度
        */
        minLength: number;
        /**
        * 最大长度
        */
        maxLength?: number;
        /**
         * 数组的子类型
         */
        childrenType: EditBaseType;
        /**
         * 在列表中展示时使用inline的方式
         */
        listStyleInline?: boolean;
    };
    constructor(config: EditBaseTypeConfig & {
        minLength?: number;
        maxLength?: number;
        /**
         * 数组的子类型
         */
        childrenType: EditBaseType;
        /**
         * 设置列表中是否换行
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
    getListType(): ListBaseType;
}
