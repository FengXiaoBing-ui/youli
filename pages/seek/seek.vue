<template>
	<view class="content padding-lr-xs">
		<Box title="咨询" :rightIcon="require('@/static/navbar/seek.png')">
			<view class="w100 padding-sm radius bg-white" style="height: 80vh;overflow-y: auto;">
				<view @click="goChat(item)" class="flex padding-tb-sm" v-for="item in chatList" :key="item.updateTime">
					<image style="width: 100rpx;height: 100rpx;" class="radius" :src="item.avatar" mode="aspectFill"></image>
					<view style="width: 500rpx;" class="margin-left-sm">{{ item.nickName }}</view>
				</view>
			</view>
		</Box>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				chatList:[]
			};
		},
		onShow() {
			if(!uni.getStorageSync('token')){
				return uni.switchTab({
					url:"/pages/my/my"
				})
			}
			this.allUser()
		},
		methods:{
			async allUser(){
				const res = await this.$http.allUser()
				this.chatList = res.data
			},
			async goChat(item){
				const res = await this.$http.createChat({
					date: new Date(),
					isRead: 0,
					text: " ",
					type: "-1",
					userIdFrom: uni.getStorageSync('userInfo').userId,
					userIdTo: item.userId,
				})
				let params = {
					to_id:item.userId,
					to_name:item.nickName,
					to_avatar:item.avatar,
					chat_type:"1",
					chatRoomNumber:res
				}
				uni.navigateTo({
					url:"/pages/chat/chat?params="+encodeURIComponent(JSON.stringify(params))
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
