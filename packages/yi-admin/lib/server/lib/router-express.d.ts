import express from 'express';
import { YiAdmin } from './yi-admin';
export declare function createExpressRouter({ serverOrigin, yiAdmin, }: {
    serverOrigin: string;
    yiAdmin: YiAdmin;
}): express.Router;
