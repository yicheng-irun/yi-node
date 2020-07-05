<template>
   <div
      class="form-components-base"
      v-text="value"
   />
</template>

<script>
export default {
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
