import express from 'express';
import Koa from 'koa';
import mongoose from 'mongoose';
// eslint-disable-next-line import/no-extraneous-dependencies
import { config } from 'dotenv';
import { resolve } from 'path';
import myadmin from './admin';
import myadmin2 from './admin2';
import uploadsRouter from './uploads-router';
import settings from './settings';


config();

export default async function createApp (): Promise<Koa> {
   await mongoose.connect(settings.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

   const app = new Koa();

   myadmin.koaRouter.prefix('/test');
   app.use(myadmin.koaRouter.routes()).use(myadmin.koaRouter.allowedMethods());

   app.use(myadmin2.koaRouter.routes()).use(myadmin2.koaRouter.allowedMethods());

   app.use(uploadsRouter.routes());

   return app;
}

export async function createApp2 (): Promise<express.Application> {
   await mongoose.connect(settings.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

   const app = express();

   app.use('/uploads', express.static(resolve(__dirname, '../../uploads')));

   app.use('/test', myadmin.expressRouter);

   // app.use(myadmin2.expressRouter);

   return app;
}

async function start (): Promise<void> {
   const app = await createApp2();
   const { host, port } = settings;

   app.listen(port, host, () => {
      console.log(`server is listening on ${host}:${port}`);
   });
}

start().catch(console.error);
