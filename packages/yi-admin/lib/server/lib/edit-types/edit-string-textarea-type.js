"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditStringTextareaType = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1zdHJpbmctdGV4dGFyZWEtdHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvbGliL2VkaXQtdHlwZXMvZWRpdC1zdHJpbmctdGV4dGFyZWEtdHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5REFBb0Q7QUFFcEQsdUZBQWlGO0FBRWpGLE1BQWEsc0JBQXVCLFNBQVEsaUNBQWM7SUFBMUQ7O1FBQ0c7O1dBRUc7UUFDSSxrQkFBYSxHQUFHLGlCQUFpQixDQUFBO0lBTzNDLENBQUM7SUFMUyxXQUFXO1FBQ2YsT0FBTyxJQUFJLGtEQUFzQixDQUFDO1lBQy9CLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYztTQUNyQyxDQUFDLENBQUM7SUFDTixDQUFDO0NBQ0g7QUFYRCx3REFXQyJ9