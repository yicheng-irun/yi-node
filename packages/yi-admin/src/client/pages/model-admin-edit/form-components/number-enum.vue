<template>
   <el-select
      :value="value"
      :placeholder="config.placeholder == null ? '请选择' : config.placeholder"
      :clearable="config.required ? false : true"
      class="form-component-el-number-enum"
      @change="handleInput"
   >
      <el-option
         v-for="item in options"
         :key="item.value"
         :label="item.label"
         :value="item.value"
      />
   </el-select>
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
         default: null,
      },
      config: {
         type: Object,
         default () {
            return {};
         },
      },
   },

   computed: {
      options () {
         const enumList = this.config.enum;
         const opts = [];
         if (Array.isArray(enumList)) {
            for (let i = 0; i < enumList.length; i += 1) {
               const e = enumList[i];
               if (typeof e === 'object' && e.value !== undefined) {
                  opts.push({
                     value: e.value,
                     label: e.label == null ? e.value : e.label,
                  });
               } else {
                  opts.push({
                     value: String(e),
                     label: String(e),
                  });
               }
            }
         }

         return opts;
      },
   },
   methods: {
      handleInput (value) {
         if (typeof value === 'number') {
            this.$emit('input', value);
         } else {
            this.$emit('input', null);
         }
      },
   },
};
</script>

<style lang="stylus">
.form-component-el-number-enum {
   // max-width 20em
}
</style>
