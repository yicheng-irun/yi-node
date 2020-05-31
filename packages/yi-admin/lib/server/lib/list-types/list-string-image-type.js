"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1zdHJpbmctaW1hZ2UtdHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvbGliL2xpc3QtdHlwZXMvbGlzdC1zdHJpbmctaW1hZ2UtdHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFEQUFvRTtBQUVwRSxNQUFhLG1CQUFvQixTQUFRLDZCQUFZO0lBMEJsRCxZQUFhLE1BV1o7UUFDRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFyQ2pCOztXQUVHO1FBQ0ksa0JBQWEsR0FBRyxjQUFjLENBQUE7UUFFckM7O1dBRUc7UUFDSSxvQkFBZSxtQ0FZaEIsSUFBSSxDQUFDLGVBQWUsS0FDdkIsYUFBYSxFQUFFLE1BQU0sRUFDckIsY0FBYyxFQUFFLEtBQUssSUFDdkI7UUFlRSxJQUFJLE1BQU0sQ0FBQyxhQUFhO1lBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQztRQUNwRixJQUFJLE1BQU0sQ0FBQyxjQUFjO1lBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQztJQUMxRixDQUFDO0NBQ0g7QUExQ0Qsa0RBMENDIn0=