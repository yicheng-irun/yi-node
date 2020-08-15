"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListArrayType = void 0;
const list_base_type_1 = require("./list-base-type");
class ListArrayType extends list_base_type_1.ListBaseType {
    constructor(config) {
        super(config);
        /**
         * 前端的组件名称
         */
        this.componentName = 'array';
        /**
         * 前端组件的参数
         */
        this.componentConfig = Object.assign(Object.assign({}, this.componentConfig), { listStyleInline: false });
        if (config.childrenType instanceof list_base_type_1.ListBaseType) {
            this.componentConfig.childrenType = config.childrenType;
        }
        else {
            throw new Error('数组的子类型childrenType 必须是一个ListBaseType');
        }
        if (typeof config.listStyleInline === 'boolean') {
            this.componentConfig.listStyleInline = config.listStyleInline;
        }
    }
    /**
     * 交给子组件去处理
     * @param actionName
     * @param actionData
     * @param ctx
     */
    async action(actionName, actionData, reqData) {
        const result = await this.componentConfig.childrenType.action(actionName, actionData, reqData);
        return result;
    }
}
exports.ListArrayType = ListArrayType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1hcnJheS10eXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NlcnZlci9saWIvbGlzdC10eXBlcy9saXN0LWFycmF5LXR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEscURBQW9FO0FBR3BFLE1BQWEsYUFBYyxTQUFRLDZCQUFZO0lBeUI1QyxZQUFhLE1BVVo7UUFDRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFuQ2pCOztXQUVHO1FBQ0ksa0JBQWEsR0FBRyxPQUFPLENBQUE7UUFFOUI7O1dBRUc7UUFDSSxvQkFBZSxtQ0FXaEIsSUFBSSxDQUFDLGVBQWUsS0FFdkIsZUFBZSxFQUFFLEtBQUssSUFDeEI7UUFjRSxJQUFJLE1BQU0sQ0FBQyxZQUFZLFlBQVksNkJBQVksRUFBRTtZQUM5QyxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDO1NBQzFEO2FBQU07WUFDSixNQUFNLElBQUksS0FBSyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7U0FDMUQ7UUFFRCxJQUFJLE9BQU8sTUFBTSxDQUFDLGVBQWUsS0FBSyxTQUFTLEVBQUU7WUFDOUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQztTQUNoRTtJQUNKLENBQUM7SUFHRDs7Ozs7T0FLRztJQUNJLEtBQUssQ0FBQyxNQUFNLENBQUUsVUFBa0IsRUFBRSxVQUFlLEVBQUUsT0FBZ0I7UUFDdkUsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMvRixPQUFPLE1BQU0sQ0FBQztJQUNqQixDQUFDO0NBQ0g7QUEzREQsc0NBMkRDIn0=