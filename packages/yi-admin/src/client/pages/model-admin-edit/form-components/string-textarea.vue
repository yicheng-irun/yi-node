<template>
   <el-input
      type="textarea"
      :value="value"
      :placeholder="config.placeholder || ''"
      :minlength="config.minLength"
      :maxlength="config.maxLength"
      :autosize="{ minRows: 2}"
      class="form-component-el-textarea"
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
.form-component-el-textarea.el-textarea {
   max-width 40em
}
</style>
