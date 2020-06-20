<template>
   <div
      v-if="filterFields.length"
      class="table-filter"
   >
      <span class="action-lable">过滤:</span>
      <div
         v-for="(fItem, idx) in filterFields"
         :key="idx"
         class="filter-item"
      >
         <a-tooltip
            class="tooltip"
            placement="topLeft"
            :title="fItem.componentConfig.tip"
         >
            <label class="filter-item-label">{{ fItem.fieldNameAlias || fItem.fieldName }}: </label>
            <div class="filter-fields-wrap">
               <component
                  :is="getComponent(fItem.componentName)"
                  v-model="filterForm[fItem.fieldName]"
                  :filter-form-data="filterForm"
                  :object-key="fItem.fieldName"
                  :config="fItem.componentConfig"
                  :field-name="fItem.fieldName"
               />
            </div>
         </a-tooltip>
      </div>
      <a-button
         type="dashed"
         icon="search"
         @click="reloadData"
      >
         查找
      </a-button>
   </div>
</template>
<script>
import FilterComponents from './filter-components';

export default {
   computed: {
      state () {
         return this.$store.state;
      },
      filterFields () {
         return this.state.filterFields;
      },
      filterForm () {
         return this.state.filterForm;
      },
   },
   methods: {
      getComponent (componentName) {
         if (Object.prototype.hasOwnProperty.call(FilterComponents, componentName)) {
            return FilterComponents[componentName];
         }
         return FilterComponents.string;
      },
      reloadData () {
         this.$emit('reloadData');
      },
   },
};
</script>

<style lang="stylus">
.table-filter {
   >.action-lable {
      line-height 2.5em
   }
   >.filter-item {
      display inline-block
      vertical-align top
      margin 0 1em 0 0em
      >.tooltip {
         >.filter-item-label {
            color: #000
            margin 0 0.2em 0 0
            display inline-block
         }
         >.filter-fields-wrap {
            display inline-block
         }
      }
   }
   button.text-button {
      border none
      background none
      font-size 1em
      color #409eff
      cursor pointer
      &.danger {
         color #f56c6c
      }
   }
}
</style>
