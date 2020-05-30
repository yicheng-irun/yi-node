"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const list_base_type_1 = require("../list-types/list-base-type");
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
        return new list_base_type_1.ListBaseType({
            fieldNameAlias: this.fieldNameAlias,
        });
    }
}
exports.EditBaseType = EditBaseType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1iYXNlLXR5cGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmVyL2xpYi9lZGl0LXR5cGVzL2VkaXQtYmFzZS10eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsaUVBQTREO0FBeUI1RCxNQUFhLFlBQVk7SUF5QnRCLFlBQ0csTUFBMEI7UUF6QjdCOztXQUVHO1FBQ0ksa0JBQWEsR0FBRyxNQUFNLENBQUE7UUFFN0I7O1dBRUc7UUFDSSxjQUFTLEdBQUcsRUFBRSxDQUFBO1FBT3JCOztXQUVHO1FBQ0ksb0JBQWUsR0FBNEI7WUFDL0MsUUFBUSxFQUFFLEtBQUs7WUFFZixRQUFRLEVBQUUsRUFBRTtTQUNkLENBQUE7UUFLRSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQztRQUN6RCxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQztRQUN0RCxJQUFJLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQyxjQUFjLElBQUksRUFBRSxDQUFDO0lBQ3JELENBQUM7SUFFRCxrREFBa0Q7SUFDM0MsS0FBSyxDQUFDLE1BQU0sQ0FBRSxVQUFrQixFQUFFLFVBQWUsRUFBRSxHQUFZO1FBQ25FLE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVEOztPQUVHO0lBQ0ksV0FBVztRQUNmLE9BQU8sSUFBSSw2QkFBWSxDQUFDO1lBQ3JCLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYztTQUNyQyxDQUFDLENBQUM7SUFDTixDQUFDO0NBQ0g7QUE5Q0Qsb0NBOENDIn0=