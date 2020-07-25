"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditBooleanType = void 0;
const edit_base_type_1 = require("./edit-base-type");
const list_boolean_type_1 = require("../list-types/list-boolean-type");
class EditBooleanType extends edit_base_type_1.EditBaseType {
    constructor() {
        super(...arguments);
        /**
         * 前端的组件名称
         */
        this.componentName = 'boolean';
    }
    getListType() {
        return new list_boolean_type_1.ListBooleanType({
            fieldNameAlias: this.fieldNameAlias,
        });
    }
}
exports.EditBooleanType = EditBooleanType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1ib29sZWFuLXR5cGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmVyL2xpYi9lZGl0LXR5cGVzL2VkaXQtYm9vbGVhbi10eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFEQUFnRDtBQUVoRCx1RUFBa0U7QUFFbEUsTUFBYSxlQUFnQixTQUFRLDZCQUFZO0lBQWpEOztRQUNHOztXQUVHO1FBQ0ksa0JBQWEsR0FBRyxTQUFTLENBQUE7SUFPbkMsQ0FBQztJQUxTLFdBQVc7UUFDZixPQUFPLElBQUksbUNBQWUsQ0FBQztZQUN4QixjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWM7U0FDckMsQ0FBQyxDQUFDO0lBQ04sQ0FBQztDQUNIO0FBWEQsMENBV0MifQ==