import { EditStringTextareaType } from './edit-string-textarea-type';
import { EditBaseComponentConfig, EditBaseTypeConfig } from './edit-base-type';
import { getFileWriter } from '../../tools/file-writer';
import { ReqData, JsonReturnType } from '../common-types';
/**
 * 富文本编辑器类型  jodit
 */
export declare class EditStringJoditEditorType extends EditStringTextareaType {
    /**
     * 前端的组件名称
     */
    componentName: string;
    /**
     * 前端组件的参数
     */
    componentConfig: EditBaseComponentConfig & {
        placeholder: string;
        /**
         * 最小长度
         */
        minLength: number;
        /**
         * 最大长度
         */
        maxLength?: number;
        maxFileSize: number;
        /**
         * https://www.w3school.com.cn/media/media_mimeref.asp
         */
        mimeType: string;
    };
    constructor(config: EditBaseTypeConfig & {
        minLength?: number;
        maxLength?: number;
        placeholder?: string;
        maxFileSize?: number;
        /**
         * https://www.w3school.com.cn/media/media_mimeref.asp
         */
        mimeType?: string;
        /**
         * 文件上传，使用koa-body，此函数调用完毕后会自动清理掉暂存文件
         */
        writeFile: (file: {
            size: number;
            path: string;
            name: string;
            type: string;
            lastModifiedDate?: Date;
            hash?: string;
        }) => Promise<{
            url: string;
        }>;
    });
    writeFile: (file: {
        size: number;
        path: string;
        name: string;
        type: string;
        lastModifiedDate?: Date;
        hash?: string;
    }) => Promise<{
        url: string;
    }>;
    action(actionName: string, actionData: any, reqData: ReqData): Promise<JsonReturnType<{
        files: string[];
        path: string;
        baseurl: '';
        isImages: boolean[];
    }>>;
    static getFileWriter: typeof getFileWriter;
}
