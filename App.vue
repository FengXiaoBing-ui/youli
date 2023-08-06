<script>
	import Chat from "./common/chat.js"
	import config from "./api/config.js"
	export default {
		onLaunch: function() {
			console.log('App Launch')
			this.$store.dispatch('initLogin')
		},
		onShow: function() {
			console.log('App Show')
			this.$store.dispatch('reconnect')
			uni.onKeyboardHeightChange(res => {
			  this.$store.commit('changeKeyboardHeight',res.height)
			})
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
	@import '@/uni_modules/uview-ui/theme.scss';
	/*每个页面公共css */
	@import "./common/free.css";
	@import "./common/common.css";
	/* #ifndef APP-PLUS-NVUE */
	@import "./common/free-icon.css";
	/* #endif */
	/* #ifdef MP */
	::-webkit-scrollbar{
		display: none;
	}
	/* #endif */
	@import "main.css";
	page{
		background-color: white;
	}
	.content {
		background-color: white;
	}
</style>
