<template>
   <div
      class="list-components-base"
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
         type: [String, Number, Boolean, Date],
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
.list-components-base {
   text-align center
   word-break break-all
}
</style>
