import Vue from "vue";
import Vuex from "vuex";
import Chat from "../common/chat.js"
import config from "../api/config.js"

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
    },
    state: {
		userInfo:false,
		chat:null,
		KeyboardHeight:0,
		chatList:[],
		totalNoreadnum:3
    },
    mutations: {
		changeKeyboardHeight(state,h){
			state.KeyboardHeight = h
		},
		setUserInfo(state,val){
			state.userInfo = val
		},
		setChat(state,val){
			state.chat = Object.assign({},val)
		}
    },
    actions: {
		login({state,commit,dispatch},user){
			state.userInfo = user.data
			uni.setStorageSync('token',state.userInfo.token)
			uni.setStorageSync('userInfo',state.userInfo)
			state.chat = new Chat({
				url:config.scoketUrl
			})
			uni.$emit('loginSuccess',true)
			uni.hideLoading()
		},
		logout({state,commit,dispatch}){
			uni.clearStorageSync()
			state.userInfo = null
			if(state.chat){
				state.chat.close()
				state.chat = null
			}
			uni.reLaunch({
				url:"/pages/my/my"
			})
		},
		// 初始化登录状态
		initLogin({state,commit,dispatch}){
			// 拿到存储
			let user = uni.getStorageSync('userInfo')
			if(user){
				// 初始化登录状态
				state.userInfo = user
				// 连接socket
				state.chat = new Chat({
					url:config.scoketUrl
				})
			}
		},
		// 断线自动重连
		reconnect({state}){
			if(state.user && state.chat){
				state.chat.reconnect()
			}
		}
	},
	strict: false
});

function deepClone(source) {
  if (!source || typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone');
  }
  var targetObj = source.constructor === Array ? [] : {};
  for (var keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {};
        targetObj[keys] = deepClone(source[keys]);
      } else {
        targetObj[keys] = source[keys];
      }
    }
  }
  return targetObj;
  }

export default store;