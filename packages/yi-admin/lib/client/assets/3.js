(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{774:function(e,t){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}},775:function(e,t,n){var o=n(776),r=n(777),a=n(778),i=n(779);e.exports=function(e){return o(e)||r(e)||a(e)||i()}},776:function(e,t,n){var o=n(774);e.exports=function(e){if(Array.isArray(e))return o(e)}},777:function(e,t){e.exports=function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}},778:function(e,t,n){var o=n(774);e.exports=function(e,t){if(e){if("string"==typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(e,t):void 0}}},779:function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},795:function(e,t,n){var o=n(852);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);(0,n(10).default)("46753ad2",o,!1,{sourceMap:!1})},851:function(e,t,n){"use strict";var o=n(795);n.n(o).a},852:function(e,t,n){(t=n(9)(!1)).push([e.i,".form-component-number-remote-select.ant-select{max-width:20em}",""]),e.exports=t},907:function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("a-select",{staticClass:"form-component-number-remote-select",attrs:{placeholder:null==e.config.placeholder?"搜索和选择":e.config.placeholder,"show-search":"","allow-clear":!0,loading:e.loading,"filter-option":!1},on:{search:e.remoteMethod},model:{value:e.editFormData[e.objectKey],callback:function(t){e.$set(e.editFormData,e.objectKey,t)},expression:"editFormData[objectKey]"}},e._l(e.options,(function(t){return n("a-select-option",{key:t.value,attrs:{value:t.value}},[e._v("\n      "+e._s(t.label)+"\n   ")])})),1)};o._withStripped=!0;var r=n(40),a=n.n(r),i=n(775),c=n.n(i),s=n(65),l=n.n(s),u={props:{fieldName:{type:String,default:""},config:{type:Object,default:function(){return{}}},editFormData:{type:[Object,Array],default:function(){return{}}},objectKey:{type:[String,Number],default:""}},data:function(){return{remoteOptions:[],loading:!1,lastQuery:""}},computed:{options:function(){for(var e=[],t=0;t<this.remoteOptions.length;t+=1){var n=this.remoteOptions[t];n&&e.push(n)}return e}},mounted:function(){this.remoteMethod("",!0)},methods:{remoteMethod:function(e){var t=arguments,n=this;return l()(a.a.mark((function o(){var r,i,s,l,u,f,p,d,m,v,b;return a.a.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:if(r=t.length>1&&void 0!==t[1]&&t[1],n.loading=!0,n.lastQuery=e,o.prev=3,i=n.$ajax.post("component-action/",{fieldName:n.fieldName,actionName:"getOptions",actionData:e}),s=null,!r||!n.value){o.next=16;break}return u=n.value,o.next=10,n.$ajax.post("component-action/",{fieldName:n.fieldName,actionName:"getLabelByValue",actionData:u});case 10:if(f=o.sent,!(null===(l=f.data)||void 0===l?void 0:l.success)){o.next=15;break}s={label:f.data.data,value:u},o.next=16;break;case 15:throw new Error((null===(p=f.data)||void 0===p?void 0:p.message)||"拉取字段".concat(n.fieldName,"初始值失败了"));case 16:return o.next=18,i;case 18:if(d=o.sent,m=d.data,n.lastQuery!==e){o.next=27;break}if(!m.success){o.next=26;break}n.remoteOptions=c()(m.data),s&&(v=s.value,b=!1,n.options.forEach((function(e){e.value===v&&(b=!0)})),b||n.remoteOptions.push(s)),o.next=27;break;case 26:throw new Error(m.message||"搜索远程数据失败了");case 27:o.next=32;break;case 29:o.prev=29,o.t0=o.catch(3),n.lastQuery===e&&n.$message.error((null===o.t0||void 0===o.t0?void 0:o.t0.message)||String(o.t0)||"搜索失败了");case 32:n.loading=!1;case 33:case"end":return o.stop()}}),o,null,[[3,29]])})))()}}},f=(n(851),n(138)),p=Object(f.a)(u,o,[],!1,null,null,null);p.options.__file="src/client/pages/model-admin-edit/form-components/number-remote-select.vue";t.default=p.exports}}]);