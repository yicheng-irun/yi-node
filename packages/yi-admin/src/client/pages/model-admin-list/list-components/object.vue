<template>
   <div
      class="list-components-object"
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
         type: Object,
         default: null,
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
.list-components-object {
   text-align center
   word-break break-all
}
</style>
