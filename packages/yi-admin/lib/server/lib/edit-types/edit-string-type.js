"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const edit_base_type_1 = require("./edit-base-type");
class EditStringType extends edit_base_type_1.EditBaseType {
    constructor(config) {
        super(config);
        /**
         * 前端的组件名称
         */
        this.componentName = 'string';
        /**
         * 前端组件的参数
         */
        this.componentConfig = Object.assign(Object.assign({}, this.componentConfig), { minLength: 0, maxLength: undefined, placeholder: '' });
        if (typeof config.minLength === 'number') {
            this.componentConfig.minLength = config.minLength;
        }
        if (typeof config.maxLength === 'number') {
            this.componentConfig.maxLength = config.maxLength;
        }
        this.componentConfig.placeholder = config.placeholder || '';
    }
}
exports.EditStringType = EditStringType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1zdHJpbmctdHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvbGliL2VkaXQtdHlwZXMvZWRpdC1zdHJpbmctdHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFEQUE2RjtBQUU3RixNQUFhLGNBQWUsU0FBUSw2QkFBWTtJQTJCN0MsWUFDRyxNQUlDO1FBRUQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBakNqQjs7V0FFRztRQUNJLGtCQUFhLEdBQUcsUUFBUSxDQUFBO1FBRS9COztXQUVHO1FBQ0ksb0JBQWUsbUNBWWhCLElBQUksQ0FBQyxlQUFlLEtBQ3ZCLFNBQVMsRUFBRSxDQUFDLEVBQ1osU0FBUyxFQUFFLFNBQVMsRUFDcEIsV0FBVyxFQUFFLEVBQUUsSUFDakI7UUFVRSxJQUFJLE9BQU8sTUFBTSxDQUFDLFNBQVMsS0FBSyxRQUFRLEVBQUU7WUFDdkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztTQUNwRDtRQUNELElBQUksT0FBTyxNQUFNLENBQUMsU0FBUyxLQUFLLFFBQVEsRUFBRTtZQUN2QyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO1NBQ3BEO1FBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUM7SUFDL0QsQ0FBQztDQUNIO0FBM0NELHdDQTJDQyJ9