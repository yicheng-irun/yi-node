"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FilterBaseType {
    constructor(config = {}) {
        this.componentConfig = {};
        if (config.tip) {
            this.componentConfig.tip = config.tip;
        }
        this.componentConfig.placeholder = config.placeholder || '';
    }
    /**
     * 前端过滤器组件通过这个action来拉取数据
     * @param actionName 操作名称
     * @param actionData 动作数据
     * @param ctx koa Context
     */
    async action(actionName, actionData, ctx, modelAdmin) {
        throw new Error(`接收到非法actionName ${actionName}`);
    }
    /**
     * 获取orm框架的查询条件
     * @param fieldParam 前端组件传上来的参数
     */
    getConditions(fieldParam) {
        throw new Error('请在子类中实现这个函数');
    }
}
exports.FilterBaseType = FilterBaseType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLWJhc2UtdHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvbGliL2ZpbHRlci10eXBlcy9maWx0ZXItYmFzZS10eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBTUEsTUFBYSxjQUFjO0lBV3hCLFlBQWEsU0FBK0IsRUFBRTtRQUp2QyxvQkFBZSxHQUF5QixFQUU5QyxDQUFBO1FBR0UsSUFBSSxNQUFNLENBQUMsR0FBRyxFQUFFO1lBQ2IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQztTQUN4QztRQUNELElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDO0lBQy9ELENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLEtBQUssQ0FBQyxNQUFNLENBQUUsVUFBa0IsRUFBRSxVQUFlLEVBQUUsR0FBWSxFQUFFLFVBQTBCO1FBQy9GLE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVEOzs7T0FHRztJQUNILGFBQWEsQ0FBRSxVQUFlO1FBRzNCLE1BQU0sSUFBSSxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDbEMsQ0FBQztDQUNIO0FBckNELHdDQXFDQyJ9