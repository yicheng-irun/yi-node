<template>
   <div class="table-action">
      <a-button
         icon="plus"
         type="dashed"
         @click="$emit('createData')"
      >
         新增
      </a-button>
      <a-button
         icon="reload"
         type="dashed"
         @click="$emit('reloadData')"
      >
         刷新
      </a-button>
   </div>
</template>
