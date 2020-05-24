
const pages = {
   'yi-admin/site': () => import(/* webpackChunkName: "yi-admin/site" */'./pages/site/app.vue'),
   'yi-admin/model-admin-edit': () => import(/* webpackChunkName: "yi-admin/model-admin-edit" */'./pages/model-admin-edit/app.vue'),
   'yi-admin/model-admin-list': () => import(/* webpackChunkName: "yi-admin/model-admin-list" */'./pages/model-admin-list/app.vue'),
};
export default pages;
