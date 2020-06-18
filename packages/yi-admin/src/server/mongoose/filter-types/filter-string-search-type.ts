import { FilterStringSearchInterface } from '../../lib/filter-types/filter-string-search-interface';
import { FilterBaseType } from '../../lib/filter-types/filter-base-type';

export class FilterStringSearchType extends FilterBaseType implements FilterStringSearchInterface {
   public componentName: 'string-search' = 'string-search'
}
