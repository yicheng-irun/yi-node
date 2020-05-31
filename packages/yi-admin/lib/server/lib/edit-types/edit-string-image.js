"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const edit_string_file_1 = require("./edit-string-file");
const list_string_image_type_1 = require("../list-types/list-string-image-type");
class EditStringImageType extends edit_string_file_1.EditStringFileType {
    constructor(config) {
        super(config);
        /**
         * 前端的组件名称
         */
        this.componentName = 'string-image';
        /**
         * 前端组件的参数
         */
        this.componentConfig = Object.assign(Object.assign({}, this.componentConfig), { mimeType: 'image/*', 
            /**
             * 当选取图片时超过最大宽度或者最大高度时自动裁剪
             */
            autoClip: true });
        if (config.listStyleMaxWidth) {
            this.componentConfig.listStyleMaxWidth = config.listStyleMaxWidth;
        }
        if (config.listStyleMaxHeight) {
            this.componentConfig.listStyleMaxHeight = config.listStyleMaxHeight;
        }
    }
    getListType() {
        return new list_string_image_type_1.ListStringImageType({
            fieldNameAlias: this.fieldNameAlias,
            styleMaxWidth: this.componentConfig.listStyleMaxWidth,
            styleMaxHeight: this.componentConfig.listStyleMaxHeight,
        });
    }
}
exports.EditStringImageType = EditStringImageType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1zdHJpbmctaW1hZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmVyL2xpYi9lZGl0LXR5cGVzL2VkaXQtc3RyaW5nLWltYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EseURBQWtGO0FBRWxGLGlGQUEyRTtBQUczRSxNQUFhLG1CQUFvQixTQUFRLHFDQUFrQjtJQTJEeEQsWUFDRyxNQVdDO1FBRUQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBeEVqQjs7V0FFRztRQUNJLGtCQUFhLEdBQUcsY0FBYyxDQUFBO1FBRXJDOztXQUVHO1FBQ0ksb0JBQWUsbUNBd0NoQixJQUFJLENBQUMsZUFBZSxLQUV2QixRQUFRLEVBQUUsU0FBUztZQUVuQjs7ZUFFRztZQUNILFFBQVEsRUFBRSxJQUFJLElBQ2hCO1FBaUJFLElBQUksTUFBTSxDQUFDLGlCQUFpQixFQUFFO1lBQzNCLElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixDQUFDO1NBQ3BFO1FBQ0QsSUFBSSxNQUFNLENBQUMsa0JBQWtCLEVBQUU7WUFDNUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsR0FBRyxNQUFNLENBQUMsa0JBQWtCLENBQUM7U0FDdEU7SUFDSixDQUFDO0lBRU0sV0FBVztRQUNmLE9BQU8sSUFBSSw0Q0FBbUIsQ0FBQztZQUM1QixjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWM7WUFDbkMsYUFBYSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCO1lBQ3JELGNBQWMsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQjtTQUN6RCxDQUFDLENBQUM7SUFDTixDQUFDO0NBQ0g7QUF6RkQsa0RBeUZDIn0=