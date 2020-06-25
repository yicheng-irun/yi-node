<template>
   <div
      class="list-components-string-html"
      v-html="value"
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
         type: [String, Number, Boolean, Date],
         default: '',
      },
   },
};
</script>

<style lang="stylus">
.list-components-string-html {
   text-align center
   word-break break-all
}
</style>
