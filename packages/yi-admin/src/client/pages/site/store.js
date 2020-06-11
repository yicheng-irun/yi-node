import Vuex from 'vuex';

export default function ({
   ajax: { get },
}) {
   const store = new Vuex.Store({
      state: {
         siteMenu: null,
         siteConfig: {},
         iframeSrc: '',
      },

      mutations: {
         setSiteMenu (state, siteMenu) {
            state.siteMenu = siteMenu;
         },
         setSiteConfig (state, siteConfig) {
            state.siteConfig = siteConfig;
         },
      },

      actions: {
         async fetchSiteMenu ({ commit }) {
            const rsp = await get('site-menu/', {});
            const result = rsp.data;
            commit('setSiteMenu', result.data);
         },
         async fetchSiteConfig ({ commit }) {
            const rsp = await get('site-config/', {});
            const result = rsp.data;
            commit('setSiteConfig', result.data);
         },
      },
   });

   return store;
}
