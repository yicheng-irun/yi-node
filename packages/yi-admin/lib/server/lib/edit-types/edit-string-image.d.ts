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
        /**
         * 图片的最小宽度(前端校验)
         */
        minWidth?: number;
        /**
         * 图片的最大宽度(前端校验)
         */
        maxWidth?: number;
        /**
         * 图片的最小高度(前端校验)
         */
        minHeight?: number;
        /**
         * 图片的最大高度(前端校验)
         */
        maxHeight?: number;
        /**
         * 允许当图片超过宽高时，自动缩放裁剪
         */
        autoClip: boolean;
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
