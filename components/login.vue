<template>
	<view>
		<u-popup :show="show" mode="bottom" @close="close" @open="open">
			<view class="w100 loginBox">
				<view class="w100 flex justify-between">
					<view>授权登录</view>
					<u-icon @click="close" name="close" size="18"></u-icon>
				</view>
				<view @click="noCheckout" v-show="!checkboxValue1.length" class="loginBtn">一键登录</view>
				<button v-show="checkboxValue1.length" class="loginBtn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">一键登录</button>
				<view class="flex align-center justify-center">
					<u-checkbox-group v-model="checkboxValue1" placement="column">
						<u-checkbox name="true" activeColor="#212E72"></u-checkbox>
					</u-checkbox-group>
					<text>登录即同意《 <text @click="xieyi" style="color: #032466;">用户协议</text>》和《 <text @click="yinsi" style="color: #032466;">隐私政策</text>》。</text>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		mapActions,
		mapState
	} from "vuex";
	export default {
		data() {
			return {
				show: false,
				checkboxValue1: []
			}
		},
		methods: {
			...mapActions(['login']),
			xieyi(){
				uni.navigateTo({
					url: "/pages/userPolicy/userPolicy"
				})
			},
			yinsi(){
				uni.navigateTo({
					url: "/pages/privacyAgreements/privacyAgreements"
				})
			},
			close() {
				this.show = false
			},
			open() {
				this.show = true
			},
			noCheckout(){
				uni.showToast({
					title:"请勾选用户协议和隐私政策",
					icon:"none"
				})
			},
			isToken() {
				if (!uni.getStorageSync('token')) {
					this.open()
				}
			},
			getPhoneNumber(e) {
				this.close()
				if (e.detail.code) {
					let that = this
					uni.showLoading({
						title: "登录中...",
						mask: true
					})
					uni.login({
						"provider": "weixin",
						"onlyAuthorize": true, // 微信登录仅请求授权认证
						success: function(loginRes) {
							that.$http.login({
								openIdCode: loginRes.code,
								phoneCode: e.detail.code
							}).then(res => {
								if (res.code == 200) {
									that.login(res)
								} else {
									uni.showToast({
										title: res.msg,
										icon: "none"
									})
								}
							})
						}
					});
				} else {
					uni.showToast({
						title: "已取消登录",
						icon: "none"
					})
				}
				// uni.getUserProfile({
				// 	success: function(infoRes) {
				// 		console.log(infoRes);
				// 	}
				// });
			},
		}
	}
</script>

<style lang="scss" scoped>
	/deep/.u-popup__content {
		background: transparent !important;
	}

	.loginBtn {
		width: 466rpx;
		height: 82rpx;
		line-height: 82rpx;
		background: #212E72;
		border-radius: 42rpx;
		text-align: center;
		font-size: 28rpx;
		font-family: PingFang SC-Bold, PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
		margin: 60rpx auto;
	}

	.loginBox {
		position: relative;
		z-index: 999999;
		background: #F9F9F9;
		border-radius: 40rpx 40rpx 0px 0px;
		padding: 40rpx;
		box-sizing: border-box;
	}

	button::after {
		border: none;
	}

	button:hover {
		background: transparent;
	}
	button[disabled]{
		background-color: gray;
		color: white;
	}
</style>