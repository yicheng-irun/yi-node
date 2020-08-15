"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditNumberRemoteSelectType = void 0;
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
            const data = options.map((item) => {
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
        return new list_number_remote_select_type_1.ListNumberRemoteSelectType({
            fieldNameAlias: this.fieldNameAlias,
            getLabelByValue: this.getLabelByValue,
        });
    }
}
exports.EditNumberRemoteSelectType = EditNumberRemoteSelectType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1udW1iZXItcmVtb3RlLXNlbGVjdC10eXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NlcnZlci9saWIvZWRpdC10eXBlcy9lZGl0LW51bWJlci1yZW1vdGUtc2VsZWN0LXR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscURBQW9FO0FBRXBFLGlHQUEwRjtBQUcxRixNQUFhLDBCQUEyQixTQUFRLDZCQUFZO0lBTXpEOztPQUVHO0lBQ0gsWUFBYSxNQWVUO1FBQ0QsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBeEJqQjs7V0FFRztRQUNJLGtCQUFhLEdBQUcsc0JBQXNCLENBQUE7UUF1QjFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxJQUFJLE9BQU8sTUFBTSxDQUFDLFVBQVUsS0FBSyxVQUFVLEVBQUU7WUFDaEUsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1NBQ3ZDO1FBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO1FBRXBDLElBQUksTUFBTSxDQUFDLGVBQWUsRUFBRTtZQUN6QixJQUFJLE9BQU8sTUFBTSxDQUFDLGVBQWUsS0FBSyxVQUFVO2dCQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUM1RixJQUFJLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUM7U0FDaEQ7SUFDSixDQUFDO0lBZU0sS0FBSyxDQUFDLE1BQU0sQ0FBRSxVQUFrQixFQUFFLFVBQWU7UUFJckQsSUFBSSxVQUFVLEtBQUssWUFBWSxFQUFFO1lBQzlCLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNsRCxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQy9CLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO29CQUMzQixPQUFPO3dCQUNKLEtBQUssRUFBRSxJQUFJO3dCQUNYLEtBQUssRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDO3FCQUNyQixDQUFDO2lCQUNKO2dCQUNELElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO29CQUMzQixNQUFNLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3ZCLE9BQU87d0JBQ0osS0FBSyxFQUFFLENBQUM7d0JBQ1IsS0FBSyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUM7cUJBQ3JCLENBQUM7aUJBQ0o7Z0JBQ0QsT0FBTyxJQUFJLENBQUM7WUFDZixDQUFDLENBQUMsQ0FBQztZQUNILE9BQU87Z0JBQ0osT0FBTyxFQUFFLElBQUk7Z0JBQ2IsSUFBSTthQUNOLENBQUM7U0FDSjtRQUNELElBQUksVUFBVSxLQUFLLGlCQUFpQixFQUFFO1lBQ25DLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtnQkFDdkIsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNwRCxPQUFPO29CQUNKLE9BQU8sRUFBRSxJQUFJO29CQUNiLElBQUk7aUJBQ04sQ0FBQzthQUNKO1lBQ0QsT0FBTyxVQUFVLENBQUM7U0FDcEI7UUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFTSxXQUFXO1FBQ2YsT0FBTyxJQUFJLDJEQUEwQixDQUFDO1lBQ25DLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYztZQUNuQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWU7U0FDdkMsQ0FBQyxDQUFDO0lBQ04sQ0FBQztDQUNIO0FBakdELGdFQWlHQyJ9