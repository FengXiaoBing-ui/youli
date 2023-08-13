(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/chat/chat"],{

/***/ 221:
/*!**********************************************************************!*\
  !*** D:/项目/youli/youliApplet/main.js?{"page":"pages%2Fchat%2Fchat"} ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _chat = _interopRequireDefault(__webpack_require__(/*! ./pages/chat/chat.vue */ 222));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_chat.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 222:
/*!***************************************************!*\
  !*** D:/项目/youli/youliApplet/pages/chat/chat.vue ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _chat_vue_vue_type_template_id_bf16e7f4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chat.vue?vue&type=template&id=bf16e7f4& */ 223);
/* harmony import */ var _chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chat.vue?vue&type=script&lang=js& */ 225);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 39);

var renderjs




/* normalize component */

var component = Object(_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _chat_vue_vue_type_template_id_bf16e7f4___WEBPACK_IMPORTED_MODULE_0__["render"],
  _chat_vue_vue_type_template_id_bf16e7f4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _chat_vue_vue_type_template_id_bf16e7f4___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/chat/chat.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 223:
/*!**********************************************************************************!*\
  !*** D:/项目/youli/youliApplet/pages/chat/chat.vue?vue&type=template&id=bf16e7f4& ***!
  \**********************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_template_id_bf16e7f4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./chat.vue?vue&type=template&id=bf16e7f4& */ 224);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_template_id_bf16e7f4___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_template_id_bf16e7f4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_template_id_bf16e7f4___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_template_id_bf16e7f4___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 224:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/项目/youli/youliApplet/pages/chat/chat.vue?vue&type=template&id=bf16e7f4& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var g0 = _vm.text.length
  var g1 =
    _vm.mode === "emoticon" || _vm.mode === "action"
      ? _vm.emoticonOrActionList.length
      : null
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        g0: g0,
        g1: g1,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 225:
