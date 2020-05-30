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
exports.ModelAdminBase = ModelAdminBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWwtYWRtaW4tYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvbGliL21vZGVsLWFkbWluLWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFrRUEsTUFBYSxjQUFjO0lBcUJ4QixZQUFhLEVBQ1YsVUFBVSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsS0FBSyxHQUFHLEVBQUUsR0FDckI7UUF0QnZCOzs7V0FHRztRQUNJLGVBQVUsR0FBZ0QsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtZQUNsRixNQUFNLElBQUksRUFBRSxDQUFDO1FBQ2hCLENBQUMsQ0FBQTtRQU9EOztXQUVHO1FBQ0ksVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUVYLGdCQUFXLEdBQTJCLEVBQUUsQ0FBQztRQUs3QyxJQUFJLFVBQVUsRUFBRTtZQUNiLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1NBQy9CO1FBQ0QsdUJBQXVCO1FBQ3ZCLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUM3QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztTQUNwQjthQUFNO1lBQ0osTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1NBQ2hEO1FBRUQsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFFbkIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQzdCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1NBQ2pDO0lBQ0osQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBVyxJQUFJO1FBQ1osT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7T0FFRztJQUNJLGlCQUFpQjtRQUNyQixNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVEOztPQUVHO0lBQ0ksV0FBVyxDQUFFLEVBQVUsRUFBRSxHQUFZO1FBQ3pDLE1BQU0sSUFBSSxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxVQUFVLENBQUUsRUFBVSxFQUFFLE9BQWUsRUFBRSxHQUFZO1FBQ3pELE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBR0Q7O09BRUc7SUFDSSxpQkFBaUI7UUFDckIsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRDs7T0FFRztJQUNJLFdBQVcsQ0FBRSxHQUF3QixFQUFFLEdBQVk7UUFDdkQsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRDs7T0FFRztJQUNJLFVBQVUsQ0FBRSxFQUFVLEVBQUUsR0FBWTtRQUN4QyxNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDMUMsQ0FBQztDQUNIO0FBN0ZELHdDQTZGQyJ9