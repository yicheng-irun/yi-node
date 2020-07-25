"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterStringRegExpType = void 0;
const filter_base_type_1 = require("../../lib/filter-types/filter-base-type");
/**
 * 允许在输入框中输入一个正则表达式，可以对数组内的项进行搜索
 */
class FilterStringRegExpType extends filter_base_type_1.FilterBaseType {
    constructor(config = {
        placeholder: '正则匹配',
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
            return {
                [this.fieldName]: new RegExp(fieldParam),
            };
        }
        return {};
    }
}
exports.FilterStringRegExpType = FilterStringRegExpType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLXN0cmluZy1yZWdleHAtdHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvbW9uZ29vc2UvZmlsdGVyLXR5cGVzL2ZpbHRlci1zdHJpbmctcmVnZXhwLXR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsOEVBQXlFO0FBR3pFOztHQUVHO0FBQ0gsTUFBYSxzQkFBdUIsU0FBUSxpQ0FBYztJQUd2RCxZQUFhLFNBQStCO1FBQ3pDLFdBQVcsRUFBRSxNQUFNO0tBQ3JCO1FBQ0UsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBTFYsa0JBQWEsR0FBb0IsZUFBZSxDQUFBO0lBTXZELENBQUM7SUFFRDs7O09BR0c7SUFDSSxhQUFhLENBQUUsVUFBa0I7UUFHckMsSUFBSSxVQUFVLEVBQUU7WUFDYixPQUFPO2dCQUNKLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQzthQUMxQyxDQUFDO1NBQ0o7UUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNiLENBQUM7Q0FDSDtBQXZCRCx3REF1QkMifQ==