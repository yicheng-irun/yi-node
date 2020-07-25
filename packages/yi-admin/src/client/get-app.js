import Vue from 'vue';
import Vuex from 'vuex';
import {
   Button, Breadcrumb, ConfigProvider, Checkbox, DatePicker, Form, Icon, Input, InputNumber, Menu,
   Pagination, Popconfirm, Select, Spin, Switch, Tooltip, message, notification,
} from 'ant-design-vue';
import runtime from './lib/runtime';
import pages from './pages';
import NoSSR from './comps/no-ssr.vue';


import './comps/layout.styl';

Vue.use(Vuex);
Vue.component('NoSsr', NoSSR);

Vue.use(Button);
Vue.use(Breadcrumb);
Vue.use(ConfigProvider);
Vue.use(Checkbox);
Vue.use(DatePicker);
Vue.use(Form);
Vue.use(Icon);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Menu);
Vue.use(Pagination);
Vue.use(Popconfirm);
Vue.use(Select);
Vue.use(Spin);
Vue.use(Switch);
Vue.use(Tooltip);

Vue.prototype.$message = message;
Vue.prototype.$notify = notification;

export default async function getApp () {
   const { pagePath } = runtime;
   if (!Object.prototype.hasOwnProperty.call(pages, pagePath)) {
      throw new Error(`未找到该页面:${pagePath}`);
   }
   const { default: App } = await pages[pagePath]();
   return App;
}
