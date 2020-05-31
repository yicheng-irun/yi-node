import { Context } from 'koa';
import { EditBaseType, EditBaseComponentConfig, EditBaseTypeConfig } from './edit-base-type';
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
    };
    constructor(config: EditBaseTypeConfig & {
        minLength?: number;
        maxLength?: number;
        /**
         * 数组的子类型
         */
        childrenType: EditBaseType;
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
