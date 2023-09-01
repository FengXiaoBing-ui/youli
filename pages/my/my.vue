<template>
	<view class="content padding-lr-sm">
		<view class="loginBox flex align-center justify-between padding-lr padding-top-xl">
			<view class="flex align-center">
				<image @click="goUserInfo" style="width: 120rpx;height: 120rpx;" class="round boxShadow" :src="userInfo?userInfo.user.avatar:'../../static/images/userpic.png'" mode="aspectFill"></image>
				<button v-if="!userInfo" class="loginText margin-left" @click="login">立即登录</button>
				<view v-else class="loginText margin-left">{{ userInfo.username }}</view>
			</view>
			<view v-if="userInfo" @click="fLogout" class="logout text-sm">
				退出登录
			</view>
		</view>
		<view class="boxShadow w100 padding-lr-sm radius margin-top-xl">
			<view @click="myReservation" class="flex justify-between align-center border-bottom padding-tb-sm">
				<view class="flex align-center">
					<image style="width: 26rpx;height: 32rpx;" src="@/static/my/组 434@2x.png" mode=""></image>
					<view class="margin-left-xs">我的预约</view>
				</view>
				<u-icon name="arrow-right" color="#DBDBDB" size="22"></u-icon>
			</view>
			<view @click="myApply" class="flex justify-between align-center padding-tb-sm">
				<view class="flex align-center">
					<image style="width: 26rpx;height: 32rpx;" src="@/static/my/组 433@2x.png" mode=""></image>
					<view class="margin-left-xs">我的申请</view>
				</view>
				<u-icon name="arrow-right" color="#DBDBDB" size="22"></u-icon>
			</view>
		</view>
		<view class="boxShadow w100 padding-lr-sm radius margin-top-xl">
			<view @click="userPolicy" class="flex justify-between align-center border-bottom padding-tb-sm">
				<view class="flex align-center">
					<image style="width: 26rpx;height: 32rpx;" src="@/static/my/组 430@2x.png" mode=""></image>
					<view class="margin-left-xs">用户协议</view>
				</view>
				<u-icon name="arrow-right" color="#DBDBDB" size="22"></u-icon>
			</view>
			<view @click="privacyAgreements" class="flex justify-between align-center border-bottom padding-tb-sm">
				<view class="flex align-center">
					<image style="width: 26rpx;height: 32rpx;" src="@/static/my/组 432@2x.png" mode=""></image>
					<view class="margin-left-xs">隐私政策</view>
				</view>
				<u-icon name="arrow-right" color="#DBDBDB" size="22"></u-icon>
			</view>
			<view @click="feedback" class="flex justify-between align-center padding-tb-sm">
				<view class="flex align-center">
					<image style="width: 26rpx;height: 32rpx;" src="@/static/my/组 431@2x.png" mode=""></image>
					<view class="margin-left-xs">意见反馈</view>
				</view>
				<u-icon name="arrow-right" color="#DBDBDB" size="22"></u-icon>
			</view>
		</view>
		<loginBtn ref="loginBtn"></loginBtn>
	</view>
</template>

<script>
	import loginBtn from "@/components/login"
	import {mapActions,mapState} from "vuex";
	export default {
		components:{
			loginBtn
		},
		data() {
			return {

			};
		},
		computed:{
			...mapState(["userInfo"])
		},
		onLoad() {
			// // #ifndef MP-WEIXIN
			// let that = this
			// that.$http.phoneLogin({
			// 	phone:'19185661231'
			// }).then(res => {
			// 	that.login(res)
			// })
			// // #endif
		},
		methods: {
			...mapActions(['login','logout']),
			goUserInfo(){
				uni.navigateTo({
					url:"/pages/userInfo/userInfo"
				})
			},
			myReservation(){
				this.$refs.loginBtn.isToken()
				uni.navigateTo({
					url:"/pages/myReservation/myReservation"
				})
			},
			myApply(){
				this.$refs.loginBtn.isToken()
				uni.navigateTo({
					url:"/pages/myApply/myApply"
				})
			},
			login(){
				this.$refs.loginBtn.isToken()
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
				this.$refs.loginBtn.isToken()
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

<style lang="scss" scoped>
.loginBox{
	width: 100%;
	.loginText{
		font-size: 32rpx;
		font-family: PingFang SC-Bold, PingFang SC;
		font-weight: bold;
		color: #1D1D1D;
	}
}
.logout{
	width: 178rpx;
	height: 60rpx;
	line-height: 60rpx;
	background: #92A4FE;
	border-radius:30rpx;
	color: white;
	text-align: center;
}
button::after {
   border: none;
}
button:hover{
    background: transparent; 
}
.boxShadow{
	box-shadow: 0 6rpx 12rpx 2rpx rgba(0, 0, 0, 0.06);
}
.content{
	background-color: #F9F9F9;
	min-height: 100vh;
}
</style>