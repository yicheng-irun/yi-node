
const pages = {
   'yi-admin/site': () => import('./pages/site/app.vue'),
   'yi-admin/model-admin-edit': () => import('./pages/model-admin-edit/app.vue'),
   'yi-admin/model-admin-list': () => import('./pages/model-admin-list/app.vue'),
};
export default pages;
