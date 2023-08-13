<template>
	<view class="content padding-lr-xs">
		<Box title="咨询" :rightIcon="require('@/static/navbar/seek.png')">
			<view class="w100 padding-sm radius bg-white" style="height: 80vh;overflow-y: auto;">
				<view @click="goChat(item)" class="flex align-center padding-tb-sm" v-for="item in chatList" :key="item.updateTime">
					<image style="width: 100rpx;height: 100rpx;" class="radius" :src="JSON.parse(item.text).to_avatar" mode="aspectFill"></image>
					<view style="width: 500rpx;" class="margin-left-sm">{{ JSON.parse(item.text).to_name }}</view>
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
				const res = await this.$http.myChatRoom({
					userId:uni.getStorageSync('userInfo').userId
				})
				this.chatList = res.data
			},
			async goChat(item){
				const res = await this.$http.createChat({
					date: new Date(),
					isRead: 0,
					text: " ",
					type: "-1",
					userIdFrom: uni.getStorageSync('userInfo').userId,
					userIdTo: JSON.parse(item.text).to_id,
				})
				let params = {
					to_id:JSON.parse(item.text).to_id,
					to_name:JSON.parse(item.text).to_name,
					to_avatar:JSON.parse(item.text).to_avatar,
					chat_type:"1",
					chatRoomNumber:res.data
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
