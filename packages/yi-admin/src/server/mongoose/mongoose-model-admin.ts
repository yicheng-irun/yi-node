import {
   Model, Document, SchemaTypeOpts, SchemaType, Schema,
} from 'mongoose';
import {
   ModelAdminBase,
   ModelAdminBaseParams, ModelDataItem, DataListRequestBody, DataListResponseBody, RequestInfo,
} from '../lib/model-admin-base';
import { EditBaseType } from '../lib/edit-types/edit-base-type';
import { EditStringType } from '../lib/edit-types/edit-string-type';
import { EditStringEnumType } from '../lib/edit-types/edit-string-enum-type';
import { EditNumberType } from '../lib/edit-types/edit-number-type';
import { EditNumberEnumType } from '../lib/edit-types/edit-number-enum-type';
import { EditBooleanType } from '../lib/edit-types/edit-boolean-type';
import { EditDateTimeType } from '../lib/edit-types/edit-date-time-type';
import { ListBaseType } from '../lib/list-types/list-base-type';
import { ListBooleanType } from '../lib/list-types/list-boolean-type';
import { ListActionResult, ModelAdminListAction } from '../lib/model-admin-list-action';
import { EditArrayType } from '../lib/edit-types/edit-array-type';
import { ListArrayType } from '../lib/list-types/list-array-type';
import { FilterTypes } from './mongoose-filter-types';
import { FilterBaseType } from '../lib/filter-types/filter-base-type';
import { tileResult } from './mongoose-util';
import { EditObjectType } from '../lib/edit-types/edit-object-type';

/**
 * 映射mongoose的默认类型的图
 */
