(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{812:function(e,t,n){var a=n(881);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);(0,n(10).default)("2124c25d",a,!1,{sourceMap:!1})},880:function(e,t,n){"use strict";var a=n(812);n.n(a).a},881:function(e,t,n){(t=n(9)(!1)).push([e.i,".list-components-string-enum{text-align:center}",""]),e.exports=t},915:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this.$createElement;return(this._self._c||e)("div",{staticClass:"list-components-string-enum"},[this._v("\n   "+this._s(this.labelValue||this.value)+"\n")])};a._withStripped=!0;var s=n(40),i=n.n(s),l=n(65),o=n.n(l),u={model:{prop:"value",event:"input"},props:{fieldName:{type:String,default:""},value:{type:[String,Number],default:null},config:{type:Object,default:function(){return{}}}},data:function(){return{labelValue:""}},mounted:function(){this.getRemoteLabel(this.value)},methods:{getRemoteLabel:function(e){var t=this;return o()(i.a.mark((function n(){var a,s;return i.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,t.$ajax.post("list/component-action/",{fieldName:t.fieldName,actionName:"getLabelByValue",actionData:e});case 3:s=n.sent,t.value===e&&(null===(a=s.data)||void 0===a?void 0:a.success)&&(t.labelValue=s.data.data),n.next=9;break;case 7:n.prev=7,n.t0=n.catch(0);case 9:case"end":return n.stop()}}),n,null,[[0,7]])})))()}}},r=(n(880),n(138)),c=Object(r.a)(u,a,[],!1,null,null,null);c.options.__file="src/client/pages/model-admin-list/list-components/string-remote-select.vue";t.default=c.exports}}]);