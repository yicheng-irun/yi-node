"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    async action(actionName, actionData, ctx) {
        const result = await this.componentConfig.childrenType.action(actionName, actionData, ctx);
        return result;
    }
}
exports.ListArrayType = ListArrayType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1hcnJheS10eXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NlcnZlci9saWIvbGlzdC10eXBlcy9saXN0LWFycmF5LXR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxxREFBb0U7QUFFcEUsTUFBYSxhQUFjLFNBQVEsNkJBQVk7SUF5QjVDLFlBQWEsTUFVWjtRQUNFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQW5DakI7O1dBRUc7UUFDSSxrQkFBYSxHQUFHLE9BQU8sQ0FBQTtRQUU5Qjs7V0FFRztRQUNJLG9CQUFlLG1DQVdoQixJQUFJLENBQUMsZUFBZSxLQUV2QixlQUFlLEVBQUUsS0FBSyxJQUN4QjtRQWNFLElBQUksTUFBTSxDQUFDLFlBQVksWUFBWSw2QkFBWSxFQUFFO1lBQzlDLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUM7U0FDMUQ7YUFBTTtZQUNKLE1BQU0sSUFBSSxLQUFLLENBQUMsc0NBQXNDLENBQUMsQ0FBQztTQUMxRDtRQUVELElBQUksT0FBTyxNQUFNLENBQUMsZUFBZSxLQUFLLFNBQVMsRUFBRTtZQUM5QyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDO1NBQ2hFO0lBQ0osQ0FBQztJQUdEOzs7OztPQUtHO0lBQ0ksS0FBSyxDQUFDLE1BQU0sQ0FBRSxVQUFrQixFQUFFLFVBQWUsRUFBRSxHQUFZO1FBR25FLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDM0YsT0FBTyxNQUFNLENBQUM7SUFDakIsQ0FBQztDQUNIO0FBN0RELHNDQTZEQyJ9