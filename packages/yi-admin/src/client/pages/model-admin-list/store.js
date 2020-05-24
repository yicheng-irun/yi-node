import Vuex from 'vuex';

export default function ({
   ajax: { get },
}) {
   const store = new Vuex.Store({
      state: {
         modelInfo: {

         },

         loading: false,
         pageIndex: 1,
         pageSize: 10,
         total: 0,

         sortList: ['-_id'],

         // 字段信息
         listFields: [],
         // 列表的操作动作信息
         listActions: [],

         listData: [],
         listCheckedStatusArray: [],
      },

      mutations: {
         setLoading (state, value) {
            state.loading = !!value;
         },
         setListFields (state, { data }) {
            state.listFields = data.fields;
            state.modelInfo = data.modelInfo;
         },
         setListActions (state, { data }) {
            const actions = [];
            const exist = {};
            (data || []).forEach((item) => {
               if (!Object.prototype.hasOwnProperty.call(exist, item.actionName)) {
                  actions.push(item);
                  exist[item.actionName] = true;
               }
            });
            state.listActions = actions;
         },
         setListData (state, { dataList, total }) {
            state.total = total;
            state.listData = dataList;
            const statusArray = new Array(dataList.length);
            statusArray.fill(false);
            state.listCheckedStatusArray = statusArray;
         },
         setPageSize (state, pageSize) {
            state.pageSize = pageSize;
         },
         setPageIndex (state, pageIndex) {
            state.pageIndex = pageIndex;
         },
      },

      actions: {
         async fetchListFields () {
            const rsp = await get('list/fields/', { });
            const result = rsp.data;
            if (result.success) {
               this.commit('setListFields', result);
            } else {
               throw new Error(result?.message || '拉取字段信息出错了');
            }
         },

         async fetchListActions () {
            const rsp = await get('list/actions/', { });
            const result = rsp.data;
            if (result.success) {
               this.commit('setListActions', result);
            } else {
               throw new Error(result?.message || '拉取操作信息出错了');
            }
         },

         // 服务端请求，所以不需要错误请求
         async fetchListData ({ state }, {
            pageIndex = state.pageIndex,
         } = {}) {
            if (state.loading) return;
            this.commit('setLoading', true);
            try {
               const rsp = await get('list/data/', {
                  pageIndex,
                  pageSize: state.pageSize,
                  sort: state.sortList.join(' '),
               });
               const result = rsp.data;
               if (result.success) {
                  this.commit('setListData', result.data);
                  this.commit('setPageIndex', pageIndex);
               } else {
                  throw new Error(result?.message || '拉取列表数据出错了');
               }
            } finally {
               this.commit('setLoading', false);
            }
         },
      },
   });

   return store;
}
