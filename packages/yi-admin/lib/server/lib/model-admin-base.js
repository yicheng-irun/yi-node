"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelAdminBase = void 0;
const list_string_html_type_1 = require("./list-types/list-string-html-type");
class ModelAdminBase {
    constructor({ permissionKoa, permissionExpress, name, listActions, title = '', formFields, formFieldsExclude, listFields, listFieldsExclude, listFieldsInclude, }) {
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
        this.listFieldsInclude = listFieldsInclude;
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
        var _a, _b;
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
        if (this.listFieldsInclude) {
            for (let i = 0; i < this.listFieldsInclude.length; i += 1) {
                const item = this.listFieldsInclude[i];
                let index = -1;
                let fieldName = '';
                let title = '';
                if (typeof item === 'string') {
                    fieldName = item;
                    title = item;
                }
                else {
                    fieldName = item.fieldName;
                    title = (_a = item.title) !== null && _a !== void 0 ? _a : fieldName;
                    index = (_b = item.index) !== null && _b !== void 0 ? _b : -1;
                }
                fields = fields.filter((t) => t.fieldName !== fieldName);
                const tempType = new list_string_html_type_1.ListStringHtmlType({
                    fieldNameAlias: title,
                });
                tempType.fieldName = fieldName;
                if (index < 0) {
                    fields.push(tempType);
                }
                else if (fields.length > index) {
                    fields.splice(index, 0, tempType);
                }
                else {
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
        if (this.listFieldsInclude) {
            this.listFieldsInclude.forEach((key) => {
                const fieldName = typeof key === 'string' ? key : key.fieldName;
                if (!dbFields.includes(fieldName)) {
                    extraFields.push(fieldName);
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
        const extraFields = this.getExtraDataListFileds();
        if (extraFields.length) {
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
                    else if (item.item && item.item[addKey]) {
                        let value = item.item[addKey];
                        if (typeof item.item[addKey] === 'function') {
                            value = item.item[addKey]();
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
                delete item.item;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWwtYWRtaW4tYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvbGliL21vZGVsLWFkbWluLWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBVUEsOEVBQXdFO0FBdUh4RSxNQUFhLGNBQWM7SUEwRHhCLFlBQWEsRUFDVixhQUFhLEVBQ2IsaUJBQWlCLEVBQ2pCLElBQUksRUFDSixXQUFXLEVBQ1gsS0FBSyxHQUFHLEVBQUUsRUFDVixVQUFVLEVBQ1YsaUJBQWlCLEVBQ2pCLFVBQVUsRUFDVixpQkFBaUIsRUFDakIsaUJBQWlCLEdBQ0c7UUFwRXZCOzs7V0FHRztRQUNJLGtCQUFhLEdBQXNDLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7WUFDM0UsTUFBTSxJQUFJLEVBQUUsQ0FBQztRQUNoQixDQUFDLENBQUE7UUFFRDs7O1dBR0c7UUFDSSxzQkFBaUIsR0FBNkUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO1lBQ3JILElBQUksRUFBRSxDQUFDO1FBQ1YsQ0FBQyxDQUFBO1FBT0Q7O1dBRUc7UUFDSSxVQUFLLEdBQUcsRUFBRSxDQUFDO1FBRWxCOztXQUVHO1FBQ0ksZ0JBQVcsR0FBMkIsRUFBRSxDQUFDO1FBd0M3Qyx1QkFBdUI7UUFDdkIsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzdCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1NBQ3BCO2FBQU07WUFDSixNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7U0FDaEQ7UUFFRCxJQUFJLGFBQWEsRUFBRTtZQUNoQixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztTQUNyQztRQUNELElBQUksaUJBQWlCLEVBQUU7WUFDcEIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO1NBQzdDO1FBRUQsSUFBSSxDQUFDLEtB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