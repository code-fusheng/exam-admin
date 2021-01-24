(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0aa555"],{1121:function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.page,size:"mini"}},[a("el-form-item",{attrs:{label:"请求地址"}},[a("el-input",{attrs:{placeholder:"请求地址",clearable:""},model:{value:e.page.params.logUrl,callback:function(t){e.$set(e.page.params,"logUrl",t)},expression:"page.params.logUrl"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"请求ip"}},[a("el-input",{attrs:{placeholder:"请求ip",clearable:""},model:{value:e.page.params.logIp,callback:function(t){e.$set(e.page.params,"logIp",t)},expression:"page.params.logIp"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"请求状态"}},[a("el-select",{attrs:{placeholder:"请求状态",clearable:"",filterable:""},model:{value:e.page.params.logStatus,callback:function(t){e.$set(e.page.params,"logStatus",t)},expression:"page.params.logStatus"}},[a("el-option",{attrs:{label:"正常",value:1}}),e._v(" "),a("el-option",{attrs:{label:"异常",value:0}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"请求方式"}},[a("el-select",{attrs:{placeholder:"请求方式",clearable:"",filterable:""},model:{value:e.page.params.logMethod,callback:function(t){e.$set(e.page.params,"logMethod",t)},expression:"page.params.logMethod"}},[a("el-option",{attrs:{label:"GET",value:"GET"}}),e._v(" "),a("el-option",{attrs:{label:"POST",value:"POST"}}),e._v(" "),a("el-option",{attrs:{label:"PUT",value:"PUT"}}),e._v(" "),a("el-option",{attrs:{label:"DELETE",value:"DELETE"}})],1)],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",icon:"el-icon-search",sizi:"mini"},on:{click:e.getByPage}},[e._v("查询")])],1)],1),e._v(" "),a("el-divider"),e._v(" "),a("el-button",{staticClass:"add-button",attrs:{type:"danger",icon:"el-icon-delete",size:"mini"},on:{click:e.deleteByIds}},[e._v("批量删除")]),e._v(" "),a("el-button",{staticClass:"add-button",attrs:{type:"primary",icon:"el-icon-download",size:"mini"},on:{click:e.exportAll}},[e._v("全部导出")]),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.page.list,fit:"",border:""},on:{"selection-change":e.handleSelectionChange,"sort-change":e.changeSort}},[a("el-table-column",{attrs:{type:"selection",align:"center",width:"45"}}),e._v(" "),a("el-table-column",{attrs:{prop:"logId",fixed:"left",label:"#",width:"60",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"logUrl",label:"请求地址",align:"center","min-width":"200","show-overflow-tooltip":"",sortable:"custom"}}),e._v(" "),a("el-table-column",{attrs:{prop:"logParams",label:"参数",align:"center","min-width":"200","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"logStatus",label:"请求状态",align:"center","min-width":"110",sortable:"custom"},scopedSlots:e._u([{key:"default",fn:function(t){return[1===t.row.logStatus?a("el-tag",{attrs:{type:"success"}},[e._v("正常")]):a("el-tag",{attrs:{type:"danger"}},[e._v("异常")])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"logMethod",label:"请求方式","min-width":"110",align:"center",sortable:"custom"}}),e._v(" "),a("el-table-column",{attrs:{prop:"logTime",label:"响应时间(毫秒)","min-width":"160",align:"center",sortable:"custom"}}),e._v(" "),a("el-table-column",{attrs:{prop:"logIp",label:"请求ip",align:"center","min-width":"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"logResult",label:"返回值","min-width":"300",align:"center","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"createdTime",label:"创建时间","min-width":"200",align:"center",sortable:"custom"}})],1),e._v(" "),a("el-pagination",{staticClass:"pagination",attrs:{align:"center","current-page":e.page.currentPage,"page-sizes":[10,20,50,100],"page-size":e.page.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.page.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)},o=[],n=(a("ac6a"),a("b775")),r="log",i={getByPage:function(e){return Object(n["a"])({url:"/".concat(r,"/getByPage"),method:"post",data:e})},exportExcel:function(){return Object(n["a"])({url:"/".concat(r,"/export"),method:"post",responseType:"blob"})},deleteByIds:function(e){return Object(n["a"])({url:"/".concat(r,"/deleteByIds"),method:"put",data:e})}},s={data:function(){return{page:{currentPage:1,pageSize:10,totalPage:0,totalCount:0,params:{},list:[],sortColumn:"createdTime",sortMethod:"asc"},loading:!0,selectLogs:[]}},created:function(){this.getByPage()},methods:{handleSizeChange:function(e){this.page.pageSize=e,this.getByPage()},handleCurrentChange:function(e){this.page.currentPage=e,this.getByPage()},getByPage:function(){var e=this;this.loading=!0,this.page.list=[],i.getByPage(this.page).then((function(t){e.page=t.data,e.loading=!1,console.log(t)}))},handleSelectionChange:function(e){this.selectLogs=e},deleteByIds:function(){var e=this;this.$confirm("删除之后无法恢复，是否删除?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"error"}).then((function(){var t=[];e.selectLogs.forEach((function(e){t.push(e.logId)})),i.deleteByIds(t).then((function(t){e.$message.success(t.msg),e.getByPage()}))}))},exportAll:function(){var e=this;this.loading=!0,i.exportExcel().then((function(t){var a=new Blob([t],{type:"application/vnd.ms-excel"}),l=document.createElement("a");l.download="系统日志.xlsx",l.style.display="none",l.href=URL.createObjectURL(a),document.body.appendChild(l),l.click(),URL.revokeObjectURL(l.href),document.body.removeChild(l),e.loading=!1})).catch((function(){e.loading=!1}))},changeSort:function(e){e.order?(this.page.sortColumn=e.prop,this.page.sortMethod=e.order):(this.page.sortColumn="",this.page.sortMethod="asc"),this.$message.success("操作成功: 条件查询!"),this.getByPage()}}},c=s,p=a("2877"),g=Object(p["a"])(c,l,o,!1,null,null,null);t["default"]=g.exports}}]);