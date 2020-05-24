<template>
   <el-date-picker
      v-model="editFormData[fieldName]"
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
      fieldName: {
         type: String,
         default: '',
      },
      editFormData: {
         type: Object,
         default () {
            return {};
         },
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
