import EditBaseType, { EditBaseTypeConfig, EditBaseComponentConfig } from './edit-base-type';
export default class EditNumberType extends EditBaseType {
    /**
     * 前端的组件名称
     */
    componentName: string;
    /**
     * 前端组件的参数
     */
    componentConfig: EditBaseComponentConfig & {
        min?: number;
        max?: number;
        step: number;
    };
    constructor(config: EditBaseTypeConfig & {
        min?: number;
        max?: number;
        step?: number;
    });
}
