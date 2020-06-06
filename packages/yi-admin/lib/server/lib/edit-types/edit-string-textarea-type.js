"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const edit_string_type_1 = require("./edit-string-type");
const list_string_textarea_type_1 = require("../list-types/list-string-textarea-type");
class EditStringTextareaType extends edit_string_type_1.EditStringType {
    constructor() {
        super(...arguments);
        /**
         * 前端的组件名称
         */
        this.componentName = 'string-textarea';
    }
    getListType() {
        return new list_string_textarea_type_1.ListStringTextareaType({
            fieldNameAlias: this.fieldNameAlias,
        });
    }
}
exports.EditStringTextareaType = EditStringTextareaType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1zdHJpbmctdGV4dGFyZWEtdHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvbGliL2VkaXQtdHlwZXMvZWRpdC1zdHJpbmctdGV4dGFyZWEtdHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlEQUFvRDtBQUVwRCx1RkFBaUY7QUFFakYsTUFBYSxzQkFBdUIsU0FBUSxpQ0FBYztJQUExRDs7UUFDRzs7V0FFRztRQUNJLGtCQUFhLEdBQUcsaUJBQWlCLENBQUE7SUFPM0MsQ0FBQztJQUxTLFdBQVc7UUFDZixPQUFPLElBQUksa0RBQXNCLENBQUM7WUFDL0IsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjO1NBQ3JDLENBQUMsQ0FBQztJQUNOLENBQUM7Q0FDSDtBQVhELHdEQVdDIn0=