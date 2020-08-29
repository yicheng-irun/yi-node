/// <reference types="express-serve-static-core" />
/// <reference types="koa__router" />
import Router from '@koa/router';
import { Context, Next } from 'koa';
import express, { NextFunction } from 'express';
import { ModelAdminBase } from './model-admin-base';
import { SiteNavMenu } from './site-nav-menu';
interface CsrfParamResult {
    query?: {
        [key: string]: string;
    };
    body?: {
        [key: string]: string;
    };
}
/**
 * admin站点
 */
export declare class YiAdmin {
    /**
     * 判断用户是否有权限
     * 如果没有权限，直接在里侧抛出异常
     */
    permissionKoa: (ctx: Context, next: Next) => any;
    /**
     * 判断用户是否有权限
     * 如果没有权限，直接在里侧抛出异常
     */
    permissionExpress: (req: Express.Request, res: Express.Response, next: NextFunction) => any;
    /**
     * 对应的koa的路由
     */
    koaRouter: Router<any, Context>;
    /**
     * 对应的express路由
     */
    expressRouter: express.Router;
    /**
     * 站点导航菜单
     */
    siteNavMenu: SiteNavMenu;
    siteConfig: {
        siteName: string;
    };
    options: {
        csrfParamKoa?: (ctx: Context) => CsrfParamResult;
        csrfParamExpress?: (req: express.Request, res: express.Response) => CsrfParamResult;
    };
    modelNavMenu: SiteNavMenu;
    constructor({ permissionKoa, permissionExpress, serverOrigin, siteConfig, csrfParamKoa, csrfParamExpress, }: {
        permissionKoa?: (ctx: Context, next: Next) => Promise<any>;
        permissionExpress?: (req: Express.Request, res: Express.Response, next: NextFunction) => any;
        /**
         * example: "http://127.0.0.1:80"
         * 请返回koa.listen(SSR)中进行数据接口请求
         */
        serverOrigin: string;
        siteConfig?: {
            siteName?: string;
        };
        /**
         * 获取csrf参数的回调函数
         * 返回的数据会在post请求发起的时候拼入post请求的body或者query中
         */
        csrfParamKoa?: (ctx: Context) => CsrfParamResult;
        /**
         * 获取csrf参数的回调函数
         * 返回的数据会在post请求发起的时候拼入post请求的body或者query中
         */
        csrfParamExpress?: (req: express.Request, res: express.Response) => CsrfParamResult;
    });
    modelAdminsMap: {
        [name: string]: ModelAdminBase;
    };
    /**
     * 添加一个modelAdmin到yi-admin实例中
     * @param modelAdmin
     */
    addModelAdmin(modelAdmin: ModelAdminBase, { addToSiteNavMenu, }?: {
        addToSiteNavMenu?: boolean;
    }): void;
    static EditTypes: {
        EditArrayStringTagType: typeof import("./edit-types/edit-array-string-tag-type").EditArrayStringTagType;
        EditArrayType: typeof import("./edit-types/edit-array-type").EditArrayType;
        EditBaseType: typeof import("./edit-types/edit-base-type").EditBaseType;
        EditBooleanType: typeof import("./edit-types/edit-boolean-type").EditBooleanType;
        EditDateTimeType: typeof import("./edit-types/edit-date-time-type").EditDateTimeType;
        EditNumberEnumType: typeof import("./edit-types/edit-number-enum-type").EditNumberEnumType;
        EditNumberRemoteSelectType: typeof import("./edit-types/edit-number-remote-select-type").EditNumberRemoteSelectType;
        EditNumberType: typeof import("./edit-types/edit-number-type").EditNumberType;
        EditObjectType: typeof import("./edit-types/edit-object-type").EditObjectType;
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
        ListArrayType: typeof import("./list-types/list-array-type").ListArrayType;
        ListBaseType: typeof import("./list-types/list-base-type").ListBaseType;
        ListBooleanType: typeof import("./list-types/list-boolean-type").ListBooleanType;
        ListNumberEnumType: typeof import("./list-types/list-number-enum-type").ListNumberEnumType;
        ListNumberRemoteSelectType: typeof import("./list-types/list-number-remote-select-type").ListNumberRemoteSelectType;
        ListStringEnumType: typeof import("./list-types/list-string-enum-type").ListStringEnumType;
        ListStringImageType: typeof import("./list-types/list-string-image-type").ListStringImageType;
        ListStringRemoteSelectType: typeof import("./list-types/list-string-remote-select-type").ListStringRemoteSelectType;
    };
}
export {};
