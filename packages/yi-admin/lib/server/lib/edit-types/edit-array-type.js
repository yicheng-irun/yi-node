"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditArrayType = void 0;
const edit_base_type_1 = require("./edit-base-type");
const list_array_type_1 = require("../list-types/list-array-type");
class EditArrayType extends edit_base_type_1.EditBaseType {
    constructor(config) {
        super(config);
        /**
         * 前端的组件名称
         */
        this.componentName = 'array';
        /**
         * 前端组件的参数
         */
        this.componentConfig = Object.assign(Object.assign({}, this.componentConfig), { minLength: 0, maxLength: undefined });
        if (typeof config.minLength === 'number') {
            this.componentConfig.minLength = config.minLength;
        }
        if (typeof config.maxLength === 'number') {
            this.componentConfig.maxLength = config.maxLength;
        }
        if (config.childrenType instanceof edit_base_type_1.EditBaseType) {
            this.componentConfig.childrenType = config.childrenType;
        }
        else {
            throw new Error('数组的子类型childrenType 必须是一个EditBaseType');
        }
        this.componentConfig.listStyleInline = config.listStyleInline;
    }
    /**
     * 交给子组件去处理
     * @param actionName
     * @param actionData
     * @param ctx
     * @override
     */
    async action(actionName, actionData, reqData) {
        const result = await this.componentConfig.childrenType.action(actionName, actionData, reqData);
        return result;
    }
    getListType() {
        return new list_array_type_1.ListArrayType({
            fieldNameAlias: this.fieldNameAlias,
            childrenType: this.componentConfig.childrenType.getListType(),
            listStyleInline: this.componentConfig.listStyleInline,
        });
    }
}
exports.EditArrayType = EditArrayType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1hcnJheS10eXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NlcnZlci9saWIvZWRpdC10eXBlcy9lZGl0LWFycmF5LXR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscURBQTZGO0FBRTdGLG1FQUE4RDtBQUc5RCxNQUFhLGFBQWMsU0FBUSw2QkFBWTtJQWtDNUMsWUFDRyxNQWFDO1FBRUQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBakRqQjs7V0FFRztRQUNJLGtCQUFhLEdBQUcsT0FBTyxDQUFBO1FBRTlCOztXQUVHO1FBQ0ksb0JBQWUsbUNBb0JoQixJQUFJLENBQUMsZUFBZSxLQUN2QixTQUFTLEVBQUUsQ0FBQyxFQUNaLFNBQVMsRUFBRSxTQUFTLElBQ3RCO1FBbUJFLElBQUksT0FBTyxNQUFNLENBQUMsU0FBUyxLQUFLLFFBQVEsRUFBRTtZQUN2QyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO1NBQ3BEO1FBQ0QsSUFBSSxPQUFPLE1BQU0sQ0FBQyxTQUFTLEtBQUssUUFBUSxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7U0FDcEQ7UUFDRCxJQUFJLE1BQU0sQ0FBQyxZQUFZLFlBQVksNkJBQVksRUFBRTtZQUM5QyxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDO1NBQzFEO2FBQU07WUFDSixNQUFNLElBQUksS0FBSyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7U0FDMUQ7UUFDRCxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDO0lBQ2pFLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSSxLQUFLLENBQUMsTUFBTSxDQUFFLFVBQWtCLEVBQUUsVUFBZSxFQUFFLE9BQWdCO1FBQ3ZFLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDL0YsT0FBTyxNQUFNLENBQUM7SUFDakIsQ0FBQztJQUVNLFdBQVc7UUFDZixPQUFPLElBQUksK0JBQWEsQ0FBQztZQUN0QixjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWM7WUFDbkMsWUFBWSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRTtZQUM3RCxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlO1NBQ3ZELENBQUMsQ0FBQztJQUNOLENBQUM7Q0FDSDtBQXBGRCxzQ0FvRkMifQ==