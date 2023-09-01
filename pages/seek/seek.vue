<template>
	<view class="content padding-lr-xs">
		<Box title="咨询" :rightIcon="require('@/static/navbar/seek.png')">
			<view class="w100 flex justify-center align-center padding-tb">
				<view class="padding-lr" @click="switchStatus(item,index)" :class="item==status?'active':'noActive'" v-for="(item,index) in options" :key="index">{{ item }}</view>
			</view>
			<view class="w100 padding-sm radius bg-white" style="height: 80vh;overflow-y: auto;">
				<view v-show="chatList.length>0" class="flex align-center padding-tb-sm" v-for="citem in chatList" @click="goChat(citem)">
					<image style="width: 100rpx;height: 100rpx;" class="radius" :src="userInfo.userId==citem.userIdTo?citem.fromAvatar:citem.toAvatar" mode="aspectFill"></image>
					<view style="width: 500rpx;" class="margin-left-sm">{{ userInfo.userId==citem.userIdTo?citem.fromNickName:citem.toNickName }}</view>
				</view>
				<view v-show="chatList.length<=0" class="w100 text-center">
					<text @click="toChat" class="active">去咨询</text>
				</view>
			</view>
		</Box>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex"
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
		computed: {
			...mapState(["latlong", "userInfo"])
		},
		methods:{
			toChat(){
				uni.showLoading({
					title: "正在为你匹配法律顾问...",
					icon: "none"
				})
				let that = this;
				this.$http.onlineUser().then(async userRes => {
					if (userRes.code == 500) {
						const offlineRes = await this.$http.offlineUser()
						const res = await this.$http.createChat({
							isOnline: 1,
							date: new Date(),
							isRead: 0,
							text: " ",
							type: 10,
							userIdFrom: that.userInfo.userId,
							userIdTo: offlineRes.data.userId,
						})
						let params = {
							to_id: offlineRes.data.userId,
							to_name: offlineRes.data.nickName,
							to_avatar: offlineRes.data.avatar,
							chat_type: "1",
							chatRoomNumber: res.data
						}
						uni.hideLoading()
						return uni.navigateTo({
							url: "/pages/chat/chat?params=" + encodeURIComponent(JSON.stringify(
								params))
						})
					}
					const res = await this.$http.createChat({
						date: new Date(),
						isRead: 0,
						text: " ",
						type: "-1",
						userIdFrom: that.userInfo.userId,
						userIdTo: userRes.data.userId,
					})
					let params = {
						to_id: userRes.data.userId,
						to_name: userRes.data.nickName,
						to_avatar: userRes.data.avatar,
						chat_type: "1",
						chatRoomNumber: res.data
					}
					uni.hideLoading()
					uni.navigateTo({
						url: "/pages/chat/chat?params=" + encodeURIComponent(JSON.stringify(params))
					})
				})
			},
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
				console.log(7777,item);
				let params = {
					to_id:item.userIdTo,
					to_name:item.toNickName,
					to_avatar:item.toAvatar,
					chat_type:"1",
					chatRoomNumber:item.chatRoomNumber
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
