import Vuex from 'vuex';

export default function ({
   ajax: { get },
}) {
   const store = new Vuex.Store({
      state: {
         siteMenu: null,
         iframeSrc: '',
      },

      mutations: {
         setSiteMenu (state, siteMenu) {
            state.siteMenu = siteMenu;
         },
      },

      actions: {
         async fetchSiteMenu ({ commit }) {
            // 这里可以请求 后台cgi 数据
            const rsp = await get('site-menu/', {});
            const result = rsp.data;
            commit('setSiteMenu', result.data);
         },
      },
   });

   return store;
}
