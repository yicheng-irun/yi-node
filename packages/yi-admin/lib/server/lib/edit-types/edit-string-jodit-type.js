"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditStringJoditEditorType = void 0;
const fs_1 = require("fs");
const mime_1 = __importDefault(require("mime"));
const edit_string_textarea_type_1 = require("./edit-string-textarea-type");
const file_writer_1 = require("../../tools/file-writer");
/**
 * 富文本编辑器类型  jodit
 */
class EditStringJoditEditorType extends edit_string_textarea_type_1.EditStringTextareaType {
    constructor(config) {
        super(config);
        /**
         * 前端的组件名称
         */
        this.componentName = 'string-jodit-editor';
        /**
         * 前端组件的参数
         */
        this.componentConfig = Object.assign(Object.assign({}, this.componentConfig), { 
            /**
             * 注意，文件大小限制除了这里进行了限制，同时也受到koa-body这个库的限制
             */
            maxFileSize: 10 * 1000 * 1000, mimeType: '*' });
        if (config.maxFileSize !== undefined) {
            this.componentConfig.maxFileSize = config.maxFileSize;
        }
        if (config.mimeType !== undefined) {
            this.componentConfig.mimeType = config.mimeType;
        }
        if (typeof config.writeFile !== 'function')
            throw new Error('writeFile 必须是一个合适的函数');
        this.writeFile = config.writeFile;
    }
    // eslint-disable-next-line class-methods-use-this
    async action(actionName, actionData, reqData) {
        if (actionName === 'uploader') {
            const { files } = reqData;
            const results = [];
            for (let i = 0;; i += 1) {
                const fname = `files[${i}]`;
                if (files && files[fname]) {
                    const file = files[fname];
                    try {
                        // eslint-disable-next-line no-await-in-loop
                        const result = await this.writeFile(file);
                        if (!(result === null || result === void 0 ? void 0 : result.url))
                            throw new Error('上传文件失败');
                        results.push(result.url);
                    }
                    finally {
                        try {
                            // 上传完毕后，清理缓存文件
                            if (fs_1.existsSync(file.path)) {
                                fs_1.unlinkSync(file.path);
                            }
                        }
                        catch (e) {
                            console.error(e);
                        }
                    }
                }
                else {
                    break;
                }
            }
            return {
                success: true,
                data: {
                    files: results,
                    path: '',
                    baseurl: '',
                    isImages: results.map((t) => {
                        const a = mime_1.default.getType(t);
                        if (a && /^image\//.test(a)) {
                            return true;
                        }
                        return false;
                    }),
                },
            };
        }
        throw new Error(`接收到非法actionName ${actionName}`);
    }
}
exports.EditStringJoditEditorType = EditStringJoditEditorType;
EditStringJoditEditorType.getFileWriter = file_writer_1.getFileWriter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1zdHJpbmctam9kaXQtdHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvbGliL2VkaXQtdHlwZXMvZWRpdC1zdHJpbmctam9kaXQtdHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSwyQkFBNEM7QUFFNUMsZ0RBQXdCO0FBQ3hCLDJFQUFxRTtBQUVyRSx5REFBd0Q7QUFHeEQ7O0dBRUc7QUFDSCxNQUFhLHlCQUEwQixTQUFRLGtEQUFzQjtJQW1DbEUsWUFDRyxNQXlCQztRQUVELEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQTlEakI7O1dBRUc7UUFDSSxrQkFBYSxHQUFHLHFCQUFxQixDQUFBO1FBRTVDOztXQUVHO1FBQ0ksb0JBQWUsbUNBaUJoQixJQUFJLENBQUMsZUFBZTtZQUN2Qjs7ZUFFRztZQUNILFdBQVcsRUFBRSxFQUFFLEdBQUcsSUFBSSxHQUFHLElBQUksRUFFN0IsUUFBUSxFQUFFLEdBQUcsSUFDZjtRQWdDRSxJQUFJLE1BQU0sQ0FBQyxXQUFXLEtBQUssU0FBUyxFQUFFO1lBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQztTQUFFO1FBQ2hHLElBQUksTUFBTSxDQUFDLFFBQVEsS0FBSyxTQUFTLEVBQUU7WUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1NBQUU7UUFFdkYsSUFBSSxPQUFPLE1BQU0sQ0FBQyxTQUFTLEtBQUssVUFBVTtZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUNwRixJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDckMsQ0FBQztJQWFELGtEQUFrRDtJQUMzQyxLQUFLLENBQUMsTUFBTSxDQUFFLFVBQWtCLEVBQUUsVUFBZSxFQUFFLE9BQWdCO1FBT3ZFLElBQUksVUFBVSxLQUFLLFVBQVUsRUFBRTtZQUM1QixNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsT0FBTyxDQUFDO1lBQzFCLE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNuQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBSSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN2QixNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDO2dCQUM1QixJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ3hCLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDMUIsSUFBSTt3QkFDRCw0Q0FBNEM7d0JBQzVDLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDMUMsSUFBSSxFQUFDLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxHQUFHLENBQUE7NEJBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDNUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQzNCOzRCQUFTO3dCQUNQLElBQUk7NEJBQ0QsZUFBZTs0QkFDZixJQUFJLGVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0NBQUUsZUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs2QkFBRTt5QkFDdkQ7d0JBQUMsT0FBTyxDQUFDLEVBQUU7NEJBQ1QsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDbkI7cUJBQ0g7aUJBQ0g7cUJBQU07b0JBQ0osTUFBTTtpQkFDUjthQUNIO1lBQ0QsT0FBTztnQkFDSixPQUFPLEVBQUUsSUFBSTtnQkFDYixJQUFJLEVBQUU7b0JBQ0gsS0FBSyxFQUFFLE9BQU87b0JBQ2QsSUFBSSxFQUFFLEVBQUU7b0JBQ1IsT0FBTyxFQUFFLEVBQUU7b0JBQ1gsUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTt3QkFDekIsTUFBTSxDQUFDLEdBQUcsY0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDMUIsSUFBSSxDQUFDLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTs0QkFDMUIsT0FBTyxJQUFJLENBQUM7eUJBQ2Q7d0JBQ0QsT0FBTyxLQUFLLENBQUM7b0JBQ2hCLENBQUMsQ0FBQztpQkFDSjthQUNILENBQUM7U0FDSjtRQUNELE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDcEQsQ0FBQzs7QUFwSUosOERBdUlDO0FBRFMsdUNBQWEsR0FBRywyQkFBYSxDQUFBIn0=