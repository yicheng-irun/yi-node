"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const edit_base_type_1 = __importDefault(require("./edit-base-type"));
class EditDateTimeType extends edit_base_type_1.default {
    constructor() {
        super(...arguments);
        /**
         * 前端的组件名称
         */
        this.componentName = 'date-time';
        /**
         * 前端组件的参数
         */
        this.componentConfig = Object.assign({}, this.componentConfig);
    }
}
exports.default = EditDateTimeType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1kYXRlLXRpbWUtdHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvbGliL2VkaXQtdHlwZXMvZWRpdC1kYXRlLXRpbWUtdHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNFQUF5RTtBQUV6RSxNQUFxQixnQkFBaUIsU0FBUSx3QkFBWTtJQUExRDs7UUFDRzs7V0FFRztRQUNJLGtCQUFhLEdBQUcsV0FBVyxDQUFBO1FBRWxDOztXQUVHO1FBQ0ksb0JBQWUscUJBQ2hCLElBQUksQ0FBQyxlQUFlLEVBQ3pCO0lBQ0osQ0FBQztDQUFBO0FBWkQsbUNBWUMifQ==