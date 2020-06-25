"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const list_string_html_type_1 = require("./list-types/list-string-html-type");
class ModelAdminBase {
    constructor({ permission, name, listActions, title = '', formFields, formFieldsExclude, listFields, listFieldsExclude, }) {
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
        /**
         * 列表页中的用户按钮或者批量操作项
         */
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
        this.formFields = formFields;
        this.formFieldsExclude = formFieldsExclude;
        this.listFields = listFields;
        this.listFieldsExclude = listFieldsExclude;
    }
    /**
     * model的name，用户路径中，不能重复，不能更改
     */
    get name() {
        return this.$name;
    }
    /**
     * 获取表单编辑页的字段列表 [未过滤的]
     */
    getEditFormFields() {
        throw new Error('请在子类中实现getEditFormFields函数');
    }
    getEditFormFieldsAfterFilter() {
        let fields = this.getEditFormFields();
        if (this.formFields) {
            const temp = fields;
            fields = [];
            for (let i = 0; i < this.formFields.length; i += 1) {
                const name = this.formFields[i];
                const filterResults = temp.filter((item) => (item.fieldName === name));
                if (filterResults.length) {
                    fields.push(filterResults[0]);
                }
            }
        }
        if (this.formFieldsExclude) {
            fields = fields.filter((item) => {
                var _a;
                return (!((_a = this.formFieldsExclude) === null || _a === void 0 ? void 0 : _a.includes(item.fieldName)));
            });
        }
        return fields;
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
    getDataListFieldsAfterFilter() {
        let fields = this.getDataListFields();
        if (this.listFields) {
            const temp = fields;
            fields = [];
            for (let i = 0; i < this.listFields.length; i += 1) {
                const name = this.listFields[i];
                const filterResults = temp.filter((item) => (item.fieldName === name));
                if (filterResults.length) {
                    fields.push(filterResults[0]);
                }
                else {
                    const tempType = new list_string_html_type_1.ListStringHtmlType({});
                    tempType.fieldName = name;
                    fields.push(tempType);
                }
            }
        }
        if (this.listFieldsExclude) {
            fields = fields.filter((item) => {
                var _a;
                return (!((_a = this.listFieldsExclude) === null || _a === void 0 ? void 0 : _a.includes(item.fieldName)));
            });
        }
        return fields;
    }
    getExtraDataListFileds() {
        const dbFields = this.getDataListFields().map((t) => (t.fieldName));
        const extraFields = [];
        if (this.listFields) {
            this.listFields.forEach((key) => {
                if (!dbFields.includes(key)) {
                    extraFields.push(key);
                }
            });
        }
        return extraFields;
    }
    /**
     * data-list中拉取数据的函数
     */
    getDataList(req, ctx) {
        throw new Error('请在子类中实现getDataList函数');
    }
    async getDataListAfterFilter(req, ctx) {
        const dataResult = await this.getDataList(req, ctx);
        if (this.listFields) {
            const extraFields = this.getExtraDataListFileds();
            const promises = dataResult.dataList.map(async (item) => {
                const values = Object.assign({}, (item.values.toObject ? item.values.toObject() : item.values));
                const promises2 = extraFields.map(async (addKey) => {
                    if (item.values[addKey]) {
                        let value = item.values[addKey];
                        if (typeof item.values[addKey] === 'function') {
                            value = item.values[addKey]();
                        }
                        if (value instanceof Promise) {
                            values[addKey] = await value;
                        }
                        else {
                            values[addKey] = value;
                        }
                    }
                });
                await Promise.all(promises2);
                item.values = values;
            });
            await Promise.all(promises);
        }
        if (this.listFieldsExclude) {
            dataResult.dataList.forEach((item) => {
                Object.keys(item.values).forEach((key) => {
                    var _a;
                    if ((_a = this.listFieldsExclude) === null || _a === void 0 ? void 0 : _a.includes(key)) {
                        delete item.values[key];
                    }
                });
            });
        }
        return dataResult;
    }
    /**
     * 删除除某一项，用于提供默认的删除功能
     */
    removeItem(id, ctx) {
        throw new Error('请在子类中实现removeItem函数');
    }
    /**
     * 获取列表页过滤的参数
     */
    getFilterFields() {
        throw new Error('请在子类中实现getFilterFields函数');
    }
}
exports.ModelAdminBase = ModelAdminBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWwtYWRtaW4tYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvbGliL21vZGVsLWFkbWluLWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFTQSw4RUFBd0U7QUF3RnhFLE1BQWEsY0FBYztJQTRDeEIsWUFBYSxFQUNWLFVBQVUsRUFDVixJQUFJLEVBQ0osV0FBVyxFQUNYLEtBQUssR0FBRyxFQUFFLEVBQ1YsVUFBVSxFQUNWLGlCQUFpQixFQUNqQixVQUFVLEVBQ1YsaUJBQWlCLEdBQ0c7UUFwRHZCOzs7V0FHRztRQUNJLGVBQVUsR0FBaUQsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtZQUNuRixNQUFNLElBQUksRUFBRSxDQUFDO1FBQ2hCLENBQUMsQ0FBQTtRQU9EOztXQUVHO1FBQ0ksVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUVsQjs7V0FFRztRQUNJLGdCQUFXLEdBQTJCLEVBQUUsQ0FBQztRQWdDN0MsSUFBSSxVQUFVLEVBQUU7WUFDYixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztTQUMvQjtRQUNELHVCQUF1QjtRQUN2QixJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDN0IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7U0FDcEI7YUFBTTtZQUNKLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztTQUNoRDtRQUVELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBRW5CLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUM3QixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztTQUNqQztRQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQztRQUMzQyxJQUFJLENBQUMsVUFBVSxH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