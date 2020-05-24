import { EditBaseComponentConfig } from './edit-base-type';
import EditStringFileType from './edit-string-file';
import ListBaseType from '../list-types/list-base-type';
import ListStringImageType from '../list-types/list-string-image-type';

export default class EditStringImageType extends EditStringFileType {
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
   } = {
      ...this.componentConfig,

      mimeType: 'image/*',
   }

   public getListType (): ListBaseType {
      return new ListStringImageType({
         fieldNameAlias: this.fieldNameAlias,
      });
   }
}
