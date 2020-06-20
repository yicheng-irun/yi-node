import { FilterBaseType } from '../../lib/filter-types/filter-base-type';
import { FilterSelectInterface } from '../../lib/filter-types/filter-select-interface';
import { FilterBaseTypeConfig } from '../../lib/filter-types/filter-base-interface';
export declare class FilterSelectType extends FilterBaseType implements FilterSelectInterface {
    componentName: 'select';
    componentConfig: FilterBaseTypeConfig & {
        options: {
            label: string;
            value: string | number;
        }[];
        multiSelect: boolean;
    };
    constructor(config: FilterBaseTypeConfig & {
        options: {
            label: string;
            value: string | number;
        }[];
        multiSelect?: boolean;
    });
    getConditions(fieldParam: (string | number | boolean) | (string | number | boolean)[]): {
        [key: string]: any;
    };
}
