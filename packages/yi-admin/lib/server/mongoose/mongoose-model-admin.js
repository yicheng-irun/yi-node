"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_admin_base_1 = require("../lib/model-admin-base");
const edit_base_type_1 = require("../lib/edit-types/edit-base-type");
const edit_string_type_1 = require("../lib/edit-types/edit-string-type");
const edit_string_enum_type_1 = require("../lib/edit-types/edit-string-enum-type");
const edit_number_type_1 = require("../lib/edit-types/edit-number-type");
const edit_number_enum_type_1 = require("../lib/edit-types/edit-number-enum-type");
const edit_boolean_type_1 = require("../lib/edit-types/edit-boolean-type");
const edit_date_time_type_1 = require("../lib/edit-types/edit-date-time-type");
const list_base_type_1 = require("../lib/list-types/list-base-type");
const list_boolean_type_1 = require("../lib/list-types/list-boolean-type");
const model_admin_list_action_1 = require("../lib/model-admin-list-action");
const edit_array_type_1 = require("../lib/edit-types/edit-array-type");
const list_array_type_1 = require("../lib/list-types/list-array-type");
const mongoose_filter_types_1 = require("./mongoose-filter-types");
const filter_base_type_1 = require("../lib/filter-types/filter-base-type");
/**
 * 映射mongoose的默认类型的图
 */
const INSTANCE_EDIT_TYPE_MAP = {
    ObjectID(schemaTypeOpts) {
        return new edit_base_type_1.EditBaseType({
            required: schemaTypeOpts.required,
            fieldNameAlias: schemaTypeOpts.name,
        });
    },
    String(schemaTypeOpts) {
        if (schemaTypeOpts.enum) {
            return new edit_string_enum_type_1.EditStringEnumType({
                enum: schemaTypeOpts.enum,
                required: schemaTypeOpts.required,
                fieldNameAlias: schemaTypeOpts.name,
            });
        }
        return new edit_string_type_1.EditStringType({
            required: schemaTypeOpts.required,
            minLength: schemaTypeOpts.minlength,
            maxLength: schemaTypeOpts.maxlength,
            fieldNameAlias: schemaTypeOpts.name,
            placeholder: schemaTypeOpts.placeholder || '',
        });
    },
    Number(schemaTypeOpts) {
        if (schemaTypeOpts.enum) {
            return new edit_number_enum_type_1.EditNumberEnumType({
                enum: schemaTypeOpts.enum,
                required: schemaTypeOpts.required,
                fieldNameAlias: schemaTypeOpts.name,
            });
        }
        return new edit_number_type_1.EditNumberType({
            required: schemaTypeOpts.required,
            min: schemaTypeOpts.min,
            max: schemaTypeOpts.max,
            step: schemaTypeOpts.step || 1,
            fieldNameAlias: schemaTypeOpts.name,
        });
    },
    Date(schemaTypeOpts) {
        return new edit_date_time_type_1.EditDateTimeType({
            required: schemaTypeOpts.required,
            fieldNameAlias: schemaTypeOpts.name,
        });
    },
    Boolean(schemaTypeOpts) {
        return new edit_boolean_type_1.EditBooleanType({
            required: schemaTypeOpts.required,
            fieldNameAlias: schemaTypeOpts.name,
        });
    },
    Array(schemaTypeOpts) {
        return new edit_array_type_1.EditArrayType({
            required: schemaTypeOpts.required,
            fieldNameAlias: schemaTypeOpts.name,
            maxLength: schemaTypeOpts.maxlength,
            minLength: schemaTypeOpts.minlength,
            childrenType: new edit_base_type_1.EditBaseType({}),
        });
    },
};
/**
 * 列表编辑项
 */
