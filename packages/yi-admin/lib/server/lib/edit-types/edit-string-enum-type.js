"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const edit_base_type_1 = __importDefault(require("./edit-base-type"));
const list_string_enum_type_1 = __importDefault(require("../list-types/list-string-enum-type"));
class EditStringEnumType extends edit_base_type_1.default {
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
    getListType() {
        return new list_string_enum_type_1.default({
            fieldNameAlias: this.fieldNameAlias,
            enum: this.componentConfig.enum,
        });
    }
}
exports.default = EditStringEnumType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1zdHJpbmctZW51bS10eXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NlcnZlci9saWIvZWRpdC10eXBlcy9lZGl0LXN0cmluZy1lbnVtLXR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzRUFBNkY7QUFFN0YsZ0dBQXFFO0FBRXJFLE1BQXFCLGtCQUFtQixTQUFRLHdCQUFZO0lBNEJ6RCxZQUFhLE1BS1Q7UUFDRCxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFqQ2pCOztXQUVHO1FBQ0ksa0JBQWEsR0FBRyxhQUFhLENBQUE7UUFFcEM7O1dBRUc7UUFDSSxvQkFBZSxtQ0FlaEIsSUFBSSxDQUFDLGVBQWUsS0FDdkIsSUFBSSxFQUFFLEVBQUUsSUFDVjtRQVNFLElBQUksTUFBTSxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUM1QyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNsRCxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtvQkFDM0IsT0FBTzt3QkFDSixLQUFLLEVBQUUsSUFBSTt3QkFDWCxLQUFLLEVBQUUsSUFBSTtxQkFDYixDQUFDO2lCQUNKO2dCQUNELE9BQU8sSUFBSSxDQUFDO1lBQ2YsQ0FBQyxDQUFDLENBQUM7U0FDTDtJQUNKLENBQUM7SUFFTSxXQUFXO1FBQ2YsT0FBTyxJQUFJLCtCQUFrQixDQUFDO1lBQzNCLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYztZQUNuQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJO1NBQ2pDLENBQUMsQ0FBQztJQUNOLENBQUM7Q0FDSDtBQXRERCxxQ0FzREMifQ==