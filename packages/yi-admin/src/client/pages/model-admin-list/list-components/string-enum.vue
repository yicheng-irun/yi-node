<template>
   <div
      class="list-components-string-enum"
   >
      {{ showLabel }}
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
         type: [String, Number],
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
      showLabel () {
         const enumList = this.config.enum;
         if (Array.isArray(enumList)) {
            for (let i = 0; i < enumList.length; i += 1) {
               const e = enumList[i];
               if (String(e?.value) === String(this.value)) {
                  return e.label || e.value;
               }
            }
         }
         return this.value;
      },
   },
};
</script>

<style lang="stylus">
.list-components-string-enum {
   // font-size 1.5em
   text-align center
}
</style>
