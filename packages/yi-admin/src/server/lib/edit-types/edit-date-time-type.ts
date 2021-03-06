import { EditBaseType, EditBaseComponentConfig } from './edit-base-type';

export class EditDateTimeType extends EditBaseType {
   /**
    * 前端的组件名称
    */
   public componentName = 'date-time'

   /**
    * 前端组件的参数
    */
   public componentConfig: EditBaseComponentConfig = {
      ...this.componentConfig,
   }
}
