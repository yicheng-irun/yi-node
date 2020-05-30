"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const edit_base_type_1 = require("./edit-base-type");
const list_number_remote_select_type_1 = require("../list-types/list-number-remote-select-type");
class EditNumberRemoteSelectType extends edit_base_type_1.EditBaseType {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1udW1iZXItcmVtb3RlLXNlbGVjdC10eXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NlcnZlci9saWIvZWRpdC10eXBlcy9lZGl0LW51bWJlci1yZW1vdGUtc2VsZWN0LXR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxREFBb0U7QUFFcEUsaUdBQTBGO0FBRTFGLE1BQWEsMEJBQTJCLFNBQVEsNkJBQVk7SUFNekQsWUFBYSxNQWVUO1FBQ0QsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBckJqQjs7V0FFRztRQUNJLGtCQUFhLEdBQUcsc0JBQXNCLENBQUE7UUFvQjFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxJQUFJLE9BQU8sTUFBTSxDQUFDLFVBQVUsS0FBSyxVQUFVLEVBQUU7WUFDaEUsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1NBQ3ZDO1FBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO1FBRXBDLElBQUksTUFBTSxDQUFDLGVBQWUsRUFBRTtZQUN6QixJQUFJLE9BQU8sTUFBTSxDQUFDLGVBQWUsS0FBSyxVQUFVO2dCQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUM1RixJQUFJLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUM7U0FDaEQ7SUFDSixDQUFDO0lBZU0sS0FBSyxDQUFDLE1BQU0sQ0FBRSxVQUFrQixFQUFFLFVBQWU7UUFJckQsSUFBSSxVQUFVLEtBQUssWUFBWSxFQUFFO1lBQzlCLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNsRCxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDekIsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7b0JBQzNCLE9BQU87d0JBQ0osS0FBSyxFQUFFLElBQUk7d0JBQ1gsS0FBSyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUM7cUJBQ3JCLENBQUM7aUJBQ0o7Z0JBQ0QsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7b0JBQzNCLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDdkIsT0FBTzt3QkFDSixLQUFLLEVBQUUsQ0FBQzt3QkFDUixLQUFLLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQztxQkFDckIsQ0FBQztpQkFDSjtnQkFDRCxPQUFPLElBQUksQ0FBQztZQUNmLENBQUMsQ0FBQyxDQUFDO1NBQ0w7UUFDRCxJQUFJLFVBQVUsS0FBSyxpQkFBaUIsRUFBRTtZQUNuQyxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQUUsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQUU7WUFDdEUsT0FBTyxVQUFVLENBQUM7U0FDcEI7UUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFTSxXQUFXO1FBQ2YsT0FBTyxJQUFJLDJEQUEwQixDQUFDO1lBQ25DLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYztZQUNuQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWU7U0FDdkMsQ0FBQyxDQUFDO0lBQ04sQ0FBQztDQUNIO0FBcEZELGdFQW9GQyJ9