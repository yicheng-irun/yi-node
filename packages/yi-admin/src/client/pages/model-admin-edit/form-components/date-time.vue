<template>
   <a-date-picker
      v-model="editFormData[objectKey]"
      show-time
      :placeholder="config.placeholder == null ? '请选择' : config.placeholder"
      class="form-component-date-time"
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
.form-component-date-time {
}
</style>
