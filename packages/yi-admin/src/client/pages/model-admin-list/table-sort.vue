<template>
   <div class="table-sort-block">
      <span class="action-lable">排序:</span>
      <div
         v-for="(sitem, idx) in sortList"
         :key="idx"
         class="sort-item"
      >
         <a-select
            v-model="sortList[idx]"
            placeholder="请选择"
            style="min-width:150px"
            @change="handleChange"
         >
            <a-select-option
               v-for="item in getOptions(idx)"
               :key="item.value"
               :label="item.label"
               :value="item.value"
            >
               <span>{{ item.label }}</span>
            </a-select-option>
         </a-select>
         <div class="sort-item-info">
            <button
               class="text-button danger"
               @click="removeRule(idx)"
            >
               删除
            </button>
            <span>该排序</span>
         </div>
      </div>
      <button
         class="text-button"
         @click="createNewRule"
      >
         增加
      </button>
      <span>排序规则</span>
   </div>
</template>

<script>
export default {
   computed: {
      state () {
         return this.$store.state;
      },
      listFields () {
         return this.state.listFields || [];
      },
      sortList () {
         return this.state.sortList;
      },
      sortOptions () {
         const options = [];
         options.push({
            label: '+ id 增序',
            value: '_id',
         }, {
            label: '- id 降序',
            value: '-_id',
         });
         for (let i = 0; i < this.listFields.length; i += 1) {
            const field = this.listFields[i];
            const fieldNameAlias = field.fieldNameAlias || field.fieldName;
            options.push({
               label: `${fieldNameAlias} 增序(+)`,
               value: `${field.fieldName}`,
            }, {
               label: `${fieldNameAlias} 降序(-)`,
               value: `-${field.fieldName}`,
            });
         }
         return options;
      },

   },
   methods: {
      getOptions (index) {
         const options = this.sortOptions;
         const newOptions = [];
         const sortList = [...this.sortList].slice(0, index);
         for (let i = 0; i < options.length; i += 2) {
            const option1 = options[i];
            const option2 = options[i + 1];
            if (sortList.includes(option1.value) || sortList.includes(option2.value)) {
               //
            } else {
               newOptions.push(option1, option2);
            }
         }
         return newOptions;
      },
      createNewRule () {
         this.sortList.push('');
      },
      removeRule (index) {
         this.sortList.splice(index, 1);
      },
      clearRules () {
         const { sortList } = this;
         const newSortList = [];
         const containerSortList = [];
         for (let i = 0; i < sortList.length; i += 1) {
            const t = sortList[i];
            const c = t.replace(/^-/, '');
            if (!containerSortList.includes(c)) {
               newSortList.push(t);
               containerSortList.push(c);
            }
         }
         this.state.sortList = newSortList;
      },
      handleChange () {
         this.clearRules();
      },
   },
};
</script>

<style lang="stylus">
.table-sort-block {
   >.action-lable {
      line-height 2.5em
   }
   >.sort-item {
      display inline-block
      vertical-align top
      margin 0 0.5em 0 0.2em
      >.sort-item-info {
         line-height 2
         padding 0 1em
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
