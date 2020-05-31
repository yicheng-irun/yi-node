/// <reference types="koa__router" />
import Router from '@koa/router';
import { Context, Next } from 'koa';
import { ModelAdminBase } from './model-admin-base';
import { EditBaseType } from './edit-types/edit-base-type';
import { SiteNavMenu } from './site-nav-menu';
import { ListBaseType } from './list-types/list-base-type';
/**
 * admin站点
 */
export declare class YiAdmin {
    /**
     * 判断用户是否有权限
     * 如果没有权限，直接在里侧抛出异常或者返回false
     */
    private permission;
    /**
     * 对应的koa的路由
     */
    koaRouter: Router<any, Context>;
    /**
     * 站点导航菜单
     */
    siteNavMenu: SiteNavMenu;
    modelNavMenu: SiteNavMenu;
    constructor({ permission, serverOrigin }: {
        permission?: (ctx: Context, next: Next) => Promise<any>;
        /**
         * example: "http://127.0.0.1:80"
         * 请返回koa.lisen的端口，用于vue服务端渲染(SSR)中进行数据接口请求
         */
        serverOrigin: string;
    });
    private createKoaRouter;
    private appendPermissionCheckRouter;
    private appendSiteHomeRouter;
    modelAdminsMap: {
        [name: string]: ModelAdminBase;
    };
    private appendModelAdminRouter;
    /**
     * 添加一个modelAdmin到yi-admin实例中
     * @param modelAdmin
     */
    addModelAdmin(modelAdmin: ModelAdminBase, { addToSiteNavMenu, }?: {
        addToSiteNavMenu?: boolean;
    }): void;
    static EditTypes: {
        EditBaseType: typeof EditBaseType;
        EditBooleanType: typeof import("./edit-types/edit-boolean-type").EditBooleanType;
        EditDateTimeType: typeof import("./edit-types/edit-date-time-type").EditDateTimeType;
        EditNumberEnumType: typeof import("./edit-types/edit-number-enum-type").EditNumberEnumType;
        EditNumberRemoteSelectType: typeof import("./edit-types/edit-number-remote-select-type").EditNumberRemoteSelectType;
        EditNumberType: typeof import("./edit-types/edit-number-type").EditNumberType;
        EditStringColorType: typeof import("./edit-types/edit-string-color-type").EditStringColorType;
        EditStringEnumType: typeof import("./edit-types/edit-string-enum-type").EditStringEnumType;
        EditStringFileType: typeof import("./edit-types/edit-string-file").EditStringFileType;
        EditStringImageType: typeof import("./edit-types/edit-string-image").EditStringImageType;
        EditStringJoditEditorType: typeof import("./edit-types/edit-string-jodit-type").EditStringJoditEditorType;
        EditStringRemoteSelectType: typeof import("./edit-types/edit-string-remote-select-type").EditStringRemoteSelectType;
        EditStringTextareaType: typeof import("./edit-types/edit-string-textarea-type").EditStringTextareaType;
        EditStringType: typeof import("./edit-types/edit-string-type").EditStringType;
        EditStringUEditorType: typeof import("./edit-types/edit-string-ueditor-type").EditStringUEditorType;
    };
    static ListTypes: {
        ListBaseType: typeof ListBaseType;
        ListBooleanType: typeof import("./list-types/list-boolean-type").ListBooleanType;
        ListNumberEnumType: typeof import("./list-types/list-number-enum-type").ListNumberEnumType;
        ListNumberRemoteSelectType: typeof import("./list-types/list-number-remote-select-type").ListNumberRemoteSelectType;
        ListStringEnumType: typeof import("./list-types/list-string-enum-type").ListStringEnumType;
        ListStringImageType: typeof import("./list-types/list-string-image-type").ListStringImageType;
        ListStringRemoteSelectType: typeof import("./list-types/list-string-remote-select-type").ListStringRemoteSelectType;
    };
}
