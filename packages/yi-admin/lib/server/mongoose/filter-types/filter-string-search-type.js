"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterStringSearchType = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLXN0cmluZy1zZWFyY2gtdHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvbW9uZ29vc2UvZmlsdGVyLXR5cGVzL2ZpbHRlci1zdHJpbmctc2VhcmNoLXR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsOEVBQXlFO0FBR3pFOztHQUVHO0FBQ0gsTUFBYSxzQkFBdUIsU0FBUSxpQ0FBYztJQUd2RCxZQUFhLFNBQStCO1FBQ3pDLFdBQVcsRUFBRSxJQUFJO0tBQ25CO1FBQ0UsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBTFYsa0JBQWEsR0FBb0IsZUFBZSxDQUFBO0lBTXZELENBQUM7SUFFRDs7O09BR0c7SUFDSSxhQUFhLENBQUUsVUFBa0I7UUFHckMsSUFBSSxVQUFVLEVBQUU7WUFDYixNQUFNLEdBQUcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLHdCQUF3QixFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDckYsT0FBTztnQkFDSixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxHQUFHO2FBQ3ZCLENBQUM7U0FDSjtRQUNELE9BQU8sRUFBRSxDQUFDO0lBQ2IsQ0FBQztDQUNIO0FBeEJELHdEQXdCQyJ9