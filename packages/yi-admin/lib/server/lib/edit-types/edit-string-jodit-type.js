"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
    async action(actionName, actionData, ctx) {
        if (actionName === 'uploader') {
            const { files } = ctx.request;
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
            };
        }
        throw new Error(`接收到非法actionName ${actionName}`);
    }
}
exports.EditStringJoditEditorType = EditStringJoditEditorType;
EditStringJoditEditorType.getFileWriter = file_writer_1.getFileWriter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1zdHJpbmctam9kaXQtdHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvbGliL2VkaXQtdHlwZXMvZWRpdC1zdHJpbmctam9kaXQtdHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDJCQUE0QztBQUU1QyxnREFBd0I7QUFDeEIsMkVBQXFFO0FBRXJFLHlEQUF3RDtBQUV4RDs7R0FFRztBQUNILE1BQWEseUJBQTBCLFNBQVEsa0RBQXNCO0lBbUNsRSxZQUNHLE1BeUJDO1FBRUQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBOURqQjs7V0FFRztRQUNJLGtCQUFhLEdBQUcscUJBQXFCLENBQUE7UUFFNUM7O1dBRUc7UUFDSSxvQkFBZSxtQ0FpQmhCLElBQUksQ0FBQyxlQUFlO1lBQ3ZCOztlQUVHO1lBQ0gsV0FBVyxFQUFFLEVBQUUsR0FBRyxJQUFJLEdBQUcsSUFBSSxFQUU3QixRQUFRLEVBQUUsR0FBRyxJQUNmO1FBZ0NFLElBQUksTUFBTSxDQUFDLFdBQVcsS0FBSyxTQUFTLEVBQUU7WUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO1NBQUU7UUFDaEcsSUFBSSxNQUFNLENBQUMsUUFBUSxLQUFLLFNBQVMsRUFBRTtZQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7U0FBRTtRQUV2RixJQUFJLE9BQU8sTUFBTSxDQUFDLFNBQVMsS0FBSyxVQUFVO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQ3BGLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUNyQyxDQUFDO0lBYUQsa0RBQWtEO0lBQzNDLEtBQUssQ0FBQyxNQUFNLENBQUUsVUFBa0IsRUFBRSxVQUFlLEVBQUUsR0FBWTtRQUNuRSxJQUFJLFVBQVUsS0FBSyxVQUFVLEVBQUU7WUFDNUIsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7WUFDOUIsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ25CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3ZCLE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUM7Z0JBQzVCLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDeEIsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUMxQixJQUFJO3dCQUNELDRDQUE0Qzt3QkFDNUMsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUMxQyxJQUFJLEVBQUMsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLEdBQUcsQ0FBQTs0QkFBRSxNQUFNLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUM1QyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDM0I7NEJBQVM7d0JBQ1AsSUFBSTs0QkFDRCxlQUFlOzRCQUNmLElBQUksZUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtnQ0FBRSxlQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOzZCQUFFO3lCQUN2RDt3QkFBQyxPQUFPLENBQUMsRUFBRTs0QkFDVCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3lCQUNuQjtxQkFDSDtpQkFDSDtxQkFBTTtvQkFDSixNQUFNO2lCQUNSO2FBQ0g7WUFDRCxPQUFPO2dCQUNKLEtBQUssRUFBRSxPQUFPO2dCQUNkLElBQUksRUFBRSxFQUFFO2dCQUNSLE9BQU8sRUFBRSxFQUFFO2dCQUNYLFFBQVEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7b0JBQ3pCLE1BQU0sQ0FBQyxHQUFHLGNBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzFCLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7d0JBQzFCLE9BQU8sSUFBSSxDQUFDO3FCQUNkO29CQUNELE9BQU8sS0FBSyxDQUFDO2dCQUNoQixDQUFDLENBQUM7YUFDSixDQUFDO1NBQ0o7UUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQ3BELENBQUM7O0FBM0hKLDhEQThIQztBQURTLHVDQUFhLEdBQUcsMkJBQWEsQ0FBQSJ9