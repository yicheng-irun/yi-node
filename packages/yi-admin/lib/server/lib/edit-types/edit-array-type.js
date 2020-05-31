"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const edit_base_type_1 = require("./edit-base-type");
const list_array_type_1 = require("../list-types/list-array-type");
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
        this.componentConfig.listStyleInline = config.listStyleInline;
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
    getListType() {
        return new list_array_type_1.ListArrayType({
            fieldNameAlias: this.fieldNameAlias,
            childrenType: this.componentConfig.childrenType.getListType(),
            listStyleInline: this.componentConfig.listStyleInline,
        });
    }
}
exports.EditArrayType = EditArrayType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1hcnJheS10eXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NlcnZlci9saWIvZWRpdC10eXBlcy9lZGl0LWFycmF5LXR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxxREFBNkY7QUFFN0YsbUVBQThEO0FBRTlELE1BQWEsYUFBYyxTQUFRLDZCQUFZO0lBa0M1QyxZQUNHLE1BYUM7UUFFRCxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFqRGpCOztXQUVHO1FBQ0ksa0JBQWEsR0FBRyxPQUFPLENBQUE7UUFFOUI7O1dBRUc7UUFDSSxvQkFBZSxtQ0FvQmhCLElBQUksQ0FBQyxlQUFlLEtBQ3ZCLFNBQVMsRUFBRSxDQUFDLEVBQ1osU0FBUyxFQUFFLFNBQVMsSUFDdEI7UUFtQkUsSUFBSSxPQUFPLE1BQU0sQ0FBQyxTQUFTLEtBQUssUUFBUSxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7U0FDcEQ7UUFDRCxJQUFJLE9BQU8sTUFBTSxDQUFDLFNBQVMsS0FBSyxRQUFRLEVBQUU7WUFDdkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztTQUNwRDtRQUNELElBQUksTUFBTSxDQUFDLFlBQVksWUFBWSw2QkFBWSxFQUFFO1lBQzlDLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUM7U0FDMUQ7YUFBTTtZQUNKLE1BQU0sSUFBSSxLQUFLLENBQUMsc0NBQXNDLENBQUMsQ0FBQztTQUMxRDtRQUNELElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUM7SUFDakUsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksS0FBSyxDQUFDLE1BQU0sQ0FBRSxVQUFrQixFQUFFLFVBQWUsRUFBRSxHQUFZO1FBR25FLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDM0YsT0FBTyxNQUFNLENBQUM7SUFDakIsQ0FBQztJQUVNLFdBQVc7UUFDZixPQUFPLElBQUksK0JBQWEsQ0FBQztZQUN0QixjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWM7WUFDbkMsWUFBWSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRTtZQUM3RCxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlO1NBQ3ZELENBQUMsQ0FBQztJQUNOLENBQUM7Q0FDSDtBQXJGRCxzQ0FxRkMifQ==