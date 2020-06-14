<template>
   <a-spin
      :spinning="state.loading"
      class="edit-form"
   >
      <a-form
         ref="form"
         :model="editFormData"
         layout="horizontal"
      >
         <a-form-item
            v-if="editId"
            label="id:"
         >
            <div class="edit-id">
               {{ editId }}
            </div>
         </a-form-item>
         <a-form-item
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
               :object-key="item.fieldName"
               :name="item.fieldName"
               :config="item.componentConfig"
               :field-name="item.fieldName"
            />
            <p
               v-if="item.componentConfig.helpText"
               class="ya-help-text"
               v-text="item.componentConfig.helpText"
            />
         </a-form-item>
         <a-form-item>
            <a-button-group>
               <a-button
                  type="primary"
                  icon="check"
                  @click="submit"
               >
                  {{ editId ? '保存' : '提交' }}
               </a-button>
               <a-button
                  type="dashed"
                  icon="undo"
                  @click="reset"
               >
                  重置
               </a-button>
            </a-button-group>
         </a-form-item>
      </a-form>
   </a-spin>
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
                  message: '保存成功',
                  description: '保存成功',
               });
            } else {
               throw new Error(data?.message || '保存失败');
            }
         } catch (e) {
            this.$notify.error({
               message: '提交出错了',
               description: e?.message || `${e}`,
            });
         }

         this.$store.commit('setLoading', false);
      },
      reset () {
         try {
            this.$store.commit('resetEditFormData');
            this.$notify.success({
               message: '重置好了',
               description: '重置好了',
            });
         } catch (e) {
            this.$notify.error({
               message: '重置出错了',
               description: e?.message || `${e}`,
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
   >div.ant-spin-container {
      >.ant-form {
         >.ant-form-item {
            >.ant-form-item-label {
            }
            >.ant-form-item-control-wrapper {
            }
            @media (min-width: 576px) {
               >.ant-form-item-label {
                  position absolute
                  width 10em
               }
               >.ant-form-item-control-wrapper {
                  position relative
                  min-height 1em
                  margin 0 0 0 10.5em
               }
            }
         }
      }
   }

   .ya-help-text {
      margin 0.5em 0 0
      color #0007
      font-size 0.8em
      line-height 1.5
   }
}
</style>
