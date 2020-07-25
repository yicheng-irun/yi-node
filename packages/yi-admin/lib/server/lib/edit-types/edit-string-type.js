"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditStringType = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1zdHJpbmctdHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvbGliL2VkaXQtdHlwZXMvZWRpdC1zdHJpbmctdHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxREFBNkY7QUFFN0YsTUFBYSxjQUFlLFNBQVEsNkJBQVk7SUEyQjdDLFlBQ0csTUFJQztRQUVELEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQWpDakI7O1dBRUc7UUFDSSxrQkFBYSxHQUFHLFFBQVEsQ0FBQTtRQUUvQjs7V0FFRztRQUNJLG9CQUFlLG1DQVloQixJQUFJLENBQUMsZUFBZSxLQUN2QixTQUFTLEVBQUUsQ0FBQyxFQUNaLFNBQVMsRUFBRSxTQUFTLEVBQ3BCLFdBQVcsRUFBRSxFQUFFLElBQ2pCO1FBVUUsSUFBSSxPQUFPLE1BQU0sQ0FBQyxTQUFTLEtBQUssUUFBUSxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7U0FDcEQ7UUFDRCxJQUFJLE9BQU8sTUFBTSxDQUFDLFNBQVMsS0FBSyxRQUFRLEVBQUU7WUFDdkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztTQUNwRDtRQUNELElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDO0lBQy9ELENBQUM7Q0FDSDtBQTNDRCx3Q0EyQ0MifQ==