const INSTANCE_EDIT_TYPE_MAP: {
   [type: string]: (schemaTypeOpts: SchemaTypeOpts<{}>, schema?: Schema) => EditBaseType;
} = {
   ObjectID (schemaTypeOpts: SchemaTypeOpts<{}>): EditBaseType {
      return new EditBaseType({
         required: schemaTypeOpts.required,
         fieldNameAlias: schemaTypeOpts.name,
      });
   },
   String (schemaTypeOpts: SchemaTypeOpts<{}>): EditBaseType {
      if (schemaTypeOpts.enum) {
         return new EditStringEnumType({
            enum: schemaTypeOpts.enum,
            required: schemaTypeOpts.required,
            fieldNameAlias: schemaTypeOpts.name,
         });
      }
      return new EditStringType({
         required: schemaTypeOpts.required,
         minLength: schemaTypeOpts.minlength,
         maxLength: schemaTypeOpts.maxlength,
         fieldNameAlias: schemaTypeOpts.name,
         placeholder: schemaTypeOpts.placeholder || '',
      });
   },
   Number (schemaTypeOpts: SchemaTypeOpts<{}>): EditBaseType {
      if (schemaTypeOpts.enum) {
         return new EditNumberEnumType({
            enum: schemaTypeOpts.enum,
            required: schemaTypeOpts.required,
            fieldNameAlias: schemaTypeOpts.name,
         });
      }
      return new EditNumberType({
         required: schemaTypeOpts.required,
         min: schemaTypeOpts.min,
         max: schemaTypeOpts.max,
         step: schemaTypeOpts.step || 1,
         fieldNameAlias: schemaTypeOpts.name,
      });
   },
   Date (schemaTypeOpts: SchemaTypeOpts<{}>): EditBaseType {
      return new EditDateTimeType({
         required: schemaTypeOpts.required,
         fieldNameAlias: schemaTypeOpts.name,
      });
   },
   Boolean (schemaTypeOpts: SchemaTypeOpts<{}>): EditBaseType {
      return new EditBooleanType({
         required: schemaTypeOpts.required,
         fieldNameAlias: schemaTypeOpts.name,
      });
   },
   Array (schemaTypeOpts: SchemaTypeOpts<{}>, schema?: Schema): EditBaseType {
      if (schema) {
         return new EditArrayType({
            required: schemaTypeOpts.required,
            fieldNameAlias: schemaTypeOpts.name,
            maxLength: schemaTypeOpts.maxlength,
            minLength: schemaTypeOpts.minlength,
            childrenType: INSTANCE_EDIT_TYPE_MAP.Object(schemaTypeOpts, schema),
         });
      }
      return new EditArrayType({
         required: schemaTypeOpts.required,
         fieldNameAlias: schemaTypeOpts.name,
         maxLength: schemaTypeOpts.maxlength,
         minLength: schemaTypeOpts.minlength,
         childrenType: new EditBaseType({}),
      });
   },

   Object (schemaTypeOpts: SchemaTypeOpts<{}>, schema?: Schema): EditBaseType {
      if (!schema) throw new Error('Object type schema 不能为空');
      const fields: EditBaseType[] = [];

      const pathsKeys = Object.keys(schema.paths);
      pathsKeys.forEach((key) => {
         // 这个mongoose的这里的类型声明不正确
         // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
         // @ts-ignore
         const schemaPath: SchemaType & {
            instance: string;
            path: string;
            options: SchemaTypeOpts<{}>;
            schema?: Schema;
         } = schema.paths[key];

         if (key === '_id' || key === '__v') return;
         const { instance } = schemaPath;

         let typeInstance: EditBaseType | null = null;

         if (schemaPath.options.editType && schemaPath.options.editType instanceof EditBaseType) {
            typeInstance = schemaPath.options.editType;
         } else if (INSTANCE_EDIT_TYPE_MAP[instance]) {
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

      return new EditObjectType({
         editFields: fields,
      });
   },
};

/**
 * 列表编辑项
 */
const INSTANCE_LIST_TYPE_MAP: {
   [type: string]: (schemaTypeOpts: SchemaTypeOpts<{}>) => ListBaseType;
} = {
   Base (schemaTypeOpts: SchemaTypeOpts<{}>): ListBaseType {
      return new ListBaseType({
         fieldNameAlias: schemaTypeOpts.name,
      });
   },
   ObjectID (schemaTypeOpts: SchemaTypeOpts<{}>): ListBaseType {
      return this.Base(schemaTypeOpts);
   },
   String (schemaTypeOpts: SchemaTypeOpts<{}>): ListBaseType {
      return this.Base(schemaTypeOpts);
   },
   Number (schemaTypeOpts: SchemaTypeOpts<{}>): ListBaseType {
      return this.Base(schemaTypeOpts);
   },
   Date (schemaTypeOpts: SchemaTypeOpts<{}>): ListBaseType {
      return this.Base(schemaTypeOpts);
   },
   Boolean (schemaTypeOpts: SchemaTypeOpts<{}>): ListBaseType {
      return new ListBooleanType({
         fieldNameAlias: schemaTypeOpts.name,
      });
   },
   Array (schemaTypeOpts: SchemaTypeOpts<{}>): ListBaseType {
      return new ListArrayType({
         fieldNameAlias: schemaTypeOpts.name,
         childrenType: new ListBaseType({}),
      });
   },
};

export class MongooseModelAdmin extends ModelAdminBase {
   public model: Model<Document, {}>;

   constructor (options: ModelAdminBaseParams & {
      model: Model<Document, {}>;
   }) {
      super(options);
      this.model = options.model;
      this.appendDeleteListAction();
   }

   private appendDeleteListAction (): void {
      /**
       * 增加一个默认的删除使用的列表action
       */
      this.listActions.push(new ModelAdminListAction({
         actionName: '删除',
         actionFunc: async (idList): Promise <ListActionResult> => {
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
   public getEditFormFields (): EditBaseType[] {
      const { schema } = this.model;
      const objType = INSTANCE_EDIT_TYPE_MAP.Object({}, schema) as EditObjectType;
      const fields: EditBaseType[] = objType.componentConfig.editFields;
      return fields;
   }

   /**
    * edit-form中拉取数据的函数
    */
   public async getEditData (id: string, ctx: RequestInfo): Promise<ModelDataItem> {
      let item: Document | null = null;

      if (id) {
         item = await this.model.findById(id);
         if (!item) throw new Error('未找到该编辑项');
      } else {
         // eslint-disable-next-line new-cap
         item = new (this.model)();
      }

      return {
         id: item.id,
         values: {
            ...tileResult(item.toObject()),
            _id: undefined,
            __v: undefined,
         },
      };
   }

   public async formSubmit (id: string, formData: {[key: string]: any}, ctx: RequestInfo): Promise<ModelDataItem> {
      let item: Document;
      if (id) {
         const fItem = await this.model.findById(id);
         if (fItem) {
            item = fItem;
         } else {
            throw new Error('未找到该编辑项');
         }
         const formFields = this.getEditFormFields();
         formFields.forEach((field) => {
            const path = field.fieldName;
            item.set(path, formData[path]);
         });
      } else {
         // eslint-disable-next-line new-cap
         item = new (this.model)(formData);
      }
      await item.save();
      return {
         id: item.id,
         values: {
            ...tileResult(item.toObject()),
            _id: undefined,
            __v: undefined,
         },
      };
   }

   /**
    * 获取列表页字段列表
    */
   public getDataListFields (): ListBaseType[] {
      const editFormFields = this.getEditFormFields();

      const fields: ListBaseType[] = [];

      const { schema } = this.model;
      const pathsKeys = Object.keys(schema.paths);
      pathsKeys.forEach((key) => {
         // 卧槽，这个mongoose的这里的类型声明不正确
         // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
         // @ts-ignore
         const schemaPath: SchemaType & {
               instance: string;
               path: string;
               options: SchemaTypeOpts<{}>;
            } = schema.paths[key];

         if (key === '_id' || key === '__v') return;
         const { instance, path } = schemaPath;

         const editInstances = editFormFields.filter((editTypeItem) => editTypeItem.fieldName === path);

         let typeInstance: ListBaseType | null = null;

         if (schemaPath.options.listType && schemaPath.options.listType instanceof ListBaseType) {
            typeInstance = schemaPath.options.listType;
         } else if (editInstances.length > 0) {
            typeInstance = editInstances[0].getListType();
         } else if (INSTANCE_LIST_TYPE_MAP[instance]) {
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
   public async getDataList (req: DataListRequestBody, ctx: RequestInfo): Promise<DataListResponseBody> {
      const dataPromise = this.model.find(req.conditions).limit(req.pageSize).skip((req.pageIndex - 1) * req.pageSize)
         .sort(req.sort || '')
         .exec();
      const count = await this.model.find(req.conditions).countDocuments().exec();
      const data = await dataPromise;
      const modelItems: ModelDataItem[] = data.map((item) => ({
         id: item.id,
         item,
         values: {
            ...tileResult(item.toObject()),
            _id: undefined,
            __v: undefined,
         },
      }));
      return {
         total: count,
         dataList: modelItems,
      };
   }

   public async removeItem (id: string, ctx: RequestInfo): Promise<void> {
      const item = await this.model.findById(id);
      if (!item) throw new Error('未找到该编辑项');
      await item.remove();
   }

   /**
    * 获取列表页过滤的参数
    */
   public getFilterFields (): FilterBaseType[] {
      const fields: FilterBaseType[] = [];

      const { schema } = this.model;
      const pathsKeys = Object.keys(schema.paths);
      pathsKeys.forEach((key) => {
         // 卧槽，这个mongoose的这里的类型声明不正确
         // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
         // @ts-ignore
         const schemaPath: SchemaType & {
               instance: string;
               path: string;
               options: SchemaTypeOpts<{}>;
            } = schema.paths[key];

         if (key === '_id' || key === '__v') return;

         let typeInstance: FilterBaseType | null = null;

         if (schemaPath.options.filterType instanceof FilterBaseType) {
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

   /**
    * mongoose 的filter types
    */
   public static FilterTypes = FilterTypes;
}
