<template>
   <a-input-number
      v-model="editFormData[objectKey]"
      :placeholder="config.placeholder || ''"
      :min="config.min"
      :max="config.max"
      :step="config.step"
      class="form-component-number"
   />
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
.form-component-number {
}
</style>
