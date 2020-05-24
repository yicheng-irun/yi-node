/**
 * 服务端js的入口文件
 */
import Vue from 'vue';
import createApp from './get-app';
import runtime from './lib/runtime';
import ajax from './lib/ajax';

export default async (context) => {
   runtime.setServerContext(context);

   const App = await createApp();
   let store = null;
   if (typeof App.createStore === 'function') {
      store = App.createStore({
         runtime,
         ajax,
      });
   }

   const app = new Vue({
      store,
      render: (h) => h(App),
   });

   // eslint-disable-next-line no-underscore-dangle
   if (typeof App.fetchData === 'function' && runtime.query._static !== '1') {
      await App.fetchData({
         app,
         store,
         runtime,
      });
   }

   context.state = store ? store.state : null; // 这一步将会把状态序列化到 `window.__INITIAL_STATE__`

   return app;
};
