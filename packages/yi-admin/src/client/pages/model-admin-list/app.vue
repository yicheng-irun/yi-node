<template>
   <a-config-provider :locale="zhCN">
      <div
         id="app"
      >
         <a-breadcrumb separator=">">
            <a-breadcrumb-item>
               <a
                  href="../../"
                  target="_top"
               >
                  首页
               </a>
            </a-breadcrumb-item>
            <a-breadcrumb-item>
               {{ state.modelInfo.title || state.modelInfo.name }} 管理
            </a-breadcrumb-item>
         </a-breadcrumb>
         <TableView />
         <!-- <pre v-text="JSON.stringify(state, null, '  ')" /> -->
      </div>
   </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/es/locale-provider/zh_CN';
import createStore from './store';
import TableView from './table-view';

export default {
   components: {
      TableView,
   },
   createStore,
   async fetchData (context) {
      await Promise.all([
         context.store.dispatch('fetchListFields'),
         context.store.dispatch('fetchListActions'),
         context.store.dispatch('fetchListData'),
      ]);
   },
   data () {
      return {
         zhCN,
      };
   },
   computed: {
      state () {
         return this.$store.state;
      },
   },
   mounted () {
   },
};
</script>

<style lang="stylus">
body {
   background: #f6f6f6
}
#app {
   padding 0 0 2em
   transition opacity 0.3s
   >.ant-breadcrumb {
      padding 1em 0
      margin 0 1.2em
   }
   >pre {
      font-size 12px
   }
}
</style>
