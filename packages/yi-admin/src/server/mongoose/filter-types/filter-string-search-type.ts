import { FilterStringSearchInterface } from '../../lib/filter-types/filter-string-search-interface';
import { FilterBaseType } from '../../lib/filter-types/filter-base-type';
import { FilterBaseTypeConfig } from '../../lib/filter-types/filter-base-interface';

export class FilterStringSearchType extends FilterBaseType implements FilterStringSearchInterface {
   public componentName: 'string-search' = 'string-search'

   constructor (config: FilterBaseTypeConfig = {
      placeholder: '搜索',
   }) {
      super(config);
   }

   /**
    * 获取orm框架的查询条件
    * @param fieldParam 前端组件传上来的参数
    */
   public getConditions (fieldParam: string): {
      [key: string]: any;
      } {
      if (fieldParam) {
         const reg = new RegExp(String(fieldParam).replace(/([*.?+$^[\](){}|\\/])/g, '\\$1'));
         return {
            [this.fieldName]: reg,
         };
      }
      return {};
   }
}
