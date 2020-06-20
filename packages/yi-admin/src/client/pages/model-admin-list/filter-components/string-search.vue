<template>
   <a-input
      v-model="filterFormData[objectKey]"
      :placeholder="config.placeholder || ``"
      :max-length="config.maxLength"
      class="filter-component-string"
      @pressEnter="$emit('reloadData')"
   />
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
      filterFormData: {
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
   methods: {
   },
};
</script>

<style lang="stylus">
.filter-component-string {
   max-width 20em
}
</style>
