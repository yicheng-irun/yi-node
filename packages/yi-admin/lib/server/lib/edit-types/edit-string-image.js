"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const edit_string_file_1 = __importDefault(require("./edit-string-file"));
const list_string_image_type_1 = __importDefault(require("../list-types/list-string-image-type"));
class EditStringImageType extends edit_string_file_1.default {
    constructor() {
        super(...arguments);
        /**
         * 前端的组件名称
         */
        this.componentName = 'string-image';
        /**
         * 前端组件的参数
         */
        this.componentConfig = Object.assign(Object.assign({}, this.componentConfig), { mimeType: 'image/*' });
    }
    getListType() {
        return new list_string_image_type_1.default({
            fieldNameAlias: this.fieldNameAlias,
        });
    }
}
exports.default = EditStringImageType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1zdHJpbmctaW1hZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmVyL2xpYi9lZGl0LXR5cGVzL2VkaXQtc3RyaW5nLWltYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsMEVBQW9EO0FBRXBELGtHQUF1RTtBQUV2RSxNQUFxQixtQkFBb0IsU0FBUSwwQkFBa0I7SUFBbkU7O1FBQ0c7O1dBRUc7UUFDSSxrQkFBYSxHQUFHLGNBQWMsQ0FBQTtRQUVyQzs7V0FFRztRQUNJLG9CQUFlLG1DQUtoQixJQUFJLENBQUMsZUFBZSxLQUV2QixRQUFRLEVBQUUsU0FBUyxJQUNyQjtJQU9KLENBQUM7SUFMUyxXQUFXO1FBQ2YsT0FBTyxJQUFJLGdDQUFtQixDQUFDO1lBQzVCLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYztTQUNyQyxDQUFDLENBQUM7SUFDTixDQUFDO0NBQ0g7QUF4QkQsc0NBd0JDIn0=