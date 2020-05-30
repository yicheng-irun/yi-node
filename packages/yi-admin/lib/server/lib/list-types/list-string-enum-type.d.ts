import { ListBaseType, ListBaseTypeConfig } from './list-base-type';
export declare class ListStringEnumType extends ListBaseType {
    /**
     * 前端的组件名称
     */
    componentName: string;
    /**
     * 前端组件的参数
     */
    componentConfig: ListBaseTypeConfig & {
        /**
         * 枚举值列表, 当require设置为true时，用户必须选择一个enum，require设置为false时，用户可以不选择
         */
        enum: {
            /**
             * 值
             */
            value: string;
            /**
             * 显示的标签
             */
            label: string;
        }[];
    };
    constructor(config: ListBaseTypeConfig & {
        enum: (string | {
            value: string;
            label: string;
        })[];
    });
}
