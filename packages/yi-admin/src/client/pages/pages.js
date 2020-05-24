
const yiAdminPages = {
   'yi-admin/site': () => import(/* webpackChunkName: "yi-admin/site" */'./site/app.vue'),
   'yi-admin/model-admin-edit': () => import(/* webpackChunkName: "yi-admin/model-admin-edit" */'./model-admin-edit/app.vue'),
   'yi-admin/model-admin-list': () => import(/* webpackChunkName: "yi-admin/model-admin-list" */'./model-admin-list/app.vue'),
};

export default yiAdminPages;
