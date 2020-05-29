
const yiAdminPages = {
   'yi-admin/site': () => import('./site/app.vue'),
   'yi-admin/model-admin-edit': () => import('./model-admin-edit/app.vue'),
   'yi-admin/model-admin-list': () => import('./model-admin-list/app.vue'),
};

export default yiAdminPages;
