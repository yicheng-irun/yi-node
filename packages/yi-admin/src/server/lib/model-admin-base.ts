/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
import { Context, Next } from 'koa';
import EditBaseType from './edit-types/edit-base-type';
import ListBaseType from './list-types/list-base-type';
import ModelAdminListAction from './model-admin-list-action';

export interface ModelAdminBaseParams {
   /**
    * 用来判断用户是否有权限
    */
   permission?: (ctx: Context, next: Next) => Promise<any>;

   /**
    * model的name
    */
   name: string;

   /**
    * 标题，通常用于菜单中展示
    */
   title?: string;

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
   sort?: string;
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

export default class ModelAdminBase {
   /**
    * 判断用户是否有权限
    * 如果没有权限，直接在里侧抛出异常或者返回false
    */
   public permission?: (ctx: Context, next: Next) => Promise<any> = async (ctx, next) => {
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

   public listActions: ModelAdminListAction[] = [];

   constructor ({
      permission, name, listActions, title = '',
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
   }

   /**
    * model的name，用户路径中，不能重复，不能更改
    */
   public get name (): string {
      return this.$name;
   }

   /**
    * 获取表单编辑页的字段列表
    */
   public getEditFormFields (): EditBaseType[] {
      throw new Error('请在子类中实现getEditFormFields函数');
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

   /**
    * data-list中拉取数据的函数
    */
   public getDataList (req: DataListRequestBody, ctx: Context): Promise<DataListResponseBody> {
      throw new Error('请在子类中实现getDataList函数');
   }

   /**
    * 删除除某一项
    */
   public removeItem (id: string, ctx: Context): Promise<void> {
      throw new Error('请在子类中实现removeItem函数');
   }
}
