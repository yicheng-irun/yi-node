(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{132:function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"ya-site-page"}},[n("div",{staticClass:"ya-header"},[n("span",{staticClass:"collapse-icon",on:{click:function(t){e.isCollapse=!e.isCollapse}}},[e.isCollapse?n("i",{staticClass:"el-icon-s-unfold"}):n("i",{staticClass:"el-icon-s-fold"})]),n("span",{staticClass:"site-name"},[e._v("\n         yi-admin\n      ")])]),n("div",{staticClass:"ya-main"},[n("div",{staticClass:"ya-left-block",class:e.isCollapse?"collapse-style":""},[n("no-ssr",[e.siteMenu&&e.siteMenu.childrens?n("el-menu",{attrs:{collapse:e.isCollapse}},e._l(e.siteMenu.childrens,(function(t,i){return n("menu-tree",{key:i,attrs:{"site-menu":t,index:""+i,"get-self-compnent":e.getSelfCompnent}})})),1):e._e()],1)],1),n("div",{staticClass:"ya-right-block",class:e.isCollapse?"collapse-style":""},[n("iframe",{ref:"iframe",attrs:{name:"main_frame",src:e.state.iframeSrc}})])])])};i._withStripped=!0;var a=n(2),s=n.n(a),l=n(3),o=n.n(l),r=n(8),c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.siteMenu.childrens.length?n("el-submenu",{staticClass:"menu-tree",attrs:{"data-index":e.index,index:""+e.index}},[e.siteMenu.title?n("template",{slot:"title"},[n("i",{staticClass:"el-icon-folder"}),n("span",[e._v(e._s(e.siteMenu.title))])]):e._e(),e._l(e.siteMenu.childrens,(function(t,i){return n(e.getSelfCompnent(),{key:i,tag:"component",attrs:{"site-menu":t,index:e.index+"_"+i,"get-self-compnent":e.getSelfCompnent}})}))],2):n("el-menu-item",{attrs:{"data-index":e.index,index:""+e.index},on:{click:e.clickItem}},[n("i",{staticClass:"el-icon-document"}),n("a",{attrs:{slot:"title",href:e.siteMenu.link,target:"main_frame"},slot:"title"},[e._v(e._s(e.siteMenu.title))])])};c._withStripped=!0;var u={props:{siteMenu:{type:Object,default:null},index:{type:String,default:""},getSelfCompnent:{type:Function,default:function(){return function(){}}}},methods:{clickItem:function(){}}},p=n(49),m=Object(p.a)(u,c,[],!1,null,null,null);m.options.__file="src/client/pages/site/menu-tree.vue";var d=m.exports,f={components:{MenuTree:d},createStore:function(e){var t=e.ajax.get;return new r.a.Store({state:{siteMenu:null,iframeSrc:""},mutations:{setSiteMenu:function(e,t){e.siteMenu=t}},actions:{fetchSiteMenu:function(e){return o()(s.a.mark((function n(){var i,a,l;return s.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return i=e.commit,n.next=3,t("site-menu/",{});case 3:a=n.sent,l=a.data,i("setSiteMenu",l.data);case 6:case"end":return n.stop()}}),n)})))()}}})},fetchData:function(e){return o()(s.a.mark((function t(){return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.all([e.store.dispatch("fetchSiteMenu")]);case 2:case"end":return t.stop()}}),t)})))()},data:function(){return{isCollapse:!1}},computed:{state:function(){return this.$store.state},siteMenu:function(){return this.state.siteMenu}},mounted:function(){console.log(22233)},methods:{getSelfCompnent:function(){return d},handleOpen:function(e){console.log(e)},handleClose:function(e){console.log(e)}}},g=(n(82),Object(p.a)(f,i,[],!1,null,null,null));g.options.__file="src/client/pages/site/app.vue";t.default=g.exports},57:function(e,t,n){var i=n(83);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);(0,n(20).default)("64cb2704",i,!1,{sourceMap:!1})},82:function(e,t,n){"use strict";var i=n(57);n.n(i).a},83:function(e,t,n){(t=n(19)(!1)).push([e.i,"#ya-site-page,body,html{position:relative;width:100%;height:100%;overflow:hidden}#ya-site-page{background:#f5f6f7;color:rgba(0,0,0,.667)}#ya-site-page>.ya-header{position:relative;top:0;width:100%;height:3em;line-height:3em;z-index:10;background:#fff;box-shadow:0 0 .4em rgba(0,0,0,.067);border-bottom:1px dotted rgba(0,0,0,.133)}#ya-site-page>.ya-header>.collapse-icon{display:inline-block;padding:0 1em;border-right:1px dotted rgba(0,0,0,.133);cursor:pointer}#ya-site-page>.ya-header>.collapse-icon:hover{background:rgba(0,0,0,.067)}#ya-site-page>.ya-header>.collapse-icon>i{font-size:1.2em}#ya-site-page>.ya-header>.site-name{display:inline-block;vertical-align:top;font-size:1.1em;padding:0 1em;margin:0 .2em}#ya-site-page>.ya-main{position:absolute;top:3em;bottom:0;width:100%;z-index:5}#ya-site-page>.ya-main>.ya-left-block{position:absolute;width:15em;height:100%;overflow-y:auto;overflow-x:visible;background-color:#fff;box-shadow:0 0 .3em rgba(0,0,0,.067);color:hsla(0,0%,100%,.733);z-index:10}#ya-site-page>.ya-main>.ya-left-block.collapse-style{width:60px}#ya-site-page>.ya-main>.ya-left-block>.el-menu{border-right:none}#ya-site-page>.ya-main>.ya-left-block>.el-menu .el-menu{background-color:rgba(0,0,0,.043)}#ya-site-page>.ya-main>.ya-left-block>.el-menu.el-menu--collapse{width:60px}#ya-site-page>.ya-main>.ya-left-block>.el-menu a{display:inline-block;text-decoration:none;color:inherit}#ya-site-page>.ya-main>.ya-right-block{position:relative;height:100%;margin:0 0 0 15em;transition:margin-left .3s}#ya-site-page>.ya-main>.ya-right-block.collapse-style{margin-left:60px}#ya-site-page>.ya-main>.ya-right-block>iframe{width:100%;height:100%;border:none}.el-menu,.el-menu .el-menu-item{font-size:12px}.el-menu .el-menu-item,.el-menu .el-submenu__title{height:3.2em;line-height:3.2em}",""]),e.exports=t}}]);