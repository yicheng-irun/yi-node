<template>
   <el-input
      :value="value"
      :placeholder="config.placeholder || ''"
      :minlength="config.minLength"
      :maxlength="config.maxLength"
      class="form-component-el-string"
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
   methods: {
      handleInput (value) {
         const v = String(value);
         this.$emit('input', v);
      },
   },
};
</script>

<style lang="stylus">
.form-component-el-string.el-input {
   max-width 20em
}
</style>
