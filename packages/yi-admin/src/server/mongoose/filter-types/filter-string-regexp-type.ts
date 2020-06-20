import { FilterStringSearchInterface } from '../../lib/filter-types/filter-string-search-interface';
import { FilterBaseType } from '../../lib/filter-types/filter-base-type';

/**
 * 允许在输入框中输入一个正则表达式
 */
export class FilterStringRegExpType extends FilterBaseType implements FilterStringSearchInterface {
   public componentName: 'string-search' = 'string-search'

   /**
    * 获取orm框架的查询条件
    * @param fieldParam 前端组件传上来的参数
    */
   public getConditions (fieldParam: string): {
      [key: string]: any;
      } {
      if (fieldParam) {
         return {
            [this.fieldName]: new RegExp(fieldParam),
         };
      }
      return {};
   }
}
