(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{138:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("no-ssr",{staticClass:"breadcrumb"},[n("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[n("el-breadcrumb-item",{attrs:{to:{path:"../../"}}},[n("a",{attrs:{href:"../../../",target:"_top"}},[t._v("首页")])]),n("el-breadcrumb-item",[n("a",{attrs:{href:"../",target:"_top"}},[t._v("\n               "+t._s(t.state.modelInfo.title||t.state.modelInfo.name)+" 管理\n            ")])]),n("el-breadcrumb-item",[t._v(t._s(t.state.modelInfo.title||t.state.modelInfo.name)+" "+t._s(t.state.editId?"编辑":"新增"))])],1)],1),n("edit-form",{attrs:{"edit-id":t.state.editId,"edit-form-fields":t.state.editFormFields,"edit-form-data":t.state.editFormData}}),n("pre",{domProps:{textContent:t._s(JSON.stringify(t.state.editFormData,null,"  "))}}),n("pre",{domProps:{textContent:t._s(JSON.stringify(t.state,null,"  "))}})],1)};r._withStripped=!0;var i=n(2),a=n.n(i),o=n(3),s=n.n(o),d=n(9),u=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("no-ssr",{directives:[{name:"loading",rawName:"v-loading",value:t.state.loading,expression:"state.loading"}],staticClass:"edit-form"},[n("el-form",{ref:"form",attrs:{model:t.editFormData,"status-icon":"",size:"small",rules:t.formRules,"label-width":"110px"}},[t.editId?n("el-form-item",{attrs:{label:"id:"}},[n("div",{staticClass:"edit-id"},[t._v("\n            "+t._s(t.editId)+"\n         ")])]):t._e(),t._l(t.editFormFields,(function(e,r){return n("el-form-item",{key:r,attrs:{label:(e.fieldNameAlias||e.fieldName)+":",prop:e.fieldName,required:e.componentConfig.required}},[n(t.getComponent(e.componentName),{tag:"component",attrs:{"edit-form-data":t.editFormData,name:e.fieldName,config:e.componentConfig,"field-name":e.fieldName},model:{value:t.editFormData[e.fieldName],callback:function(n){t.$set(t.editFormData,e.fieldName,n)},expression:"editFormData[item.fieldName]"}}),e.componentConfig.helpText?n("p",{staticClass:"ya-help-text",domProps:{textContent:t._s(e.componentConfig.helpText)}}):t._e()],1)})),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:t.submit}},[t._v("\n            "+t._s(t.editId?"保存":"提交")+"\n         ")]),n("el-button",{on:{click:t.reset}},[t._v("\n            重置\n         ")])],1)],2)],1)};u._withStripped=!0;var l={base:function(){return n.e(10).then(n.bind(null,141))},boolean:function(){return n.e(11).then(n.bind(null,142))},"date-time":function(){return n.e(12).then(n.bind(null,144))},"number-enum":function(){return n.e(6).then(n.bind(null,146))},"number-remote-select":function(){return n.e(2).then(n.bind(null,147))},number:function(){return n.e(13).then(n.bind(null,149))},"string-color":function(){return n.e(14).then(n.bind(null,151))},"string-enum":function(){return n.e(7).then(n.bind(null,152))},"string-file":function(){return n.e(8).then(n.bind(null,154))},"string-image":function(){return n.e(9).then(n.bind(null,156))},"string-jodit-editor":function(){return n.e(4).then(n.bind(null,148))},"string-remote-select":function(){return n.e(3).then(n.bind(null,143))},string:function(){return n.e(16).then(n.bind(null,157))},"string-textarea":function(){return n.e(15).then(n.bind(null,155))},"string-ueditor":function(){return n.e(23).then(n.bind(null,160))}},c={props:{editId:{type:String,default:""},editFormData:{type:Object,default:function(){return{}}},editFormFields:{type:Array,default:function(){return[]}}},computed:{state:function(){return this.$store.state},formRules:function(){return{}}},methods:{getComponent:function(t){return Object.prototype.hasOwnProperty.call(l,t)?l[t]:l.string},submit:function(){var t=this;return s()(a.a.mark((function e(){var n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.state.loading){e.next=2;break}return e.abrupt("return");case 2:return t.$store.commit("setLoading",!0),e.prev=3,e.next=6,t.$store.dispatch("formSubmit");case 6:if(!(null==(n=e.sent)?void 0:n.success)){e.next=11;break}t.$notify.success({title:"保存成功",message:"保存成功"}),e.next=12;break;case 11:throw new Error((null==n?void 0:n.message)||"保存失败");case 12:e.next=17;break;case 14:e.prev=14,e.t0=e.catch(3),t.$notify.error({title:"提交出错了",message:(null===e.t0||void 0===e.t0?void 0:e.t0.message)||"".concat(e.t0)});case 17:t.$store.commit("setLoading",!1);case 18:case"end":return e.stop()}}),e,null,[[3,14]])})))()},reset:function(){try{this.$store.commit("resetEditFormData"),this.$notify.success({title:"重置好了",message:"重置好了"})}catch(t){this.$notify.error({title:"重置出错了",message:(null==t?void 0:t.message)||"".concat(t)})}}}},m=(n(86),n(8)),f=Object(m.a)(c,u,[],!1,null,null,null);f.options.__file="src/client/pages/model-admin-edit/edit-form.vue";var p={components:{EditForm:f.exports},createStore:function(t){var e=t.runtime,n=t.ajax,r=n.get,i=n.post;return new d.a.Store({state:{modelInfo:{},editId:e.query.id||"",editFormFields:[],editFormData:{},editFormDataResetJson:"{}",loading:!1},mutations:{setEditId:function(t,e){t.editId=e.id},setEditFormFields:function(t,e){var n=e.data;t.editFormFields=n.fields,t.modelInfo=n.modelInfo},resetEditFormData:function(t){t.editFormData=JSON.parse(t.editFormDataResetJson)},setEditFormData:function(t,e){var n=e.values;t.editFormDataResetJson=JSON.stringify(n),t.editFormData=n},setLoading:function(t,e){t.loading=!!e}},actions:{fetchEditFormFields:function(){var t=this;return s()(a.a.mark((function e(){var n,i;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r("fields/",{});case 2:if(n=e.sent,(i=n.data).success){e.next=6;break}throw new Error(i.message||"获取表单结构失败了");case 6:t.commit("setEditFormFields",i);case 7:case"end":return e.stop()}}),e)})))()},fetchEditData:function(t){var e=this;return s()(a.a.mark((function n(){var i,o,s;return a.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return i=t.state,n.next=3,r("values/",{id:i.editId});case 3:if(o=n.sent,(s=o.data).success){n.next=7;break}throw new Error(s.message||"获取初始化数据失败了");case 7:e.commit("setEditFormData",s.data);case 8:case"end":return n.stop()}}),n)})))()},formSubmit:function(t){var e=this;return s()(a.a.mark((function n(){var r,o,s,d;return a.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return o=t.state,n.next=3,i("submit/",{editId:o.editId,formData:o.editFormData});case 3:return s=n.sent,(null==(d=s.data)?void 0:d.success)&&(null==d||null===(r=d.data)||void 0===r?void 0:r.id)&&(e.commit("setEditId",d.data),e.commit("setEditFormData",d.data)),n.abrupt("return",s.data);case 7:case"end":return n.stop()}}),n)})))()}}})},fetchData:function(t){return s()(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([t.store.dispatch("fetchEditFormFields"),t.store.dispatch("fetchEditData")]);case 2:case"end":return e.stop()}}),e)})))()},computed:{state:function(){return this.$store.state}}},h=(n(88),Object(m.a)(p,r,[],!1,null,null,null));h.options.__file="src/client/pages/model-admin-edit/app.vue";e.default=h.exports},59:function(t,e,n){var r=n(87);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);(0,n(21).default)("8b707416",r,!1,{sourceMap:!1})},60:function(t,e,n){var r=n(89);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);(0,n(21).default)("51d93dae",r,!1,{sourceMap:!1})},86:function(t,e,n){"use strict";var r=n(59);n.n(r).a},87:function(t,e,n){(e=n(20)(!1)).push([t.i,".edit-form{padding:2em 0;margin:0 1em}.edit-form>.el-form .edit-id{font-size:.8em;color:#606266}.edit-form>.el-loading-mask{background:hsla(0,0%,100%,.667)}.edit-form .el-form-item__label{font-size:.8em;opacity:.9}.edit-form .el-button--small{padding:.6em 1.5em}.edit-form .el-form-item__content>.ya-help-text{margin:.5em 0 0;color:rgba(0,0,0,.467);font-size:.8em;line-height:1.5}",""]),t.exports=e},88:function(t,e,n){"use strict";var r=n(60);n.n(r).a},89:function(t,e,n){(e=n(20)(!1)).push([t.i,"body{background:#f5f6f7}#app>pre{font-size:12px}",""]),t.exports=e}}]);