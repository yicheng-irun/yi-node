import { EditBaseComponentConfig } from './edit-base-type';
import { EditStringFileType, EditStringFileTypeConfig } from './edit-string-file';
import { ListBaseType } from '../list-types/list-base-type';
export declare class EditStringImageType extends EditStringFileType {
    /**
     * 前端的组件名称
     */
    componentName: string;
    /**
     * 前端组件的参数
     */
    componentConfig: EditBaseComponentConfig & {
        placeholder: string;
        maxFileSize: number;
        mimeType: string;
        /**
         * max-width: 10em
         * 120px
         */
        listStyleMaxWidth?: string;
        /**
         * max-width: 6em
         * 72px
         */
        listStyleMaxHeight?: string;
    };
    constructor(config: EditStringFileTypeConfig & {
        /**
         * max-width: 10em
         * 120px
         */
        listStyleMaxWidth?: string;
        /**
         * max-width: 6em
         * 72px
         */
        listStyleMaxHeight?: string;
    });
    getListType(): ListBaseType;
}
