"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const edit_base_type_1 = require("./edit-base-type");
class EditArrayType extends edit_base_type_1.EditBaseType {
    constructor(config) {
        super(config);
        /**
         * 前端的组件名称
         */
        this.componentName = 'array';
        /**
         * 前端组件的参数
         */
        this.componentConfig = Object.assign(Object.assign({}, this.componentConfig), { minLength: 0, maxLength: undefined });
        if (typeof config.minLength === 'number') {
            this.componentConfig.minLength = config.minLength;
        }
        if (typeof config.maxLength === 'number') {
            this.componentConfig.maxLength = config.maxLength;
        }
        if (config.childrenType instanceof edit_base_type_1.EditBaseType) {
            this.componentConfig.childrenType = config.childrenType;
        }
        else {
            throw new Error('数组的子类型childrenType 必须是一个EditBaseType');
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
exports.EditArrayType = EditArrayType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1hcnJheS10eXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NlcnZlci9saWIvZWRpdC10eXBlcy9lZGl0LWFycmF5LXR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxxREFBNkY7QUFFN0YsTUFBYSxhQUFjLFNBQVEsNkJBQVk7SUE2QjVDLFlBQ0csTUFRQztRQUVELEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQXZDakI7O1dBRUc7UUFDSSxrQkFBYSxHQUFHLE9BQU8sQ0FBQTtRQUU5Qjs7V0FFRztRQUNJLG9CQUFlLG1DQWVoQixJQUFJLENBQUMsZUFBZSxLQUN2QixTQUFTLEVBQUUsQ0FBQyxFQUNaLFNBQVMsRUFBRSxTQUFTLElBQ3RCO1FBY0UsSUFBSSxPQUFPLE1BQU0sQ0FBQyxTQUFTLEtBQUssUUFBUSxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7U0FDcEQ7UUFDRCxJQUFJLE9BQU8sTUFBTSxDQUFDLFNBQVMsS0FBSyxRQUFRLEVBQUU7WUFDdkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztTQUNwRDtRQUNELElBQUksTUFBTSxDQUFDLFlBQVksWUFBWSw2QkFBWSxFQUFFO1lBQzlDLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUM7U0FDMUQ7YUFBTTtZQUNKLE1BQU0sSUFBSSxLQUFLLENBQUMsc0NBQXNDLENBQUMsQ0FBQztTQUMxRDtJQUNKLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLEtBQUssQ0FBQyxNQUFNLENBQUUsVUFBa0IsRUFBRSxVQUFlLEVBQUUsR0FBWTtRQUduRSxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzNGLE9BQU8sTUFBTSxDQUFDO0lBQ2pCLENBQUM7Q0FDSDtBQWxFRCxzQ0FrRUMifQ==