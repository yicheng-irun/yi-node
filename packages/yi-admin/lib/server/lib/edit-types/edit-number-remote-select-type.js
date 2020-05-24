"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const edit_base_type_1 = __importDefault(require("./edit-base-type"));
const list_number_remote_select_type_1 = __importDefault(require("../list-types/list-number-remote-select-type"));
class EditNumberRemoteSelectType extends edit_base_type_1.default {
    constructor(config) {
        super(config);
        /**
         * 前端的组件名称
         */
        this.componentName = 'number-remote-select';
        if (!config.getOptions || typeof config.getOptions !== 'function') {
            throw new Error('getOptions 不是一个函数');
        }
        this.getOptions = config.getOptions;
        if (config.getLabelByValue) {
            if (typeof config.getLabelByValue !== 'function')
                throw new Error('getLabelByValue 不是一个函数');
            this.getLabelByValue = config.getLabelByValue;
        }
    }
    async action(actionName, actionData) {
        if (actionName === 'getOptions') {
            const options = await this.getOptions(actionData);
            return options.map((item) => {
                if (typeof item === 'number') {
                    return {
                        value: item,
                        label: String(item),
                    };
                }
                if (typeof item === 'string') {
                    const t = Number(item);
                    return {
                        value: t,
                        label: String(item),
                    };
                }
                return item;
            });
        }
        if (actionName === 'getLabelByValue') {
            if (this.getLabelByValue) {
                return this.getLabelByValue(actionData);
            }
            return actionData;
        }
        throw new Error(`接收到非法actionName ${actionName}`);
    }
    getListType() {
        return new list_number_remote_select_type_1.default({
            fieldNameAlias: this.fieldNameAlias,
            getLabelByValue: this.getLabelByValue,
        });
    }
}
exports.default = EditNumberRemoteSelectType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1udW1iZXItcmVtb3RlLXNlbGVjdC10eXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NlcnZlci9saWIvZWRpdC10eXBlcy9lZGl0LW51bWJlci1yZW1vdGUtc2VsZWN0LXR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzRUFBb0U7QUFFcEUsa0hBQXNGO0FBRXRGLE1BQXFCLDBCQUEyQixTQUFRLHdCQUFZO0lBTWpFLFlBQWEsTUFlVDtRQUNELEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQXJCakI7O1dBRUc7UUFDSSxrQkFBYSxHQUFHLHNCQUFzQixDQUFBO1FBb0IxQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsSUFBSSxPQUFPLE1BQU0sQ0FBQyxVQUFVLEtBQUssVUFBVSxFQUFFO1lBQ2hFLE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztTQUN2QztRQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUVwQyxJQUFJLE1BQU0sQ0FBQyxlQUFlLEVBQUU7WUFDekIsSUFBSSxPQUFPLE1BQU0sQ0FBQyxlQUFlLEtBQUssVUFBVTtnQkFBRSxNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDNUYsSUFBSSxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDO1NBQ2hEO0lBQ0osQ0FBQztJQWVNLEtBQUssQ0FBQyxNQUFNLENBQUUsVUFBa0IsRUFBRSxVQUFlO1FBSXJELElBQUksVUFBVSxLQUFLLFlBQVksRUFBRTtZQUM5QixNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbEQsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ3pCLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO29CQUMzQixPQUFPO3dCQUNKLEtBQUssRUFBRSxJQUFJO3dCQUNYLEtBQUssRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDO3FCQUNyQixDQUFDO2lCQUNKO2dCQUNELElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO29CQUMzQixNQUFNLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3ZCLE9BQU87d0JBQ0osS0FBSyxFQUFFLENBQUM7d0JBQ1IsS0FBSyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUM7cUJBQ3JCLENBQUM7aUJBQ0o7Z0JBQ0QsT0FBTyxJQUFJLENBQUM7WUFDZixDQUFDLENBQUMsQ0FBQztTQUNMO1FBQ0QsSUFBSSxVQUFVLEtBQUssaUJBQWlCLEVBQUU7WUFDbkMsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO2dCQUFFLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUFFO1lBQ3RFLE9BQU8sVUFBVSxDQUFDO1NBQ3BCO1FBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRU0sV0FBVztRQUNmLE9BQU8sSUFBSSx3Q0FBMEIsQ0FBQztZQUNuQyxjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWM7WUFDbkMsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlO1NBQ3ZDLENBQUMsQ0FBQztJQUNOLENBQUM7Q0FDSDtBQXBGRCw2Q0FvRkMifQ==