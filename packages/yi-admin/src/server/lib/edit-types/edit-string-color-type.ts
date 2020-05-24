import EditBaseType, { EditBaseTypeConfig, EditBaseComponentConfig } from './edit-base-type';

export default class EditStringColorType extends EditBaseType {
   /**
    * 前端的组件名称
    */
   public componentName = 'string-color'

   /**
    * 前端组件的参数
    */
   public componentConfig: EditBaseComponentConfig & {
      /**
       * 是否支持选择透明度
       */
      showAlpha: boolean;

      /**
       * 预定义颜色
       */
      predefine: string[];
   } = {
      ...this.componentConfig,
      showAlpha: true,
      predefine: [],
   }

   constructor (
      config: EditBaseTypeConfig & {
      /**
       * 是否支持选择透明度
       */
      showAlpha?: boolean;

      /**
       * 预定义颜色, ['#fff', '#000]
       */
      predefine?: string[];
      },
   ) {
      super(config);
      if (config.showAlpha !== undefined) {
         this.componentConfig.showAlpha = config.showAlpha;
      }
      if (config.predefine !== undefined) {
         this.componentConfig.predefine = config.predefine;
      }
   }
}
