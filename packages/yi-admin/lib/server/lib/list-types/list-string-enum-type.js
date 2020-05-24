"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const list_base_type_1 = __importDefault(require("./list-base-type"));
class ListStringEnumType extends list_base_type_1.default {
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
exports.default = ListStringEnumType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1zdHJpbmctZW51bS10eXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NlcnZlci9saWIvbGlzdC10eXBlcy9saXN0LXN0cmluZy1lbnVtLXR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzRUFBb0U7QUFFcEUsTUFBcUIsa0JBQW1CLFNBQVEsd0JBQVk7SUE0QnpELFlBQWEsTUFLWjtRQUNFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQWpDakI7O1dBRUc7UUFDSSxrQkFBYSxHQUFHLGFBQWEsQ0FBQTtRQUVwQzs7V0FFRztRQUNJLG9CQUFlLG1DQWVoQixJQUFJLENBQUMsZUFBZSxLQUN2QixJQUFJLEVBQUUsRUFBRSxJQUNWO1FBU0UsSUFBSSxNQUFNLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzVDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ2xELElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO29CQUMzQixPQUFPO3dCQUNKLEtBQUssRUFBRSxJQUFJO3dCQUNYLEtBQUssRUFBRSxJQUFJO3FCQUNiLENBQUM7aUJBQ0o7Z0JBQ0QsT0FBTyxJQUFJLENBQUM7WUFDZixDQUFDLENBQUMsQ0FBQztTQUNMO0lBQ0osQ0FBQztDQUNIO0FBL0NELHFDQStDQyJ9