"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const mime_1 = __importDefault(require("mime"));
const path_1 = require("path");
const crypto_1 = require("crypto");
const edit_string_textarea_type_1 = require("./edit-string-textarea-type");
const file_writer_1 = require("../tools/file-writer");
/* 前后端通信相关的配置,注释只允许使用多行方式 */
const ueditorConfig = {
    /* 上传图片配置项 */
    imageActionName: 'uploadimage',
    imageFieldName: 'upfile',
    imageMaxSize: 2048000,
    imageAllowFiles: ['.png', '.jpg', '.jpeg', '.gif', '.bmp'],
    imageCompressEnable: true,
    imageCompressBorder: 1600,
    imageInsertAlign: 'none',
    imageUrlPrefix: '',
    imagePathFormat: '/uploads/{yyyy}/{mm}/{dd}/{time}{rand:6}',
    /* {filename} 会替换成原文件名,配置这项需要注意中文乱码问题 */
    /* {rand:6} 会替换成随机数,后面的数字是随机数的位数 */
    /* {time} 会替换成时间戳 */
    /* {yyyy} 会替换成四位年份 */
    /* {yy} 会替换成两位年份 */
    /* {mm} 会替换成两位月份 */
    /* {dd} 会替换成两位日期 */
    /* {hh} 会替换成两位小时 */
    /* {ii} 会替换成两位分钟 */
    /* {ss} 会替换成两位秒 */
    /* 非法字符 \ : * ? ' < > | */
    /* 具请体看线上文档: fex.baidu.com/ueditor/#use-format_upload_filename */
    /* 涂鸦图片上传配置项 */
    scrawlActionName: 'uploadscrawl',
    scrawlFieldName: 'upfile',
    scrawlPathFormat: '/uploads/{yyyy}/{mm}/{dd}/{time}{rand:6}',
    scrawlMaxSize: 2048000,
    scrawlUrlPrefix: '',
    scrawlInsertAlign: 'none',
    /* 截图工具上传 */
    snapscreenActionName: 'uploadimage',
    snapscreenPathFormat: '/uploads/{yyyy}/{mm}/{dd}/{time}{rand:6}',
    snapscreenUrlPrefix: '',
    snapscreenInsertAlign: 'none',
    /* 抓取远程图片配置 */
    catcherLocalDomain: ['127.0.0.1', 'localhost', 'img.baidu.com'],
    catcherActionName: 'catchimage',
    catcherFieldName: 'source',
    catcherPathFormat: '/uploads/{yyyy}/{mm}/{dd}/{time}{rand:6}',
    catcherUrlPrefix: '',
    catcherMaxSize: 2048000,
    catcherAllowFiles: ['.png', '.jpg', '.jpeg', '.gif', '.bmp'],
    /* 上传视频配置 */
    videoActionName: 'uploadvideo',
    videoFieldName: 'upfile',
    videoPathFormat: '/uploads/{yyyy}/{mm}/{dd}/{time}{rand:6}',
    videoUrlPrefix: '',
    videoMaxSize: 102400000,
    videoAllowFiles: [
        '.flv', '.swf', '.mkv', '.avi', '.rm', '.rmvb', '.mpeg', '.mpg',
        '.ogg', '.ogv', '.mov', '.wmv', '.mp4', '.webm', '.mp3', '.wav', '.mid'
    ],
    /* 上传文件配置 */
    fileActionName: 'uploadfile',
    fileFieldName: 'upfile',
    filePathFormat: '/uploads/{yyyy}/{mm}/{dd}/{time}{rand:6}',
    fileUrlPrefix: '',
    fileMaxSize: 51200000,
    fileAllowFiles: [
        '.png', '.jpg', '.jpeg', '.gif', '.bmp',
        '.flv', '.swf', '.mkv', '.avi', '.rm', '.rmvb', '.mpeg', '.mpg',
        '.ogg', '.ogv', '.mov', '.wmv', '.mp4', '.webm', '.mp3', '.wav', '.mid',
        '.rar', '.zip', '.tar', '.gz', '.7z', '.bz2', '.cab', '.iso',
        '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.pdf', '.txt', '.md', '.xml',
    ],
    /* 列出指定目录下的图片 */
    imageManagerActionName: 'listimage',
    imageManagerListPath: '/uploads/',
    imageManagerListSize: 20,
    imageManagerUrlPrefix: '',
    imageManagerInsertAlign: 'none',
    imageManagerAllowFiles: ['.png', '.jpg', '.jpeg', '.gif', '.bmp'],
    /* 列出指定目录下的文件 */
    fileManagerActionName: 'listfile',
    fileManagerListPath: '/uploads/',
    fileManagerUrlPrefix: '',
    fileManagerListSize: 20,
    fileManagerAllowFiles: [
        '.png', '.jpg', '.jpeg', '.gif', '.bmp',
        '.flv', '.swf', '.mkv', '.avi', '.rm', '.rmvb', '.mpeg', '.mpg',
        '.ogg', '.ogv', '.mov', '.wmv', '.mp4', '.webm', '.mp3', '.wav', '.mid',
        '.rar', '.zip', '.tar', '.gz', '.7z', '.bz2', '.cab', '.iso',
        '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.pdf', '.txt', '.md', '.xml',
    ],
};
/**
 * 富文本编辑器类型  UEditor
 */
