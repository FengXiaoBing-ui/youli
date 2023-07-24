<template>
	<view>
		<button click="login" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">立即登录</button>
		<view @click="userPolicy">用户协议</view>
		<view @click="privacyAgreements">隐私政策</view>
		<view @click="feedback">意见反馈</view>
		<view @click="fLogout">退出登录</view>
	</view>
</template>

<script>
	import {mapActions} from "vuex";
	export default {
		data() {
			return {

			};
		},
		methods: {
			...mapActions(['login','logout']),
			getPhoneNumber(e) {
				let that = this
				uni.login({
					"provider": "weixin",
					"onlyAuthorize": true, // 微信登录仅请求授权认证
					success: function(loginRes) {
						that.$http.login({
							openIdCode:loginRes.code,
							phoneCode:e.detail.code
						}).then(res => {
							that.login(res)
						})
					}
				});
				// uni.getUserProfile({
				// 	success: function(infoRes) {
				// 		console.log(infoRes);
				// 	}
				// });
			},
			userPolicy() {
				uni.navigateTo({
					url: "/pages/userPolicy/userPolicy"
				})
			},
			privacyAgreements() {
				uni.navigateTo({
					url: "/pages/privacyAgreements/privacyAgreements"
				})
			},
			feedback() {
				uni.navigateTo({
					url: "/pages/feedBack/feedBack"
				})
			},
			fLogout(){
				this.logout()
			}
		}
	}
</script>

<style lang="scss">

</style>