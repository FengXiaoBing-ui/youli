(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/free-ui/free-popup"],{345:function(t,e,n){"use strict";n.r(e);var r=n(346),o=n(348);for(var i in o)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(i);n(350);var u,a=n(39),c=Object(a["default"])(o["default"],r["render"],r["staticRenderFns"],!1,null,"30a42cc0",null,!1,r["components"],u);c.options.__file="components/free-ui/free-popup.vue",e["default"]=c.exports},346:function(t,e,n){"use strict";n.r(e);var r=n(347);n.d(e,"render",(function(){return r["render"]})),n.d(e,"staticRenderFns",(function(){return r["staticRenderFns"]})),n.d(e,"recyclableRender",(function(){return r["recyclableRender"]})),n.d(e,"components",(function(){return r["components"]}))},347:function(t,e,n){"use strict";var r;n.r(e),n.d(e,"render",(function(){return o})),n.d(e,"staticRenderFns",(function(){return u})),n.d(e,"recyclableRender",(function(){return i})),n.d(e,"components",(function(){return r}));var o=function(){var t=this,e=t.$createElement;t._self._c},i=!1,u=[];o._withStripped=!0},348:function(t,e,n){"use strict";n.r(e);var r=n(349),o=n.n(r);for(var i in r)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return r[t]}))}(i);e["default"]=o.a},349:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={props:{maskColor:{type:Boolean,default:!1},mask:{type:Boolean,default:!0},center:{type:Boolean,default:!1},bottom:{type:Boolean,default:!1},bodyWidth:{type:Number,default:0},bodyHeight:{type:Number,default:0},bodyBgColor:{type:String,default:"bg-white"},transformOrigin:{type:String,default:"left top"},tabbarHeight:{type:Number,default:0}},data:function(){return{status:!1,x:-1,y:1,maxX:0,maxY:0}},mounted:function(){try{var e=t.getSystemInfoSync();this.maxX=e.windowWidth-t.upx2px(this.bodyWidth),this.maxY=e.windowHeight-t.upx2px(this.bodyHeight)-t.upx2px(this.tabbarHeight)}catch(n){}},computed:{getMaskColor:function(){var t=this.maskColor?.5:0;return"background-color: rgba(0,0,0,".concat(t,");")},getBodyClass:function(){if(this.center)return"left-0 right-0 bottom-0 top-0 flex align-center justify-center";var t=this.bottom?"left-0 right-0 bottom-0":"rounded border";return"".concat(this.bodyBgColor," ").concat(t)},getBodyStyle:function(){var t=this.x>-1?"left:".concat(this.x,"px;"):"",e=this.y>-1?"top:".concat(this.y,"px;"):"";return t+e}},methods:{show:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:-1,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:-1;this.status||(this.x=t>this.maxX?this.maxX:t,this.y=e>this.maxY?this.maxY:e,this.status=!0)},hide:function(){this.$emit("hide"),this.status=!1}}};e.default=n}).call(this,n(2)["default"])},350:function(t,e,n){"use strict";n.r(e);var r=n(351),o=n.n(r);for(var i in r)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return r[t]}))}(i);e["default"]=o.a},351:function(t,e,n){}}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/free-ui/free-popup.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/free-ui/free-popup-create-component',
    {
        'components/free-ui/free-popup-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('2')['createComponent'](__webpack_require__(345))
        })
    },
    [['components/free-ui/free-popup-create-component']]
]);
