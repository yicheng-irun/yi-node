import Vue from 'vue';
import Vuex from 'vuex';
// import { Antd } from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';
import {
   Button, Icon, LocaleProvider, Menu,
} from 'ant-design-vue';
import runtime from './lib/runtime';
import pages from './pages';
import NoSSR from './comps/no-ssr.vue';


import './comps/layout.styl';

Vue.use(Vuex);
Vue.component('NoSsr', NoSSR);

Vue.use(Button);
Vue.use(Icon);
Vue.use(LocaleProvider);
Vue.use(Menu);

export default async function getApp () {
   const { pagePath } = runtime;
   if (!Object.prototype.hasOwnProperty.call(pages, pagePath)) {
      throw new Error(`未找到该页面:${pagePath}`);
   }
   const { default: App } = await pages[pagePath]();
   return App;
}
