"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filter_base_type_1 = require("../../lib/filter-types/filter-base-type");
/**
 * 允许在输入框中输入一个正则表达式
 */
class FilterStringRegExpType extends filter_base_type_1.FilterBaseType {
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
            return {
                [this.fieldName]: new RegExp(fieldParam),
            };
        }
        return {};
    }
}
exports.FilterStringRegExpType = FilterStringRegExpType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLXN0cmluZy1yZWdleHAtdHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvbW9uZ29vc2UvZmlsdGVyLXR5cGVzL2ZpbHRlci1zdHJpbmctcmVnZXhwLXR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw4RUFBeUU7QUFFekU7O0dBRUc7QUFDSCxNQUFhLHNCQUF1QixTQUFRLGlDQUFjO0lBQTFEOztRQUNVLGtCQUFhLEdBQW9CLGVBQWUsQ0FBQTtJQWdCMUQsQ0FBQztJQWRFOzs7T0FHRztJQUNJLGFBQWEsQ0FBRSxVQUFrQjtRQUdyQyxJQUFJLFVBQVUsRUFBRTtZQUNiLE9BQU87Z0JBQ0osQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDO2FBQzFDLENBQUM7U0FDSjtRQUNELE9BQU8sRUFBRSxDQUFDO0lBQ2IsQ0FBQztDQUNIO0FBakJELHdEQWlCQyJ9