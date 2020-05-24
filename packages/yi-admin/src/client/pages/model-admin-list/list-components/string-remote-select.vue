<template>
   <div
      class="list-components-string-enum"
   >
      {{ labelValue || value }}
   </div>
</template>

<script>
export default {
   model: {
      prop: 'value',
      event: 'input',
   },
   props: {
      fieldName: {
         type: String,
         default: '',
      },
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
   data () {
      return {
         labelValue: '',
      };
   },
   mounted () {
      this.getRemoteLabel(this.value);
   },
   methods: {
      async getRemoteLabel (value) {
         try {
            const rsp2 = await this.$ajax.post('list/component-action/', {
               fieldName: this.fieldName,
               actionName: 'getLabelByValue',
               actionData: value,
            });
            if (this.value === value && rsp2.data?.success) {
               this.labelValue = rsp2.data.data;
            }
         } catch (e) {
            //
         }
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
