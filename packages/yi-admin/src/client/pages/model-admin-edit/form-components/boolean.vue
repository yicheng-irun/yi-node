<template>
   <a-switch
      v-model="editFormData[objectKey]"
      class="form-component-boolean"
   >
      <a-icon
         slot="checkedChildren"
         type="check"
      />
      <a-icon
         slot="unCheckedChildren"
         type="close"
      />
   </a-switch>
</template>

<script>
export default {

   props: {

      config: {
         type: Object,
         default () {
            return {};
         },
      },
      editFormData: {
         type: [Object, Array],
         default () {
            return {};
         },
      },
      objectKey: {
         type: [String, Number],
         default: '',
      },
   },
   methods: {

   },
};
</script>

<style lang="stylus">
.form-component-boolean {

}
</style>
