"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelAdminBase = void 0;
const list_string_html_type_1 = require("./list-types/list-string-html-type");
class ModelAdminBase {
    constructor({ permissionKoa, permissionExpress, name, listActions, title = '', formFields, formFieldsExclude, listFields, listFieldsExclude, }) {
        /**
         * 判断用户是否有权限
         * 如果没有权限，直接在里侧抛出异常
         */
        this.permissionKoa = async (ctx, next) => {
            await next();
        };
        /**
         * 判断用户是否有权限
         * 如果没有权限，直接在里侧抛出异常
         */
        this.permissionExpress = (req, res, next) => {
            next();
        };
        /**
         * 通常用于菜单中
         */
        this.title = '';
        /**
         * 列表页中的用户按钮或者批量操作项
         */
        this.listActions = [];
        // 因为要在url的路径中，所以要做这个限制
        if (/^[0-9a-z_-]+$/.test(name)) {
            this.$name = name;
        }
        else {
            throw new Error('name的规则必须满足/^[0-9a-z_-]+$/');
        }
        if (permissionKoa) {
            this.permissionKoa = permissionKoa;
        }
        if (permissionExpress) {
            this.permissionExpress = permissionExpress;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWwtYWRtaW4tYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvbGliL21vZGVsLWFkbWluLWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBVUEsOEVBQXdFO0FBb0d4RSxNQUFhLGNBQWM7SUFvRHhCLFlBQWEsRUFDVixhQUFhLEVBQ2IsaUJBQWlCLEVBQ2pCLElBQUksRUFDSixXQUFXLEVBQ1gsS0FBSyxHQUFHLEVBQUUsRUFDVixVQUFVLEVBQ1YsaUJBQWlCLEVBQ2pCLFVBQVUsRUFDVixpQkFBaUIsR0FDRztRQTdEdkI7OztXQUdHO1FBQ0ksa0JBQWEsR0FBc0MsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtZQUMzRSxNQUFNLElBQUksRUFBRSxDQUFDO1FBQ2hCLENBQUMsQ0FBQTtRQUVEOzs7V0FHRztRQUNJLHNCQUFpQixHQUE2RSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7WUFDckgsSUFBSSxFQUFFLENBQUM7UUFDVixDQUFDLENBQUE7UUFPRDs7V0FFRztRQUNJLFVBQUssR0FBRyxFQUFFLENBQUM7UUFFbEI7O1dBRUc7UUFDSSxnQkFBVyxHQUEyQixFQUFFLENBQUM7UUFpQzdDLHVCQUF1QjtRQUN2QixJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDN0IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7U0FDcEI7YUFBTTtZQUNKLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztTQUNoRDtRQUVELElBQUksYUFBYSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1NBQ3JDO1FBQ0QsSUFBSSxpQkFBaUIsRUFBRTtZQUNwQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUM7U0FDN0M7UUFFRCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUss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