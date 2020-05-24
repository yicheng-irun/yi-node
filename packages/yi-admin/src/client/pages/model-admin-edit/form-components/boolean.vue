<template>
   <div class="form-component-boolean">
      <el-switch
         :value="value"
         @change="handleChange"
      />
      <span>({{ value ? '是' : '否' }})</span>
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
         default: false,
      },
      config: {
         type: Object,
         default () {
            return {};
         },
      },
   },
   methods: {
      handleChange (value) {
         this.$emit('input', !!value);
      },
   },
};
</script>

<style lang="stylus">
.form-component-boolean {
   >span {
      margin 0 0.8em;
      font-size 0.8em;
      opacity 0.7
   }
}
</style>
