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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ29vc2UtbW9kZWwtYWRtaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmVyL2xpYi9tb25nb29zZS1tb2RlbC1hZG1pbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBLHlEQUc0QjtBQUM1QixnRUFBMkQ7QUFDM0Qsb0VBQStEO0FBQy9ELDhFQUF3RTtBQUN4RSxvRUFBK0Q7QUFDL0QsOEVBQXdFO0FBQ3hFLHNFQUFpRTtBQUNqRSwwRUFBb0U7QUFDcEUsZ0VBQTJEO0FBQzNELHNFQUFpRTtBQUNqRSx1RUFBbUY7QUFFbkY7O0dBRUc7QUFDSCxNQUFNLHNCQUFzQixHQUV4QjtJQUNELFFBQVEsQ0FBRSxjQUFrQztRQUN6QyxPQUFPLElBQUksNkJBQVksQ0FBQztZQUNyQixRQUFRLEVBQUUsY0FBYyxDQUFDLFFBQVE7WUFDakMsY0FBYyxFQUFFLGNBQWMsQ0FBQyxJQUFJO1NBQ3JDLENBQUMsQ0FBQztJQUNOLENBQUM7SUFDRCxNQUFNLENBQUUsY0FBa0M7UUFDdkMsSUFBSSxjQUFjLENBQUMsSUFBSSxFQUFFO1lBQ3RCLE9BQU8sSUFBSSwwQ0FBa0IsQ0FBQztnQkFDM0IsSUFBSSxFQUFFLGNBQWMsQ0FBQyxJQUFJO2dCQUN6QixRQUFRLEVBQUUsY0FBYyxDQUFDLFFBQVE7Z0JBQ2pDLGNBQWMsRUFBRSxjQUFjLENBQUMsSUFBSTthQUNyQyxDQUFDLENBQUM7U0FDTDtRQUNELE9BQU8sSUFBSSxpQ0FBYyxDQUFDO1lBQ3ZCLFFBQVEsRUFBRSxjQUFjLENBQUMsUUFBUTtZQUNqQyxTQUFTLEVBQUUsY0FBYyxDQUFDLFNBQVM7WUFDbkMsU0FBUyxFQUFFLGNBQWMsQ0FBQyxTQUFTO1lBQ25DLGNBQWMsRUFBRSxjQUFjLENBQUMsSUFBSTtZQUNuQyxXQUFXLEVBQUUsY0FBYyxDQUFDLFdBQVcsSUFBSSxFQUFFO1NBQy9DLENBQUMsQ0FBQztJQUNOLENBQUM7SUFDRCxNQUFNLENBQUUsY0FBa0M7UUFD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