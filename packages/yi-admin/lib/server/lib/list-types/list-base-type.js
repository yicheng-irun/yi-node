"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListBaseType = void 0;
class ListBaseType {
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
        this.componentConfig = {};
        this.fieldNameAlias = config.fieldNameAlias || '';
    }
    // eslint-disable-next-line class-methods-use-this
    async action(actionName, actionData, ctx) {
        //
    }
}
exports.ListBaseType = ListBaseType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1iYXNlLXR5cGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmVyL2xpYi9saXN0LXR5cGVzL2xpc3QtYmFzZS10eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQVNBLE1BQWEsWUFBWTtJQXFCdEIsWUFDRyxNQUEwQjtRQXJCN0I7O1dBRUc7UUFDSSxrQkFBYSxHQUFHLE1BQU0sQ0FBQTtRQUU3Qjs7V0FFRztRQUNJLGNBQVMsR0FBRyxFQUFFLENBQUE7UUFPckI7O1dBRUc7UUFDSSxvQkFBZSxHQUFHLEVBQUUsQ0FBQztRQUt6QixJQUFJLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQyxjQUFjLElBQUksRUFBRSxDQUFDO0lBQ3JELENBQUM7SUFFRCxrREFBa0Q7SUFDM0MsS0FBSyxDQUFDLE1BQU0sQ0FBRSxVQUFrQixFQUFFLFVBQWUsRUFBRSxHQUFZO1FBQ25FLEVBQUU7SUFDTCxDQUFDO0NBQ0g7QUEvQkQsb0NBK0JDIn0=