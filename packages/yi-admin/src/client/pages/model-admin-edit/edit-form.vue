<template>
   <div
      v-loading="state.loading"
      class="edit-form"
   >
      <el-form
         ref="form"
         :model="editFormData"
         status-icon
         size="small"
         :rules="formRules"
         label-width="110px"
      >
         <el-form-item
            v-if="editId"
            label="id:"
         >
            <div class="edit-id">
               {{ editId }}
            </div>
         </el-form-item>
         <el-form-item
            v-for="(item, index) in editFormFields"
            :key="index"
            :label="`${item.fieldNameAlias || item.fieldName}:`"
            :prop="item.fieldName"
            :required="item.componentConfig.required"
         >
            <component
               :is="getComponent(item.componentName)"
               v-model="editFormData[item.fieldName]"
               :edit-form-data="editFormData"
               :name="item.fieldName"
               :config="item.componentConfig"
               :field-name="item.fieldName"
            />
            <p
               v-if="item.componentConfig.helpText"
               class="ya-help-text"
               v-text="item.componentConfig.helpText"
            />
         </el-form-item>
         <el-form-item>
            <el-button
               type="primary"
               @click="submit"
            >
               {{ editId ? '保存' : '提交' }}
            </el-button>
            <el-button @click="reset">
               重置
            </el-button>
         </el-form-item>
      </el-form>
   </div>
</template>

<script>
import FormComponents from './form-components';

export default {
   props: {
      editId: {
         type: String,
         default: '',
      },
      editFormData: {
         type: Object,
         default () {
            return {};
         },
      },
      editFormFields: {
         type: Array,
         default () {
            return [];
         },
      },
   },

   computed: {
      state () {
         return this.$store.state;
      },
      formRules () {
         return {};
      },
   },

   methods: {
      getComponent (componentName) {
         if (Object.prototype.hasOwnProperty.call(FormComponents, componentName)) {
            return FormComponents[componentName];
         }
         return FormComponents.string;
      },
      async submit () {
         if (this.state.loading) return;
         this.$store.commit('setLoading', true);
         // await new Promise((resolve) => setTimeout(resolve, 1000));
         try {
            const data = await this.$store.dispatch('formSubmit');
            if (data?.success) {
               this.$notify.success({
                  title: '保存成功',
                  message: '保存成功',
               });
            } else {
               throw new Error(data?.message || '保存失败');
            }
         } catch (e) {
            this.$notify.error({
               title: '提交出错了',
               message: e?.message || `${e}`,
            });
         }

         this.$store.commit('setLoading', false);
      },
      reset () {
         try {
            this.$store.commit('resetEditFormData');
            this.$notify.success({
               title: '重置好了',
               message: '重置好了',
            });
         } catch (e) {
            this.$notify.error({
               title: '重置出错了',
               message: e?.message || `${e}`,
            });
         }
      },
   },
};
</script>

<style lang="stylus">
.edit-form {
   padding 2em 0em
   margin 0 1em
   >.el-form {
      .edit-id {
         font-size 0.8em
         color #606266
      }
   }

   >.el-loading-mask {
      background #fffa
   }

   .el-form-item__label {
      font-size 0.8em
      opacity 0.9
   }
   .el-button--small {
      padding 0.6em 1.5em
   }
   .el-form-item__content {
      >.ya-help-text {
         margin 0.5em 0 0
         color #0007
         font-size 0.8em
         line-height 1.5
      }
   }
}
</style>
