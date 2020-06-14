<template>
   <a-config-provider :locale="zhCN">
      <div id="ya-site-page">
         <div class="ya-header">
            <span
               class="collapse-icon"
               @click="collapsed = !collapsed"
            >
               <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
            </span>
            <span class="site-name">
               {{ siteConfig.siteName }}
            </span>
         </div>
         <div class="ya-main">
            <div
               class="ya-left-block"
               :class="collapsed ? 'collapse-style' : ''"
            >
               <menu-tree
                  :site-menu="siteMenu.children"
                  :collapsed="collapsed"
               />
            </div>
            <div
               class="ya-right-block"
               :class="collapsed ? 'collapse-style' : ''"
            >
               <iframe
                  ref="iframe"
                  name="main_frame"
                  :src="state.iframeSrc"
               />
               <!-- <div
                  :style="{
                     position: 'absolute',
                     top: 0,
                     left: 0,
                     width: '100%',
                     height: '100%',
                     overflow: 'auto',
                     'z-index': 100,
                  }"
               >
                  <pre v-text="JSON.stringify(state, null, '  ')" />
               </div> -->
            </div>
         </div>
      </div>
   </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/es/locale-provider/zh_CN';
import createStore from './store';
import MenuTree from './menu-tree';

export default {
   components: {
      MenuTree,
   },
   createStore,
   async fetchData (context) {
      await Promise.all([
         context.store.dispatch('fetchSiteMenu'),
         context.store.dispatch('fetchSiteConfig'),
      ]);
   },
   data () {
      return {
         collapsed: false,
         zhCN,
      };
   },
   computed: {
      state () {
         return this.$store.state;
      },
      siteMenu () {
         return this.state.siteMenu;
      },
      siteConfig () {
         return this.state.siteConfig;
      },
   },
};
</script>

<style lang="stylus">
leftWidth = 15em;
collapseWidth = 80px

html, body {
   position: relative;
   width: 100%;
   height: 100%;
   overflow hidden
}

#ya-site-page {
   position: relative;
   width: 100%;
   height: 100%;
   background: #f5f6f7;
   color: #000a;
   overflow hidden

   >.ya-header {
      position: relative;
      top: 0;
      width: 100%;
      height: 3em;
      line-height: 3em;
      z-index: 10;
      background: #fff;
      box-shadow: 0 0 0.4em #0001;
      border-bottom dotted 1px #0002
      >.collapse-icon {
         display inline-block
         padding 0 1em
         border-right dotted 1px #0002
         cursor pointer
         &:hover {
            background #0001
         }
         >i {
            font-size 1.2em
         }
      }
      >.site-name {
         display: inline-block;
         vertical-align: top;
         font-size: 1.1em;
         padding: 0 1em;
         margin: 0 0.2em;
      }
   }

   >.ya-main {
      position: absolute;
      top: 3em;
      bottom: 0;
      width: 100%;
      z-index: 5;

      >.ya-left-block {
         position: absolute;
         width: leftWidth;
         height: 100%;
         overflow-y auto;
         overflow-x visible
         background-color: #001529
         box-shadow: 0 0 0.3em #0001;
         color: #fffb;
         z-index 10
         &.collapse-style {
            width collapseWidth
         }
      }

      >.ya-right-block {
         position: relative;
         height: 100%;
         margin: 0 0 0 leftWidth;
         transition margin-left 0.3s
         &.collapse-style {
            margin-left collapseWidth
         }

         >iframe {
            width 100%
            height 100%
            border none
         }
      }
   }
}
</style>
