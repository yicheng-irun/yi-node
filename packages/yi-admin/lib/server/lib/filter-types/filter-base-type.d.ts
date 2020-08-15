import { FilterBaseInterface, FilterBaseTypeConfig } from './filter-base-interface';
import { ModelAdminBase } from '../model-admin-base';
import { ReqData, JsonReturnType } from '../common-types';
export declare class FilterBaseType implements FilterBaseInterface {
    componentName: string;
    fieldName: string;
    fieldNameAlias: string;
    componentConfig: FilterBaseTypeConfig;
    constructor(config?: FilterBaseTypeConfig);
    /**
     * 前端过滤器组件通过这个action来拉取数据
     * @param actionName 操作名称
     * @param actionData 动作数据
     * @param ctx koa Context
     */
    action(actionName: string, actionData: any, reqData: ReqData, modelAdmin: ModelAdminBase): Promise<JsonReturnType>;
    /**
     * 获取orm框架的查询条件
     * @param fieldParam 前端组件传上来的参数
     */
    getConditions(fieldParam: any): {
        [key: string]: any;
    };
}
