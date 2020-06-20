import { FilterStringSearchInterface } from '../../lib/filter-types/filter-string-search-interface';
import { FilterBaseType } from '../../lib/filter-types/filter-base-type';
export declare class FilterStringSearchType extends FilterBaseType implements FilterStringSearchInterface {
    componentName: 'string-search';
    /**
     * 获取orm框架的查询条件
     * @param fieldParam 前端组件传上来的参数
     */
    getConditions(fieldParam: string): {
        [key: string]: any;
    };
}
