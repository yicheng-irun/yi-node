"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLWJvb2xlYW4tdHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvbW9uZ29vc2UvZmlsdGVyLXR5cGVzL2ZpbHRlci1ib29sZWFuLXR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQ0FBMkM7QUFDM0MsNkRBQXdEO0FBR3hELE1BQWEsaUJBQWtCLFNBQVEscUNBQWdCO0lBQ3BELFlBQWEsU0FBK0IsRUFBRTtRQUMzQyxLQUFLLGlDQUNDLE1BQU0sS0FDVCxPQUFPLEVBQUUsQ0FBQztvQkFDUCxLQUFLLEVBQUUsR0FBRztvQkFDVixLQUFLLEVBQUUsTUFBTTtpQkFDZixFQUFFO29CQUNBLEtBQUssRUFBRSxHQUFHO29CQUNWLEtBQUssRUFBRSxPQUFPO2lCQUNoQixFQUFFO29CQUNBLEtBQUssRUFBRSxJQUFJO29CQUNYLEtBQUssRUFBRSxFQUFFO2lCQUNYLENBQUMsSUFDSCxDQUFDO0lBQ04sQ0FBQztJQUVNLGFBQWEsQ0FBRSxVQUFrQjtRQUdyQyxJQUFJLFVBQVUsRUFBRTtZQUNiLE9BQU87Z0JBQ0osQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsVUFBVSxLQUFLLE1BQU07YUFDekMsQ0FBQztTQUNKO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFDYixDQUFDO0NBQ0g7QUEzQkQsOENBMkJDIn0=