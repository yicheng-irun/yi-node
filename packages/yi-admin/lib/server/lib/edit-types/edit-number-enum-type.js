"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1udW1iZXItZW51bS10eXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NlcnZlci9saWIvZWRpdC10eXBlcy9lZGl0LW51bWJlci1lbnVtLXR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxREFBNkY7QUFFN0YsK0VBQXlFO0FBRXpFLE1BQWEsa0JBQW1CLFNBQVEsNkJBQVk7SUE0QmpELFlBQWEsTUFLWjtRQUNFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQWpDakI7O1dBRUc7UUFDSSxrQkFBYSxHQUFHLGFBQWEsQ0FBQTtRQUVwQzs7V0FFRztRQUNJLG9CQUFlLG1DQWVoQixJQUFJLENBQUMsZUFBZSxLQUN2QixJQUFJLEVBQUUsRUFBRSxJQUNWO1FBU0UsSUFBSSxNQUFNLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzVDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ2xELElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO29CQUMzQixPQUFPO3dCQUNKLEtBQUssRUFBRSxJQUFJO3dCQUNYLEtBQUssRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDO3FCQUNyQixDQUFDO2lCQUNKO2dCQUNELElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO29CQUMzQixNQUFNLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3ZCLE9BQU87d0JBQ0osS0FBSyxFQUFFLENBQUM7d0JBQ1IsS0FBSyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUM7cUJBQ3JCLENBQUM7aUJBQ0o7Z0JBQ0QsT0FBTyxJQUFJLENBQUM7WUFDZixDQUFDLENBQUMsQ0FBQztTQUNMO0lBQ0osQ0FBQztJQUVNLFdBQVc7UUFDZixPQUFPLElBQUksMENBQWtCLENBQUM7WUFDM0IsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjO1lBQ25DLElBQUksRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUk7U0FDakMsQ0FBQyxDQUFDO0lBQ04sQ0FBQztDQUNIO0FBN0RELGdEQTZEQyJ9