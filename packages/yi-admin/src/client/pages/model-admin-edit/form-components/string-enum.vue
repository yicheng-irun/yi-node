<template>
   <a-select
      v-model="editFormData[objectKey]"
      :placeholder="config.placeholder == null ? '请选择' : config.placeholder"
      :clearable="config.required ? false : true"
      :allow-clear="true"
      class="form-component-string-enum"
   >
      <a-select-option
         v-for="item in options"
         :key="item.value"
         :value="item.value"
      >
         {{ item.label }}
      </a-select-option>
   </a-select>
</template>

<script>
export default {
   props: {
      config: {
         type: Object,
         default () {
            return {};
         },
      },
      editFormData: {
         type: [Object, Array],
         default () {
            return {};
         },
      },
      objectKey: {
         type: [String, Number],
         default: '',
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
   },
};
</script>

<style lang="stylus">
.form-component-string-enum.ant-select {
   max-width 20em
}
</style>
