"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterBaseType = void 0;
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
    async action(actionName, actionData, reqData, modelAdmin) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLWJhc2UtdHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvbGliL2ZpbHRlci10eXBlcy9maWx0ZXItYmFzZS10eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQVFBLE1BQWEsY0FBYztJQVd4QixZQUFhLFNBQStCLEVBQUU7UUFKdkMsb0JBQWUsR0FBeUIsRUFFOUMsQ0FBQTtRQUdFLElBQUksTUFBTSxDQUFDLEdBQUcsRUFBRTtZQUNiLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7U0FDeEM7UUFDRCxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQztJQUMvRCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxLQUFLLENBQUMsTUFBTSxDQUFFLFVBQWtCLEVBQUUsVUFBZSxFQUFFLE9BQWdCLEVBQUUsVUFBMEI7UUFDbkcsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsYUFBYSxDQUFFLFVBQWU7UUFHM0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNsQyxDQUFDO0NBQ0g7QUFyQ0Qsd0NBcUNDIn0=