"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    async action(actionName, actionData) {
        //
    }
}
exports.ListBaseType = ListBaseType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1iYXNlLXR5cGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmVyL2xpYi9saXN0LXR5cGVzL2xpc3QtYmFzZS10eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBUUEsTUFBYSxZQUFZO0lBcUJ0QixZQUNHLE1BQTBCO1FBckI3Qjs7V0FFRztRQUNJLGtCQUFhLEdBQUcsTUFBTSxDQUFBO1FBRTdCOztXQUVHO1FBQ0ksY0FBUyxHQUFHLEVBQUUsQ0FBQTtRQU9yQjs7V0FFRztRQUNJLG9CQUFlLEdBQUcsRUFBRSxDQUFDO1FBS3pCLElBQUksQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLGNBQWMsSUFBSSxFQUFFLENBQUM7SUFDckQsQ0FBQztJQUVELGtEQUFrRDtJQUMzQyxLQUFLLENBQUMsTUFBTSxDQUFFLFVBQWtCLEVBQUUsVUFBZTtRQUNyRCxFQUFFO0lBQ0wsQ0FBQztDQUNIO0FBL0JELG9DQStCQyJ9