"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const edit_base_type_1 = require("./edit-base-type");
class EditDateTimeType extends edit_base_type_1.EditBaseType {
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
exports.EditDateTimeType = EditDateTimeType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1kYXRlLXRpbWUtdHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvbGliL2VkaXQtdHlwZXMvZWRpdC1kYXRlLXRpbWUtdHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFEQUF5RTtBQUV6RSxNQUFhLGdCQUFpQixTQUFRLDZCQUFZO0lBQWxEOztRQUNHOztXQUVHO1FBQ0ksa0JBQWEsR0FBRyxXQUFXLENBQUE7UUFFbEM7O1dBRUc7UUFDSSxvQkFBZSxxQkFDaEIsSUFBSSxDQUFDLGVBQWUsRUFDekI7SUFDSixDQUFDO0NBQUE7QUFaRCw0Q0FZQyJ9