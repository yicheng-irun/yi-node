"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const list_base_type_1 = require("./list-base-type");
class ListStringEnumType extends list_base_type_1.ListBaseType {
    constructor(config) {
        super(config);
        /**
         * 前端的组件名称
         */
        this.componentName = 'string-enum';
        /**
         * 前端组件的参数
         */
        this.componentConfig = Object.assign(Object.assign({}, this.componentConfig), { enum: [] });
        if (config.enum && Array.isArray(config.enum)) {
            this.componentConfig.enum = config.enum.map((item) => {
                if (typeof item === 'string') {
                    return {
                        value: item,
                        label: item,
                    };
                }
                return item;
            });
        }
    }
}
exports.ListStringEnumType = ListStringEnumType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1zdHJpbmctZW51bS10eXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NlcnZlci9saWIvbGlzdC10eXBlcy9saXN0LXN0cmluZy1lbnVtLXR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxREFBb0U7QUFFcEUsTUFBYSxrQkFBbUIsU0FBUSw2QkFBWTtJQTRCakQsWUFBYSxNQUtaO1FBQ0UsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBakNqQjs7V0FFRztRQUNJLGtCQUFhLEdBQUcsYUFBYSxDQUFBO1FBRXBDOztXQUVHO1FBQ0ksb0JBQWUsbUNBZWhCLElBQUksQ0FBQyxlQUFlLEtBQ3ZCLElBQUksRUFBRSxFQUFFLElBQ1Y7UUFTRSxJQUFJLE1BQU0sQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDNUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDbEQsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7b0JBQzNCLE9BQU87d0JBQ0osS0FBSyxFQUFFLElBQUk7d0JBQ1gsS0FBSyxFQUFFLElBQUk7cUJBQ2IsQ0FBQztpQkFDSjtnQkFDRCxPQUFPLElBQUksQ0FBQztZQUNmLENBQUMsQ0FBQyxDQUFDO1NBQ0w7SUFDSixDQUFDO0NBQ0g7QUEvQ0QsZ0RBK0NDIn0=