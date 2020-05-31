import { Context } from 'koa';
import { EditBaseType, EditBaseTypeConfig, EditBaseComponentConfig } from './edit-base-type';
import { getFileWriter } from '../tools/file-writer';
export declare type EditStringFileTypeConfig = EditBaseTypeConfig & {
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
};
export declare class EditStringFileType extends EditBaseType {
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
        /**
         * https://www.w3school.com.cn/media/media_mimeref.asp
         */
        mimeType: string;
    };
    constructor(config: EditStringFileTypeConfig);
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
    action(actionName: string, actionData: any, ctx: Context): Promise<{
        url: string;
    }>;
    static getFileWriter: typeof getFileWriter;
}
