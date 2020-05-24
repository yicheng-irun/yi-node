"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const list_base_type_1 = __importDefault(require("../list-types/list-base-type"));
class EditBaseType {
    constructor(config) {
        /**
         * 前端的组件名称
         */
        this.componentName = 'base';
        /**
         * 字段名称，对应db中的字段名称
         */
        this.fieldName = '';
        /**
         * 前端组件的参数
         */
        this.componentConfig = {
            required: false,
            helpText: '',
        };
        this.componentConfig.required = config.required || false;
        this.componentConfig.helpText = config.helpText || '';
        this.fieldNameAlias = config.fieldNameAlias || '';
    }
    // eslint-disable-next-line class-methods-use-this
    async action(actionName, actionData, ctx) {
        throw new Error(`接收到非法actionName ${actionName}`);
    }
    /**
     * 实现 edit-type 生成对应的 list-type
     */
    getListType() {
        return new list_base_type_1.default({
            fieldNameAlias: this.fieldNameAlias,
        });
    }
}
exports.default = EditBaseType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1iYXNlLXR5cGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmVyL2xpYi9lZGl0LXR5cGVzL2VkaXQtYmFzZS10eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0Esa0ZBQXdEO0FBeUJ4RCxNQUFxQixZQUFZO0lBeUI5QixZQUNHLE1BQTBCO1FBekI3Qjs7V0FFRztRQUNJLGtCQUFhLEdBQUcsTUFBTSxDQUFBO1FBRTdCOztXQUVHO1FBQ0ksY0FBUyxHQUFHLEVBQUUsQ0FBQTtRQU9yQjs7V0FFRztRQUNJLG9CQUFlLEdBQTRCO1lBQy9DLFFBQVEsRUFBRSxLQUFLO1lBRWYsUUFBUSxFQUFFLEVBQUU7U0FDZCxDQUFBO1FBS0UsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsSUFBSSxLQUFLLENBQUM7UUFDekQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUM7UUFDdEQsSUFBSSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUMsY0FBYyxJQUFJLEVBQUUsQ0FBQztJQUNyRCxDQUFDO0lBRUQsa0RBQWtEO0lBQzNDLEtBQUssQ0FBQyxNQUFNLENBQUUsVUFBa0IsRUFBRSxVQUFlLEVBQUUsR0FBWTtRQUNuRSxNQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRDs7T0FFRztJQUNJLFdBQVc7UUFDZixPQUFPLElBQUksd0JBQVksQ0FBQztZQUNyQixjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWM7U0FDckMsQ0FBQyxDQUFDO0lBQ04sQ0FBQztDQUNIO0FBOUNELCtCQThDQyJ9