import { FilterStringSearchInterface } from '../../lib/filter-types/filter-string-search-interface';
import { FilterBaseType } from '../../lib/filter-types/filter-base-type';
/**
 * 允许在输入框中输入一个正则表达式
 */
export declare class FilterStringRegExpType extends FilterBaseType implements FilterStringSearchInterface {
    componentName: 'string-search';
    /**
     * 获取orm框架的查询条件
     * @param fieldParam 前端组件传上来的参数
     */
    getConditions(fieldParam: string): {
        [key: string]: any;
    };
}
