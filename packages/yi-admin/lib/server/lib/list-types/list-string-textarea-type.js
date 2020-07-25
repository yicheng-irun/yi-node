"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListStringTextareaType = void 0;
const list_base_type_1 = require("./list-base-type");
class ListStringTextareaType extends list_base_type_1.ListBaseType {
    constructor() {
        super(...arguments);
        /**
         * 前端的组件名称
         */
        this.componentName = 'string-textarea';
        /**
         * 前端组件的参数
         */
        this.componentConfig = Object.assign(Object.assign({}, this.componentConfig), { styleMaxTextLength: 200 });
    }
}
exports.ListStringTextareaType = ListStringTextareaType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1zdHJpbmctdGV4dGFyZWEtdHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvbGliL2xpc3QtdHlwZXMvbGlzdC1zdHJpbmctdGV4dGFyZWEtdHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxREFBb0U7QUFHcEUsTUFBYSxzQkFBdUIsU0FBUSw2QkFBWTtJQUF4RDs7UUFDRzs7V0FFRztRQUNJLGtCQUFhLEdBQUcsaUJBQWlCLENBQUE7UUFFeEM7O1dBRUc7UUFDSSxvQkFBZSxtQ0FNaEIsSUFBSSxDQUFDLGVBQWUsS0FDdkIsa0JBQWtCLEVBQUUsR0FBRyxJQUN6QjtJQUNKLENBQUM7Q0FBQTtBQWxCRCx3REFrQkMifQ==