import { ListBaseType, ListBaseTypeConfig } from './list-base-type';
export declare class ListStringImageType extends ListBaseType {
    /**
     * 前端的组件名称
     */
    componentName: string;
    /**
     * 前端组件的参数
     */
    componentConfig: ListBaseTypeConfig & {
        /**
         * max-width: 10em
         * 120px
         */
        styleMaxWidth: string;
        /**
         * max-width: 6em
         * 72px
         */
        styleMaxHeight: string;
    };
    constructor(config: ListBaseTypeConfig & {
        /**
         * max-width: 10em
         * 120px
         */
        styleMaxWidth?: string;
        /**
         * max-width: 6em
         * 72px
         */
        styleMaxHeight?: string;
    });
}
