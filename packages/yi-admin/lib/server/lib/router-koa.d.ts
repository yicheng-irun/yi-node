/// <reference types="koa__router" />
import Router from '@koa/router';
import { Context } from 'koa';
import { YiAdmin } from './yi-admin';
export declare function createKoaRouter({ serverOrigin, yiAdmin, }: {
    serverOrigin: string;
    yiAdmin: YiAdmin;
}): Router<any, Context>;
