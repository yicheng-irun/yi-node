"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelAdminBase = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWwtYWRtaW4tYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvbGliL21vZGVsLWFkbWluLWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBU0EsOEVBQXdFO0FBd0Z4RSxNQUFhLGNBQWM7SUE0Q3hCLFlBQWEsRUFDVixVQUFVLEVBQ1YsSUFBSSxFQUNKLFdBQVcsRUFDWCxLQUFLLEdBQUcsRUFBRSxFQUNWLFVBQVUsRUFDVixpQkFBaUIsRUFDakIsVUFBVSxFQUNWLGlCQUFpQixHQUNHO1FBcER2Qjs7O1dBR0c7UUFDSSxlQUFVLEdBQWlELEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7WUFDbkYsTUFBTSxJQUFJLEVBQUUsQ0FBQztRQUNoQixDQUFDLENBQUE7UUFPRDs7V0FFRztRQUNJLFVBQUssR0FBRyxFQUFFLENBQUM7UUFFbEI7O1dBRUc7UUFDSSxnQkFBVyxHQUEyQixFQUFFLENBQUM7UUFnQzdDLElBQUksVUFBVSxFQUFFO1lBQ2IsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7U0FDL0I7UUFDRCx1QkFBdUI7UUFDdkIsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzdCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1NBQ3BCO2FBQU07WUFDSixNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7U0FDaEQ7UUFFRCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUVuQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7U0FDakM7UUFDRCxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUM7UUFDM0MsSUFBSSxDQUFDLFVBQVUs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