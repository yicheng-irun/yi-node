"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const edit_base_type_1 = require("./edit-base-type");
const file_writer_1 = require("../tools/file-writer");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1zdHJpbmctZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvbGliL2VkaXQtdHlwZXMvZWRpdC1zdHJpbmctZmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDJCQUE0QztBQUM1QyxxREFBNkY7QUFDN0Ysc0RBQXFEO0FBNkJyRCxNQUFhLGtCQUFtQixTQUFRLDZCQUFZO0lBMkJqRCxZQUNHLE1BQWdDO1FBRWhDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQTdCakI7O1dBRUc7UUFDSSxrQkFBYSxHQUFHLGFBQWEsQ0FBQTtRQUVwQzs7V0FFRztRQUNJLG9CQUFlLG1DQVFoQixJQUFJLENBQUMsZUFBZSxLQUN2QixXQUFXLEVBQUUsRUFBRTtZQUNmOztlQUVHO1lBQ0gsV0FBVyxFQUFFLEVBQUUsR0FBRyxJQUFJLEdBQUcsSUFBSSxFQUU3QixRQUFRLEVBQUUsR0FBRyxJQUNmO1FBTUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUM7UUFDNUQsSUFBSSxNQUFNLENBQUMsV0FBVyxLQUFLLFNBQVMsRUFBRTtZQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7U0FBRTtRQUNoRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLEtBQUssU0FBUyxFQUFFO1lBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztTQUFFO1FBRXZGLElBQUksT0FBTyxNQUFNLENBQUMsU0FBUyxLQUFLLFVBQVU7WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDcEYsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ3JDLENBQUM7SUFhTSxLQUFLLENBQUMsTUFBTSxDQUFFLFVBQWtCLEVBQUUsVUFBZSxFQUFFLEdBQVk7UUFHbkUsSUFBSSxVQUFVLEtBQUssUUFBUSxFQUFFO1lBQzFCLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDO1lBQzlCLElBQUksQ0FBQyxLQUFLO2dCQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDekMsTUFBTSxJQUFJLEdBQUcsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLElBQUksQ0FBQztZQUN6QixJQUFJO2dCQUNELE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDMUMsSUFBSSxFQUFDLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxHQUFHLENBQUE7b0JBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDNUMsT0FBTztvQkFDSixHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUc7aUJBQ2pCLENBQUM7YUFDSjtvQkFBUztnQkFDUCxJQUFJO29CQUNELGVBQWU7b0JBQ2YsSUFBSSxlQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO3dCQUFFLGVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQUU7aUJBQ3ZEO2dCQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUNULE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ25CO2FBQ0g7U0FDSDtRQUNELE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDcEQsQ0FBQzs7QUF6RUosZ0RBNEVDO0FBRFMsZ0NBQWEsR0FBRywyQkFBYSxDQUFBIn0=