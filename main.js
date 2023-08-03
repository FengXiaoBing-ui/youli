import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
// main.js
import uView from '@/uni_modules/uview-ui'
import api from "./api/api.js"
import store from "./store/index.js";
import util from "./util/util.js"
import { router } from "./router/index";

Vue.use(uView)
Vue.use(router)

Vue.config.productionTip = false

Vue.prototype.StatusBarHeight = uni.getMenuButtonBoundingClientRect()
Vue.prototype.$store = store
Vue.prototype.$http = api
Vue.prototype.$util = util

App.mpType = 'app'
const app = new Vue({
	store,
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif