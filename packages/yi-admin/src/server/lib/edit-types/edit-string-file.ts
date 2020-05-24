import { Context } from 'koa';
import { unlinkSync, fstat, existsSync } from 'fs';
import EditBaseType, { EditBaseTypeConfig, EditBaseComponentConfig } from './edit-base-type';

export default class EditStringFileType extends EditBaseType {
   /**
    * 前端的组件名称
    */
   public componentName = 'string-file'

   /**
    * 前端组件的参数
    */
   public componentConfig: EditBaseComponentConfig & {
      placeholder: string;
      maxFileSize: number;
      /**
       * https://www.w3school.com.cn/media/media_mimeref.asp
       */
      mimeType: string;
   } = {
      ...this.componentConfig,
      placeholder: '',
      /**
       * 注意，文件大小限制除了这里进行了限制，同时也受到koa-body这个库的限制
       */
      maxFileSize: 10 * 1000 * 1000,

      mimeType: '*',
   }

   constructor (
      config: EditBaseTypeConfig & {
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
      },
   ) {
      super(config);
      this.componentConfig.placeholder = config.placeholder || '';
      if (config.maxFileSize !== undefined) { this.componentConfig.maxFileSize = config.maxFileSize; }
      if (config.mimeType !== undefined) { this.componentConfig.mimeType = config.mimeType; }

      if (typeof config.writeFile !== 'function') throw new Error('writeFile 必须是一个合适的函数');
      this.writeFile = config.writeFile;
   }

   public writeFile: (file: {
      size: number;
      path: string;
      name: string;
      type: string;
      lastModifiedDate?: Date;
      hash?: string;
  }) => Promise<{
     url: string;
  }>;

   public async action (actionName: string, actionData: any, ctx: Context): Promise<{
      url: string;
   }> {
      if (actionName === 'upload') {
         const { files } = ctx.request;
         if (!files) throw new Error('未识别到上传的文件');
         const file = files?.file;
         try {
            const result = await this.writeFile(file);
            if (!result?.url) throw new Error('上传文件失败');
            return {
               url: result.url,
            };
         } finally {
            try {
               // 上传完毕后，清理缓存文件
               if (existsSync(file.path)) { unlinkSync(file.path); }
            } catch (e) {
               console.error(e);
            }
         }
      }
      throw new Error(`接收到非法actionName ${actionName}`);
   }
}
