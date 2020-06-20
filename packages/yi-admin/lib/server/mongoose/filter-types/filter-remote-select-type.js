"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filter_base_type_1 = require("../../lib/filter-types/filter-base-type");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLXJlbW90ZS1zZWxlY3QtdHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvbW9uZ29vc2UvZmlsdGVyLXR5cGVzL2ZpbHRlci1yZW1vdGUtc2VsZWN0LXR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSw4RUFBeUU7QUEyQnpFLE1BQWEsc0JBQXVCLFNBQVEsaUNBQWM7SUFVdkQsWUFBYSxTQUVULEVBQUU7UUFDSCxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFaVixrQkFBYSxHQUFvQixlQUFlLENBQUE7UUFFaEQsb0JBQWUsbUNBR2hCLElBQUksQ0FBQyxlQUFlLEtBQ3ZCLFdBQVcsRUFBRSxLQUFLLElBQ3BCO1FBYU0sb0JBQWUsR0FBMEQsQ0FBQyxLQUFnQyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUUzSSxlQUFVLEdBU1QsS0FBSyxFQUFFLE1BQWMsRUFBRSxHQUFZLEVBQUUsVUFBOEIsRUFBRSxFQUFFO1lBQzVFLE1BQU0sT0FBTyxHQUdOLEVBQUUsQ0FBQztZQUNWLE1BQU0sWUFBWSxHQUFHLE1BQU0sVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzVFLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDM0IsT0FBTyxDQUFDLElBQUksQ0FBQztvQkFDVixLQUFLLEVBQUUsSUFBSTtvQkFDWCxLQUFLLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQztpQkFDckIsQ0FBQyxDQUFDO1lBQ04sQ0FBQyxDQUFDLENBQUM7WUFDSCxPQUFPLE9BQU8sQ0FBQztRQUNsQixDQUFDLENBQUE7UUEvQkUsSUFBSSxNQUFNLENBQUMsV0FBVyxLQUFLLElBQUksRUFBRTtZQUM5QixJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7U0FDMUM7UUFDRCxJQUFJLE9BQU8sTUFBTSxDQUFDLGVBQWUsS0FBSyxVQUFVO1lBQUUsSUFBSSxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDO1FBQ2hHLElBQUksT0FBTyxNQUFNLENBQUMsVUFBVSxLQUFLLFVBQVU7WUFBRSxJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7SUFDcEYsQ0FBQztJQTRCRDs7OztPQUlHO0lBQ0ksS0FBSyxDQUFDLE1BQU0sQ0FBRSxVQUFrQixFQUFFLFVBQWUsRUFBRSxHQUFZLEVBQUUsVUFBMEI7UUFJL0YsSUFBSSxVQUFVLEtBQUssWUFBWSxFQUFFO1lBQzlCLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLFVBQWdDLENBQUMsQ0FBQztZQUN6RixPQUFPLE9BQU8sQ0FBQztTQUNqQjtRQUNELElBQUksVUFBVSxLQUFLLGlCQUFpQixFQUFFO1lBQ25DLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtnQkFBRSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7YUFBRTtZQUN0RSxPQUFPLFVBQVUsQ0FBQztTQUNwQjtRQUNELE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUdNLGFBQWEsQ0FBRSxVQUF1RTtRQUcxRixJQUFJLFVBQVUsRUFBRTtZQUNiLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDNUIsSUFBSSxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDeEIsT0FBTzt3QkFDSixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTs0QkFDZixHQUFHLEVBQUUsVUFBVTt5QkFDakI7cUJBQ0gsQ0FBQztpQkFDSjthQUNIO2lCQUFNO2dCQUNKLE9BQU87b0JBQ0osQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsVUFBVTtpQkFDOUIsQ0FBQzthQUNKO1NBQ0g7UUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNiLENBQUM7Q0FDSDtBQXhGRCx3REF3RkMifQ==