"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterBooleanType = void 0;
/* eslint-disable class-methods-use-this */
const filter_select_type_1 = require("./filter-select-type");
class FilterBooleanType extends filter_select_type_1.FilterSelectType {
    constructor(config = {}) {
        super(Object.assign(Object.assign({}, config), { options: [{
                    label: '是',
                    value: 'true',
                }, {
                    label: '否',
                    value: 'false',
                }, {
                    label: '全部',
                    value: '',
                }] }));
    }
    getConditions(fieldParam) {
        if (fieldParam) {
            return {
                [this.fieldName]: fieldParam === 'true',
            };
        }
        return {};
    }
}
exports.FilterBooleanType = FilterBooleanType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLWJvb2xlYW4tdHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvbW9uZ29vc2UvZmlsdGVyLXR5cGVzL2ZpbHRlci1ib29sZWFuLXR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkNBQTJDO0FBQzNDLDZEQUF3RDtBQUd4RCxNQUFhLGlCQUFrQixTQUFRLHFDQUFnQjtJQUNwRCxZQUFhLFNBQStCLEVBQUU7UUFDM0MsS0FBSyxpQ0FDQyxNQUFNLEtBQ1QsT0FBTyxFQUFFLENBQUM7b0JBQ1AsS0FBSyxFQUFFLEdBQUc7b0JBQ1YsS0FBSyxFQUFFLE1BQU07aUJBQ2YsRUFBRTtvQkFDQSxLQUFLLEVBQUUsR0FBRztvQkFDVixLQUFLLEVBQUUsT0FBTztpQkFDaEIsRUFBRTtvQkFDQSxLQUFLLEVBQUUsSUFBSTtvQkFDWCxLQUFLLEVBQUUsRUFBRTtpQkFDWCxDQUFDLElBQ0gsQ0FBQztJQUNOLENBQUM7SUFFTSxhQUFhLENBQUUsVUFBa0I7UUFHckMsSUFBSSxVQUFVLEVBQUU7WUFDYixPQUFPO2dCQUNKLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLFVBQVUsS0FBSyxNQUFNO2FBQ3pDLENBQUM7U0FDSjtRQUNELE9BQU8sRUFBRSxDQUFDO0lBQ2IsQ0FBQztDQUNIO0FBM0JELDhDQTJCQyJ9