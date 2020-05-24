<template>
   <span
      class="form-components-base"
      v-text="value"
   />
</template>

<script>
export default {
   model: {
      prop: 'value',
      event: 'input',
   },
   props: {
      value: {
         type: String,
         default: '',
      },
      config: {
         type: Object,
         default () {
            return {};
         },
      },
   },
};
</script>

<style lang="stylus">
.form-components-base {
   color #606266
}
</style>
