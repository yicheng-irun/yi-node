"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filter_base_type_1 = require("../../lib/filter-types/filter-base-type");
class FilterStringSearchType extends filter_base_type_1.FilterBaseType {
    constructor() {
        super(...arguments);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLXN0cmluZy1zZWFyY2gtdHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvbW9uZ29vc2UvZmlsdGVyLXR5cGVzL2ZpbHRlci1zdHJpbmctc2VhcmNoLXR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw4RUFBeUU7QUFFekUsTUFBYSxzQkFBdUIsU0FBUSxpQ0FBYztJQUExRDs7UUFDVSxrQkFBYSxHQUFvQixlQUFlLENBQUE7SUFpQjFELENBQUM7SUFmRTs7O09BR0c7SUFDSSxhQUFhLENBQUUsVUFBa0I7UUFHckMsSUFBSSxVQUFVLEVBQUU7WUFDYixNQUFNLEdBQUcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLHdCQUF3QixFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDckYsT0FBTztnQkFDSixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxHQUFHO2FBQ3ZCLENBQUM7U0FDSjtRQUNELE9BQU8sRUFBRSxDQUFDO0lBQ2IsQ0FBQztDQUNIO0FBbEJELHdEQWtCQyJ9