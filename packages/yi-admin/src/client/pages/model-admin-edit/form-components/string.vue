<template>
   <a-input
      v-model="editFormData[objectKey]"
      :placeholder="config.placeholder || ''"
      :max-length="config.maxLength"
      class="form-component-string"
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
.form-component-string {
   max-width 20em
}
</style>
