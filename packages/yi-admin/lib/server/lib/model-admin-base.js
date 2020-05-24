"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ModelAdminBase {
    constructor({ permission, name, listActions, title = '', }) {
        /**
         * 判断用户是否有权限
         * 如果没有权限，直接在里侧抛出异常或者返回false
         */
        this.permission = async (ctx, next) => {
            await next();
        };
        /**
         * 通常用于菜单中
         */
        this.title = '';
        this.listActions = [];
        if (permission) {
            this.permission = permission;
        }
        // 因为要在url的路径中，所以要做这个限制
        if (/^[0-9a-z_-]+$/.test(name)) {
            this.$name = name;
        }
        else {
            throw new Error('name的规则必须满足/^[0-9a-z_-]+$/');
        }
        this.title = title;
        if (Array.isArray(listActions)) {
            this.listActions = listActions;
        }
    }
    /**
     * model的name，用户路径中，不能重复，不能更改
     */
    get name() {
        return this.$name;
    }
    /**
     * 获取表单编辑页的字段列表
     */
    getEditFormFields() {
        throw new Error('请在子类中实现getEditFormFields函数');
    }
    /**
     * edit-form中拉取数据的函数
     */
    getEditData(id, ctx) {
        throw new Error('请在子类中实现getEditData函数');
    }
    /**
     * 用户提交数据时，编辑时id是非空，新建时id是空的
     * @param id
     * @param forData
     * @param ctx
     */
    formSubmit(id, forData, ctx) {
        throw new Error('请在子类中实现removeItem函数');
    }
    /**
     * 获取列表页字段列表
     */
    getDataListFields() {
        throw new Error('请在子类中实现getDataListFields函数');
    }
    /**
     * data-list中拉取数据的函数
     */
    getDataList(req, ctx) {
        throw new Error('请在子类中实现getDataList函数');
    }
    /**
     * 删除除某一项
     */
    removeItem(id, ctx) {
        throw new Error('请在子类中实现removeItem函数');
    }
}
exports.default = ModelAdminBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWwtYWRtaW4tYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvbGliL21vZGVsLWFkbWluLWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFrRUEsTUFBcUIsY0FBYztJQXFCaEMsWUFBYSxFQUNWLFVBQVUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssR0FBRyxFQUFFLEdBQ3JCO1FBdEJ2Qjs7O1dBR0c7UUFDSSxlQUFVLEdBQWdELEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7WUFDbEYsTUFBTSxJQUFJLEVBQUUsQ0FBQztRQUNoQixDQUFDLENBQUE7UUFPRDs7V0FFRztRQUNJLFVBQUssR0FBRyxFQUFFLENBQUM7UUFFWCxnQkFBVyxHQUEyQixFQUFFLENBQUM7UUFLN0MsSUFBSSxVQUFVLEVBQUU7WUFDYixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztTQUMvQjtRQUNELHVCQUF1QjtRQUN2QixJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDN0IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7U0FDcEI7YUFBTTtZQUNKLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztTQUNoRDtRQUVELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBRW5CLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUM3QixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztTQUNqQztJQUNKLENBQUM7SUFFRDs7T0FFRztJQUNILElBQVcsSUFBSTtRQUNaLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNyQixDQUFDO0lBRUQ7O09BRUc7SUFDSSxpQkFBaUI7UUFDckIsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRDs7T0FFRztJQUNJLFdBQVcsQ0FBRSxFQUFVLEVBQUUsR0FBWTtRQUN6QyxNQUFNLElBQUksS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksVUFBVSxDQUFFLEVBQVUsRUFBRSxPQUFlLEVBQUUsR0FBWTtRQUN6RCxNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUdEOztPQUVHO0lBQ0ksaUJBQWlCO1FBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxXQUFXLENBQUUsR0FBd0IsRUFBRSxHQUFZO1FBQ3ZELE1BQU0sSUFBSSxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxVQUFVLENBQUUsRUFBVSxFQUFFLEdBQVk7UUFDeEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQzFDLENBQUM7Q0FDSDtBQTdGRCxpQ0E2RkMifQ==