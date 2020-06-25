"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLXN0cmluZy1yZWdleHAtdHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvbW9uZ29vc2UvZmlsdGVyLXR5cGVzL2ZpbHRlci1zdHJpbmctcmVnZXhwLXR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw4RUFBeUU7QUFHekU7O0dBRUc7QUFDSCxNQUFhLHNCQUF1QixTQUFRLGlDQUFjO0lBR3ZELFlBQWEsU0FBK0I7UUFDekMsV0FBVyxFQUFFLE1BQU07S0FDckI7UUFDRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFMVixrQkFBYSxHQUFvQixlQUFlLENBQUE7SUFNdkQsQ0FBQztJQUVEOzs7T0FHRztJQUNJLGFBQWEsQ0FBRSxVQUFrQjtRQUdyQyxJQUFJLFVBQVUsRUFBRTtZQUNiLE9BQU87Z0JBQ0osQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDO2FBQzFDLENBQUM7U0FDSjtRQUNELE9BQU8sRUFBRSxDQUFDO0lBQ2IsQ0FBQztDQUNIO0FBdkJELHdEQXVCQyJ9