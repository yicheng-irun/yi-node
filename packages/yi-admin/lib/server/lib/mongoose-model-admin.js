"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_admin_base_1 = require("./model-admin-base");
const edit_base_type_1 = require("./edit-types/edit-base-type");
const edit_string_type_1 = require("./edit-types/edit-string-type");
const edit_string_enum_type_1 = require("./edit-types/edit-string-enum-type");
const edit_number_type_1 = require("./edit-types/edit-number-type");
const edit_number_enum_type_1 = require("./edit-types/edit-number-enum-type");
const edit_boolean_type_1 = require("./edit-types/edit-boolean-type");
const edit_date_time_type_1 = require("./edit-types/edit-date-time-type");
const list_base_type_1 = require("./list-types/list-base-type");
const list_boolean_type_1 = require("./list-types/list-boolean-type");
const model_admin_list_action_1 = require("./model-admin-list-action");
const edit_array_type_1 = require("./edit-types/edit-array-type");
const list_array_type_1 = require("./list-types/list-array-type");
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
            buttonIcon: 'el-icon-delete',
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
            const etitInstances = editFormFields.filter((editTypeItem) => editTypeItem.fieldName === path);
            let typeInstance = null;
            if (schemaPath.options.listType && schemaPath.options.listType instanceof list_base_type_1.ListBaseType) {
                typeInstance = schemaPath.options.listType;
            }
            else if (etitInstances.length > 0) {
                typeInstance = etitInstances[0].getListType();
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
        const datasPromise = this.model.find().limit(req.pageSize).skip((req.pageIndex - 1) * req.pageSize)
            .sort(req.sort || '')
            .exec();
        const count = await this.model.find().countDocuments().exec();
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
}
exports.MongooseModelAdmin = MongooseModelAdmin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ29vc2UtbW9kZWwtYWRtaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmVyL2xpYi9tb25nb29zZS1tb2RlbC1hZG1pbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBLHlEQUc0QjtBQUM1QixnRUFBMkQ7QUFDM0Qsb0VBQStEO0FBQy9ELDhFQUF3RTtBQUN4RSxvRUFBK0Q7QUFDL0QsOEVBQXdFO0FBQ3hFLHNFQUFpRTtBQUNqRSwwRUFBb0U7QUFDcEUsZ0VBQTJEO0FBQzNELHNFQUFpRTtBQUNqRSx1RUFBbUY7QUFDbkYsa0VBQTZEO0FBQzdELGtFQUE2RDtBQUU3RDs7R0FFRztBQUNILE1BQU0sc0JBQXNCLEdBRXhCO0lBQ0QsUUFBUSxDQUFFLGNBQWtDO1FBQ3pDLE9BQU8sSUFBSSw2QkFBWSxDQUFDO1lBQ3JCLFFBQVEsRUFBRSxjQUFjLENBQUMsUUFBUTtZQUNqQyxjQUFjLEVBQUUsY0FBYyxDQUFDLElBQUk7U0FDckMsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUNELE1BQU0sQ0FBRSxjQUFrQztRQUN2QyxJQUFJLGNBQWMsQ0FBQyxJQUFJLEVBQUU7WUFDdEIsT0FBTyxJQUFJLDBDQUFrQixDQUFDO2dCQUMzQixJQUFJLEVBQUUsY0FBYyxDQUFDLElBQUk7Z0JBQ3pCLFFBQVEsRUFBRSxjQUFjLENBQUMsUUFBUTtnQkFDakMsY0FBYyxFQUFFLGNBQWMsQ0FBQyxJQUFJO2FBQ3JDLENBQUMsQ0FBQztTQUNMO1FBQ0QsT0FBTyxJQUFJLGlDQUFjLENBQUM7WUFDdkIsUUFBUSxFQUFFLGNBQWMsQ0FBQyxRQUFRO1lBQ2pDLFNBQVMsRUFBRSxjQUFjLENBQUMsU0FBUztZQUNuQyxTQUFTLEVBQUUsY0FBYyxDQUFDLFNBQVM7WUFDbkMsY0FBYyxFQUFFLGNBQWMsQ0FBQyxJQUFJO1lBQ25DLFdBQVcsRUFBRSxjQUFjLENBQUMsV0FBVyxJQUFJLEVBQUU7U0FDL0MsQ0FBQyxDQUFDO0lBQ04sQ0FB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