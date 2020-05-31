<template>
   <div
      class="list-components-array"
   >
      <div
         v-for="(item, index) in value"
         :key="index"
         class="list-components-array-item"
         :class="config.listStyleInline ? 'inline-type' : ''"
      >
         <component
            :is="getComponent"
            :id="id"
            :config="componentConfig"
            :field-name="fieldName"
            :values="value"
            :object-key="index"
            :value="value[index]"
         />
      </div>
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
         type: Array,
         default () {
            return [];
         },
      },
      id: {
         type: String,
         default: '',
      },
      fieldName: {
         type: String,
         default: '',
      },
      config: {
         type: Object,
         default () {
            return {
               listStyleInline: false,
               childrenType: {
                  componentName: 'base',
                  fieldName: '',
                  componentConfig: {},
                  fieldNameAlias: '',
               },
            };
         },
      },
   },
   computed: {
      componentConfig () {
         return this.config?.childrenType?.componentConfig || {};
      },
   },
   methods: {
      async getComponent () {
         const componentName = this.config?.childrenType?.componentName;
         const { default: FormComponents } = await import('../list-components');
         if (Object.prototype.hasOwnProperty.call(FormComponents, componentName)) {
            return FormComponents[componentName]();
         }
         return FormComponents.base();
      },
   },
};
</script>

<style lang="stylus">
.list-components-array {
   text-align center
   .list-components-array-item {
      position relative
      margin 0.3em
      &.inline-type {
         display inline-block
         background #0001
      }
   }
}
</style>
