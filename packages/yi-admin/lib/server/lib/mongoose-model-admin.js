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
                if (typeInstance.fieldNameAlias === null) {
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
                if (typeInstance.fieldNameAlias === null) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ29vc2UtbW9kZWwtYWRtaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmVyL2xpYi9tb25nb29zZS1tb2RlbC1hZG1pbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBLHlEQUc0QjtBQUM1QixnRUFBMkQ7QUFDM0Qsb0VBQStEO0FBQy9ELDhFQUF3RTtBQUN4RSxvRUFBK0Q7QUFDL0QsOEVBQXdFO0FBQ3hFLHNFQUFpRTtBQUNqRSwwRUFBb0U7QUFDcEUsZ0VBQTJEO0FBQzNELHNFQUFpRTtBQUNqRSx1RUFBbUY7QUFDbkYsa0VBQTZEO0FBRTdEOztHQUVHO0FBQ0gsTUFBTSxzQkFBc0IsR0FFeEI7SUFDRCxRQUFRLENBQUUsY0FBa0M7UUFDekMsT0FBTyxJQUFJLDZCQUFZLENBQUM7WUFDckIsUUFBUSxFQUFFLGNBQWMsQ0FBQyxRQUFRO1lBQ2pDLGNBQWMsRUFBRSxjQUFjLENBQUMsSUFBSTtTQUNyQyxDQUFDLENBQUM7SUFDTixDQUFDO0lBQ0QsTUFBTSxDQUFFLGNBQWtDO1FBQ3ZDLElBQUksY0FBYyxDQUFDLElBQUksRUFBRTtZQUN0QixPQUFPLElBQUksMENBQWtCLENBQUM7Z0JBQzNCLElBQUksRUFBRSxjQUFjLENBQUMsSUFBSTtnQkFDekIsUUFBUSxFQUFFLGNBQWMsQ0FBQyxRQUFRO2dCQUNqQyxjQUFjLEVBQUUsY0FBYyxDQUFDLElBQUk7YUFDckMsQ0FBQyxDQUFDO1NBQ0w7UUFDRCxPQUFPLElBQUksaUNBQWMsQ0FBQztZQUN2QixRQUFRLEVBQUUsY0FBYyxDQUFDLFFBQVE7WUFDakMsU0FBUyxFQUFFLGNBQWMsQ0FBQyxTQUFTO1lBQ25DLFNBQVMsRUFBRSxjQUFjLENBQUMsU0FBUztZQUNuQyxjQUFjLEVBQUUsY0FBYyxDQUFDLElBQUk7WUFDbkMsV0FBVyxFQUFFLGNBQWMsQ0FBQyxXQUFXLElBQUksRUFBRTtTQUMvQyxDQUFDLENBQUM7SUFDTixDQUFDO0lBQ0QsTUFBTSxD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