<template>
   <div
      v-if="typeof value === 'boolean'"
      class="list-components-boolean"
   >
      <a-icon
         :type="value ? 'check-circle' : 'close-circle'"
         :class="value ? 'success' : 'error'"
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

<style lang="less">
.list-components-boolean {
   font-size: 1.5em;
   >.success {
      color: @success-color
   }
   >.error {
      color: @error-color
   }
}
</style>