/*!****************************************************************************!*\
  !*** D:/项目/youli/youliApplet/pages/chat/chat.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./chat.vue?vue&type=script&lang=js& */ 226);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 226:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/项目/youli/youliApplet/pages/chat/chat.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 31));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 33));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _vuex = __webpack_require__(/*! vuex */ 164);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var freeIconButton = function freeIconButton() {
  __webpack_require__.e(/*! require.ensure | components/free-ui/free-icon-button */ "components/free-ui/free-icon-button").then((function () {
    return resolve(__webpack_require__(/*! @/components/free-ui/free-icon-button.vue */ 308));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var freeChatItem = function freeChatItem() {
  Promise.all(/*! require.ensure | components/free-ui/free-chat-item */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/free-ui/free-chat-item")]).then((function () {
    return resolve(__webpack_require__(/*! @/components/free-ui/free-chat-item.vue */ 313));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var freePopup = function freePopup() {
  __webpack_require__.e(/*! require.ensure | components/free-ui/free-popup */ "components/free-ui/free-popup").then((function () {
    return resolve(__webpack_require__(/*! @/components/free-ui/free-popup.vue */ 321));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var freeMainButton = function freeMainButton() {
  __webpack_require__.e(/*! require.ensure | components/free-ui/free-main-button */ "components/free-ui/free-main-button").then((function () {
    return resolve(__webpack_require__(/*! @/components/free-ui/free-main-button.vue */ 328));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
// import $U from '@/common/free-lib/util.js';
// import $H from '@/common/free-lib/request.js';
// import $C from '@/common/free-lib/config.js';
var _default = {
  components: {
    freeIconButton: freeIconButton,
    freeChatItem: freeChatItem,
    freePopup: freePopup,
    freeMainButton: freeMainButton
  },
  data: function data() {
    return {
      scrollIntoView: "",
      // 模式 text输入文字，emoticon表情，action操作，audio音频
      mode: "text",
      // 扩展菜单列表
      // actionList:[
      // 	[{
      // 		name:"相册",
      // 		icon:"/static/images/extends/pic.png",
      // 		event:"uploadImage"
      // 	},{
      // 		name:"拍摄",
      // 		icon:"/static/images/extends/video.png",
      // 		event:"uploadVideo"
      // 	},{
      // 		name:"收藏",
      // 		icon:"/static/images/extends/shoucan.png",
      // 		event:"openFava"
      // 	},{
      // 		name:"名片",
      // 		icon:"/static/images/extends/man.png",
      // 		event:"sendCard"
      // 	},{
      // 		name:"语音通话",
      // 		icon:"/static/images/extends/phone.png",
      // 		event:""
      // 	},{
      // 		name:"位置",
      // 		icon:"/static/images/extends/path.png",
      // 		event:""
      // 	}]
      // ],
      actionList: [[{
        name: "相册",
        icon: "/static/images/extends/pic.png",
        event: "uploadImage"
      }]],
      emoticonList: [],
      // 键盘高度
      KeyboardHeight: 0,
      menusList: [],
      navBarHeight: 0,
      list: [],
      // 当前操作的气泡索引
      propIndex: -1,
      // 输入文字
      text: "",
      // 音频录制状态
      isRecording: false,
      RecordingStartY: 0,
      // 取消录音
      unRecord: false,
      detail: {
        id: 0,
        name: "",
        avatar: "",
        chat_type: "user"
      },
      isfocus: false
    };
  },
  mounted: function mounted() {
    var _this = this;
    var statusBarHeight = 0;
    this.navBarHeight = statusBarHeight + uni.upx2px(90);

    // // 监听键盘高度变化
    // uni.onKeyboardHeightChange(res => {
    //   if (this.mode !== 'action' && this.mode !== 'emoticon') {
    //   	this.KeyboardHeight = res.height 
    //   }
    //   if (this.KeyboardHeight > 0) {
    //   	this.pageToBottom()
    //   }
    // })

    // 注册发送音频事件
    this.regSendVoiceEvent(function (url) {
      if (!_this.unRecord) {
        if (_this.RecordTime > 0) {
          _this.send('audio', url, {
            time: _this.RecordTime
          });
        } else {
          uni.showToast({
            title: '录音时间太短',
            icon: 'none'
          });
        }
      }
    });
    this.pageToBottom();
  },
  computed: _objectSpread(_objectSpread({}, (0, _vuex.mapState)({
    RECORD: function RECORD(state) {
      return state.audio.RECORD;
    },
    chatList: function chatList(state) {
      return state.chatList;
    },
    chat: function chat(state) {
      return state.chat;
    },
    totalNoreadnum: function totalNoreadnum(state) {
      return state.totalNoreadnum;
    },
    user: function user(state) {
      return state.userInfo;
    },
    KeyboardH: function KeyboardH(state) {
      return state.KeyboardHeight;
    }
  })), {}, {
    // 当前会话配置信息
    currentChatItem: function currentChatItem() {
      var _this2 = this;
      var index = this.chatList.findIndex(function (item) {
        return item.id === _this2.detail.id && item.chat_type === _this2.detail.chat_type;
      });
      if (index !== -1) {
        return this.chatList[index];
      }
      return {};
    },
    // 获取蒙版的位置
    maskBottom: function maskBottom() {
      var h = this.mode == 'emoticon' || this.mode == 'action' ? uni.upx2px(685) : uni.upx2px(105);
      if (this.isfocus) {
        h = this.KeyboardHeight + uni.upx2px(105);
      }
      return h;
    },
    // 动态获取菜单高度
    getMenusHeight: function getMenusHeight() {
      var H = 100;
      return this.menusList.length * H;
    },
    // 获取菜单的样式
    getMenusStyle: function getMenusStyle() {
      return "height: ".concat(this.getMenusHeight, "rpx;");
    },
    // 判断是否操作本人信息
    isdoSelf: function isdoSelf() {
      // 获取本人id（假设拿到了）
      var id = 1;
      var user_id = this.propIndex > -1 ? this.list[this.propIndex].user_id : 0;
      return user_id === id;
    },
    // 聊天区域bottom
    chatBodyBottom: function chatBodyBottom() {
      var h = this.mode == 'emoticon' || this.mode == 'action' ? uni.upx2px(685) : uni.upx2px(105);
      if (this.isfocus) {
        h = this.KeyboardHeight + uni.upx2px(105);
      }
      return "bottom:".concat(h, "px;top:0px;");
      // return `bottom:${h}px`
    },
    // 获取操作或者表情列表
    emoticonOrActionList: function emoticonOrActionList() {
      return this.mode === 'emoticon' || this.mode === 'action' ? this[this.mode + 'List'] : [];
    },
    // 所有信息的图片地址
    imageList: function imageList() {
      var arr = [];
      this.list.forEach(function (item) {
        if (item.type === 'emoticon' || item.type === 'image') {
          arr.push(item.data);
        }
      });
      return arr;
    }
  }),
  watch: {
    mode: function mode(newValue, oldValue) {
      if (newValue !== 'text') {
        this.KeyboardHeight = 0;
        this.isfocus = false;
        uni.hideKeyboard();
      }
    },
    KeyboardH: function KeyboardH(newValue, oldValue) {
      this.KeyboardHeight = newValue;
      if (newValue > 0) {
        this.mode = 'text';
      }
    }
  },
  onLoad: function onLoad(e) {
    var _this3 = this;
    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      var res, arr, rows;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (e.params) {
                _context.next = 2;
                break;
              }
              return _context.abrupt("return");
            case 2:
              _this3.detail = JSON.parse(decodeURIComponent(e.params));
              // 初始化
              _this3.__init();
              // 创建聊天对象
              _this3.chat.createChatObject(_this3.detail);
              // 获取历史记录
              _context.next = 7;
              return _this3.chat.getChatDetail(false, _this3.detail.chatRoomNumber);
            case 7:
              res = _context.sent;
              arr = [], rows = [];
              res.rows.forEach(function (item) {
                rows.push(JSON.parse(item.text));
              });
              arr = rows.reverse().concat(arr);
              _this3.list = arr;
              console.log(7777, _this3.list);
              // 监听接收聊天信息
              uni.$on('onMessage', _this3.onMessage);
              uni.$on('updateHistory', _this3.updateHistory);

              // 监听发送收藏和名片
              uni.$on('sendItem', _this3.onSendItem);
            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  destroyed: function destroyed() {
    // 停止录音
    this.voiceTouchEnd();
    // 销毁聊天对象
    this.chat.destoryChatObject();
    // 销毁监听接收聊天消息
    uni.$off('onMessage', this.onMessage);
    uni.$off('updateHistory', this.updateHistory);
    uni.$off('sendItem', this.onSendItem);
  },
  methods: _objectSpread(_objectSpread({}, (0, _vuex.mapMutations)(['regSendVoiceEvent'])), {}, {
    onSendItem: function onSendItem(e) {
      if (e.sendType === 'fava' || e.sendType === 'card') {
        this.send(e.type, e.data, e.options);
      }
    },
    updateHistory: function updateHistory() {
      var isclear = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      if (isclear) {
        this.list = [];
      } else {
        this.list = this.chat.getChatDetail();
      }
    },
    onMessage: function onMessage(message) {
      console.log('[聊天页] 监听接收聊天信息', message);
      if (message.from_id === this.detail.to_id && message.chat_type == 1 || message.chat_type === 'group' && message.to_id === this.detail.to_id) {
        if (message.isremove !== 1) {
          this.list.push(message);
          // 置于底部
          return this.pageToBottom();
        }
        // 撤回消息
        var index = this.list.findIndex(function (item) {
          return item.id === message.id;
        });
        if (index !== -1) {
          this.list[index].isremove = 1;
        }
      }
    },
    __init: function __init() {
      var total = 20;
      var page = Math.ceil(total / 8);
      var arr = [];
      for (var i = 0; i < page; i++) {
        var start = i * 8;
        arr[i] = [];
        for (var j = 0; j < 8; j++) {
          var no = start + j;
          if (no + 1 > total) {
            continue;
          }
          arr[i].push({
            name: "表情" + no,
            icon: "/static/images/emoticon/5497/" + no + '.gif',
            event: "sendEmoticon"
          });
        }
      }
      arr = [[{
        name: "表情0",
        icon: "/static/images/emoticon/5497/" + 0 + '.gif',
        event: "sendEmoticon"
      }]];
      this.emoticonList = arr;
      // 初始化会话列表
      this.chat.initChatListItem({
        chat_type: this.detail.chat_type,
        to_id: this.detail.id,
        to_name: this.detail.name,
        to_avatar: this.detail.avatar,
        data: this.detail.chat_type == 1 ? '你们已经是好友，可以开始聊天了' : '你已经加入群聊，可以开始聊天了'
      });
    },
    // 打开扩展菜单或者表情包
    openActionOrEmoticon: function openActionOrEmoticon() {
      var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'action';
      this.mode = mode;
      uni.hideKeyboard();
    },
    // 发送
    send: function send(type) {
      var _this4 = this;
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      // 组织数据格式
      switch (type) {
        case 1:
          data = data || this.text;
          break;
      }
      var message = this.chat.formatSendData({
        type: type,
        data: data,
        options: options
      });
      // 渲染到页面
      var index = this.list.length;
      this.list.push(message);
      // 监听上传进度
      var onProgress = false;
      if (message.type != 1 && message.type !== 'emoticon' && message.type !== 'card' && !message.data.startsWith('http')) {
        onProgress = function onProgress(progress) {
          // console.log('上传进度：',progress);
        };
      }
      // 发送到服务端
      this.chat.send(message, onProgress, this.detail.chatRoomNumber).then(function (res) {
        // console.log(res);
        // 发送成功
        _this4.list[index].id = res.id;
        _this4.list[index].sendStatus = 'success';
      }).catch(function (err) {
        // 发送失败
        _this4.list[index].sendStatus = 'fail';
        // console.log(err);
      });
      // 发送文字成功，清空输入框
      if (type == 1) {
        this.text = '';
      }
      // 置于底部
      this.pageToBottom();
    },
    // 回到底部
    pageToBottom: function pageToBottom() {
      var _this5 = this;
      setTimeout(function () {
        var lastIndex = _this5.list.length - 1;
        _this5.scrollIntoView = 'chatItem_' + lastIndex;
      }, 300);
    },
    // 长按消息气泡
    long: function long(_ref) {
      var x = _ref.x,
        y = _ref.y,
        index = _ref.index;
      // 初始化 索引
      this.propIndex = index;
      // 组装菜单
      var menus = [{
        name: "发送给朋友",
        event: 'sendToChatItem'
      }, {
        name: "收藏",
        event: 'fava'
      }, {
        name: "删除",
        event: 'delete'
      }];
      var item = this.list[this.propIndex];
      var isSelf = this.user.id === item.from_id;
      if (isSelf) {
        menus.push({
          name: "撤回",
          event: 'removeChatItem'
        });
      }
      if (item.type == 1) {
        menus.unshift({
          name: "复制",
          event: 'copy'
        });
      }
      this.menusList = menus;
      // 显示扩展菜单
      this.$refs.extend.show(x, y);
    },
    // 操作菜单方法分发
    clickEvent: function clickEvent(event) {
      var _this6 = this;
      var item = this.list[this.propIndex];
      var isSelf = this.user.id === item.from_id;
      switch (event) {
        case 'removeChatItem':
          // 撤回消息
          // 拿到当前被操作的信息
          this.chat.recall(item).then(function (res) {
            item.isremove = 1;
          });
          break;
        case 'sendToChatItem':
          uni.navigateTo({
            url: '../chat-list/chat-list?params=' + encodeURIComponent(JSON.stringify(item))
          });
          break;
        case 'copy':
          // 复制
          uni.setClipboardData({
            data: item.data,
            success: function success() {
              uni.showToast({
                title: '复制成功',
                icon: 'none'
              });
            }
          });
          break;
        case 'delete':
          uni.showModal({
            content: '是否要删除该记录？',
            success: function success(res) {
              if (!res.confirm) return;
              _this6.chat.deleteChatDetailItem(item, isSelf);
              _this6.list.splice(_this6.propIndex, 1);
              // 删除最后一条消息
              if (_this6.list.length === _this6.propIndex) {
                _this6.chat.updateChatItem({
                  id: _this6.detail.id,
                  chat_type: _this6.detail.chat_type
                }, function (v) {
                  var o = _this6.list[_this6.propIndex - 1];
                  var data = '';
                  if (o) {
                    data = _this6.chat.formatChatItemData(o, isSelf);
                  }
                  v.data = data;
                  return v;
                });
              }
            }
          });
          break;
        case 'fava':
          // 加入收藏
          uni.showModal({
            content: '是否要加入收藏？',
            success: function success(res) {
              if (res.confirm) {
                // $H.post('/fava/create',{
                // 	type:item.type,
                // 	data:item.data,
                // 	options:JSON.stringify(item.options)
                // }).then(res=>{
                // 	uni.showToast({
                // 		title: '加入收藏成功',
                // 		icon: 'none'
                // 	});
                // })
              }
            }
          });
          break;
      }
      // 关闭菜单
      this.$refs.extend.hide();
    },
    // 扩展菜单
    actionEvent: function actionEvent(e) {
      var _this7 = this;
      switch (e.event) {
        case 'uploadImage':
          // 选择相册
          uni.chooseImage({
            count: 9,
            success: function success(res) {
              // 发送到服务器
              console.log(res);
              // 渲染到页面
              res.tempFilePaths.forEach(function (item) {
                _this7.send('image', item);
              });
            }
          });
          break;
        case 'uploadVideo':
          // 发送短视频
          uni.chooseVideo({
            maxDuration: 10,
            success: function success(res) {
              _this7.send('video', res.tempFilePath);
              // 渲染页面
              // 发送到服务端（获取视频封面，返回url）
              // 修改本地的发送状态
            }
          });

          break;
        case 'sendEmoticon':
          // 发送表情包
          this.send('emoticon', e.icon);
          break;
        case 'openFava':
          // 发送收藏
          uni.navigateTo({
            url: '../../my/fava/fava?type=send'
          });
          break;
        case 'sendCard':
          // 发送名片
          uni.navigateTo({
            url: '../../mail/mail/mail?type=sendCard&limit=1'
          });
          break;
      }
    },
    // 点击页面
    clickPage: function clickPage() {
      this.mode = '';
    },
    // 预览图片
    previewImage: function previewImage(url) {
      uni.previewImage({
        current: url,
        urls: this.imageList,
        indicator: "default"
      });
    },
    // 切换音频录制和文本输入
    changeVoiceOrText: function changeVoiceOrText() {
      this.mode = this.mode !== 'audio' ? 'audio' : '1';
    },
    // 录音相关
    // 录音开始
    voiceTouchStart: function voiceTouchStart(e) {
      var _this8 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                console.log(_this8.RECORD);

                // 初始化
                _this8.isRecording = true;
                _this8.RecordingStartY = e.changedTouches[0].screenY;
                _this8.unRecord = false;
                // 开始录音
                _this8.RECORD.start({
                  format: "mp3"
                });
              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    // 录音结束
    voiceTouchEnd: function voiceTouchEnd() {
      var _this9 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                // 停止录音
                setTimeout(function () {
                  _this9.RECORD.stop();
                }, 300);
                _this9.isRecording = false;
              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    // 录音被打断
    voiceTouchCancel: function voiceTouchCancel() {
      var _this10 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                // 停止录音
                setTimeout(function () {
                  _this10.RECORD.stop();
                }, 300);
                _this10.isRecording = false;
                _this10.unRecord = true;
              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    voiceTouchMove: function voiceTouchMove(e) {
      var Y = Math.abs(e.changedTouches[0].screenY - this.RecordingStartY);
      this.unRecord = Y >= 50;
    },
    // 打开聊天信息设置
    openChatSet: function openChatSet() {
      uni.navigateTo({
        url: '../chat-set/chat-set?params=' + JSON.stringify({
          id: this.detail.id,
          chat_type: this.detail.chat_type
        })
      });
    },
    focus: function focus(e) {
      this.mode = '1';
      this.isfocus = true;
      this.KeyboardHeight = e.detail.height;
    },
    blur: function blur() {
      this.KeyboardHeight = 0;
      this.isfocus = false;
    }
  })
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ })

},[[221,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/chat/chat.js.map