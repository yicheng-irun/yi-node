<template>
   <el-date-picker
      v-model="editFormData[objectKey]"
      :placeholder="config.placeholder == null ? '请选择' : config.placeholder"
      :format="config.format || 'yyyy-MM-dd HH:mm:ss'"
      type="datetime"
      class="form-component-el-date-time"
   />
</template>

<script>
export default {
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
      editFormData: {
         type: Object,
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
.form-component-el-date-time {
}
</style>
