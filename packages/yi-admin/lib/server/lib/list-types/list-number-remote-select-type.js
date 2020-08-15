"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListNumberRemoteSelectType = void 0;
const list_base_type_1 = require("./list-base-type");
class ListNumberRemoteSelectType extends list_base_type_1.ListBaseType {
    constructor(config) {
        super(config);
        /**
         * 前端的组件名称
         */
        this.componentName = 'string-remote-select';
        if (config.getLabelByValue) {
            if (typeof config.getLabelByValue !== 'function')
                throw new Error('getLabelByValue 不是一个函数');
            this.getLabelByValue = config.getLabelByValue;
        }
    }
    async action(actionName, actionData) {
        if (actionName === 'getLabelByValue') {
            const t = Number(actionData);
            if (this.getLabelByValue) {
                const data = await this.getLabelByValue(t);
                return {
                    success: true,
                    data,
                };
            }
            return {
                success: true,
                data: actionData,
            };
        }
        throw new Error(`接收到非法actionName ${actionName}`);
    }
}
exports.ListNumberRemoteSelectType = ListNumberRemoteSelectType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1udW1iZXItcmVtb3RlLXNlbGVjdC10eXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NlcnZlci9saWIvbGlzdC10eXBlcy9saXN0LW51bWJlci1yZW1vdGUtc2VsZWN0LXR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscURBQW9FO0FBR3BFLE1BQWEsMEJBQTJCLFNBQVEsNkJBQVk7SUFNekQsWUFBYSxNQUtaO1FBQ0UsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBWGpCOztXQUVHO1FBQ0ksa0JBQWEsR0FBRyxzQkFBc0IsQ0FBQTtRQVMxQyxJQUFJLE1BQU0sQ0FBQyxlQUFlLEVBQUU7WUFDekIsSUFBSSxPQUFPLE1BQU0sQ0FBQyxlQUFlLEtBQUssVUFBVTtnQkFBRSxNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDNUYsSUFBSSxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDO1NBQ2hEO0lBQ0osQ0FBQztJQUlNLEtBQUssQ0FBQyxNQUFNLENBQUUsVUFBa0IsRUFBRSxVQUFlO1FBQ3JELElBQUksVUFBVSxLQUFLLGlCQUFpQixFQUFFO1lBQ25DLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM3QixJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQ3ZCLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0MsT0FBTztvQkFDSixPQUFPLEVBQUUsSUFBSTtvQkFDYixJQUFJO2lCQUNOLENBQUM7YUFDSjtZQUNELE9BQU87Z0JBQ0osT0FBTyxFQUFFLElBQUk7Z0JBQ2IsSUFBSSxFQUFFLFVBQVU7YUFDbEIsQ0FBQztTQUNKO1FBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUNwRCxDQUFDO0NBQ0g7QUF0Q0QsZ0VBc0NDIn0=