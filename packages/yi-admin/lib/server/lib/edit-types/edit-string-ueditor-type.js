"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditStringUEditorType = void 0;
const fs_1 = require("fs");
const mime_1 = __importDefault(require("mime"));
const path_1 = require("path");
const crypto_1 = require("crypto");
const edit_string_textarea_type_1 = require("./edit-string-textarea-type");
const file_writer_1 = require("../../tools/file-writer");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1zdHJpbmctdWVkaXRvci10eXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NlcnZlci9saWIvZWRpdC10eXBlcy9lZGl0LXN0cmluZy11ZWRpdG9yLXR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsMkJBQTJEO0FBRTNELGdEQUF3QjtBQUN4QiwrQkFBcUM7QUFDckMsbUNBQW9DO0FBQ3BDLDJFQUFxRTtBQUVyRSx5REFBdUU7QUFFdkUsNEJBQTRCO0FBQzVCLE1BQU0sYUFBYSxHQUFHO0lBQ25CLGFBQWE7SUFDYixlQUFlLEVBQUUsYUFBYTtJQUM5QixjQUFjLEVBQUUsUUFBUTtJQUN4QixZQUFZLEVBQUUsT0FBTztJQUNyQixlQUFlLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO0lBQzFELG1CQUFtQixFQUFFLElBQUk7SUFDekIsbUJBQW1CLEVBQUUsSUFBSTtJQUN6QixnQkFBZ0IsRUFBRSxNQUFNO0lBQ3hCLGNBQWMsRUFBRSxFQUFFO0lBQ2xCLGVBQWUsRUFBRSwwQ0FBMEM7SUFDM0Qsd0NBQXdDO0lBQ3hDLG1DQUFtQztJQUNuQyxvQkFBb0I7SUFDcEIscUJBQXFCO0lBQ3JCLG1CQUFtQjtJQUNuQixtQkFBbUI7SUFDbkIsbUJBQW1CO0lBQ25CLG1CQUFtQjtJQUNuQixtQkFBbUI7SUFDbkIsa0JBQWtCO0lBQ2xCLDBCQUEwQjtJQUMxQixpRUFBaUU7SUFDakUsZUFBZTtJQUNmLGdCQUFnQixFQUFFLGNBQWM7SUFDaEMsZUFBZSxFQUFFLFFBQVE7SUFDekIsZ0JBQWdCLEVBQUUsMENBQTBDO0lBQzVELGFBQWEsRUFBRSxPQUFPO0lBQ3RCLGVBQWUsRUFBRSxFQUFFO0lBQ25CLGlCQUFpQixFQUFFLE1BQU07SUFFekIsWUFBWTtJQUNaLG9CQUFvQixFQUFFLGFBQWE7SUFDbkMsb0JBQW9CLEVBQUUsMENBQTBD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