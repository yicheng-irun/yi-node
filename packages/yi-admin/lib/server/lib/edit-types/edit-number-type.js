"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const edit_base_type_1 = __importDefault(require("./edit-base-type"));
class EditNumberType extends edit_base_type_1.default {
    constructor(config) {
        super(config);
        /**
         * 前端的组件名称
         */
        this.componentName = 'number';
        /**
         * 前端组件的参数
         */
        this.componentConfig = Object.assign(Object.assign({}, this.componentConfig), { min: undefined, max: undefined, step: 1 });
        if ('min' in config) {
            this.componentConfig.min = config.min;
        }
        if ('max' in config) {
            this.componentConfig.max = config.max;
        }
        if ('step' in config) {
            const step = config.step || 1;
            if (step <= 0)
                throw new Error('step 不能小于或等于0');
            this.componentConfig.step = step;
        }
    }
}
exports.default = EditNumberType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1udW1iZXItdHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvbGliL2VkaXQtdHlwZXMvZWRpdC1udW1iZXItdHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNFQUE2RjtBQUU3RixNQUFxQixjQUFlLFNBQVEsd0JBQVk7SUFvQnJELFlBQ0csTUFJQztRQUVELEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQTFCakI7O1dBRUc7UUFDSSxrQkFBYSxHQUFHLFFBQVEsQ0FBQTtRQUUvQjs7V0FFRztRQUNJLG9CQUFlLG1DQUtoQixJQUFJLENBQUMsZUFBZSxLQUN2QixHQUFHLEVBQUUsU0FBUyxFQUNkLEdBQUcsRUFBRSxTQUFTLEVBQ2QsSUFBSSxFQUFFLENBQUMsSUFDVDtRQVVFLElBQUksS0FBSyxJQUFJLE1BQU0sRUFBRTtZQUNsQixJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDO1NBQ3hDO1FBQ0QsSUFBSSxLQUFLLElBQUksTUFBTSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7U0FDeEM7UUFDRCxJQUFJLE1BQU0sSUFBSSxNQUFNLEVBQUU7WUFDbkIsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7WUFDOUIsSUFBSSxJQUFJLElBQUksQ0FBQztnQkFBRSxNQUFNLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztTQUNuQztJQUNKLENBQUM7Q0FDSDtBQXhDRCxpQ0F3Q0MifQ==