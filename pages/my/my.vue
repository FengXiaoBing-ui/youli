<template>
	<view>
		<button click="login" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">立即登录</button>
		<view @click="userPolicy">用户协议</view>
		<view @click="privacyAgreements">隐私政策</view>
		<view @click="feedback">意见反馈</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			getPhoneNumber(e){
				uni.login({
				  provider: 'weixin', //使用微信登录
				  success: function (loginRes) {
				    console.log(loginRes.authResult);
					console.log(e);
				  }
				});
			},
			userPolicy(){
				uni.navigateTo({
					url:"/pages/userPolicy/userPolicy"
				})
			},
			privacyAgreements(){
				uni.navigateTo({
					url:"/pages/privacyAgreements/privacyAgreements"
				})
			},
			feedback(){
				uni.navigateTo({
					url:"/pages/feedBack/feedBack"
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
