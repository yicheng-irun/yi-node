"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.ListStringRemoteSelectType = ListStringRemoteSelectType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1zdHJpbmctcmVtb3RlLXNlbGVjdC10eXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NlcnZlci9saWIvbGlzdC10eXBlcy9saXN0LXN0cmluZy1yZW1vdGUtc2VsZWN0LXR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxREFBb0U7QUFFcEUsTUFBYSwwQkFBMkIsU0FBUSw2QkFBWTtJQU16RCxZQUFhLE1BS1o7UUFDRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFYakI7O1dBRUc7UUFDSSxrQkFBYSxHQUFHLHNCQUFzQixDQUFBO1FBUzFDLElBQUksTUFBTSxDQUFDLGVBQWUsRUFBRTtZQUN6QixJQUFJLE9BQU8sTUFBTSxDQUFDLGVBQWUsS0FBSyxVQUFVO2dCQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUM1RixJQUFJLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUM7U0FDaEQ7SUFDSixDQUFDO0lBSU0sTUFBTSxDQUFFLFVBQWtCLEVBQUUsVUFBZTtRQUMvQyxJQUFJLFVBQVUsS0FBSyxpQkFBaUIsRUFBRTtZQUNuQyxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQUUsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQUU7WUFDdEUsT0FBTyxVQUFVLENBQUM7U0FDcEI7UUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQ3BELENBQUM7Q0FDSDtBQTVCRCxnRUE0QkMifQ==