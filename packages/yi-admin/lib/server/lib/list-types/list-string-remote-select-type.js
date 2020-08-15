"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListStringRemoteSelectType = void 0;
const list_base_type_1 = require("./list-base-type");
class ListStringRemoteSelectType extends list_base_type_1.ListBaseType {
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
            if (this.getLabelByValue) {
                const data = await this.getLabelByValue(actionData);
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
exports.ListStringRemoteSelectType = ListStringRemoteSelectType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1zdHJpbmctcmVtb3RlLXNlbGVjdC10eXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NlcnZlci9saWIvbGlzdC10eXBlcy9saXN0LXN0cmluZy1yZW1vdGUtc2VsZWN0LXR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscURBQW9FO0FBR3BFLE1BQWEsMEJBQTJCLFNBQVEsNkJBQVk7SUFNekQsWUFBYSxNQUtaO1FBQ0UsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBWGpCOztXQUVHO1FBQ0ksa0JBQWEsR0FBRyxzQkFBc0IsQ0FBQTtRQVMxQyxJQUFJLE1BQU0sQ0FBQyxlQUFlLEVBQUU7WUFDekIsSUFBSSxPQUFPLE1BQU0sQ0FBQyxlQUFlLEtBQUssVUFBVTtnQkFBRSxNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDNUYsSUFBSSxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDO1NBQ2hEO0lBQ0osQ0FBQztJQUlNLEtBQUssQ0FBQyxNQUFNLENBQUUsVUFBa0IsRUFBRSxVQUFlO1FBQ3JELElBQUksVUFBVSxLQUFLLGlCQUFpQixFQUFFO1lBQ25DLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtnQkFDdkIsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNwRCxPQUFPO29CQUNKLE9BQU8sRUFBRSxJQUFJO29CQUNiLElBQUk7aUJBQ04sQ0FBQzthQUNKO1lBQ0QsT0FBTztnQkFDSixPQUFPLEVBQUUsSUFBSTtnQkFDYixJQUFJLEVBQUUsVUFBVTthQUNsQixDQUFDO1NBQ0o7UUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQ3BELENBQUM7Q0FDSDtBQXJDRCxnRUFxQ0MifQ==