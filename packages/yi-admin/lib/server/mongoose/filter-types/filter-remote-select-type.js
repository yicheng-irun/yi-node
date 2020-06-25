"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filter_base_type_1 = require("../../lib/filter-types/filter-base-type");
/**
 * 字符串远程选择类型，也可用于数组内的字符串的选择
 */
class FilterRemoteSelectType extends filter_base_type_1.FilterBaseType {
    constructor(config = {}) {
        super(config);
        this.componentName = 'remote-select';
        this.componentConfig = Object.assign(Object.assign({}, this.componentConfig), { multiSelect: false });
        this.getLabelByValue = (value) => Promise.resolve(`${value}`);
        this.getOptions = async (search, ctx, modelAdmin) => {
            const options = [];
            const distinctData = await modelAdmin.model.distinct(this.fieldName).exec();
            distinctData.forEach((item) => {
                options.push({
                    value: item,
                    label: String(item),
                });
            });
            return options;
        };
        if (config.multiSelect === true) {
            this.componentConfig.multiSelect = true;
        }
        if (typeof config.getLabelByValue === 'function')
            this.getLabelByValue = config.getLabelByValue;
        if (typeof config.getOptions === 'function')
            this.getOptions = config.getOptions;
    }
    /**
     * 前端组件依靠这个来获取action
     * @param actionName
     * @param actionData
     */
    async action(actionName, actionData, ctx, modelAdmin) {
        if (actionName === 'getOptions') {
            const options = await this.getOptions(actionData, ctx, modelAdmin);
            return options;
        }
        if (actionName === 'getLabelByValue') {
            if (this.getLabelByValue) {
                return this.getLabelByValue(actionData);
            }
            return actionData;
        }
        throw new Error(`接收到非法actionName ${actionName}`);
    }
    getConditions(fieldParam) {
        if (fieldParam) {
            if (Array.isArray(fieldParam)) {
                if (fieldParam.length > 0) {
                    return {
                        [this.fieldName]: {
                            $in: fieldParam,
                        },
                    };
                }
            }
            else {
                return {
                    [this.fieldName]: fieldParam,
                };
            }
        }
        return {};
    }
}
exports.FilterRemoteSelectType = FilterRemoteSelectType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLXJlbW90ZS1zZWxlY3QtdHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvbW9uZ29vc2UvZmlsdGVyLXR5cGVzL2ZpbHRlci1yZW1vdGUtc2VsZWN0LXR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSw4RUFBeUU7QUEyQnpFOztHQUVHO0FBQ0gsTUFBYSxzQkFBdUIsU0FBUSxpQ0FBYztJQVV2RCxZQUFhLFNBRVQsRUFBRTtRQUNILEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQVpWLGtCQUFhLEdBQW9CLGVBQWUsQ0FBQTtRQUVoRCxvQkFBZSxtQ0FHaEIsSUFBSSxDQUFDLGVBQWUsS0FDdkIsV0FBVyxFQUFFLEtBQUssSUFDcEI7UUFhTSxvQkFBZSxHQUEwRCxDQUFDLEtBQWdDLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBRTNJLGVBQVUsR0FTVCxLQUFLLEVBQUUsTUFBYyxFQUFFLEdBQVksRUFBRSxVQUE4QixFQUFFLEVBQUU7WUFDNUUsTUFBTSxPQUFPLEdBR04sRUFBRSxDQUFDO1lBQ1YsTUFBTSxZQUFZLEdBQUcsTUFBTSxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDNUUsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUMzQixPQUFPLENBQUMsSUFBSSxDQUFDO29CQUNWLEtBQUssRUFBRSxJQUFJO29CQUNYLEtBQUssRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDO2lCQUNyQixDQUFDLENBQUM7WUFDTixDQUFDLENBQUMsQ0FBQztZQUNILE9BQU8sT0FBTyxDQUFDO1FBQ2xCLENBQUMsQ0FBQTtRQS9CRSxJQUFJLE1BQU0sQ0FBQyxXQUFXLEtBQUssSUFBSSxFQUFFO1lBQzlCLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztTQUMxQztRQUNELElBQUksT0FBTyxNQUFNLENBQUMsZUFBZSxLQUFLLFVBQVU7WUFBRSxJQUFJLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUM7UUFDaEcsSUFBSSxPQUFPLE1BQU0sQ0FBQyxVQUFVLEtBQUssVUFBVTtZQUFFLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztJQUNwRixDQUFDO0lBNEJEOzs7O09BSUc7SUFDSSxLQUFLLENBQUMsTUFBTSxDQUFFLFVBQWtCLEVBQUUsVUFBZSxFQUFFLEdBQVksRUFBRSxVQUEwQjtRQUkvRixJQUFJLFVBQVUsS0FBSyxZQUFZLEVBQUU7WUFDOUIsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUUsVUFBZ0MsQ0FBQyxDQUFDO1lBQ3pGLE9BQU8sT0FBTyxDQUFDO1NBQ2pCO1FBQ0QsSUFBSSxVQUFVLEtBQUssaUJBQWlCLEVBQUU7WUFDbkMsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO2dCQUFFLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUFFO1lBQ3RFLE9BQU8sVUFBVSxDQUFDO1NBQ3BCO1FBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBR00sYUFBYSxDQUFFLFVBQXVFO1FBRzFGLElBQUksVUFBVSxFQUFFO1lBQ2IsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUM1QixJQUFJLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUN4QixPQUFPO3dCQUNKLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFOzRCQUNmLEdBQUcsRUFBRSxVQUFVO3lCQUNqQjtxQkFDSCxDQUFDO2lCQUNKO2FBQ0g7aUJBQU07Z0JBQ0osT0FBTztvQkFDSixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxVQUFVO2lCQUM5QixDQUFDO2FBQ0o7U0FDSDtRQUNELE9BQU8sRUFBRSxDQUFDO0lBQ2IsQ0FBQztDQUNIO0FBeEZELHdEQXdGQyJ9