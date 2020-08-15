"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditArrayStringTagType = void 0;
const edit_base_type_1 = require("./edit-base-type");
const list_array_string_tag_type_1 = require("../list-types/list-array-string-tag-type");
class EditArrayStringTagType extends edit_base_type_1.EditBaseType {
    constructor(config) {
        super(config);
        /**
         * 前端的组件名称
         */
        this.componentName = 'array-string-tag';
        /**
         * 前端组件的参数
         */
        this.componentConfig = Object.assign(Object.assign({}, this.componentConfig), { minLength: 0, maxLength: undefined });
        this.getTags = (search) => Promise.resolve([String(search).trim()]);
        if (typeof config.minLength === 'number') {
            this.componentConfig.minLength = config.minLength;
        }
        if (typeof config.maxLength === 'number') {
            this.componentConfig.maxLength = config.maxLength;
        }
        this.getTags = config.getTags;
    }
    /**
     * 交给子组件去处理
     * @param actionName
     * @param actionData
     * @param ctx
     */
    async action(actionName, actionData, reqData) {
        if (actionName === 'getTags') {
            return {
                success: true,
                data: this.getTags(actionData),
            };
        }
        throw new Error(`接收到非法actionName ${actionName}`);
    }
    getListType() {
        return new list_array_string_tag_type_1.ListArrayStringTagType({
            fieldNameAlias: this.fieldNameAlias,
        });
    }
}
exports.EditArrayStringTagType = EditArrayStringTagType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1hcnJheS1zdHJpbmctdGFnLXR5cGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmVyL2xpYi9lZGl0LXR5cGVzL2VkaXQtYXJyYXktc3RyaW5nLXRhZy10eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHFEQUE2RjtBQUU3Rix5RkFBa0Y7QUFHbEYsTUFBYSxzQkFBdUIsU0FBUSw2QkFBWTtJQXdCckQsWUFDRyxNQWFDO1FBRUQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBdkNqQjs7V0FFRztRQUNJLGtCQUFhLEdBQUcsa0JBQWtCLENBQUE7UUFFekM7O1dBRUc7UUFDSSxvQkFBZSxtQ0FVaEIsSUFBSSxDQUFDLGVBQWUsS0FDdkIsU0FBUyxFQUFFLENBQUMsRUFDWixTQUFTLEVBQUUsU0FBUyxJQUN0QjtRQTRCTSxZQUFPLEdBQTBDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQTtRQVR6RyxJQUFJLE9BQU8sTUFBTSxDQUFDLFNBQVMsS0FBSyxRQUFRLEVBQUU7WUFDdkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztTQUNwRDtRQUNELElBQUksT0FBTyxNQUFNLENBQUMsU0FBUyxLQUFLLFFBQVEsRUFBRTtZQUN2QyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO1NBQ3BEO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ2pDLENBQUM7SUFJRDs7Ozs7T0FLRztJQUNJLEtBQUssQ0FBQyxNQUFNLENBQUUsVUFBa0IsRUFBRSxVQUFlLEVBQUUsT0FBZ0I7UUFDdkUsSUFBSSxVQUFVLEtBQUssU0FBUyxFQUFFO1lBQzNCLE9BQU87Z0JBQ0osT0FBTyxFQUFFLElBQUk7Z0JBQ2IsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO2FBQ2hDLENBQUM7U0FDSjtRQUNELE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVNLFdBQVc7UUFDZixPQUFPLElBQUksbURBQXNCLENBQUM7WUFDL0IsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjO1NBQ3JDLENBQUMsQ0FBQztJQUNOLENBQUM7Q0FDSDtBQXpFRCx3REF5RUMifQ==