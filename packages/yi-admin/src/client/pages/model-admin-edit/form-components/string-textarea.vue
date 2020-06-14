<template>
   <a-input
      v-model="editFormData[objectKey]"
      type="textarea"
      :placeholder="config.placeholder || ''"
      :max-length="config.maxLength"
      :auto-size="{ minRows: 2}"
      class="form-component-string-textarea"
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
.form-component-string-textarea.ant-input {
   max-width 40em
}
</style>
