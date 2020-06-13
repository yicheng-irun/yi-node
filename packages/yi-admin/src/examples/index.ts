import Koa from 'koa';
import mongoose from 'mongoose';
import myadmin from './admin';
import myadmin2 from './admin2';
import settings from './settings';


export default async function createApp (): Promise<Koa> {
   await mongoose.connect(settings.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

   const app = new Koa();

   myadmin.koaRouter.prefix('/test');
   app.use(myadmin.koaRouter.routes()).use(myadmin.koaRouter.allowedMethods());

   app.use(myadmin2.koaRouter.routes()).use(myadmin2.koaRouter.allowedMethods());

   return app;
}

async function start (): Promise<void> {
   const app = await createApp();
   const { host, port } = settings;

   app.listen(port, host, () => {
      console.log(`server is listening on ${host}:${port}`);
   });
}

start().catch(console.error);
