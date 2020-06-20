"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const edit_base_type_1 = require("./edit-base-type");
const list_number_remote_select_type_1 = require("../list-types/list-number-remote-select-type");
class EditNumberRemoteSelectType extends edit_base_type_1.EditBaseType {
    /**
     * 获取可选项
     */
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
        return new list_number_remote_select_type_1.ListNumberRemoteSelectType({
            fieldNameAlias: this.fieldNameAlias,
            getLabelByValue: this.getLabelByValue,
        });
    }
}
exports.EditNumberRemoteSelectType = EditNumberRemoteSelectType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1udW1iZXItcmVtb3RlLXNlbGVjdC10eXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NlcnZlci9saWIvZWRpdC10eXBlcy9lZGl0LW51bWJlci1yZW1vdGUtc2VsZWN0LXR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxREFBb0U7QUFFcEUsaUdBQTBGO0FBRTFGLE1BQWEsMEJBQTJCLFNBQVEsNkJBQVk7SUFNekQ7O09BRUc7SUFDSCxZQUFhLE1BZVQ7UUFDRCxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUF4QmpCOztXQUVHO1FBQ0ksa0JBQWEsR0FBRyxzQkFBc0IsQ0FBQTtRQXVCMUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksT0FBTyxNQUFNLENBQUMsVUFBVSxLQUFLLFVBQVUsRUFBRTtZQUNoRSxNQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7U0FDdkM7UUFDRCxJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFFcEMsSUFBSSxNQUFNLENBQUMsZUFBZSxFQUFFO1lBQ3pCLElBQUksT0FBTyxNQUFNLENBQUMsZUFBZSxLQUFLLFVBQVU7Z0JBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQzVGLElBQUksQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQztTQUNoRDtJQUNKLENBQUM7SUFlTSxLQUFLLENBQUMsTUFBTSxDQUFFLFVBQWtCLEVBQUUsVUFBZTtRQUlyRCxJQUFJLFVBQVUsS0FBSyxZQUFZLEVBQUU7WUFDOUIsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2xELE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUN6QixJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtvQkFDM0IsT0FBTzt3QkFDSixLQUFLLEVBQUUsSUFBSTt3QkFDWCxLQUFLLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQztxQkFDckIsQ0FBQztpQkFDSjtnQkFDRCxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtvQkFDM0IsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN2QixPQUFPO3dCQUNKLEtBQUssRUFBRSxDQUFDO3dCQUNSLEtBQUssRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDO3FCQUNyQixDQUFDO2lCQUNKO2dCQUNELE9BQU8sSUFBSSxDQUFDO1lBQ2YsQ0FBQyxDQUFDLENBQUM7U0FDTDtRQUNELElBQUksVUFBVSxLQUFLLGlCQUFpQixFQUFFO1lBQ25DLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtnQkFBRSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7YUFBRTtZQUN0RSxPQUFPLFVBQVUsQ0FBQztTQUNwQjtRQUNELE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVNLFdBQVc7UUFDZixPQUFPLElBQUksMkRBQTBCLENBQUM7WUFDbkMsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjO1lBQ25DLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZTtTQUN2QyxDQUFDLENBQUM7SUFDTixDQUFDO0NBQ0g7QUF2RkQsZ0VBdUZDIn0=