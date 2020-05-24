"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const list_base_type_1 = __importDefault(require("./list-base-type"));
class ListStringRemoteSelectType extends list_base_type_1.default {
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
    action(actionName, actionData) {
        if (actionName === 'getLabelByValue') {
            if (this.getLabelByValue) {
                return this.getLabelByValue(actionData);
            }
            return actionData;
        }
        throw new Error(`接收到非法actionName ${actionName}`);
    }
}
exports.default = ListStringRemoteSelectType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1zdHJpbmctcmVtb3RlLXNlbGVjdC10eXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NlcnZlci9saWIvbGlzdC10eXBlcy9saXN0LXN0cmluZy1yZW1vdGUtc2VsZWN0LXR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzRUFBb0U7QUFFcEUsTUFBcUIsMEJBQTJCLFNBQVEsd0JBQVk7SUFNakUsWUFBYSxNQUtaO1FBQ0UsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBWGpCOztXQUVHO1FBQ0ksa0JBQWEsR0FBRyxzQkFBc0IsQ0FBQTtRQVMxQyxJQUFJLE1BQU0sQ0FBQyxlQUFlLEVBQUU7WUFDekIsSUFBSSxPQUFPLE1BQU0sQ0FBQyxlQUFlLEtBQUssVUFBVTtnQkFBRSxNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDNUYsSUFBSSxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDO1NBQ2hEO0lBQ0osQ0FBQztJQUlNLE1BQU0sQ0FBRSxVQUFrQixFQUFFLFVBQWU7UUFDL0MsSUFBSSxVQUFVLEtBQUssaUJBQWlCLEVBQUU7WUFDbkMsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO2dCQUFFLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUFFO1lBQ3RFLE9BQU8sVUFBVSxDQUFDO1NBQ3BCO1FBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUNwRCxDQUFDO0NBQ0g7QUE1QkQsNkNBNEJDIn0=