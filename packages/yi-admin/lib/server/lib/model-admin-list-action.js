"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelAdminListAction = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWwtYWRtaW4tbGlzdC1hY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmVyL2xpYi9tb2RlbC1hZG1pbi1saXN0LWFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFrQkE7O0dBRUc7QUFDSCxNQUFhLG9CQUFvQjtJQUM5QixZQUFhLE1Bd0NaO1FBMkJEOztXQUVHO1FBQ0ksa0JBQWEsR0FBRyxJQUFJLENBQUM7UUFFNUI7O1dBRUc7UUFDSSxxQkFBZ0IsR0FBRyxJQUFJLENBQUM7UUFFL0I7O1dBRUc7UUFDSSxlQUFVLEdBQUcsSUFBSSxDQUFDO1FBRXpCOztXQUVHO1FBQ0ksZUFBVSxHQUFlLEVBQUUsQ0FBQztRQUVuQzs7V0FFRztRQUNJLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFqRHBCLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVTtZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDcEMsSUFBSSxPQUFPLE1BQU0sQ0FBQyxhQUFhLEtBQUssU0FBUyxFQUFFO1lBQzVDLElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQztTQUM1QztRQUNELElBQUksT0FBTyxNQUFNLENBQUMsZ0JBQWdCLEtBQUssU0FBUyxFQUFFO1lBQy9DLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUM7U0FDbEQ7UUFDRCxJQUFJLE9BQU8sTUFBTSxDQUFDLFVBQVUsS0FBSyxTQUFTLEVBQUU7WUFDekMsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO1NBQ3RDO1FBQ0QsSUFBSSxPQUFPLE1BQU0sQ0FBQyxVQUFVLEtBQUssUUFBUSxFQUFFO1lBQ3hDLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztTQUN0QztRQUNELElBQUksT0FBTyxNQUFNLENBQUMsVUFBVSxLQUFLLFFBQVEsRUFBRTtZQUN4QyxJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7U0FDdEM7UUFFRCxJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7SUFDdkMsQ0FBQztDQW9DSDtBQWpHRCxvREFpR0MifQ==