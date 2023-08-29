<template>
	<view class="content padding-lr-xs">
		<Box title="咨询" :rightIcon="require('@/static/navbar/seek.png')">
			<view class="w100 flex justify-center align-center padding-tb">
				<view class="padding-lr" @click="switchStatus(item,index)" :class="item==status?'active':'noActive'" v-for="(item,index) in options" :key="index">{{ item }}</view>
			</view>
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
				chatList:[],
				options:["咨询中","已完成"],
				status:"咨询中",
				statusIndex:0,
				pageSize: 100,
				pageNum: 1
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
			switchStatus(item,index){
				this.status = item
				this.statusIndex = index
				if(index==0){
					this.allUser()
				}else{
					this.chatList = []
				}
			},
			async allUser(){
				const res = await this.$http.myChatRoom({
					userId:uni.getStorageSync('userInfo').userId,
					pageSize: this.pageSize,
					pageNum: this.pageNum
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

<style lang="scss" scoped>
.active{
	font-size: 28rpx;
	font-family: PingFang SC-Bold, PingFang SC;
	font-weight: bold;
	color: #212E72;
}
.noActive{
	font-size: 28rpx;
	font-family: PingFang SC-Medium, PingFang SC;
	font-weight: 500;
	color: #606060;
}
</style>
