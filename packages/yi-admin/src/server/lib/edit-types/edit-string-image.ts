import { EditBaseComponentConfig } from './edit-base-type';
import { EditStringFileType, EditStringFileTypeConfig } from './edit-string-file';
import { ListBaseType } from '../list-types/list-base-type';
import { ListStringImageType } from '../list-types/list-string-image-type';

export class EditStringImageType extends EditStringFileType {
   /**
    * 前端的组件名称
    */
   public componentName = 'string-image'

   /**
    * 前端组件的参数
    */
   public componentConfig: EditBaseComponentConfig & {
      placeholder: string;
      maxFileSize: number;
      mimeType: string;
      /**
       * max-width: 10em
       * 120px
       */
      listStyleMaxWidth?: string;
      /**
       * max-width: 6em
       * 72px
       */
      listStyleMaxHeight?: string;
   } = {
      ...this.componentConfig,

      mimeType: 'image/*',
   }

   constructor (
      config: EditStringFileTypeConfig & {
         /**
          * max-width: 10em
          * 120px
          */
         listStyleMaxWidth?: string;
         /**
          * max-width: 6em
          * 72px
          */
         listStyleMaxHeight?: string;
      },
   ) {
      super(config);
      if (config.listStyleMaxWidth) {
         this.componentConfig.listStyleMaxWidth = config.listStyleMaxWidth;
      }
      if (config.listStyleMaxHeight) {
         this.componentConfig.listStyleMaxHeight = config.listStyleMaxHeight;
      }
   }

   public getListType (): ListBaseType {
      return new ListStringImageType({
         fieldNameAlias: this.fieldNameAlias,
         styleMaxWidth: this.componentConfig.listStyleMaxWidth,
         styleMaxHeight: this.componentConfig.listStyleMaxHeight,
      });
   }
}
