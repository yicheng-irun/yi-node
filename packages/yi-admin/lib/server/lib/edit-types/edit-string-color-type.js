"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const edit_base_type_1 = __importDefault(require("./edit-base-type"));
class EditStringColorType extends edit_base_type_1.default {
    constructor(config) {
        super(config);
        /**
         * 前端的组件名称
         */
        this.componentName = 'string-color';
        /**
         * 前端组件的参数
         */
        this.componentConfig = Object.assign(Object.assign({}, this.componentConfig), { showAlpha: true, predefine: [] });
        if (config.showAlpha !== undefined) {
            this.componentConfig.showAlpha = config.showAlpha;
        }
        if (config.predefine !== undefined) {
            this.componentConfig.predefine = config.predefine;
        }
    }
}
exports.default = EditStringColorType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1zdHJpbmctY29sb3ItdHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvbGliL2VkaXQtdHlwZXMvZWRpdC1zdHJpbmctY29sb3ItdHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNFQUE2RjtBQUU3RixNQUFxQixtQkFBb0IsU0FBUSx3QkFBWTtJQXlCMUQsWUFDRyxNQVVDO1FBRUQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBckNqQjs7V0FFRztRQUNJLGtCQUFhLEdBQUcsY0FBYyxDQUFBO1FBRXJDOztXQUVHO1FBQ0ksb0JBQWUsbUNBV2hCLElBQUksQ0FBQyxlQUFlLEtBQ3ZCLFNBQVMsRUFBRSxJQUFJLEVBQ2YsU0FBUyxFQUFFLEVBQUUsSUFDZjtRQWdCRSxJQUFJLE1BQU0sQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFO1lBQ2pDLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7U0FDcEQ7UUFDRCxJQUFJLE1BQU0sQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFO1lBQ2pDLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7U0FDcEQ7SUFDSixDQUFDO0NBQ0g7QUE5Q0Qsc0NBOENDIn0=