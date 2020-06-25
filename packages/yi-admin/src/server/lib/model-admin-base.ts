/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
import { Context, Next } from 'koa';
import { type } from 'os';
import { isPrimitive } from 'util';
import { EditBaseType } from './edit-types/edit-base-type';
import { ListBaseType } from './list-types/list-base-type';
import { ModelAdminListAction } from './model-admin-list-action';
import { FilterBaseType } from './filter-types/filter-base-type';
import { ListStringHtmlType } from './list-types/list-string-html-type';

export interface ModelAdminBaseParams {
   /**
    * 用来判断用户是否有权限
    */
   permission?: (ctx: Context, next: Next) => Promise<void>;

   /**
    * model的name
    */
   name: string;

   /**
    * 标题，通常用于菜单中展示
    */
   title?: string;

   /**
    * 用于出现在表单中的字段，默认是全部，主要通过这个list可控制表单字段的出现顺序
    */
   formFields?: string[];

   /**
    * 优先级比 formFields 高，用于排除在表单中显示的字段
    */
   formFieldsExclude?: string[];

   /**
    * 显示在列表中的字段，默认是全部，可通过这个list可控制列表字段左右顺序
    */
   listFields?: string[];

   /**
    * 优先级比 listFields 高，用于排除在列表页中显示的字段
    */
   listFieldsExclude?: string[];

   /**
    * 列表动作
    */
   listActions?: ModelAdminListAction[];
}

export interface ModelDataItem {
   /**
    * id 是必须项
    */
   id: string;
   values: {
      [key: string]: any;
   };
}

export interface DataListRequestBody {
   /**
    * 分页大小
    */
   pageSize: number;
   /**
    * 分页
    */
   pageIndex: number;

   /**
    * '-id', 'name', '-field'
    */
   sort: string;

   /**
    * 过滤条件
    */
   conditions: {
      [key: string]: any;
   };
}

export interface DataListResponseBody {
   /**
    * 分页大小
    */
   total: number;
   /**
    * 分页
    */
   dataList: ModelDataItem[];
}

export class ModelAdminBase {
   /**
    * 判断用户是否有权限
    * 如果没有权限，直接在里侧抛出异常或者返回false
    */
   public permission?: (ctx: Context, next: Next) => Promise<void> = async (ctx, next) => {
      await next();
   }

   /**
    * model的name，用户路径中，不能重复，且不能更改
    */
   private $name: string;

   /**
    * 通常用于菜单中
    */
   public title = '';

   /**
    * 列表页中的用户按钮或者批量操作项
    */
   public listActions: ModelAdminListAction[] = [];

   /**
    * 用于出现在表单中的字段，默认是全部，主要通过这个list可控制表单字段的出现顺序
    */
   public formFields?: string[];

   /**
    * 优先级比 formFields 高，用于排除在表单中显示的字段
    */
   public formFieldsExclude?: string[];

   /**
    * 显示在列表中的字段，默认是全部，可通过这个list可控制列表字段左右顺序
    */
   public listFields?: string[];

   /**
    * 优先级比 listFields 高，用于排除在列表页中显示的字段
    */
   public listFieldsExclude?: string[];

   constructor ({
      permission,
      name,
      listActions,
      title = '',
      formFields,
      formFieldsExclude,
      listFields,
      listFieldsExclude,
   }: ModelAdminBaseParams) {
      if (permission) {
         this.permission = permission;
      }
      // 因为要在url的路径中，所以要做这个限制
      if (/^[0-9a-z_-]+$/.test(name)) {
         this.$name = name;
      } else {
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
   public get name (): string {
      return this.$name;
   }

   /**
    * 获取表单编辑页的字段列表 [未过滤的]
    */
   public getEditFormFields (): EditBaseType[] {
      throw new Error('请在子类中实现getEditFormFields函数');
   }

   public getEditFormFieldsAfterFilter (): EditBaseType[] {
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
         fields = fields.filter((item) => (
            !(this.formFieldsExclude?.includes(item.fieldName))
         ));
      }
      return fields;
   }

   /**
    * edit-form中拉取数据的函数
    */
   public getEditData (id: string, ctx: Context): Promise<ModelDataItem> {
      throw new Error('请在子类中实现getEditData函数');
   }

   /**
    * 用户提交数据时，编辑时id是非空，新建时id是空的
    * @param id
    * @param forData
    * @param ctx
    */
   public formSubmit (id: string, forData: object, ctx: Context): Promise<ModelDataItem> {
      throw new Error('请在子类中实现removeItem函数');
   }


   /**
    * 获取列表页字段列表
    */
   public getDataListFields (): ListBaseType[] {
      throw new Error('请在子类中实现getDataListFields函数');
   }

   public getDataListFieldsAfterFilter (): ListBaseType[] {
      let fields = this.getDataListFields();
      if (this.listFields) {
         const temp = fields;
         fields = [];
         for (let i = 0; i < this.listFields.length; i += 1) {
            const name = this.listFields[i];
            const filterResults = temp.filter((item) => (item.fieldName === name));
            if (filterResults.length) {
               fields.push(filterResults[0]);
            } else {
               const tempType = new ListStringHtmlType({
               });
               tempType.fieldName = name;
               fields.push(tempType);
            }
         }
      }
      if (this.listFieldsExclude) {
         fields = fields.filter((item) => (
            !(this.listFieldsExclude?.includes(item.fieldName))
         ));
      }
      return fields;
   }

   private getExtraDataListFileds (): string[] {
      const dbFields = this.getDataListFields().map((t) => (t.fieldName));
      const extraFields: string[] = [];
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
   public getDataList (req: DataListRequestBody, ctx: Context): Promise<DataListResponseBody> {
      throw new Error('请在子类中实现getDataList函数');
   }

   public async getDataListAfterFilter (req: DataListRequestBody, ctx: Context): Promise<DataListResponseBody> {
      const dataResult = await this.getDataList(req, ctx);
      if (this.listFields) {
         const extraFields = this.getExtraDataListFileds();
         const promises = dataResult.dataList.map(async (item): Promise<void> => {
            const values: {
               [key: string]: any;
            } = {
               ...(item.values.toObject ? item.values.toObject() : item.values),
            };
            const promises2 = extraFields.map(async (addKey) => {
               if (item.values[addKey]) {
                  let value = item.values[addKey];

                  if (typeof item.values[addKey] === 'function') {
                     value = item.values[addKey]();
                  }
                  if (value instanceof Promise) {
                     values[addKey] = await value;
                  } else {
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
               if (this.listFieldsExclude?.includes(key)) {
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
   public removeItem (id: string, ctx: Context): Promise<void> {
      throw new Error('请在子类中实现removeItem函数');
   }

   /**
    * 获取列表页过滤的参数
    */
   public getFilterFields (): FilterBaseType[] {
      throw new Error('请在子类中实现getFilterFields函数');
   }
}
