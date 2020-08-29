"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseModelAdmin = void 0;
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
const mongoose_util_1 = require("./mongoose-util");
const edit_object_type_1 = require("../lib/edit-types/edit-object-type");
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
    Array(schemaTypeOpts, schema) {
        if (schema) {
            console.log(111111, schema);
            return new edit_array_type_1.EditArrayType({
                required: schemaTypeOpts.required,
                fieldNameAlias: schemaTypeOpts.name,
                maxLength: schemaTypeOpts.maxlength,
                minLength: schemaTypeOpts.minlength,
                childrenType: INSTANCE_EDIT_TYPE_MAP.Object(schemaTypeOpts, schema),
            });
        }
        return new edit_array_type_1.EditArrayType({
            required: schemaTypeOpts.required,
            fieldNameAlias: schemaTypeOpts.name,
            maxLength: schemaTypeOpts.maxlength,
            minLength: schemaTypeOpts.minlength,
            childrenType: new edit_base_type_1.EditBaseType({}),
        });
    },
    Object(schemaTypeOpts, schema) {
        if (!schema)
            throw new Error('Object type schema 不能为空');
        const fields = [];
        const pathsKeys = Object.keys(schema.paths);
        pathsKeys.forEach((key) => {
            // 这个mongoose的这里的类型声明不正确
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            const schemaPath = schema.paths[key];
            console.log(schemaPath);
            if (key === '_id' || key === '__v')
                return;
            const { instance } = schemaPath;
            let typeInstance = null;
            if (schemaPath.options.editType && schemaPath.options.editType instanceof edit_base_type_1.EditBaseType) {
                typeInstance = schemaPath.options.editType;
            }
            else if (INSTANCE_EDIT_TYPE_MAP[instance]) {
                typeInstance = INSTANCE_EDIT_TYPE_MAP[instance](schemaPath.options, schemaPath.schema);
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
        return new edit_object_type_1.EditObjectType({
            editFields: fields,
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
    /**
     * 全量的表单字段
     */
    getEditFormFields() {
        const { schema } = this.model;
        const objType = INSTANCE_EDIT_TYPE_MAP.Object({}, schema);
        const fields = objType.componentConfig.editFields;
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
            values: Object.assign(Object.assign({}, mongoose_util_1.tileResult(item.toObject())), { _id: undefined, __v: undefined }),
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
            values: Object.assign(Object.assign({}, mongoose_util_1.tileResult(item.toObject())), { _id: undefined, __v: undefined }),
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
        const dataPromise = this.model.find(req.conditions).limit(req.pageSize).skip((req.pageIndex - 1) * req.pageSize)
            .sort(req.sort || '')
            .exec();
        const count = await this.model.find(req.conditions).countDocuments().exec();
        const data = await dataPromise;
        const modelItems = data.map((item) => ({
            id: item.id,
            values: Object.assign(Object.assign({}, mongoose_util_1.tileResult(item.toObject())), { _id: undefined, __v: undefined }),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ29vc2UtbW9kZWwtYWRtaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmVyL21vbmdvb3NlL21vbmdvb3NlLW1vZGVsLWFkbWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLDhEQUdpQztBQUNqQyxxRUFBZ0U7QUFDaEUseUVBQW9FO0FBQ3BFLG1GQUE2RTtBQUM3RSx5RUFBb0U7QUFDcEUsbUZBQTZFO0FBQzdFLDJFQUFzRTtBQUN0RSwrRUFBeUU7QUFDekUscUVBQWdFO0FBQ2hFLDJFQUFzRTtBQUN0RSw0RUFBd0Y7QUFDeEYsdUVBQWtFO0FBQ2xFLHVFQUFrRTtBQUNsRSxtRUFBc0Q7QUFDdEQsMkVBQXNFO0FBQ3RFLG1EQUE2QztBQUM3Qyx5RUFBb0U7QUFFcEU7O0dBRUc7QUFDSCxNQUFNLHNCQUFzQixHQUV4QjtJQUNELFFBQVEsQ0FBRSxjQUFrQztRQUN6QyxPQUFPLElBQUksNkJBQVksQ0FBQztZQUNyQixRQUFRLEVBQUUsY0FBYyxDQUFDLFFBQVE7WUFDakMsY0FBYyxFQUFFLGNBQWMsQ0FBQyxJQUFJO1NBQ3JDLENBQUMsQ0FBQztJQUNOLENBQUM7SUFDRCxNQUFNLENBQUUsY0FBa0M7UUFDdkMsSUFBSSxjQUFjLENBQUMsSUFBSSxFQUFFO1lBQ3RCLE9BQU8sSUFBSSwwQ0FBa0IsQ0FBQztnQkFDM0IsSUFBSSxFQUFFLGNBQWMsQ0FBQyxJQUFJO2dCQUN6QixRQUFRLEVBQUUsY0FBYyxDQUFDLFFBQVE7Z0JBQ2pDLGNBQWMsRUFBRSxjQUFjLENBQUMsSUFBSTthQUNyQyxDQUFDLENBQUM7U0FDTDtRQUNELE9BQU8sSUFBSSxpQ0FBYyxDQUFDO1lBQ3ZCLFFBQVEsRUFBRSxjQUFjLENBQUMsUUFBUTtZQUNqQyxTQUFTLEVBQUUsY0FBYyxDQUFDLFNBQVM7WUFDbkMsU0FBUyxFQUFFLGNBQWMsQ0FBQyxTQUFTO1lBQ25DLGNBQWMsRUFBRSxjQUFjLENBQUMsSUFBSTtZQUNuQyxX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