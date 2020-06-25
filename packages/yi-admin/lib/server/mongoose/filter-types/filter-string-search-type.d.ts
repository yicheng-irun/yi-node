import { FilterStringSearchInterface } from '../../lib/filter-types/filter-string-search-interface';
import { FilterBaseType } from '../../lib/filter-types/filter-base-type';
import { FilterBaseTypeConfig } from '../../lib/filter-types/filter-base-interface';
/**
 * 字符串搜索类型，不仅可用于字符串字段，也可用于数组内的字符串搜索
 */
export declare class FilterStringSearchType extends FilterBaseType implements FilterStringSearchInterface {
    componentName: 'string-search';
    constructor(config?: FilterBaseTypeConfig);
    /**
     * 获取orm框架的查询条件
     * @param fieldParam 前端组件传上来的参数
     */
    getConditions(fieldParam: string): {
        [key: string]: RegExp;
    };
}
