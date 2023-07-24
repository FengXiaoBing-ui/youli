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
		chat:{},
    },
    mutations: {
		setUserInfo(state,val){
			state.userInfo = val
		},
		setChat(state,val){
			state.chat = Object.assign({},val)
		},
		closeChat(state){
			state.chat.close()
			state.chat = null
		}
    },
    actions: {
		login({state,commit,dispatch},user){
			commit('setUserInfo',JSON.parse(JSON.stringify(user)))
			uni.setStorageSync('token',user.token)
			uni.setStorageSync('userInfo',user)
			let chat = new Chat({
				url:config.scoketUrl
			})
			commit('setChat',chat)
		},
		logout({state,commit,dispatch}){
			uni.clearStorageSync()
			if(state.chat){
				commit("closeChat")
			}
		},
		// 初始化登录状态
		initLogin({state,commit,dispatch}){
			// 拿到存储
			let user = uni.getStorageSync('userInfo')
			if(user){
				// 初始化登录状态
				commit('setUserInfo',JSON.parse(JSON.stringify(user)))
				// 连接socket
				let chat = new Chat({
					url:config.scoketUrl
				})
				commit('setChat',chat)
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