const INSTANCE_LIST_TYPE_MAP = {
    Base(schemaTypeOpts) {
        return new list_base_type_1.ListBaseType({
            fieldNameAlias: schemaTypeOpts.name,
        });
    },
    ObjectID(schemaTypeOpts) {
        return this.Base(schemaTypeOpts);
    },
    String(schemaTypeOpts) {
        return this.Base(schemaTypeOpts);
    },
    Number(schemaTypeOpts) {
        return this.Base(schemaTypeOpts);
    },
    Date(schemaTypeOpts) {
        return this.Base(schemaTypeOpts);
    },
    Boolean(schemaTypeOpts) {
        return new list_boolean_type_1.ListBooleanType({
            fieldNameAlias: schemaTypeOpts.name,
        });
    },
    Array(schemaTypeOpts) {
        return new list_array_type_1.ListArrayType({
            fieldNameAlias: schemaTypeOpts.name,
            childrenType: new list_base_type_1.ListBaseType({}),
        });
    },
};
class MongooseModelAdmin extends model_admin_base_1.ModelAdminBase {
    constructor(options) {
        super(options);
        this.model = options.model;
        this.appendDeleteListAction();
    }
    appendDeleteListAction() {
        /**
         * 增加一个默认的删除使用的列表action
         */
        this.listActions.push(new model_admin_list_action_1.ModelAdminListAction({
            actionName: '删除',
            actionFunc: async (idList) => {
                if (!Array.isArray(idList) || !idList.length) {
                    throw new Error('操作对象idList不能为空');
                }
                const result = await this.model.deleteMany({
                    _id: {
                        $in: idList,
                    },
                });
                return {
                    successfulNum: result.deletedCount || 0,
                    failedNum: idList.length - (result.deletedCount || 0),
                };
            },
            buttonType: 'danger',
            buttonIcon: 'delete',
        }));
    }
    getEditFormFields() {
        const fields = [];
        const { schema } = this.model;
        const pathsKeys = Object.keys(schema.paths);
        pathsKeys.forEach((key) => {
            // 卧槽，这个mongoose的这里的类型声明不正确
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            const schemaPath = schema.paths[key];
            if (key === '_id' || key === '__v')
                return;
            const { instance } = schemaPath;
            let typeInstance = null;
            if (schemaPath.options.editType && schemaPath.options.editType instanceof edit_base_type_1.EditBaseType) {
                typeInstance = schemaPath.options.editType;
            }
            else if (INSTANCE_EDIT_TYPE_MAP[instance]) {
                typeInstance = INSTANCE_EDIT_TYPE_MAP[instance](schemaPath.options);
            }
            if (typeInstance) {
                typeInstance.fieldName = schemaPath.path;
                if (!typeInstance.fieldNameAlias) {
                    typeInstance.fieldNameAlias = schemaPath.options.name || '';
                }
                if (typeInstance.componentConfig.helpText === null && schemaPath.options.helpText) {
                    typeInstance.componentConfig.helpText = `${schemaPath.options.helpText}`;
                }
                fields.push(typeInstance);
            }
        });
        return fields;
    }
    /**
     * edit-form中拉取数据的函数
     */
    async getEditData(id, ctx) {
        let item = null;
        if (id) {
            item = await this.model.findById(id);
            if (!item)
                throw new Error('未找到该编辑项');
        }
        else {
            // eslint-disable-next-line new-cap
            item = new (this.model)();
        }
        return {
            id: item.id,
            values: Object.assign(Object.assign({}, item.toObject()), { _id: undefined, __v: undefined }),
        };
    }
    async formSubmit(id, formData, ctx) {
        let item;
        if (id) {
            const fItem = await this.model.findById(id);
            if (fItem) {
                item = fItem;
            }
            else {
                throw new Error('未找到该编辑项');
            }
            const formFields = this.getEditFormFields();
            formFields.forEach((field) => {
                const path = field.fieldName;
                item.set(path, formData[path]);
            });
        }
        else {
            // eslint-disable-next-line new-cap
            item = new (this.model)(formData);
        }
        await item.save();
        return {
            id: item.id,
            values: Object.assign(Object.assign({}, item.toObject()), { _id: undefined, __v: undefined }),
        };
    }
    /**
     * 获取列表页字段列表
     */
    getDataListFields() {
        const editFormFields = this.getEditFormFields();
        const fields = [];
        const { schema } = this.model;
        const pathsKeys = Object.keys(schema.paths);
        pathsKeys.forEach((key) => {
            // 卧槽，这个mongoose的这里的类型声明不正确
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            const schemaPath = schema.paths[key];
            if (key === '_id' || key === '__v')
                return;
            const { instance, path } = schemaPath;
            const editInstances = editFormFields.filter((editTypeItem) => editTypeItem.fieldName === path);
            let typeInstance = null;
            if (schemaPath.options.listType && schemaPath.options.listType instanceof list_base_type_1.ListBaseType) {
                typeInstance = schemaPath.options.listType;
            }
            else if (editInstances.length > 0) {
                typeInstance = editInstances[0].getListType();
            }
            else if (INSTANCE_LIST_TYPE_MAP[instance]) {
                typeInstance = INSTANCE_LIST_TYPE_MAP[instance](schemaPath.options);
            }
            if (typeInstance) {
                typeInstance.fieldName = schemaPath.path;
                if (!typeInstance.fieldNameAlias) {
                    typeInstance.fieldNameAlias = schemaPath.options.name || '';
                }
                fields.push(typeInstance);
            }
        });
        return fields;
    }
    /**
     * data-list中拉取数据的函数
     */
    async getDataList(req, ctx) {
        const datasPromise = this.model.find(req.conditions).limit(req.pageSize).skip((req.pageIndex - 1) * req.pageSize)
            .sort(req.sort || '')
            .exec();
        const count = await this.model.find(req.conditions).countDocuments().exec();
        const datas = await datasPromise;
        const modelItems = datas.map((item) => ({
            id: item.id,
            values: Object.assign(Object.assign({}, item.toObject()), { _id: undefined, __v: undefined }),
        }));
        return {
            total: count,
            dataList: modelItems,
        };
    }
    async removeItem(id, ctx) {
        const item = await this.model.findById(id);
        if (!item)
            throw new Error('未找到该编辑项');
        await item.remove();
    }
    /**
     * 获取列表页过滤的参数
     */
    getFilterFields() {
        const fields = [];
        const { schema } = this.model;
        const pathsKeys = Object.keys(schema.paths);
        pathsKeys.forEach((key) => {
            // 卧槽，这个mongoose的这里的类型声明不正确
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            const schemaPath = schema.paths[key];
            if (key === '_id' || key === '__v')
                return;
            let typeInstance = null;
            if (schemaPath.options.filterType instanceof filter_base_type_1.FilterBaseType) {
                typeInstance = schemaPath.options.filterType;
            }
            if (typeInstance) {
                typeInstance.fieldName = schemaPath.path;
                if (!typeInstance.fieldNameAlias) {
                    typeInstance.fieldNameAlias = schemaPath.options.name || '';
                }
                fields.push(typeInstance);
            }
        });
        return fields;
    }
}
exports.MongooseModelAdmin = MongooseModelAdmin;
/**
 * mongoose 的filter types
 */
