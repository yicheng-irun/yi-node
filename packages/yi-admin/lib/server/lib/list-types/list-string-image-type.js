"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListStringImageType = void 0;
const list_base_type_1 = require("./list-base-type");
class ListStringImageType extends list_base_type_1.ListBaseType {
    constructor(config) {
        super(config);
        /**
         * 前端的组件名称
         */
        this.componentName = 'string-image';
        /**
         * 前端组件的参数
         */
        this.componentConfig = Object.assign(Object.assign({}, this.componentConfig), { styleMaxWidth: '10em', styleMaxHeight: '6em' });
        if (config.styleMaxWidth)
            this.componentConfig.styleMaxWidth = config.styleMaxWidth;
        if (config.styleMaxHeight)
            this.componentConfig.styleMaxHeight = config.styleMaxHeight;
    }
}
exports.ListStringImageType = ListStringImageType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1zdHJpbmctaW1hZ2UtdHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvbGliL2xpc3QtdHlwZXMvbGlzdC1zdHJpbmctaW1hZ2UtdHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxREFBb0U7QUFFcEUsTUFBYSxtQkFBb0IsU0FBUSw2QkFBWTtJQTBCbEQsWUFBYSxNQVdaO1FBQ0UsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBckNqQjs7V0FFRztRQUNJLGtCQUFhLEdBQUcsY0FBYyxDQUFBO1FBRXJDOztXQUVHO1FBQ0ksb0JBQWUsbUNBWWhCLElBQUksQ0FBQyxlQUFlLEtBQ3ZCLGFBQWEsRUFBRSxNQUFNLEVBQ3JCLGNBQWMsRUFBRSxLQUFLLElBQ3ZCO1FBZUUsSUFBSSxNQUFNLENBQUMsYUFBYTtZQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUM7UUFDcEYsSUFBSSxNQUFNLENBQUMsY0FBYztZQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUM7SUFDMUYsQ0FBQztDQUNIO0FBMUNELGtEQTBDQyJ9