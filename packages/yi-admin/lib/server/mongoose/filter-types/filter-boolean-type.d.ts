import { FilterSelectType } from './filter-select-type';
import { FilterBaseTypeConfig } from '../../lib/filter-types/filter-base-interface';
export declare class FilterBooleanType extends FilterSelectType {
    constructor(config?: FilterBaseTypeConfig);
    getConditions(fieldParam: string): {
        [key: string]: any;
    };
}
