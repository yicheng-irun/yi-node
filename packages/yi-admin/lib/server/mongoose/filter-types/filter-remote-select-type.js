"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterRemoteSelectType = void 0;
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
        this.getOptions = async (search, reqData, modelAdmin) => {
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
    async action(actionName, actionData, reqData, modelAdmin) {
        if (actionName === 'getOptions') {
            const options = await this.getOptions(actionData, reqData, modelAdmin);
            return {
                success: true,
                data: options,
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
            return {
                success: true,
                data: actionData,
            };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLXJlbW90ZS1zZWxlY3QtdHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvbW9uZ29vc2UvZmlsdGVyLXR5cGVzL2ZpbHRlci1yZW1vdGUtc2VsZWN0LXR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsOEVBQXlFO0FBNEJ6RTs7R0FFRztBQUNILE1BQWEsc0JBQXVCLFNBQVEsaUNBQWM7SUFVdkQsWUFBYSxTQUVULEVBQUU7UUFDSCxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFaVixrQkFBYSxHQUFvQixlQUFlLENBQUE7UUFFaEQsb0JBQWUsbUNBR2hCLElBQUksQ0FBQyxlQUFlLEtBQ3ZCLFdBQVcsRUFBRSxLQUFLLElBQ3BCO1FBYU0sb0JBQWUsR0FBMEQsQ0FBQyxLQUFnQyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUUzSSxlQUFVLEdBU1QsS0FBSyxFQUFFLE1BQWMsRUFBRSxPQUFnQixFQUFFLFVBQThCLEVBQUUsRUFBRTtZQUNoRixNQUFNLE9BQU8sR0FHTixFQUFFLENBQUM7WUFDVixNQUFNLFlBQVksR0FBRyxNQUFNLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUM1RSxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQzNCLE9BQU8sQ0FBQyxJQUFJLENBQUM7b0JBQ1YsS0FBSyxFQUFFLElBQUk7b0JBQ1gsS0FBSyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUM7aUJBQ3JCLENBQUMsQ0FBQztZQUNOLENBQUMsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxPQUFPLENBQUM7UUFDbEIsQ0FBQyxDQUFBO1FBL0JFLElBQUksTUFBTSxDQUFDLFdBQVcsS0FBSyxJQUFJLEVBQUU7WUFDOUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1NBQzFDO1FBQ0QsSUFBSSxPQUFPLE1BQU0sQ0FBQyxlQUFlLEtBQUssVUFBVTtZQUFFLElBQUksQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQztRQUNoRyxJQUFJLE9BQU8sTUFBTSxDQUFDLFVBQVUsS0FBSyxVQUFVO1lBQUUsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO0lBQ3BGLENBQUM7SUE0QkQ7Ozs7T0FJRztJQUNJLEtBQUssQ0FBQyxNQUFNLENBQUUsVUFBa0IsRUFBRSxVQUFlLEVBQUUsT0FBZ0IsRUFBRSxVQUEwQjtRQUluRyxJQUFJLFVBQVUsS0FBSyxZQUFZLEVBQUU7WUFDOUIsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsVUFBZ0MsQ0FBQyxDQUFDO1lBQzdGLE9BQU87Z0JBQ0osT0FBTyxFQUFFLElBQUk7Z0JBQ2IsSUFBSSxFQUFFLE9BQU87YUFDZixDQUFDO1NBQ0o7UUFDRCxJQUFJLFVBQVUsS0FBSyxpQkFBaUIsRUFBRTtZQUNuQyxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQ3ZCLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDcEQsT0FBTztvQkFDSixPQUFPLEVBQUUsSUFBSTtvQkFDYixJQUFJO2lCQUNOLENBQUM7YUFDSjtZQUNELE9BQU87Z0JBQ0osT0FBTyxFQUFFLElBQUk7Z0JBQ2IsSUFBSSxFQUFFLFVBQVU7YUFDbEIsQ0FBQztTQUNKO1FBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBR00sYUFBYSxDQUFFLFVBQXVFO1FBRzFGLElBQUksVUFBVSxFQUFFO1lBQ2IsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUM1QixJQUFJLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUN4QixPQUFPO3dCQUNKLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFOzRCQUNmLEdBQUcsRUFBRSxVQUFVO3lCQUNqQjtxQkFDSCxDQUFDO2lCQUNKO2FBQ0g7aUJBQU07Z0JBQ0osT0FBTztvQkFDSixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxVQUFVO2lCQUM5QixDQUFDO2FBQ0o7U0FDSDtRQUNELE9BQU8sRUFBRSxDQUFDO0lBQ2IsQ0FBQztDQUNIO0FBcEdELHdEQW9HQyJ9