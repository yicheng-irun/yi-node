<template>
   <div
      class="form-components-array"
   >
      <div
         v-for="(item, index) in value"
         :key="index"
         class="form-components-array-item"
      >
         <div class="delete-btn">
            <el-button
               type="danger"
               icon="el-icon-minus"
               circle
               @click="value.splice(index, 1)"
            />
         </div>
         <component
            :is="getComponent"
            v-model="value[index]"
            :edit-form-data="value"
            :object-key="index"
            :name="index"
            :config="componentConfig"
            :field-name="fieldName"
         />
      </div>
      <el-button
         icon="el-icon-plus"
         type="primary"
         circle
         @click="value.push(null)"
      />
      <p
         v-if="componentConfig.helpText"
         class="ya-help-text"
         v-text="componentConfig.helpText"
      />
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
      config: {
         type: Object,
         default () {
            return {
               required: false,
               helpText: '',
               minLength: 0,
               childrenType: {
                  componentName: 'base',
                  fieldName: '',
                  componentConfig: {
                     required: false,
                     helpText: '',
                  },
                  fieldNameAlias: '',
               },
            };
         },
      },
      fieldName: {
         type: String,
         default: '',
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
         const { default: FormComponents } = await import('../form-components');
         if (Object.prototype.hasOwnProperty.call(FormComponents, componentName)) {
            const t = await FormComponents[componentName]();
            console.log(t.default);
            return t.default;
         }
         const t = FormComponents.base();
         return t.default;
      },
   },
};
</script>

<style lang="stylus">
.form-components-array {
   color #606266
   >.form-components-array-item {
      position relative
      margin 0 0 0.5em 2em
      min-height 2em
      >.delete-btn {
         position absolute
         left -2em
      }
   }
}
</style>
