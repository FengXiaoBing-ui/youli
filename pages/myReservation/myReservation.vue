<template>
	<view class="content">
		<Box title="我的预约" :rightIcon="require('@/static/navbar/myReservation.png')">
			<view class="w100 flex justify-center align-center padding-tb">
				<view class="padding-lr" @click="switchStatus(item,index)" :class="item==status?'active':'noActive'" v-for="(item,index) in options" :key="index">{{ item }}</view>
			</view>
			<view @click="details(item.id)" class="boxShadow flex justify-between align-center padding-sm radius margin-top-sm" v-for="item in list" :key="item.id">
				<view class="flex flex-direction">
					<view class="reservationName">{{ item.branchName }}</view>
					<view class="reservationTime">{{ item.reservationTime }}</view>
				</view>
				<u-icon name="arrow-right" color="#DBDBDB" size="18"></u-icon>
			</view>
		</Box>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				options:["预约中","预约成功","预约失败",],
				status:"预约中",
				list:[],
				statusIndex:1,
			};
		},
		onLoad() {
			this.getReservationList()
		},
		methods:{
			async getReservationList(){
				let res = await this.$http.reservationList({userId:uni.getStorageSync('userInfo').userId,reservationStatus:this.statusIndex})
				this.list = res.rows
			},
			details(id){
				uni.navigateTo({
					url:"/pages/reservationDetails/reservationDetails?id="+id
				})
			},
			switchStatus(item,index){
				this.status = item
				this.statusIndex = index
				this.getReservationList()
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
.reservationName{
	font-size: 28rpx;
	font-family: PingFang SC-Medium, PingFang SC;
	font-weight: 500;
	color: #1D1D1D;
}
.reservationTime{
	font-size: 24rpx;
	font-family: PingFang SC-Medium, PingFang SC;
	font-weight: 500;
	color: #909090;
}
.boxShadow{
	box-shadow: 0 6rpx 12rpx 2rpx rgba(0, 0, 0, 0.06);
}
</style>
