<template>
   <div
      v-loading="state.loading"
      class="table-view"
   >
      <div class="top-action">
         <TableSort class="top-action-row" />
         <div class="top-action-row">
            <el-button
               class="create-btn"
               size="mini"
               icon="el-icon-plus"
               @click="createData"
            >
               新增
            </el-button>
            <el-button
               class="refresh-btn"
               size="mini"
               icon="el-icon-refresh-right"
               @click="reloadData"
            >
               刷新
            </el-button>
         </div>
         <div class="top-action-row">
            <span class="action-lable">对选中项进行</span>
            <el-select
               v-model="batchActionIndex"
               placeholder="请选择操作"
               size="mini"
               :class="checkedIdList.length === 0 ? 'dashed' : ''"
            >
               <el-option
                  v-for="item in batchActionOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
               />
            </el-select>
            <template>
               <el-popconfirm
                  v-if="selectedBatchAction && selectedBatchAction.popConfirm"
                  title="确定执行吗？"
                  @onConfirm="doBatchAction(selectedBatchAction)"
               >
                  <el-button
                     slot="reference"
                     size="mini"
                     :type="selectedBatchAction.buttonType || ''"
                     :icon="selectedBatchAction.buttonIcon || ''"
                  >
                     执行
                  </el-button>
               </el-popconfirm>
               <el-button
                  v-else
                  size="mini"
                  :type="(selectedBatchAction && selectedBatchAction.buttonType) || ''"
                  :icon="(selectedBatchAction && selectedBatchAction.buttonIcon) || ''"
                  :disabled="selectedBatchAction == null"
                  @click="doBatchAction(selectedBatchAction)"
               >
                  执行
               </el-button>
            </template>
            <span
               v-if="checkedIdList"
               class="batch-action-helptext"
            >
               {{ checkedIdList.length === 0 ? '当前未勾选任何项目' : `已选中${checkedIdList.length}条记录` }}
            </span>
         </div>
      </div>
      <div class="panel-box">
         <div class="table-wrapper">
            <table class="table-view-table">
               <thead class="table-view-thead">
                  <tr>
                     <th class="checkbox-all">
                        <el-checkbox
                           :value="allChecked"
                           @change="handelCheckAll"
                        />
                     </th>
                     <th>#</th>
                     <th>id</th>
                     <th>操作</th>
                     <th
                        v-for="(item, idx) in listFields"
                        :key="idx"
                     >
                        <span v-text="item.fieldNameAlias || item.fieldName" />
                     </th>
                  </tr>
               </thead>
               <tbody class="table-view-tbody">
                  <tr
                     v-for="(item, index) in listData"
                     :key="item.id || index"
                  >
                     <td><el-checkbox v-model="listCheckedStatusArray[index]" /></td>
                     <td class="index-td">
                        {{ index + 1 }}
                     </td>
                     <td>
                        <a :href="`edit/?id=${item.id}`">{{ item.id }}</a>
                     </td>
                     <td class="actions-td">
                        <template
                           v-for="(actionItem, actionIndex) in rowListActions"
                        >
                           <el-popconfirm
                              v-if="actionItem.popConfirm"
                              :key="actionIndex"
                              title="确定执行吗？"
                              @onConfirm="doActions(actionItem, [item.id])"
                           >
                              <el-button
                                 slot="reference"
                                 size="mini"
                                 :type="actionItem.buttonType || ''"
                                 :icon="actionItem.buttonIcon || ''"
                              >
                                 {{ actionItem.actionName }}
                              </el-button>
                           </el-popconfirm>
                           <el-button
                              v-else
                              :key="actionIndex"
                              size="mini"
                              :type="actionItem.buttonType || ''"
                              :icon="actionItem.buttonIcon || ''"
                              @click="doActions(actionItem, [item.id])"
                           >
                              {{ actionItem.actionName }}
                           </el-button>
                        </template>
                     </td>
                     <td
                        v-for="(fieldItem, fieldIndex) in listFields"
                        :key="fieldIndex"
                     >
                        <div class="fields-wrap">
                           <component
                              :is="getComponent(fieldItem.componentName)"
                              :id="item.id"
                              :config="fieldItem.componentConfig"
                              :field-name="fieldItem.fieldName"
                              :values="item.values"
                              :value="item.values[fieldItem.fieldName]"
                           />
                        </div>
                     </td>
                  </tr>
               </tbody>
            </table>
            <div
               v-if="listData.length === 0"
               class="no-data"
            >
               暂时没有数据呦~
            </div>
         </div>
         <div class="table-view-footer">
            <el-pagination
               :current-page="pageIndex"
               background
               :page-sizes="[10, 20, 50, 100, 200]"
               :page-size="state.pageSize"
               layout="total, sizes, prev, pager, next, jumper"
               :total="state.total"
               @size-change="handleSizeChange"
               @current-change="handleCurrentChange"
            />
         </div>
      </div>
   </div>
