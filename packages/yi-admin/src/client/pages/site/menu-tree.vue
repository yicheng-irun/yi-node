<template>
   <div class="menu-tree">
      <a-menu
         ref="mainMenu"
         mode="inline"
         :inline-collapsed="collapsed"
         theme="dark"
         @click="clickMenu"
      >
         <template v-for="(item1, index1) in siteMenu">
            <a-menu-item
               v-if="item1.children.length === 0"
               :key="`${index1}`"
               :disabled="!item1.link"
               :title="item1.title"
               :value="item1.link"
            >
               <a
                  :href="item1.link"
                  :target="item1.target || 'main_frame'"
               ><a-icon
                  v-if="item1.icon"
                  :type="item1.icon"
               />{{ item1.title }}</a>
            </a-menu-item>
            <a-sub-menu
               v-else
               :key="`${index1}`"
            >
               <span slot="title">
                  <a-icon type="folder" /><span>{{ item1.title }}</span>
               </span>
               <template v-for="(item2, index2) in item1.children">
                  <a-menu-item
                     v-if="item2.children.length === 0"
                     :key="`${index1}_${index2}`"
                     :disabled="!item2.link"
                     :value="item2.link"
                     :title="item2.title"
                  >
                     <a
                        :href="item2.link"
                        :target="item2.target || 'main_frame'"
                     >
                        <a-icon
                           v-if="item2.icon"
                           :type="item2.icon"
                        />{{ item2.title }}</a>
                  </a-menu-item>
                  <a-sub-menu
                     v-else
                     :key="`${index1}_${index2}`"
                  >
                     <span slot="title">
                        <a-icon type="folder" /><span>{{ item1.title }}</span>
                     </span>
                     <template v-for="(item3, index3) in item2.children">
                        <a-menu-item
                           :key="`${index1}_${index2}_${index3}`"
                           :disabled="!item3.link"
                           :value="item3.link"
                           :title="item3.title"
                        >
                           <a
                              :href="item3.link"
                              :target="item3.target || 'main_frame'"
                           >
                              <a-icon
                                 v-if="item3.icon"
                                 :type="item3.icon"
                              />{{ item3.title }}</a>
                        </a-menu-item>
                     </template>
                  </a-sub-menu>
               </template>
            </a-sub-menu>
         </template>
      </a-menu>
   </div>
</template>

<script>
// 本来想搞一下递归的组件的，不过这递归的组件让我奔溃了
// 都写在一个组件里吧，设置一个最多三层

export default {
   compnents: {
   },
   props: {
      collapsed: {
         type: Boolean,
         default: false,
      },
      siteMenu: {
         type: Array,
         default () {
            return [];
         },
      },
   },
   mounted () {
      const navHash = decodeURIComponent(window.location.hash.replace(/^#/, ''));
      if (navHash) {
         try {
            console.log(navHash);
            const value = JSON.parse(navHash);
            const link = value?.link;
            if (link) window.open(link, 'main_frame');
            const menuPath = value?.menuPath ?? [];
            if (menuPath && Array.isArray(menuPath)) {
               this.$refs.mainMenu.setOpenKeys(menuPath);
            }
         } catch (e) {
            console.error(e);
         }
      }
   },
   methods: {
      clickMenu (a) {
         const { keyPath } = a;
         const link = a.item.value;
         if (link) {
            const hashData = JSON.stringify({
               link,
               menuPath: keyPath,
            });
            window.history.replaceState(null, '', `#${hashData}`);
         }
      },
   },
};
</script>
