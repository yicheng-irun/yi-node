import { EditBaseComponentConfig } from './edit-base-type';
import { EditStringFileType } from './edit-string-file';
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
    };
    getListType(): ListBaseType;
}
