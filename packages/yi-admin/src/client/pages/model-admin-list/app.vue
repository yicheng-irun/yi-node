<template>
   <div
      id="app"
   >
      <no-ssr class="breadcrumb">
         <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '../../' }">
               <a
                  href="../../"
                  target="_top"
               >首页</a>
            </el-breadcrumb-item>
            <el-breadcrumb-item>{{ state.modelInfo.title || state.modelInfo.name }} 管理</el-breadcrumb-item>
         </el-breadcrumb>
      </no-ssr>
      <TableView />
      <!-- <pre v-text="JSON.stringify(state, null, '  ')" /> -->
   </div>
</template>

<script>
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
   >pre {
      font-size 12px
   }
}
</style>