</template>

<script>
import ListComponents from './list-components';
import TableSort from './table-sort';

export default {
   components: {
      TableSort,
   },
   data () {
      return {
         pageIdx: 0,
         batchActionIndex: null,
      };
   },
   computed: {
      state () {
         return this.$store.state;
      },
      pageIndex () {
         return this.state.pageIndex;
      },
      listFields () {
         return this.state.listFields;
      },
      listActions () {
         return this.state.listActions;
      },
      listData () {
         return this.state.listData;
      },
      listCheckedStatusArray () {
         return this.state.listCheckedStatusArray;
      },

      checkedIdList () {
         const idList = [];
         const { listData } = this;
         const { listCheckedStatusArray } = this;
         for (let i = 0; i < listData.length; i += 1) {
            const item = listData[i];
            const status = listCheckedStatusArray[i] === true;
            if (status) {
               idList.push(item.id);
            }
         }
         return idList;
      },

      betListActions () {
         return this.listActions.filter((t) => t.isBatchAction);
      },
      batchActionOptions () { // 批量操作的下拉选择框选项
         const options = [];
         const actions = this.betListActions;
         for (let i = 0; i < actions.length; i += 1) {
            const element = actions[i];
            options.push({
               value: i,
               label: element.actionName,
            });
         }
         return options;
      },
      selectedBatchAction () { // 选中的批量操作action
         if (typeof this.batchActionIndex === 'number') {
            return this.betListActions[this.batchActionIndex];
         }
         return null;
      },
      rowListActions () {
         return this.listActions.filter((t) => t.isTableRowAction);
      },
      allChecked () {
         let isCheckedAll = true;
         for (let i = 0; i < this.listCheckedStatusArray.length; i += 1) {
            if (!this.listCheckedStatusArray[i]) {
               isCheckedAll = false;
               break;
            }
         }
         return isCheckedAll;
      },
   },
   watch: {
      'state.sortList': function _ () {
         this.$nextTick(() => {
            this.reloadData();
         });
      },
   },
   methods: {
      getComponent (componentName) {
         if (Object.prototype.hasOwnProperty.call(ListComponents, componentName)) {
            return ListComponents[componentName];
         }
         return ListComponents.base;
      },
      handelCheckAll () {
         let v = true;
         if (this.allChecked) {
            v = false;
         }
         for (let i = 0; i < this.listCheckedStatusArray.length; i += 1) {
            this.$set(this.listCheckedStatusArray, i, v);
         }
      },
      async handleSizeChange (v) {
         this.$store.commit('setPageIndex', 1);
         this.$store.commit('setPageSize', v);
         try {
            await this.$store.dispatch('fetchListData');
         } catch (e) {
            this.$notify.error({
               title: '出错了',
               message: e?.message || '拉取数据出错了',
            });
         }
      },
      handleCurrentChange (v) {
         const oldPageIndex = this.state.pageIndex;
         this.$store.commit('setPageIndex', 0); // 这么做是禁止element的翻页组件提前跳页
         this.$nextTick(async () => {
            this.$store.commit('setPageIndex', oldPageIndex); // 这么做是触发
            try {
               await this.$store.dispatch('fetchListData', { pageIndex: v });
            } catch (e) {
               this.$notify.error({
                  title: '出错了',
                  message: e?.message || '拉取数据出错了',
               });
            }
         });
      },

      async createData () {
         window.location = 'edit/';
      },

      async reloadData () {
         try {
            await this.$store.dispatch('fetchListData');
         } catch (e) {
            this.$notify.error({
               title: '出错了',
               message: e?.message || '拉取数据出错了',
            });
         }
      },

      async doBatchAction (actionObj) {
         const idList = this.checkedIdList;
         if (idList.length <= 0) {
            this.$notify.error({
               title: '未勾选任何项目',
            });
            return;
         }
         this.doActions(actionObj, idList);
      },

      async doActions (actionObj, ids = []) {
         if (this.state.loading) return;
         if (this.state.loading) return;
         this.$store.commit('setLoading', true);
         try {
            const rsp = await this.$ajax.post('list/action/', {
               actionName: actionObj.actionName,
               idList: ids,
            });
            const result = rsp.data;
            if (result.success) {
               const {
                  successfulNum = 0,
                  failedNum = 0,
               } = result.data || {};
               this.$notify.success({
                  title: `${actionObj.actionName} 执行完成`,
                  message: `${successfulNum} 项执行成功，${failedNum} 项执行失败`,
               });
            } else {
               throw new Error(result?.message || `执行 ${actionObj.actionName} 操作失败了`);
            }
         } catch (e) {
            this.$notify.error({
               title: `${actionObj.actionName} 未执行完成`,
               message: e?.message || `执行 ${actionObj.actionName} 操作失败了`,
            });
         } finally {
            this.$store.commit('setLoading', false);
         }

         try {
            await this.$store.dispatch('fetchListData');
         } catch (e) {
            this.$notify.error({
               title: '出错了',
               message: e?.message || '拉取数据出错了',
            });
         }
      },
   },
};
</script>

