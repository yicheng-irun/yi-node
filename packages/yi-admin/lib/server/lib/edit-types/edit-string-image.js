"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditStringImageType = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1zdHJpbmctaW1hZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmVyL2xpYi9lZGl0LXR5cGVzL2VkaXQtc3RyaW5nLWltYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHlEQUFrRjtBQUVsRixpRkFBMkU7QUFHM0UsTUFBYSxtQkFBb0IsU0FBUSxxQ0FBa0I7SUEyRHhELFlBQ0csTUFXQztRQUVELEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQXhFakI7O1dBRUc7UUFDSSxrQkFBYSxHQUFHLGNBQWMsQ0FBQTtRQUVyQzs7V0FFRztRQUNJLG9CQUFlLG1DQXdDaEIsSUFBSSxDQUFDLGVBQWUsS0FFdkIsUUFBUSxFQUFFLFNBQVM7WUFFbkI7O2VBRUc7WUFDSCxRQUFRLEVBQUUsSUFBSSxJQUNoQjtRQWlCRSxJQUFJLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRTtZQUMzQixJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQztTQUNwRTtRQUNELElBQUksTUFBTSxDQUFDLGtCQUFrQixFQUFFO1lBQzVCLElBQUksQ0FBQyxlQUFlLENBQUMsa0JBQWtCLEdBQUcsTUFBTSxDQUFDLGtCQUFrQixDQUFDO1NBQ3RFO0lBQ0osQ0FBQztJQUVNLFdBQVc7UUFDZixPQUFPLElBQUksNENBQW1CLENBQUM7WUFDNUIsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjO1lBQ25DLGFBQWEsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQjtZQUNyRCxjQUFjLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxrQkFBa0I7U0FDekQsQ0FBQyxDQUFDO0lBQ04sQ0FBQztDQUNIO0FBekZELGtEQXlGQyJ9