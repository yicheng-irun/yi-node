"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const edit_base_type_1 = require("./edit-base-type");
class EditNumberType extends edit_base_type_1.EditBaseType {
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
exports.EditNumberType = EditNumberType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1udW1iZXItdHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvbGliL2VkaXQtdHlwZXMvZWRpdC1udW1iZXItdHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFEQUE2RjtBQUU3RixNQUFhLGNBQWUsU0FBUSw2QkFBWTtJQW9CN0MsWUFDRyxNQUlDO1FBRUQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBMUJqQjs7V0FFRztRQUNJLGtCQUFhLEdBQUcsUUFBUSxDQUFBO1FBRS9COztXQUVHO1FBQ0ksb0JBQWUsbUNBS2hCLElBQUksQ0FBQyxlQUFlLEtBQ3ZCLEdBQUcsRUFBRSxTQUFTLEVBQ2QsR0FBRyxFQUFFLFNBQVMsRUFDZCxJQUFJLEVBQUUsQ0FBQyxJQUNUO1FBVUUsSUFBSSxLQUFLLElBQUksTUFBTSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7U0FDeEM7UUFDRCxJQUFJLEtBQUssSUFBSSxNQUFNLEVBQUU7WUFDbEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQztTQUN4QztRQUNELElBQUksTUFBTSxJQUFJLE1BQU0sRUFBRTtZQUNuQixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQztZQUM5QixJQUFJLElBQUksSUFBSSxDQUFDO2dCQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1NBQ25DO0lBQ0osQ0FBQztDQUNIO0FBeENELHdDQXdDQyJ9