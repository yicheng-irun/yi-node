"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filter_base_type_1 = require("../../lib/filter-types/filter-base-type");
/**
 * 字符串搜索类型，不仅可用于字符串字段，也可用于数组内的字符串搜索
 */
class FilterStringSearchType extends filter_base_type_1.FilterBaseType {
    constructor(config = {
        placeholder: '搜索',
    }) {
        super(config);
        this.componentName = 'string-search';
    }
    /**
     * 获取orm框架的查询条件
     * @param fieldParam 前端组件传上来的参数
     */
    getConditions(fieldParam) {
        if (fieldParam) {
            const reg = new RegExp(String(fieldParam).replace(/([*.?+$^[\](){}|\\/])/g, '\\$1'));
            return {
                [this.fieldName]: reg,
            };
        }
        return {};
    }
}
exports.FilterStringSearchType = FilterStringSearchType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLXN0cmluZy1zZWFyY2gtdHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvbW9uZ29vc2UvZmlsdGVyLXR5cGVzL2ZpbHRlci1zdHJpbmctc2VhcmNoLXR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw4RUFBeUU7QUFHekU7O0dBRUc7QUFDSCxNQUFhLHNCQUF1QixTQUFRLGlDQUFjO0lBR3ZELFlBQWEsU0FBK0I7UUFDekMsV0FBVyxFQUFFLElBQUk7S0FDbkI7UUFDRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFMVixrQkFBYSxHQUFvQixlQUFlLENBQUE7SUFNdkQsQ0FBQztJQUVEOzs7T0FHRztJQUNJLGFBQWEsQ0FBRSxVQUFrQjtRQUdyQyxJQUFJLFVBQVUsRUFBRTtZQUNiLE1BQU0sR0FBRyxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsd0JBQXdCLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNyRixPQUFPO2dCQUNKLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUc7YUFDdkIsQ0FBQztTQUNKO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFDYixDQUFDO0NBQ0g7QUF4QkQsd0RBd0JDIn0=