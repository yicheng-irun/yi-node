import { FilterBaseInterface, FilterBaseTypeConfig } from './filter-base-interface';


export class FilterBaseType implements FilterBaseInterface {
   public componentName: string;

   public fieldName: string;

   public fieldNameAlias: string;

   public componentConfig: FilterBaseTypeConfig = {

   }

   constructor (config: FilterBaseTypeConfig) {
      if (config.tip) {
         this.componentConfig.tip = config.tip;
      }
   }

   /**
    * 获取orm框架的查询条件
    * @param fieldParam 前端组件传上来的参数
    */
   getConditions: (fieldParam: any) => {
      [key: string]: any;
      } = (fieldParam: any) => {
         throw new Error('请在子类中实现这个函数');
      }
}
