<template>
   <el-input-number
      :value="value"
      :placeholder="config.placeholder || ''"
      :min="config.min"
      :max="config.max"
      :step="config.step"
      class="form-component-input-number"
      @input="handleInput"
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
         type: Number,
         default: 0,
      },
      config: {
         type: Object,
         default () {
            return {};
         },
      },
   },
   methods: {
      handleInput (value) {
         const v = Number(value);
         this.$emit('input', v);
      },
   },
};
</script>

<style lang="stylus">
.form-component-input-number {
   .el-input-number__decrease, .el-input-number__increase {
      user-select none
   }
}
</style>
