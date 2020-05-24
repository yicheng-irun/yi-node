import Vue from 'vue';
import Vuex from 'vuex';
import runtime from './lib/runtime';
import pages from './pages';

import './comps/layout.styl';

Vue.use(Vuex);

export default async function getApp () {
   const { pagePath } = runtime;
   if (!Object.prototype.hasOwnProperty.call(pages, pagePath)) {
      throw new Error(`未找到该页面:${pagePath}`);
   }
   const { default: App } = await pages[pagePath]();
   return App;
}
