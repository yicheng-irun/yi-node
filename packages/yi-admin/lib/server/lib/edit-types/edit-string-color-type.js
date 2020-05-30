"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const edit_base_type_1 = require("./edit-base-type");
class EditStringColorType extends edit_base_type_1.EditBaseType {
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
exports.EditStringColorType = EditStringColorType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1zdHJpbmctY29sb3ItdHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvbGliL2VkaXQtdHlwZXMvZWRpdC1zdHJpbmctY29sb3ItdHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFEQUE2RjtBQUU3RixNQUFhLG1CQUFvQixTQUFRLDZCQUFZO0lBeUJsRCxZQUNHLE1BVUM7UUFFRCxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFyQ2pCOztXQUVHO1FBQ0ksa0JBQWEsR0FBRyxjQUFjLENBQUE7UUFFckM7O1dBRUc7UUFDSSxvQkFBZSxtQ0FXaEIsSUFBSSxDQUFDLGVBQWUsS0FDdkIsU0FBUyxFQUFFLElBQUksRUFDZixTQUFTLEVBQUUsRUFBRSxJQUNmO1FBZ0JFLElBQUksTUFBTSxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUU7WUFDakMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztTQUNwRDtRQUNELElBQUksTUFBTSxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUU7WUFDakMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztTQUNwRDtJQUNKLENBQUM7Q0FDSDtBQTlDRCxrREE4Q0MifQ==