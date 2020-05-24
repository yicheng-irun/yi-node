"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const edit_base_type_1 = __importDefault(require("./edit-base-type"));
const list_boolean_type_1 = __importDefault(require("../list-types/list-boolean-type"));
class EditBooleanType extends edit_base_type_1.default {
    constructor() {
        super(...arguments);
        /**
         * 前端的组件名称
         */
        this.componentName = 'boolean';
    }
    getListType() {
        return new list_boolean_type_1.default({
            fieldNameAlias: this.fieldNameAlias,
        });
    }
}
exports.default = EditBooleanType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1ib29sZWFuLXR5cGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmVyL2xpYi9lZGl0LXR5cGVzL2VkaXQtYm9vbGVhbi10eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0VBQTRDO0FBRTVDLHdGQUE4RDtBQUU5RCxNQUFxQixlQUFnQixTQUFRLHdCQUFZO0lBQXpEOztRQUNHOztXQUVHO1FBQ0ksa0JBQWEsR0FBRyxTQUFTLENBQUE7SUFPbkMsQ0FBQztJQUxTLFdBQVc7UUFDZixPQUFPLElBQUksMkJBQWUsQ0FBQztZQUN4QixjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWM7U0FDckMsQ0FBQyxDQUFDO0lBQ04sQ0FBQztDQUNIO0FBWEQsa0NBV0MifQ==