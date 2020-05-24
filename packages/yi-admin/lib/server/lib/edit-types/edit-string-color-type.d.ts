import EditBaseType, { EditBaseTypeConfig, EditBaseComponentConfig } from './edit-base-type';
export default class EditStringColorType extends EditBaseType {
    /**
     * 前端的组件名称
     */
    componentName: string;
    /**
     * 前端组件的参数
     */
    componentConfig: EditBaseComponentConfig & {
        /**
         * 是否支持选择透明度
         */
        showAlpha: boolean;
        /**
         * 预定义颜色
         */
        predefine: string[];
    };
    constructor(config: EditBaseTypeConfig & {
        /**
         * 是否支持选择透明度
         */
        showAlpha?: boolean;
        /**
         * 预定义颜色, ['#fff', '#000]
         */
        predefine?: string[];
    });
}
