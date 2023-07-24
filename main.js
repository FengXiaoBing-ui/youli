import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
// main.js
import uView from '@/uni_modules/uview-ui'
import api from "./api/api.js"
import store from "./store/index.js";

Vue.use(uView)

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$http = api

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