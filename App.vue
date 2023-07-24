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
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uview-ui/theme.scss';
	@import "main.css";
</style>
