<template>
   <div
      v-if="typeof value === 'boolean'"
      class="list-components-boolean"
   >
      <i
         v-if="value"
         class="el-icon-success"
      />
      <i
         v-else
         class="el-icon-error"
      />
   </div>
   <div v-else>
      {{ value }}
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
         type: Boolean,
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
.list-components-boolean {
   font-size 1.5em
   >.el-icon-success {
      color #67c23a
   }
   >.el-icon-error {
      color #f56c6c
   }
}
</style>
