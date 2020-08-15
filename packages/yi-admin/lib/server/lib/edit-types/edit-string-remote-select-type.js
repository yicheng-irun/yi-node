"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditStringRemoteSelectType = void 0;
const edit_base_type_1 = require("./edit-base-type");
const list_string_remote_select_type_1 = require("../list-types/list-string-remote-select-type");
class EditStringRemoteSelectType extends edit_base_type_1.EditBaseType {
    constructor(config) {
        super(config);
        /**
         * 前端的组件名称
         */
        this.componentName = 'string-remote-select';
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
            const data = options.map((item) => {
                if (typeof item === 'string') {
                    return {
                        value: item,
                        label: item,
                    };
                }
                return item;
            });
            return {
                success: true,
                data,
            };
        }
        if (actionName === 'getLabelByValue') {
            if (this.getLabelByValue) {
                const data = await this.getLabelByValue(actionData);
                return {
                    success: true,
                    data,
                };
            }
            return actionData;
        }
        throw new Error(`接收到非法actionName ${actionName}`);
    }
    getListType() {
        return new list_string_remote_select_type_1.ListStringRemoteSelectType({
            fieldNameAlias: this.fieldNameAlias,
            getLabelByValue: this.getLabelByValue,
        });
    }
}
exports.EditStringRemoteSelectType = EditStringRemoteSelectType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1zdHJpbmctcmVtb3RlLXNlbGVjdC10eXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NlcnZlci9saWIvZWRpdC10eXBlcy9lZGl0LXN0cmluZy1yZW1vdGUtc2VsZWN0LXR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscURBQW9FO0FBQ3BFLGlHQUEwRjtBQXlCMUYsTUFBYSwwQkFBMkIsU0FBUSw2QkFBWTtJQU16RCxZQUFhLE1BQTREO1FBQ3RFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQU5qQjs7V0FFRztRQUNJLGtCQUFhLEdBQUcsc0JBQXNCLENBQUE7UUFLMUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksT0FBTyxNQUFNLENBQUMsVUFBVSxLQUFLLFVBQVUsRUFBRTtZQUNoRSxNQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7U0FDdkM7UUFDRCxJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFFcEMsSUFBSSxNQUFNLENBQUMsZUFBZSxFQUFFO1lBQ3pCLElBQUksT0FBTyxNQUFNLENBQUMsZUFBZSxLQUFLLFVBQVU7Z0JBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQzVGLElBQUksQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQztTQUNoRDtJQUNKLENBQUM7SUFlTSxLQUFLLENBQUMsTUFBTSxDQUFFLFVBQWtCLEVBQUUsVUFBZTtRQUlyRCxJQUFJLFVBQVUsS0FBSyxZQUFZLEVBQUU7WUFDOUIsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2xELE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDL0IsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7b0JBQzNCLE9BQU87d0JBQ0osS0FBSyxFQUFFLElBQUk7d0JBQ1gsS0FBSyxFQUFFLElBQUk7cUJBQ2IsQ0FBQztpQkFDSjtnQkFDRCxPQUFPLElBQUksQ0FBQztZQUNmLENBQUMsQ0FBQyxDQUFDO1lBQ0gsT0FBTztnQkFDSixPQUFPLEVBQUUsSUFBSTtnQkFDYixJQUFJO2FBQ04sQ0FBQztTQUNKO1FBQ0QsSUFBSSxVQUFVLEtBQUssaUJBQWlCLEVBQUU7WUFDbkMsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO2dCQUN2QixNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3BELE9BQU87b0JBQ0osT0FBTyxFQUFFLElBQUk7b0JBQ2IsSUFBSTtpQkFDTixDQUFDO2FBQ0o7WUFDRCxPQUFPLFVBQVUsQ0FBQztTQUNwQjtRQUNELE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVNLFdBQVc7UUFDZixPQUFPLElBQUksMkRBQTBCLENBQUM7WUFDbkMsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjO1lBQ25DLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZTtTQUN2QyxDQUFDLENBQUM7SUFDTixDQUFDO0NBQ0g7QUF4RUQsZ0VBd0VDIn0=