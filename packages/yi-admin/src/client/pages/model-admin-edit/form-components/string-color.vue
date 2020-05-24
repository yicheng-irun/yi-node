<template>
   <div class="component-el-string-color">
      <el-color-picker
         :value="value"
         :show-alpha="config.showAlpha"
         :predefine="config.predefine"
         size="medium"
         class="form-component-el-string-color"
         @active-change="handleInput"
      />
      <el-button
         type="text"
         @click="handleInput('')"
      >
         清空颜色
      </el-button>
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
.form-component-el-string-color {
   >.el-color-picker__trigger {
      vertical-align middle
   }
   >.el-button {
      vertical-align middle
   }
}
</style>
