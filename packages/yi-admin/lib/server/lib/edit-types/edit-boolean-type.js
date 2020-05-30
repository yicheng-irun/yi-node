"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1ib29sZWFuLXR5cGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmVyL2xpYi9lZGl0LXR5cGVzL2VkaXQtYm9vbGVhbi10eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscURBQWdEO0FBRWhELHVFQUFrRTtBQUVsRSxNQUFhLGVBQWdCLFNBQVEsNkJBQVk7SUFBakQ7O1FBQ0c7O1dBRUc7UUFDSSxrQkFBYSxHQUFHLFNBQVMsQ0FBQTtJQU9uQyxDQUFDO0lBTFMsV0FBVztRQUNmLE9BQU8sSUFBSSxtQ0FBZSxDQUFDO1lBQ3hCLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYztTQUNyQyxDQUFDLENBQUM7SUFDTixDQUFDO0NBQ0g7QUFYRCwwQ0FXQyJ9