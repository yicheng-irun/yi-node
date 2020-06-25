"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const edit_base_type_1 = require("./edit-base-type");
const list_array_string_tag_type_1 = require("../list-types/list-array-string-tag-type");
class EditArrayStringTagType extends edit_base_type_1.EditBaseType {
    constructor(config) {
        super(config);
        /**
         * 前端的组件名称
         */
        this.componentName = 'array-string-tag';
        /**
         * 前端组件的参数
         */
        this.componentConfig = Object.assign(Object.assign({}, this.componentConfig), { minLength: 0, maxLength: undefined });
        this.getTags = (search) => Promise.resolve([String(search).trim()]);
        if (typeof config.minLength === 'number') {
            this.componentConfig.minLength = config.minLength;
        }
        if (typeof config.maxLength === 'number') {
            this.componentConfig.maxLength = config.maxLength;
        }
        this.getTags = config.getTags;
    }
    /**
     * 交给子组件去处理
     * @param actionName
     * @param actionData
     * @param ctx
     */
    async action(actionName, actionData, ctx) {
        if (actionName === 'getTags') {
            return this.getTags(actionData);
        }
        throw new Error(`接收到非法actionName ${actionName}`);
    }
    getListType() {
        return new list_array_string_tag_type_1.ListArrayStringTagType({
            fieldNameAlias: this.fieldNameAlias,
        });
    }
}
exports.EditArrayStringTagType = EditArrayStringTagType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1hcnJheS1zdHJpbmctdGFnLXR5cGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmVyL2xpYi9lZGl0LXR5cGVzL2VkaXQtYXJyYXktc3RyaW5nLXRhZy10eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EscURBQTZGO0FBRTdGLHlGQUFrRjtBQUVsRixNQUFhLHNCQUF1QixTQUFRLDZCQUFZO0lBd0JyRCxZQUNHLE1BYUM7UUFFRCxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUF2Q2pCOztXQUVHO1FBQ0ksa0JBQWEsR0FBRyxrQkFBa0IsQ0FBQTtRQUV6Qzs7V0FFRztRQUNJLG9CQUFlLG1DQVVoQixJQUFJLENBQUMsZUFBZSxLQUN2QixTQUFTLEVBQUUsQ0FBQyxFQUNaLFNBQVMsRUFBRSxTQUFTLElBQ3RCO1FBNEJNLFlBQU8sR0FBMEMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBVHpHLElBQUksT0FBTyxNQUFNLENBQUMsU0FBUyxLQUFLLFFBQVEsRUFBRTtZQUN2QyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO1NBQ3BEO1FBQ0QsSUFBSSxPQUFPLE1BQU0sQ0FBQyxTQUFTLEtBQUssUUFBUSxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7U0FDcEQ7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDakMsQ0FBQztJQUlEOzs7OztPQUtHO0lBQ0ksS0FBSyxDQUFDLE1BQU0sQ0FBRSxVQUFrQixFQUFFLFVBQWUsRUFBRSxHQUFZO1FBQ25FLElBQUksVUFBVSxLQUFLLFNBQVMsRUFBRTtZQUMzQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDbEM7UUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFTSxXQUFXO1FBQ2YsT0FBTyxJQUFJLG1EQUFzQixDQUFDO1lBQy9CLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYztTQUNyQyxDQUFDLENBQUM7SUFDTixDQUFDO0NBQ0g7QUF0RUQsd0RBc0VDIn0=