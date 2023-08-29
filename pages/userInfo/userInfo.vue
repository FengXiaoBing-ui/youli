<template>
	<view class="container">
		<view @click="selectAvatar" class="flex justify-between align-center padding-sm border-bottom">
			<view>头像</view>
			<image style="width: 100rpx;height: 100rpx;" class="radius" :src="info.avatar" mode=""></image>
		</view>
		<view class="flex justify-between align-center padding-sm border-bottom">
			<view>用户名</view>
			<view>{{ info.nickName }}</view>
		</view>
		<view class="flex justify-between align-center padding-sm border-bottom">
			<view>手机号</view>
			<view>{{ info.phonenumber }}</view>
		</view>
	</view>
</template>

<script>
	import { mapMutations } from "vuex"
 	export default {
		data() {
			return {
				info:{}
			}
		},
		onLoad() {
			this.getUserInfo()
		},
		computed:{
			
		},
		methods: {
			...mapMutations(['setUserInfo']),
			async getUserInfo(){
				const res = await this.$http.appGetInfo({userId:uni.getStorageSync('userInfo').userId})
				this.info = res.user
				this.setUserInfo(res)
			},
			selectAvatar(){
				uni.chooseImage({
					success: async (res)=> {
						const data = await this.$http.upLoadFile(res.tempFilePaths[0])
						this.info.avatar = data.data.url
						if(data.data.url){
							const isPut =  await this.$http.profile(this.info)
							if(isPut.code==200){
								uni.showToast({
									title:"修改成功"
								})
								setTimeout(() => {
									uni.navigateBack()
								},300)
							}else{
								uni.showToast({
									title:isPut.msg,
									icon:"none"
								})
							}
						}
					}
				})
			}
		}
	}
</script>

<style>

</style>
