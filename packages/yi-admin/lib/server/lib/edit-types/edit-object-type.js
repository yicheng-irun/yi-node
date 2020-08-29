"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditObjectType = void 0;
const edit_base_type_1 = require("./edit-base-type");
class EditObjectType extends edit_base_type_1.EditBaseType {
    constructor(config) {
        super(config);
        /**
         * 前端的组件名称
         */
        this.componentName = 'object';
        /**
         * 前端组件的参数
         */
        this.componentConfig = Object.assign(Object.assign({}, this.componentConfig), { editFields: [] });
        if (config.editFields) {
            this.componentConfig.editFields = config.editFields;
        }
    }
}
exports.EditObjectType = EditObjectType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1vYmplY3QtdHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvbGliL2VkaXQtdHlwZXMvZWRpdC1vYmplY3QtdHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxREFBNkY7QUFFN0YsTUFBYSxjQUFlLFNBQVEsNkJBQVk7SUFnQjdDLFlBQWEsTUFFWjtRQUNFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQWxCakI7O1dBRUc7UUFDSSxrQkFBYSxHQUFHLFFBQVEsQ0FBQTtRQUUvQjs7V0FFRztRQUNJLG9CQUFlLG1DQUdoQixJQUFJLENBQUMsZUFBZSxLQUN2QixVQUFVLEVBQUUsRUFBRSxJQUNoQjtRQU1FLElBQUksTUFBTSxDQUFDLFVBQVUsRUFBRTtZQUNwQixJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO1NBQ3REO0lBQ0osQ0FBQztDQUNIO0FBeEJELHdDQXdCQyJ9