(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{112:function(e,t,n){"use strict";var a=n(73);n.n(a).a},113:function(e,t,n){(t=n(19)(!1)).push([e.i,".form-component-string-image>.image-block{display:inline-block;width:10em;margin:0 .5em 0 0;font-size:12px;vertical-align:bottom;text-align:center}.form-component-string-image>.image-block>img{vertical-align:top;max-width:100%;max-height:10em;border:1px solid #fff;box-shadow:0 0 6px rgba(0,0,0,.2)}.form-component-string-image>.el-button{padding:.2em .5em;margin:0 .3em}",""]),e.exports=t},140:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"form-component-string-image"},[e.value?n("a",{staticClass:"image-block",attrs:{href:e.value,target:"_blank"}},[n("img",{attrs:{src:e.value,alt:e.value}})]):e._e(),e.value?n("el-button",{attrs:{type:"danger",icon:"el-icon-delete",size:"mini"},on:{click:function(t){return e.handleInput("")}}}):e._e(),n("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.selectFile}},[e._v("\n      "+e._s(e.value?"重新选择":"选择图片")+"\n   ")])],1)};a._withStripped=!0;var i=n(2),r=n.n(i),o=n(3),c=n.n(o),l=n(71),s={model:{prop:"value",event:"input"},props:{fieldName:{type:String,default:""},value:{type:String,default:""},config:{type:Object,default:function(){return{maxFileSize:1e4,mimeType:"*"}}}},data:function(){return{}},mounted:function(){var e=this,t=document.createElement("input");this.fileInput=t,t.type="file",t.accept=this.config.mimeType||"image/*",t.onchange=function(){var n=t.files[0];e.doUploadAction(n)}},methods:{selectFile:function(){var e=this;return c()(r.a.mark((function t(){return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.fileInput.click();case 1:case"end":return t.stop()}}),t)})))()},upload:function(e){var t=this;return c()(r.a.mark((function n(){var a,i,o,c,l;return r.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return(c=new FormData).append("name",e.name),c.append("file",e),console.log(c.get("file")),n.next=6,t.$ajax.post("component-action/",c,{fieldName:t.fieldName,actionName:"upload"},{headers:{"Content-Type":"multipart/form-data"}});case 6:if(!(null==(l=n.sent)||null===(a=l.data)||void 0===a?void 0:a.success)||!(null===(i=l.data.data)||void 0===i?void 0:i.url)){n.next=9;break}return n.abrupt("return",l.data.data.url);case 9:throw new Error((null==l||null===(o=l.data)||void 0===o?void 0:o.message)||"上传文件失败");case 10:case"end":return n.stop()}}),n)})))()},doUploadAction:function(e){var t=this;return c()(r.a.mark((function n(){var a;return r.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(n.prev=0,console.log(e,t.config),!(e.size>t.config.maxFileSize)){n.next=4;break}throw new Error("您选择的文件大小超过了最大".concat(Object(l.a)(t.config.maxFileSize),"限制"));case 4:return n.next=6,t.upload(e);case 6:a=n.sent,t.handleInput(a),n.next=13;break;case 10:n.prev=10,n.t0=n.catch(0),t.$message.error((null===n.t0||void 0===n.t0?void 0:n.t0.message)||String(n.t0)||"选取文件失败了");case 13:case"end":return n.stop()}}),n,null,[[0,10]])})))()},handleInput:function(e){var t=String(e);this.$emit("input",t)}}},u=(n(112),n(49)),p=Object(u.a)(s,a,[],!1,null,null,null);p.options.__file="src/client/pages/model-admin-edit/form-components/string-image.vue";t.default=p.exports},71:function(e,t,n){"use strict";function a(e){var t=Number.parseFloat(e);return Number.isNaN(t)?"NaN":t>1e9?"".concat((t/1e9).toFixed(2),"Mb"):t>1e6?"".concat((t/1e6).toFixed(2),"Mb"):t>1e3?"".concat((t/1e3).toFixed(2),"Kb"):"".concat(t,"b")}n.d(t,"a",(function(){return a}))},73:function(e,t,n){var a=n(113);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);(0,n(20).default)("eef260d2",a,!1,{sourceMap:!1})}}]);