(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{773:function(t,e){t.exports=function(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}},774:function(t,e,r){var n=r(775),o=r(776),a=r(777),i=r(778);t.exports=function(t){return n(t)||o(t)||a(t)||i()}},775:function(t,e,r){var n=r(773);t.exports=function(t){if(Array.isArray(t))return n(t)}},776:function(t,e){t.exports=function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}},777:function(t,e,r){var n=r(773);t.exports=function(t,e){if(t){if("string"==typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}}},778:function(t,e){t.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},787:function(t,e,r){var n=r(835);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);(0,r(10).default)("6fee7512",n,!1,{sourceMap:!1})},834:function(t,e,r){"use strict";var n=r(787);r.n(n).a},835:function(t,e,r){(e=r(9)(!1)).push([t.i,".form-component-array-string-tag.ant-select{max-width:20em}",""]),t.exports=e},892:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("a-select",{staticClass:"form-component-array-string-tag",attrs:{placeholder:null==t.config.placeholder?"搜索和选择":t.config.placeholder,"show-search":"","allow-clear":!0,loading:t.loading,"filter-option":!1,mode:"multiple"},on:{search:t.remoteMethod},model:{value:t.editFormData[t.objectKey],callback:function(e){t.$set(t.editFormData,t.objectKey,e)},expression:"editFormData[objectKey]"}},t._l(t.options,(function(e){return r("a-select-option",{key:e.value,attrs:{label:e.label,value:e.value}},[t._v("\n      "+t._s(e.label)+"\n   ")])})),1)};n._withStripped=!0;var o=r(40),a=r.n(o),i=r(774),s=r.n(i),c=r(65),l=r.n(c),u={props:{fieldName:{type:String,default:""},config:{type:Object,default:function(){return{}}},editFormData:{type:[Object,Array],default:function(){return{}}},objectKey:{type:[String,Number],default:""}},data:function(){return{remoteOptions:[],loading:!1,lastQuery:""}},computed:{options:function(){for(var t=[],e=0;e<this.remoteOptions.length;e+=1){var r=this.remoteOptions[e];r&&t.push({label:r,value:r})}return t}},mounted:function(){this.remoteMethod("")},methods:{remoteMethod:function(t){var e=this;return l()(a.a.mark((function r(){var n,o,i;return a.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return e.loading=!0,e.lastQuery=t,r.prev=2,n=e.$ajax.post("component-action/",{fieldName:e.fieldName,actionName:"getTags",actionData:t}),r.next=6,n;case 6:if(o=r.sent,i=o.data,e.lastQuery!==t){r.next=14;break}if(!i.success){r.next=13;break}e.remoteOptions=s()(i.data),r.next=14;break;case 13:throw new Error(i.message||"搜索远程数据失败了");case 14:r.next=19;break;case 16:r.prev=16,r.t0=r.catch(2),e.lastQuery===t&&e.$message.error((null===r.t0||void 0===r.t0?void 0:r.t0.message)||String(r.t0)||"搜索失败了");case 19:e.loading=!1;case 20:case"end":return r.stop()}}),r,null,[[2,16]])})))()}}},f=(r(834),r(138)),p=Object(f.a)(u,n,[],!1,null,null,null);p.options.__file="src/client/pages/model-admin-edit/form-components/array-string-tag.vue";e.default=p.exports}}]);