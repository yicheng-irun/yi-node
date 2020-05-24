import EditBaseType, { EditBaseComponentConfig } from './edit-base-type';
export default class EditDateTimeType extends EditBaseType {
    /**
     * 前端的组件名称
     */
    componentName: string;
    /**
     * 前端组件的参数
     */
    componentConfig: EditBaseComponentConfig;
}
