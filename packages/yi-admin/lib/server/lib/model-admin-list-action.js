"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 列表页的用户动作类
 */
class ModelAdminListAction {
    constructor(config) {
        /**
         * 这个列表操作是否支持批量操作,用于展示在表格的顶端
         */
        this.isBatchAction = true;
        /**
         * 这个操作是否在表格中显示
         */
        this.isTableRowAction = true;
        /**
         * 这个操作是否需要弹窗确认
         */
        this.popConfirm = true;
        /**
         * 按钮样式
         */
        this.buttonType = '';
        /**
         * 按钮的图标
         */
        this.buttonIcon = '';
        if (!config.actionName)
            throw new Error('actionName 不能为空');
        this.actionName = config.actionName;
        if (typeof config.isBatchAction === 'boolean') {
            this.isBatchAction = config.isBatchAction;
        }
        if (typeof config.isTableRowAction === 'boolean') {
            this.isTableRowAction = config.isTableRowAction;
        }
        if (typeof config.popConfirm === 'boolean') {
            this.popConfirm = config.popConfirm;
        }
        if (typeof config.buttonType === 'string') {
            this.buttonType = config.buttonType;
        }
        if (typeof config.buttonIcon === 'string') {
            this.buttonIcon = config.buttonIcon;
        }
        this.actionFunc = config.actionFunc;
    }
}
exports.ModelAdminListAction = ModelAdminListAction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWwtYWRtaW4tbGlzdC1hY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmVyL2xpYi9tb2RlbC1hZG1pbi1saXN0LWFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQWtCQTs7R0FFRztBQUNILE1BQWEsb0JBQW9CO0lBQzlCLFlBQWEsTUF3Q1o7UUEyQkQ7O1dBRUc7UUFDSSxrQkFBYSxHQUFHLElBQUksQ0FBQztRQUU1Qjs7V0FFRztRQUNJLHFCQUFnQixHQUFHLElBQUksQ0FBQztRQUUvQjs7V0FFRztRQUNJLGVBQVUsR0FBRyxJQUFJLENBQUM7UUFFekI7O1dBRUc7UUFDSSxlQUFVLEdBQWUsRUFBRSxDQUFDO1FBRW5DOztXQUVHO1FBQ0ksZUFBVSxHQUFHLEVBQUUsQ0FBQztRQWpEcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUNwQyxJQUFJLE9BQU8sTUFBTSxDQUFDLGFBQWEsS0FBSyxTQUFTLEVBQUU7WUFDNUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDO1NBQzVDO1FBQ0QsSUFBSSxPQUFPLE1BQU0sQ0FBQyxnQkFBZ0IsS0FBSyxTQUFTLEVBQUU7WUFDL0MsSUFBSSxDQUFDLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztTQUNsRDtRQUNELElBQUksT0FBTyxNQUFNLENBQUMsVUFBVSxLQUFLLFNBQVMsRUFBRTtZQUN6QyxJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7U0FDdEM7UUFDRCxJQUFJLE9BQU8sTUFBTSxDQUFDLFVBQVUsS0FBSyxRQUFRLEVBQUU7WUFDeEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO1NBQ3RDO1FBQ0QsSUFBSSxPQUFPLE1BQU0sQ0FBQyxVQUFVLEtBQUssUUFBUSxFQUFFO1lBQ3hDLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztTQUN0QztRQUVELElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztJQUN2QyxDQUFDO0NBb0NIO0FBakdELG9EQWlHQyJ9