import { ListBaseTypeConfig, ListBaseType } from './list-base-type';
export declare class ListStringTextareaType extends ListBaseType {
    /**
     * 前端的组件名称
     */
    componentName: string;
    /**
     * 前端组件的参数
     */
    componentConfig: ListBaseTypeConfig & {
        /**
         * default: 200
         */
        styleMaxTextLength: number;
    };
}
