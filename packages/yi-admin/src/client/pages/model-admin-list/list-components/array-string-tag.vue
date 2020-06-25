<template>
   <div
      class="list-components-array-string-tag"
   >
      <span
         v-for="(item, index) in value"
         :key="index"
         class="tag"
      >{{ item }}</span>
   </div>
</template>

<script>
export default {
   model: {
      prop: 'value',
      event: 'input',
   },
   props: {
      value: {
         type: [Array],
         default () {
            return [];
         },
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
.list-components-array-string-tag {
   text-align center
   >.tag {
      display inline-block
      margin 0.2em
      padding 0.4em 0.6em
      line-height 1
      background #e0edff
      border-radius 0.3em
   }
}
</style>
