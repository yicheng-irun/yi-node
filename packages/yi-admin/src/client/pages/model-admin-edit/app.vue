<template>
   <div id="app">
      <a-breadcrumb separator=">">
         <a-breadcrumb-item>
            <a
               href="../../../"
               target="_top"
            >首页</a>
         </a-breadcrumb-item>
         <a-breadcrumb-item>
            <a
               href="../"
            >
               {{ state.modelInfo.title || state.modelInfo.name }} 管理
            </a>
         </a-breadcrumb-item>
         <a-breadcrumb-item>
            {{ state.modelInfo.title || state.modelInfo.name }} {{ state.editId ? '编辑' : '新增' }}
         </a-breadcrumb-item>
      </a-breadcrumb>
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
   >.ant-breadcrumb {
      padding 1em 0
      margin 0 1.2em
   }
   >pre {
      font-size 12px;
   }
}
</style>
