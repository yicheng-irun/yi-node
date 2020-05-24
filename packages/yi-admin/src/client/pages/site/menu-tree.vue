<template>
   <el-submenu
      v-if="siteMenu.childrens.length"
      class="menu-tree"
      :data-index="index"
      :index="`${index}`"
   >
      <template
         v-if="siteMenu.title"
         slot="title"
      >
         <i class="el-icon-folder" />
         <span>{{ siteMenu.title }}</span>
      </template>
      <component
         :is="getSelfCompnent()"
         v-for="(item, index2) in siteMenu.childrens"
         :key="index2"
         :site-menu="item"
         :index="`${index}_${index2}`"
         :get-self-compnent="getSelfCompnent"
      />
   </el-submenu>
   <el-menu-item
      v-else
      :data-index="index"
      :index="`${index}`"
      @click="clickItem"
   >
      <i class="el-icon-document" />
      <a
         slot="title"
         :href="siteMenu.link"
         target="main_frame"
      >{{ siteMenu.title }}</a>
   </el-menu-item>
</template>

<script>
export default {
   props: {
      siteMenu: {
         type: Object,
         default: null,
      },
      index: {
         type: String,
         default: '',
      },
      getSelfCompnent: {
         type: Function,
         default () {
            return () => {};
         },
      },
   },
   methods: {
      clickItem () {
         // if (this.siteMenu.link) {
         //    this.$store.state.iframeSrc = this.siteMenu.link;
         // }
      },
   },
};
</script>