MongooseModelAdmin.FilterTypes = mongoose_filter_types_1.FilterTypes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ29vc2UtbW9kZWwtYWRtaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmVyL21vbmdvb3NlL21vbmdvb3NlLW1vZGVsLWFkbWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsOERBR2lDO0FBQ2pDLHFFQUFnRTtBQUNoRSx5RUFBb0U7QUFDcEUsbUZBQTZFO0FBQzdFLHlFQUFvRTtBQUNwRSxtRkFBNkU7QUFDN0UsMkVBQXNFO0FBQ3RFLCtFQUF5RTtBQUN6RSxxRUFBZ0U7QUFDaEUsMkVBQXNFO0FBQ3RFLDRFQUF3RjtBQUN4Rix1RUFBa0U7QUFDbEUsdUVBQWtFO0FBQ2xFLG1FQUFzRDtBQUN0RCwyRUFBc0U7QUFFdEU7O0dBRUc7QUFDSCxNQUFNLHNCQUFzQixHQUV4QjtJQUNELFFBQVEsQ0FBRSxjQUFrQztRQUN6QyxPQUFPLElBQUksNkJBQVksQ0FBQztZQUNyQixRQUFRLEVBQUUsY0FBYyxDQUFDLFFBQVE7WUFDakMsY0FBYyxFQUFFLGNBQWMsQ0FBQyxJQUFJO1NBQ3JDLENBQUMsQ0FBQztJQUNOLENBQUM7SUFDRCxNQUFNLENBQUUsY0FBa0M7UUFDdkMsSUFBSSxjQUFjLENBQUMsSUFBSSxFQUFFO1lBQ3RCLE9BQU8sSUFBSSwwQ0FBa0IsQ0FBQztnQkFDM0IsSUFBSSxFQUFFLGNBQWMsQ0FBQyxJQUFJO2dCQUN6QixRQUFRLEVBQUUsY0FBYyxDQUFDLFFBQVE7Z0JBQ2pDLGNBQWMsRUFBRSxjQUFjLENBQUMsSUFBSTthQUNyQyxDQUFDLENBQUM7U0FDTDtRQUNELE9BQU8sSUFBSSxpQ0FBYyxDQUFDO1lBQ3ZCLFFBQVEsRUFBRSxjQUFjLENBQUMsUUFBUTtZQUNqQyxTQUFTLEVBQUUsY0FBYyxDQUFDLFNBQVM7WUFDbkMsU0FBUyxFQUFFLGNBQWMsQ0FBQyxTQUFTO1lBQ25DLGNBQWMsRUFBRSxjQUFjLENBQUMsSUFBSTtZQUNuQyxXQUFXLEVBQUUsY0FBYyxDQUFDLFdBQVcsSUFB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