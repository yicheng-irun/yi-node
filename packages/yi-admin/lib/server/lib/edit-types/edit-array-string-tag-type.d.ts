import { EditBaseType, EditBaseComponentConfig, EditBaseTypeConfig } from './edit-base-type';
import { ListBaseType } from '../list-types/list-base-type';
import { ReqData, JsonReturnType } from '../common-types';
export declare class EditArrayStringTagType extends EditBaseType {
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
    };
    constructor(config: EditBaseTypeConfig & {
        /**
         * 最小长度
         */
        minLength?: number;
        /**
         * 最大长度
         */
        maxLength?: number;
        /**
         * 获取标签
         */
        getTags: (search: string) => Promise<string[]>;
    });
    getTags: (search: string) => Promise<string[]>;
    /**
     * 交给子组件去处理
     * @param actionName
     * @param actionData
     * @param ctx
     */
    action(actionName: string, actionData: any, reqData: ReqData): Promise<JsonReturnType>;
    getListType(): ListBaseType;
}
