"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditStringFileType = void 0;
const fs_1 = require("fs");
const edit_base_type_1 = require("./edit-base-type");
const file_writer_1 = require("../../tools/file-writer");
class EditStringFileType extends edit_base_type_1.EditBaseType {
    constructor(config) {
        super(config);
        /**
         * 前端的组件名称
         */
        this.componentName = 'string-file';
        /**
         * 前端组件的参数
         */
        this.componentConfig = Object.assign(Object.assign({}, this.componentConfig), { placeholder: '', 
            /**
             * 注意，文件大小限制除了这里进行了限制，同时也受到koa-body这个库的限制
             */
            maxFileSize: 10 * 1000 * 1000, mimeType: '*' });
        this.componentConfig.placeholder = config.placeholder || '';
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
    async action(actionName, actionData, reqData) {
        if (actionName === 'upload') {
            const { files } = reqData;
            if (!files)
                throw new Error('未识别到上传的文件');
            const file = files === null || files === void 0 ? void 0 : files.file;
            try {
                const result = await this.writeFile(file);
                if (!(result === null || result === void 0 ? void 0 : result.url))
                    throw new Error('上传文件失败');
                return {
                    success: true,
                    data: {
                        url: result.url,
                    },
                };
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
        throw new Error(`接收到非法actionName ${actionName}`);
    }
}
exports.EditStringFileType = EditStringFileType;
EditStringFileType.getFileWriter = file_writer_1.getFileWriter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1zdHJpbmctZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvbGliL2VkaXQtdHlwZXMvZWRpdC1zdHJpbmctZmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwyQkFBNEM7QUFDNUMscURBQTZGO0FBQzdGLHlEQUF3RDtBQThCeEQsTUFBYSxrQkFBbUIsU0FBUSw2QkFBWTtJQTJCakQsWUFDRyxNQUFnQztRQUVoQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUE3QmpCOztXQUVHO1FBQ0ksa0JBQWEsR0FBRyxhQUFhLENBQUE7UUFFcEM7O1dBRUc7UUFDSSxvQkFBZSxtQ0FRaEIsSUFBSSxDQUFDLGVBQWUsS0FDdkIsV0FBVyxFQUFFLEVBQUU7WUFDZjs7ZUFFRztZQUNILFdBQVcsRUFBRSxFQUFFLEdBQUcsSUFBSSxHQUFHLElBQUksRUFFN0IsUUFBUSxFQUFFLEdBQUcsSUFDZjtRQU1FLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDO1FBQzVELElBQUksTUFBTSxDQUFDLFdBQVcsS0FBSyxTQUFTLEVBQUU7WUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO1NBQUU7UUFDaEcsSUFBSSxNQUFNLENBQUMsUUFBUSxLQUFLLFNBQVMsRUFBRTtZQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7U0FBRTtRQUV2RixJQUFJLE9BQU8sTUFBTSxDQUFDLFNBQVMsS0FBSyxVQUFVO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQ3BGLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUNyQyxDQUFDO0lBYU0sS0FBSyxDQUFDLE1BQU0sQ0FBRSxVQUFrQixFQUFFLFVBQWUsRUFBRSxPQUFnQjtRQUd2RSxJQUFJLFVBQVUsS0FBSyxRQUFRLEVBQUU7WUFDMUIsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLE9BQU8sQ0FBQztZQUMxQixJQUFJLENBQUMsS0FBSztnQkFBRSxNQUFNLElBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3pDLE1BQU0sSUFBSSxHQUFHLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxJQUFJLENBQUM7WUFDekIsSUFBSTtnQkFDRCxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzFDLElBQUksRUFBQyxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsR0FBRyxDQUFBO29CQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzVDLE9BQU87b0JBQ0osT0FBTyxFQUFFLElBQUk7b0JBQ2IsSUFBSSxFQUFFO3dCQUNILEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRztxQkFDakI7aUJBQ0gsQ0FBQzthQUNKO29CQUFTO2dCQUNQLElBQUk7b0JBQ0QsZUFBZTtvQkFDZixJQUFJLGVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7d0JBQUUsZUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFBRTtpQkFDdkQ7Z0JBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ1QsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDbkI7YUFDSDtTQUNIO1FBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUNwRCxDQUFDOztBQTVFSixnREErRUM7QUFEUyxnQ0FBYSxHQUFHLDJCQUFhLENBQUEifQ==