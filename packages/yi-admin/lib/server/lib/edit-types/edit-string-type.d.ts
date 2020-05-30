import { EditBaseType, EditBaseTypeConfig, EditBaseComponentConfig } from './edit-base-type';
export declare class EditStringType extends EditBaseType {
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
        placeholder: string;
    };
    constructor(config: EditBaseTypeConfig & {
        minLength?: number;
        maxLength?: number;
        placeholder?: string;
    });
}
