"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterSelectType = void 0;
/* eslint-disable class-methods-use-this */
const filter_base_type_1 = require("../../lib/filter-types/filter-base-type");
class FilterSelectType extends filter_base_type_1.FilterBaseType {
    constructor(config) {
        super(config);
        this.componentName = 'select';
        this.componentConfig = Object.assign(Object.assign({}, this.componentConfig), { options: [], multiSelect: false });
        this.componentConfig.options = config.options;
        if (config.multiSelect === true) {
            this.componentConfig.multiSelect = true;
        }
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
exports.FilterSelectType = FilterSelectType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLXNlbGVjdC10eXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NlcnZlci9tb25nb29zZS9maWx0ZXItdHlwZXMvZmlsdGVyLXNlbGVjdC10eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJDQUEyQztBQUMzQyw4RUFBeUU7QUFJekUsTUFBYSxnQkFBaUIsU0FBUSxpQ0FBYztJQWVqRCxZQUFhLE1BTVo7UUFDRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFyQlYsa0JBQWEsR0FBYSxRQUFRLENBQUE7UUFFbEMsb0JBQWUsbUNBT2hCLElBQUksQ0FBQyxlQUFlLEtBQ3ZCLE9BQU8sRUFBRSxFQUFFLEVBQ1gsV0FBVyxFQUFFLEtBQUssSUFDcEI7UUFVRSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQzlDLElBQUksTUFBTSxDQUFDLFdBQVcsS0FBSyxJQUFJLEVBQUU7WUFDOUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1NBQzFDO0lBQ0osQ0FBQztJQUVNLGFBQWEsQ0FBRSxVQUF1RTtRQUcxRixJQUFJLFVBQVUsRUFBRTtZQUNiLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDNUIsSUFBSSxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDeEIsT0FBTzt3QkFDSixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTs0QkFDZixHQUFHLEVBQUUsVUFBVTt5QkFDakI7cUJBQ0gsQ0FBQztpQkFDSjthQUNIO2lCQUFNO2dCQUNKLE9BQU87b0JBQ0osQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsVUFBVTtpQkFDOUIsQ0FBQzthQUNKO1NBQ0g7UUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNiLENBQUM7Q0FDSDtBQWpERCw0Q0FpREMifQ==