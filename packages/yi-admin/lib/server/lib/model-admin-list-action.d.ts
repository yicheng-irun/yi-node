export interface ListActionResult {
    /**
     * 这批ID中成功的数量
     */
    successfulNum: number;
    /**
     * 这批ID中失败的数量
     */
    failedNum: number;
}
/**
 * 按钮类型参考
 * https://element.eleme.cn/#/zh-CN/component/button
 */
export declare type ButtonType = '' | 'primary' | 'success' | 'info' | 'warning' | 'danger';
/**
 * 列表页的用户动作类
 */
export declare class ModelAdminListAction {
    constructor(config: {
        /**
         * 动作名称在每一个model中应当是唯一的，两个对象拥有相同的actionName时，第一个会被执行，后面的不会被执行
         * 传入一个名字为`delete`的actionName，可以覆盖默认提供的删除操作
         */
        actionName: 'delete' | string;
        /**
         * 是否是批量操作的action
         */
        isBatchAction?: boolean;
        /**
         * 是否在表单的行内显示这个action按钮
         */
        isTableRowAction?: boolean;
        /**
         * 这个操作是否需要弹窗确认
         */
        popConfirm?: boolean;
        /**
         * 按钮样式
         * 传递给前端的组件
         * '' | 'primary' | 'success' | 'info' | 'warning' | 'danger'
         */
        buttonType?: ButtonType;
        /**
         * 按钮上的图标
         * 传递给前端el-button组件
         * 按钮图标参考
         * 此处类型声明暂只声明一部分
         * https://element.eleme.cn/#/zh-CN/component/icon
         * 'el-icon-edit' | 'el-icon-share' | 'el-icon-delete' | 'el-icon-search' | 'el-icon-upload'
         */
        buttonIcon?: string;
        /**
         * action的执行函数
         */
        actionFunc: (idList: string[]) => Promise<ListActionResult>;
    });
    /**
     * 这个操作的名称
     */
    actionName: string;
    /**
     * 这个列表操作是否支持批量操作,用于展示在表格的顶端
     */
    isBatchAction: boolean;
    /**
     * 这个操作是否在表格中显示
     */
    isTableRowAction: boolean;
    /**
     * 这个操作是否需要弹窗确认
     */
    popConfirm: boolean;
    /**
     * 按钮样式
     */
    buttonType: ButtonType;
    /**
     * 按钮的图标
     */
    buttonIcon: string;
    /**
     * 执行批量操作的回调函数, 如果执行失败请返回一个错误new Error("错误标题")，错误标题会显示给用户
     */
    actionFunc: (idList: string[]) => Promise<ListActionResult>;
}
