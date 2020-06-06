"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1zdHJpbmctdGV4dGFyZWEtdHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvbGliL2xpc3QtdHlwZXMvbGlzdC1zdHJpbmctdGV4dGFyZWEtdHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFEQUFvRTtBQUdwRSxNQUFhLHNCQUF1QixTQUFRLDZCQUFZO0lBQXhEOztRQUNHOztXQUVHO1FBQ0ksa0JBQWEsR0FBRyxpQkFBaUIsQ0FBQTtRQUV4Qzs7V0FFRztRQUNJLG9CQUFlLG1DQU1oQixJQUFJLENBQUMsZUFBZSxLQUN2QixrQkFBa0IsRUFBRSxHQUFHLElBQ3pCO0lBQ0osQ0FBQztDQUFBO0FBbEJELHdEQWtCQyJ9