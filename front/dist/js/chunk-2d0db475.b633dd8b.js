(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0db475"],{"6ed4":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"verify-email-container page-container restrict layout-col layout-center-all"},[n("button",{staticClass:"button primary large",on:{click:t.verifyEmail}},[t._v("Verify Your Email")])])},c=[],i=(n("d3b7"),n("ac1f"),n("3ca3"),n("841c"),n("ddb0"),n("2b3d"),n("9109")),o={name:"verifyemail",data:function(){return{token:null}},mounted:function(){this.token=new URLSearchParams(window.location.search).get("token")},methods:{verifyEmail:function(){var t=this;this.$QAuth.verifyemailtoken(this.token).then((function(){t.$router.push({name:"account"})})).catch((function(){i["c"].$emit(i["g"],i["b"]),t.$router.push({name:"account"})}))}}},r=o,u=n("2877"),l=Object(u["a"])(r,a,c,!1,null,"214c0e6e",null);e["default"]=l.exports}}]);
//# sourceMappingURL=chunk-2d0db475.b633dd8b.js.map