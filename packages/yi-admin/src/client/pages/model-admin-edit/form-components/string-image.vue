<template>
   <div class="form-component-string-image">
      <a
         v-if="value"
         :href="value"
         class="image-block"
         target="_blank"
      >
         <img
            :src="value"
            :alt="value"
         >
      </a>
      <a-button-group>
         <a-button
            v-if="value"
            type="danger"
            icon="close"
            size="small"
            @click="handleInput('')"
         />
         <a-button
            size="small"
            type="primary"
            @click="selectFile"
         >
            {{ value ? '重新选择' : '选择图片' }}
         </a-button>
      </a-button-group>
   </div>
</template>

<script>
import formatFileSize from '../components-utils/format-file-size';

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
         type: String,
         default: '',
      },
      config: {
         type: Object,
         default () {
            return {
               maxFileSize: 10 * 1000,
               mimeType: '*',
            };
         },
      },
   },
   data () {
      return {
      };
   },
   mounted () {
      const fileInput = document.createElement('input');
      this.fileInput = fileInput;
      fileInput.type = 'file';
      fileInput.accept = this.config.mimeType || 'image/*';
      fileInput.onchange = () => {
         const file = fileInput.files[0];
         this.doUploadAction(file);
      };
   },
   methods: {
      async selectFile () {
         this.fileInput.click();
      },
      /**
       * @param {File} file
       */
      async upload (file) {
         const formData = new FormData();
         formData.append('name', file.name);
         // 通过append向form对象添加数据
         formData.append('file', file);
         // FormData私有类对象，访问不到，可以通过get判断值是否传进去
         console.log(formData.get('file'));

         const rsp = await this.$ajax.post(
            'component-action/',
            formData,
            {
               fieldName: this.fieldName,
               actionName: 'upload',
            }, {
               headers: {
                  'Content-Type': 'multipart/form-data',
               },
            },
         );
         if (rsp?.data?.success && rsp.data.data?.url) {
            return rsp.data.data.url;
         }
         throw new Error(rsp?.data?.message || '上传文件失败');
      },
      /**
       * @param {File} file
       */
      async doUploadAction (file) {
         try {
            console.log(file, this.config);
            if (file.size > this.config.maxFileSize) {
               throw new Error(`您选择的文件大小超过了最大${formatFileSize(this.config.maxFileSize)}限制`);
            }
            const url = await this.upload(file);
            this.handleInput(url);
         } catch (e) {
            this.$message.error(e?.message || String(e) || '选取文件失败了');
         }
      },

      handleInput (value) {
         const v = String(value);
         this.$emit('input', v);
      },
   },
};
</script>

<style lang="stylus">
.form-component-string-image {
   >.image-block {
      display inline-block
      width 10em
      margin 0 0.5em 0 0
      font-size 12px
      vertical-align bottom
      text-align center
      >img {
         vertical-align top
         max-width 100%
         max-height 10em
         border 1px solid #fff
         box-shadow 0 0 6px #0003
      }
   }
   >.a-button {
      padding 0.2em 0.5em
      margin 0 0.3em
   }
}

</style>
