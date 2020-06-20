/* eslint-disable class-methods-use-this */
import { Context } from 'koa';
import { FilterBaseType } from '../../lib/filter-types/filter-base-type';
import { FilterRemoteSelectInterface } from '../../lib/filter-types/filter-remote-select-interface';
import { ModelAdminBase } from '../../lib/model-admin-base';
import { FilterBaseTypeConfig } from '../../lib/filter-types/filter-base-interface';
import { MongooseModelAdmin } from '../mongoose-model-admin';

export interface FilterRemoteSelectTypeParam {
   /**
    * 通过value获取label，用户表单初始化时，传了value给组件但是其实应该显示一个对应的名称
    */
   getLabelByValue?: (value: string | number | boolean) => Promise<string>;

   /**
    * 获取可选项
    */
   getOptions?: (search: string, ctx: Context, modelAdmin: MongooseModelAdmin) => Promise<({
      /**
       * 值
       */
      value: string | number | boolean;
      /**
       * 显示的标签
       */
      label: string;
   })[]>;
}

export class FilterRemoteSelectType extends FilterBaseType implements FilterRemoteSelectInterface {
   public componentName: 'remote-select' = 'remote-select'

   public componentConfig: FilterBaseTypeConfig & {
      multiSelect: boolean;
   } = {
      ...this.componentConfig,
      multiSelect: false,
   }

   constructor (config: FilterBaseTypeConfig & FilterRemoteSelectTypeParam & {
      multiSelect?: boolean;
   } = {}) {
      super(config);
      if (config.multiSelect === true) {
         this.componentConfig.multiSelect = true;
      }
      if (typeof config.getLabelByValue === 'function') this.getLabelByValue = config.getLabelByValue;
      if (typeof config.getOptions === 'function') this.getOptions = config.getOptions;
   }

   public getLabelByValue: (value: string | number | boolean) => Promise<string> = (value: string | number | boolean) => Promise.resolve(`${value}`);

   public getOptions: (search: string, ctx: Context, modelAdmin: MongooseModelAdmin) => Promise<({
      /**
       * 值
       */
      value: string | number | boolean;
      /**
       * 显示的标签
       */
      label: string;
   })[]> = async (search: string, ctx: Context, modelAdmin: MongooseModelAdmin) => {
      const options: ({
         value: string | number | boolean;
         label: string;
      })[] = [];
      const distinctData = await modelAdmin.model.distinct(this.fieldName).exec();
      distinctData.forEach((item) => {
         options.push({
            value: item,
            label: String(item),
         });
      });
      return options;
   }

   /**
    * 前端组件依靠这个来获取action
    * @param actionName
    * @param actionData
    */
   public async action (actionName: string, actionData: any, ctx: Context, modelAdmin: ModelAdminBase): Promise<({
      label: string;
      value: string | number | boolean;
   }[]) | string> {
      if (actionName === 'getOptions') {
         const options = await this.getOptions(actionData, ctx, modelAdmin as MongooseModelAdmin);
         return options;
      }
      if (actionName === 'getLabelByValue') {
         if (this.getLabelByValue) { return this.getLabelByValue(actionData); }
         return actionData;
      }
      throw new Error(`接收到非法actionName ${actionName}`);
   }


   public getConditions (fieldParam: (string | number | boolean) | (string | number | boolean)[]): {
      [key: string]: any;
      } {
      if (fieldParam) {
         if (Array.isArray(fieldParam)) {
            if (fieldParam.length > 0) {
               return {
                  [this.fieldName]: {
                     $in: fieldParam,
                  },
               };
            }
         } else {
            return {
               [this.fieldName]: fieldParam,
            };
         }
      }
      return {};
   }
}
