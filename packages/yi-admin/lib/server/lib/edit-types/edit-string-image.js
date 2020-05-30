"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const edit_string_file_1 = require("./edit-string-file");
const list_string_image_type_1 = require("../list-types/list-string-image-type");
class EditStringImageType extends edit_string_file_1.EditStringFileType {
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
        return new list_string_image_type_1.ListStringImageType({
            fieldNameAlias: this.fieldNameAlias,
        });
    }
}
exports.EditStringImageType = EditStringImageType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1zdHJpbmctaW1hZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmVyL2xpYi9lZGl0LXR5cGVzL2VkaXQtc3RyaW5nLWltYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EseURBQXdEO0FBRXhELGlGQUEyRTtBQUUzRSxNQUFhLG1CQUFvQixTQUFRLHFDQUFrQjtJQUEzRDs7UUFDRzs7V0FFRztRQUNJLGtCQUFhLEdBQUcsY0FBYyxDQUFBO1FBRXJDOztXQUVHO1FBQ0ksb0JBQWUsbUNBS2hCLElBQUksQ0FBQyxlQUFlLEtBRXZCLFFBQVEsRUFBRSxTQUFTLElBQ3JCO0lBT0osQ0FBQztJQUxTLFdBQVc7UUFDZixPQUFPLElBQUksNENBQW1CLENBQUM7WUFDNUIsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjO1NBQ3JDLENBQUMsQ0FBQztJQUNOLENBQUM7Q0FDSDtBQXhCRCxrREF3QkMifQ==