"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLXNlbGVjdC10eXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NlcnZlci9tb25nb29zZS9maWx0ZXItdHlwZXMvZmlsdGVyLXNlbGVjdC10eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkNBQTJDO0FBQzNDLDhFQUF5RTtBQUl6RSxNQUFhLGdCQUFpQixTQUFRLGlDQUFjO0lBZWpELFlBQWEsTUFNWjtRQUNFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQXJCVixrQkFBYSxHQUFhLFFBQVEsQ0FBQTtRQUVsQyxvQkFBZSxtQ0FPaEIsSUFBSSxDQUFDLGVBQWUsS0FDdkIsT0FBTyxFQUFFLEVBQUUsRUFDWCxXQUFXLEVBQUUsS0FBSyxJQUNwQjtRQVVFLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDOUMsSUFBSSxNQUFNLENBQUMsV0FBVyxLQUFLLElBQUksRUFBRTtZQUM5QixJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7U0FDMUM7SUFDSixDQUFDO0lBRU0sYUFBYSxDQUFFLFVBQXVFO1FBRzFGLElBQUksVUFBVSxFQUFFO1lBQ2IsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUM1QixJQUFJLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUN4QixPQUFPO3dCQUNKLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFOzRCQUNmLEdBQUcsRUFBRSxVQUFVO3lCQUNqQjtxQkFDSCxDQUFDO2lCQUNKO2FBQ0g7aUJBQU07Z0JBQ0osT0FBTztvQkFDSixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxVQUFVO2lCQUM5QixDQUFDO2FBQ0o7U0FDSDtRQUNELE9BQU8sRUFBRSxDQUFDO0lBQ2IsQ0FBQztDQUNIO0FBakRELDRDQWlEQyJ9