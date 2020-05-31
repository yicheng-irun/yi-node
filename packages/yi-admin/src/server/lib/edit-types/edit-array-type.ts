import { Context } from 'koa';
import { EditBaseType, EditBaseComponentConfig, EditBaseTypeConfig } from './edit-base-type';

export class EditArrayType extends EditBaseType {
   /**
    * 前端的组件名称
    */
   public componentName = 'array'

   /**
    * 前端组件的参数
    */
   public componentConfig: EditBaseComponentConfig & {
      /**
      * 最小长度
      */
      minLength: number;
      /**
      * 最大长度
      */
      maxLength?: number;

      /**
       * 数组的子类型
       */
      childrenType: EditBaseType;
   } = {
      ...this.componentConfig,
      minLength: 0,
      maxLength: undefined,
   }

   constructor (
      config: EditBaseTypeConfig & {
         minLength?: number;
         maxLength?: number;

         /**
          * 数组的子类型
          */
         childrenType: EditBaseType;
      },
   ) {
      super(config);
      if (typeof config.minLength === 'number') {
         this.componentConfig.minLength = config.minLength;
      }
      if (typeof config.maxLength === 'number') {
         this.componentConfig.maxLength = config.maxLength;
      }
      if (config.childrenType instanceof EditBaseType) {
         this.componentConfig.childrenType = config.childrenType;
      } else {
         throw new Error('数组的子类型childrenType 必须是一个EditBaseType');
      }
   }

   /**
    * 交给子组件去处理
    * @param actionName
    * @param actionData
    * @param ctx
    */
   public async action (actionName: string, actionData: any, ctx: Context): Promise<{
      url: string;
   }> {
      const result = await this.componentConfig.childrenType.action(actionName, actionData, ctx);
      return result;
   }
}
