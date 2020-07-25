"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditNumberEnumType = void 0;
const edit_base_type_1 = require("./edit-base-type");
const list_number_enum_type_1 = require("../list-types/list-number-enum-type");
class EditNumberEnumType extends edit_base_type_1.EditBaseType {
    constructor(config) {
        super(config);
        /**
         * 前端的组件名称
         */
        this.componentName = 'number-enum';
        /**
         * 前端组件的参数
         */
        this.componentConfig = Object.assign(Object.assign({}, this.componentConfig), { enum: [] });
        if (config.enum && Array.isArray(config.enum)) {
            this.componentConfig.enum = config.enum.map((item) => {
                if (typeof item === 'number') {
                    return {
                        value: item,
                        label: String(item),
                    };
                }
                if (typeof item === 'string') {
                    const t = Number(item);
                    return {
                        value: t,
                        label: String(item),
                    };
                }
                return item;
            });
        }
    }
    getListType() {
        return new list_number_enum_type_1.ListNumberEnumType({
            fieldNameAlias: this.fieldNameAlias,
            enum: this.componentConfig.enum,
        });
    }
}
exports.EditNumberEnumType = EditNumberEnumType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1udW1iZXItZW51bS10eXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NlcnZlci9saWIvZWRpdC10eXBlcy9lZGl0LW51bWJlci1lbnVtLXR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscURBQTZGO0FBRTdGLCtFQUF5RTtBQUV6RSxNQUFhLGtCQUFtQixTQUFRLDZCQUFZO0lBNEJqRCxZQUFhLE1BS1o7UUFDRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFqQ2pCOztXQUVHO1FBQ0ksa0JBQWEsR0FBRyxhQUFhLENBQUE7UUFFcEM7O1dBRUc7UUFDSSxvQkFBZSxtQ0FlaEIsSUFBSSxDQUFDLGVBQWUsS0FDdkIsSUFBSSxFQUFFLEVBQUUsSUFDVjtRQVNFLElBQUksTUFBTSxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUM1QyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNsRCxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtvQkFDM0IsT0FBTzt3QkFDSixLQUFLLEVBQUUsSUFBSTt3QkFDWCxLQUFLLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQztxQkFDckIsQ0FBQztpQkFDSjtnQkFDRCxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtvQkFDM0IsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN2QixPQUFPO3dCQUNKLEtBQUssRUFBRSxDQUFDO3dCQUNSLEtBQUssRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDO3FCQUNyQixDQUFDO2lCQUNKO2dCQUNELE9BQU8sSUFBSSxDQUFDO1lBQ2YsQ0FBQyxDQUFDLENBQUM7U0FDTDtJQUNKLENBQUM7SUFFTSxXQUFXO1FBQ2YsT0FBTyxJQUFJLDBDQUFrQixDQUFDO1lBQzNCLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYztZQUNuQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJO1NBQ2pDLENBQUMsQ0FBQztJQUNOLENBQUM7Q0FDSDtBQTdERCxnREE2REMifQ==