import EditBaseType, { EditBaseTypeConfig } from './edit-base-type';
import ListStringRemoteSelectType from '../list-types/list-string-remote-select-type';
import ListBaseType from '../list-types/list-base-type';

export interface EditStringRemoteSelectTypeParam {
   /**
    * 通过value获取label，用户表单初始化时，传了value给组件但是其实应该显示一个对应的名称
    */
   getLabelByValue?: (value: string) => Promise<string>;
   getOptions?: (search: string) => Promise<(string | {
      /**
       * 值
       */
      value: string;
      /**
       * 显示的标签
       */
      label: string;
   })[]>;
}

export default class EditStringRemoteSelectType extends EditBaseType {
   /**
    * 前端的组件名称
    */
   public componentName = 'string-remote-select'

   constructor (config: EditBaseTypeConfig & EditStringRemoteSelectTypeParam) {
      super(config);

      if (!config.getOptions || typeof config.getOptions !== 'function') {
         throw new Error('getOptions 不是一个函数');
      }
      this.getOptions = config.getOptions;

      if (config.getLabelByValue) {
         if (typeof config.getLabelByValue !== 'function') throw new Error('getLabelByValue 不是一个函数');
         this.getLabelByValue = config.getLabelByValue;
      }
   }

   public getLabelByValue?: (value: string) => Promise<string>;

   public getOptions: (search: string) => Promise<(string | {
      /**
       * 值
       */
      value: string;
      /**
       * 显示的标签
       */
      label: string;
   })[]>;

   public async action (actionName: string, actionData: any): Promise<((string | {
      value: string;
      label: string;
   })[]) | string> {
      if (actionName === 'getOptions') {
         const options = await this.getOptions(actionData);
         return options.map((item) => {
            if (typeof item === 'string') {
               return {
                  value: item,
                  label: item,
               };
            }
            return item;
         });
      }
      if (actionName === 'getLabelByValue') {
         if (this.getLabelByValue) { return this.getLabelByValue(actionData); }
         return actionData;
      }
      throw new Error(`接收到非法actionName ${actionName}`);
   }

   public getListType (): ListBaseType {
      return new ListStringRemoteSelectType({
         fieldNameAlias: this.fieldNameAlias,
         getLabelByValue: this.getLabelByValue,
      });
   }
}
