/**
 * 客户端js的入口文件
 */
import Vue from 'vue';
import runtime from './lib/runtime';
import ajax from './lib/ajax';
import createApp from './get-app';

window.Vue = Vue;
Vue.prototype.$ajax = ajax;

async function start () {
   await loadScript('https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.2/index.js')
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
   const state = window.__INITIAL_STATE__ || null;
   if (store && state) {
      store.replaceState(state);
   }

   // 挂在在body下的第一个div
   app.$mount('body>div');

   const { query: { _static } = {} } = runtime;
   if (_static === '1' && typeof App.fetchData === 'function') {
      await App.fetchData({
         app,
         store,
         runtime,
      });
   }

   return app;
}

start().catch((e) => {
   console.error(e);
});
