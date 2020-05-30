"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    async action(actionName, actionData, ctx) {
        if (actionName === 'upload') {
            const { files } = ctx.request;
            if (!files)
                throw new Error('未识别到上传的文件');
            const file = files === null || files === void 0 ? void 0 : files.file;
            try {
                const result = await this.writeFile(file);
                if (!(result === null || result === void 0 ? void 0 : result.url))
                    throw new Error('上传文件失败');
                return {
                    url: result.url,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1zdHJpbmctZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvbGliL2VkaXQtdHlwZXMvZWRpdC1zdHJpbmctZmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDJCQUE0QztBQUM1QyxxREFBNkY7QUFDN0YseURBQXdEO0FBRXhELE1BQWEsa0JBQW1CLFNBQVEsNkJBQVk7SUEyQmpELFlBQ0csTUF3QkM7UUFFRCxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFyRGpCOztXQUVHO1FBQ0ksa0JBQWEsR0FBRyxhQUFhLENBQUE7UUFFcEM7O1dBRUc7UUFDSSxvQkFBZSxtQ0FRaEIsSUFBSSxDQUFDLGVBQWUsS0FDdkIsV0FBVyxFQUFFLEVBQUU7WUFDZjs7ZUFFRztZQUNILFdBQVcsRUFBRSxFQUFFLEdBQUcsSUFBSSxHQUFHLElBQUksRUFFN0IsUUFBUSxFQUFFLEdBQUcsSUFDZjtRQThCRSxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQztRQUM1RCxJQUFJLE1BQU0sQ0FBQyxXQUFXLEtBQUssU0FBUyxFQUFFO1lBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQztTQUFFO1FBQ2hHLElBQUksTUFBTSxDQUFDLFFBQVEsS0FBSyxTQUFTLEVBQUU7WUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1NBQUU7UUFFdkYsSUFBSSxPQUFPLE1BQU0sQ0FBQyxTQUFTLEtBQUssVUFBVTtZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUNwRixJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDckMsQ0FBQztJQWFNLEtBQUssQ0FBQyxNQUFNLENBQUUsVUFBa0IsRUFBRSxVQUFlLEVBQUUsR0FBWTtRQUduRSxJQUFJLFVBQVUsS0FBSyxRQUFRLEVBQUU7WUFDMUIsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7WUFDOUIsSUFBSSxDQUFDLEtBQUs7Z0JBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN6QyxNQUFNLElBQUksR0FBRyxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsSUFBSSxDQUFDO1lBQ3pCLElBQUk7Z0JBQ0QsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMxQyxJQUFJLEVBQUMsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLEdBQUcsQ0FBQTtvQkFBRSxNQUFNLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUM1QyxPQUFPO29CQUNKLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRztpQkFDakIsQ0FBQzthQUNKO29CQUFTO2dCQUNQLElBQUk7b0JBQ0QsZUFBZTtvQkFDZixJQUFJLGVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7d0JBQUUsZUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFBRTtpQkFDdkQ7Z0JBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ1QsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDbkI7YUFDSDtTQUNIO1FBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUNwRCxDQUFDOztBQWpHSixnREFvR0M7QUFEUyxnQ0FBYSxHQUFHLDJCQUFhLENBQUEifQ==