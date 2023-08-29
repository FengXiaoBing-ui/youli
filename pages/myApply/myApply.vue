<template>
	<view class="content">
		<Box title="我的申请" :rightIcon="require('@/static/navbar/myApply.png')">
			<view class="w100 flex justify-center align-center padding-tb">
				<view class="padding-lr" @click="switchStatus(item,index)" :class="item==status?'active':'noActive'" v-for="(item,index) in options" :key="index">{{ item }}</view>
			</view>
			<view @click="details(item.id)" class="boxShadow flex justify-between align-center padding-sm radius margin-top-sm" v-for="item in list" :key="item.id">
				<view class="caseText">{{ item.caseText }}</view>
			</view>
		</Box>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				options:["申请中","处理中","不处理","已完成"],
				status:"申请中",
				list:[],
				statusIndex:0,
				pageNum:1,
				pageSize:1000
			};
		},
		onLoad() {
			this.aidList()
		},
		methods:{
			async aidList(){
				let res = await this.$http.aidList({
					caseStatus:this.statusIndex,
					userId:uni.getStorageSync('userInfo').userId,
					pageNum:this.pageNum,
					pageSize:this.pageSize
					})
				this.list = res.rows
			},
			details(id){
				uni.navigateTo({
					url:"/pages/assistDetails/assistDetails?id="+id
				})
			},
			switchStatus(item,index){
				this.status = item
				this.statusIndex = index
				this.aidList()
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
.caseText{
	font-size: 28rpx;
	font-family: PingFang SC-Medium, PingFang SC;
	font-weight: 500;
	color: #1D1D1D;
}
.boxShadow{
	box-shadow: 0 6rpx 12rpx 2rpx rgba(0, 0, 0, 0.06);
}
</style>
