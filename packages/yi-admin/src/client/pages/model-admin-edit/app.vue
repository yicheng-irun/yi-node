<template>
   <div id="app">
      <no-ssr class="breadcrumb">
         <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '../../' }">
               <a
                  href="../../../"
                  target="_top"
               >首页</a>
            </el-breadcrumb-item>
            <el-breadcrumb-item>
               <a
                  href="../"
                  target="_top"
               >
                  {{ state.modelInfo.title || state.modelInfo.name }} 管理
               </a>
            </el-breadcrumb-item>
            <el-breadcrumb-item>{{ state.modelInfo.title || state.modelInfo.name }} {{ state.editId ? '编辑' : '新增' }}</el-breadcrumb-item>
         </el-breadcrumb>
      </no-ssr>
      <edit-form
         :edit-id="state.editId"
         :edit-form-fields="state.editFormFields"
         :edit-form-data="state.editFormData"
      />
      <!-- <pre v-text="JSON.stringify(state.editFormData, null, '  ')" />
      <pre v-text="JSON.stringify(state, null, '  ')" /> -->
   </div>
</template>

<script>
import createStore from './store';
import EditForm from './edit-form';

export default {
   components: {
      EditForm,
   },

   createStore,
   async fetchData (context) {
      await Promise.all([
         context.store.dispatch('fetchEditFormFields'),
         context.store.dispatch('fetchEditData'),
      ]);
   },

   computed: {
      state () {
         return this.$store.state;
      },

   },
};
</script>

<style lang="stylus">
body {
   background: #f5f6f7;
}
#app {
   >pre {
      font-size 12px;
   }
}
</style>