<style lang="stylus">
.table-view {
   font-size 12px
   margin 0 1.5em
   >.top-action {
      padding 0.8em 0 0.5em
      >.top-action-row {
         font-size 0.9em
         color #000a
         padding 0.5em 0
         >.refresh-btn {
            border-style dashed
         }
         >.action-lable {
            margin 0 0.8em 0 0
         }
         >.el-select {
            margin 0 0.8em 0 0
            &.dashed>.el-input>input {
               border-style dashed
            }
         }
         >.el-button {

         }
         >.batch-action-helptext {
            font-size 12px
            margin 0 0.3em
            padding 0 0.3em
         }
      }
   }
   >.panel-box {
      box-shadow 0 0 3px #0001
      >.table-wrapper {
         overflow-x auto;
         >table {
            min-width 100%
            background #fff
            border-collapse collapse
            font-size: 12px
            >thead {
               border-bottom 2px dotted #0004
               line-height 1.2
               color #000a
               >tr {
                  >th {
                     padding 1.2em 0.4em 1em
                  }
               }
            }
            >tbody {
               line-height 1.5
               >tr {
                  >td {
                     padding 0.8em 0.8em;
                     font-size: 12px
                     color #000a
                     border-right 1px dotted #0002
                     &:last-child {
                        border-right none
                     }
                     &.index-td {
                        text-align center
                     }
                     &.actions-td {
                        text-align center
                        .el-button {
                           padding 0.4em 0.8em
                           margin 0.3em
                        }
                     }
                     >.fields-wrap {
                        text-align center
                     }
                  }
                  &:nth-child(2n - 1) {
                     background #0000000a
                  }
               }
            }
         }
         >.no-data {
            text-align center
            line-height 4
            color #0008
            font-size 1.3em
         }
      }
      >.table-view-footer {
         border-top 1px dashed #0003
         line-height 3em
         background #fff
         padding 0.7em 1em 0.2em
         color #000a
      }
   }
}
</style>
