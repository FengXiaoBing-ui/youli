(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/my"],{183:function(e,n,t){"use strict";(function(e,n){var r=t(4);t(26);r(t(25));var o=r(t(184));e.__webpack_require_UNI_MP_PLUGIN__=t,n(o.default)}).call(this,t(1)["default"],t(2)["createPage"])},184:function(e,n,t){"use strict";t.r(n);var r=t(185),o=t(187);for(var c in o)["default"].indexOf(c)<0&&function(e){t.d(n,e,(function(){return o[e]}))}(c);var u,i=t(39),a=Object(i["default"])(o["default"],r["render"],r["staticRenderFns"],!1,null,null,null,!1,r["components"],u);a.options.__file="pages/my/my.vue",n["default"]=a.exports},185:function(e,n,t){"use strict";t.r(n);var r=t(186);t.d(n,"render",(function(){return r["render"]})),t.d(n,"staticRenderFns",(function(){return r["staticRenderFns"]})),t.d(n,"recyclableRender",(function(){return r["recyclableRender"]})),t.d(n,"components",(function(){return r["components"]}))},186:function(e,n,t){"use strict";var r;t.r(n),t.d(n,"render",(function(){return o})),t.d(n,"staticRenderFns",(function(){return u})),t.d(n,"recyclableRender",(function(){return c})),t.d(n,"components",(function(){return r}));var o=function(){var e=this,n=e.$createElement;e._self._c},c=!1,u=[];o._withStripped=!0},187:function(e,n,t){"use strict";t.r(n);var r=t(188),o=t.n(r);for(var c in r)["default"].indexOf(c)<0&&function(e){t.d(n,e,(function(){return r[e]}))}(c);n["default"]=o.a},188:function(e,n,t){"use strict";(function(e){var r=t(4);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=r(t(11)),c=t(164);function u(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?u(Object(t),!0).forEach((function(n){(0,o.default)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):u(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}var a={data:function(){return{}},methods:i(i({},(0,c.mapActions)(["login","logout"])),{},{getPhoneNumber:function(n){var t=this;e.login({provider:"weixin",onlyAuthorize:!0,success:function(e){t.$http.login({openIdCode:e.code,phoneCode:n.detail.code}).then((function(e){t.login(e)}))}})},userPolicy:function(){e.navigateTo({url:"/pages/userPolicy/userPolicy"})},privacyAgreements:function(){e.navigateTo({url:"/pages/privacyAgreements/privacyAgreements"})},feedback:function(){e.navigateTo({url:"/pages/feedBack/feedBack"})},fLogout:function(){this.logout()}})};n.default=a}).call(this,t(2)["default"])}},[[183,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/my/my.js.map