class EditStringUEditorType extends edit_string_textarea_type_1.EditStringTextareaType {
    constructor(config) {
        super(config);
        /**
         * 前端的组件名称
         */
        this.componentName = 'string-ueditor';
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
        var _a;
        try {
            if (ctx.method === 'GET') {
                if (actionName === 'config') {
                    ctx.body = ueditorConfig;
                    return;
                }
                if (actionName === 'listimage') {
                    ctx.body = {
                        state: 'SUCCESS',
                        list: [],
                        start: 0,
                        total: 0,
                    };
                    return;
                }
                if (actionName === 'listfile') {
                    ctx.body = {
                        state: 'SUCCESS',
                        list: [],
                        start: 0,
                        total: 0,
                    };
                    return;
                }
            }
            else if (ctx.method === 'POST') {
                if (actionName === 'uploadimage' || actionName === 'uploadfile') {
                    const { files } = ctx.request;
                    if (!files)
                        throw new Error('未识别到上传的文件');
                    const file = files === null || files === void 0 ? void 0 : files.upfile;
                    try {
                        console.log(file);
                        const result = await this.writeFile(file);
                        if (!(result === null || result === void 0 ? void 0 : result.url))
                            throw new Error('上传文件失败');
                        ctx.body = {
                            state: 'SUCCESS',
                            url: result.url,
                            title: result.url,
                            original: result.url,
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
                    return;
                }
                if (actionName === 'uploadscrawl') {
                    if ((_a = ctx.request.body) === null || _a === void 0 ? void 0 : _a.upfile) {
                        let file = null;
                        try {
                            const bf = Buffer.from(ctx.request.body.upfile, 'base64');
                            const hash = crypto_1.createHash('md5').update(bf).digest('hex');
                            const name = `${hash}.jpg`;
                            const path = path_1.join(process.cwd(), 'temp', name);
                            file_writer_1.mkdirTraverse(path_1.dirname(path));
                            fs_1.writeFileSync(path, bf);
                            file = {
                                size: bf.length,
                                path,
                                name,
                                type: mime_1.default.getType('.jpg') || '',
                                lastModifiedDate: new Date(),
                                hash,
                            };
                            console.log(file);
                            const result = await this.writeFile(file);
                            if (!(result === null || result === void 0 ? void 0 : result.url))
                                throw new Error('上传文件失败');
                            ctx.body = {
                                state: 'SUCCESS',
                                url: result.url,
                                title: result.url,
                                original: result.url,
                            };
                        }
                        finally {
                            try {
                                // 上传完毕后，清理缓存文件
                                if (file && fs_1.existsSync(file.path)) {
                                    fs_1.unlinkSync(file.path);
                                }
                            }
                            catch (e) {
                                console.error(e);
                            }
                        }
                        return;
                    }
                }
            }
            throw new Error('未知操作');
        }
        catch (e) {
            ctx.body = {
                state: (e === null || e === void 0 ? void 0 : e.message) || e || '出错了',
            };
        }
    }
}
exports.EditStringUEditorType = EditStringUEditorType;
EditStringUEditorType.getFileWriter = file_writer_1.getFileWriter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1zdHJpbmctdWVkaXRvci10eXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NlcnZlci9saWIvZWRpdC10eXBlcy9lZGl0LXN0cmluZy11ZWRpdG9yLXR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwyQkFBMkQ7QUFFM0QsZ0RBQXdCO0FBQ3hCLCtCQUFxQztBQUNyQyxtQ0FBb0M7QUFDcEMsMkVBQXFFO0FBRXJFLHNEQUFvRTtBQUVwRSw0QkFBNEI7QUFDNUIsTUFBTSxhQUFhLEdBQUc7SUFDbkIsYUFBYTtJQUNiLGVBQWUsRUFBRSxhQUFhO0lBQzlCLGNBQWMsRUFBRSxRQUFRO0lBQ3hCLFlBQVksRUFBRSxPQUFPO0lBQ3JCLGVBQWUsRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7SUFDMUQsbUJBQW1CLEVBQUUsSUFBSTtJQUN6QixtQkFBbUIsRUFBRSxJQUFJO0lBQ3pCLGdCQUFnQixFQUFFLE1BQU07SUFDeEIsY0FBYyxFQUFFLEVBQUU7SUFDbEIsZUFBZSxFQUFFLDBDQUEwQztJQUMzRCx3Q0FBd0M7SUFDeEMsbUNBQW1DO0lBQ25DLG9CQUFvQjtJQUNwQixxQkFBcUI7SUFDckIsbUJBQW1CO0lBQ25CLG1CQUFtQjtJQUNuQixtQkFBbUI7SUFDbkIsbUJBQW1CO0lBQ25CLG1CQUFtQjtJQUNuQixrQkFBa0I7SUFDbEIsMEJBQTBCO0lBQzFCLGlFQUFpRTtJQUNqRSxlQUFlO0lBQ2YsZ0JBQWdCLEVBQUUsY0FBYztJQUNoQyxlQUFlLEVBQUUsUUFBUTtJQUN6QixnQkFBZ0IsRUFBRSwwQ0FBMEM7SUFDNUQsYUFBYSxFQUFFLE9BQU87SUFDdEIsZUFBZSxFQUFFLEVBQUU7SUFDbkIsaUJBQWlCLEVBQUUsTUFBTTtJQUV6QixZQUFZO0lBQ1osb0JBQW9CLEVBQUUsYUFBYTtJQUNuQyxvQkFBb0IsRUFBRSwwQ0FBMEM7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