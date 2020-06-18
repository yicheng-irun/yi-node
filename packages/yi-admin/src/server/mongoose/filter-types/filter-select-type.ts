import { FilterBaseType } from '../../lib/filter-types/filter-base-type';
import { FilterSelectInterface } from '../../lib/filter-types/filter-select-interface';

export class FilterSelectType extends FilterBaseType implements FilterSelectInterface {
   public componentName: 'select' = 'select'
}
