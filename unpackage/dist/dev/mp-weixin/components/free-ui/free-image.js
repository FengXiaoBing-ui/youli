(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/free-ui/free-image"],{247:function(t,e,n){"use strict";n.r(e);var r=n(248),i=n(250);for(var u in i)["default"].indexOf(u)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(u);var a,c=n(39),o=Object(c["default"])(i["default"],r["render"],r["staticRenderFns"],!1,null,null,null,!1,r["components"],a);o.options.__file="components/free-ui/free-image.vue",e["default"]=o.exports},248:function(t,e,n){"use strict";n.r(e);var r=n(249);n.d(e,"render",(function(){return r["render"]})),n.d(e,"staticRenderFns",(function(){return r["staticRenderFns"]})),n.d(e,"recyclableRender",(function(){return r["recyclableRender"]})),n.d(e,"components",(function(){return r["components"]}))},249:function(t,e,n){"use strict";var r;n.r(e),n.d(e,"render",(function(){return i})),n.d(e,"staticRenderFns",(function(){return a})),n.d(e,"recyclableRender",(function(){return u})),n.d(e,"components",(function(){return r}));var i=function(){var t=this,e=t.$createElement;t._self._c},u=!1,a=[];i._withStripped=!0},250:function(t,e,n){"use strict";n.r(e);var r=n(251),i=n.n(r);for(var u in r)["default"].indexOf(u)<0&&function(t){n.d(e,t,(function(){return r[t]}))}(u);e["default"]=i.a},251:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={props:{src:{type:String,default:""},imageClass:{type:String,default:""},maxWidth:{type:Number,default:500},maxHeight:{type:Number,default:350}},data:function(){return{h:100,w:100}},computed:{imageStyle:function(){return"width:".concat(this.w,"px;height:").concat(this.h,"px;")}},methods:{loadImage:function(e){var n=e.detail.width,r=e.detail.height,i=t.upx2px(this.maxWidth),u=t.upx2px(this.maxHeight);if(r<=u)return this.w=n<=i?n:i,this.h=r,void this.$emit("load",{w:this.w,h:this.h});this.h=u;var a=u*(n/r);this.w=a<=i?a:i,this.$emit("load",{w:this.w,h:this.h})}}};e.default=n}).call(this,n(2)["default"])}}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/free-ui/free-image.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/free-ui/free-image-create-component',
    {
        'components/free-ui/free-image-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('2')['createComponent'](__webpack_require__(247))
        })
    },
    [['components/free-ui/free-image-create-component']]
]);
