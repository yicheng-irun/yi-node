import { EditBaseType, EditBaseComponentConfig, EditBaseTypeConfig } from './edit-base-type';
export declare class EditObjectType extends EditBaseType {
    /**
     * 前端的组件名称
     */
    componentName: string;
    /**
     * 前端组件的参数
     */
    componentConfig: EditBaseComponentConfig & {
        editFields: EditBaseType[];
    };
    constructor(config: EditBaseTypeConfig & {
        editFields?: EditBaseType[];
    });
}
