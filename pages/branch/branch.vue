<template>
	<view class="padding-lr-sm">
		<view class="w100 margin-top padding-bottom">
			<view v-for="(item,index) in branchList" :key="index" class="boxShadow w100 margin-top-sm flex justify-between padding-sm radius" style="background: #F7F8FF;">
				<view @click="reservation(item)" class="w100">
					<view class="flex align-center">
						<view>{{ item.branchName }}</view>
						<view :style="'background:'+(item.rest=='营业中'?'#81D3F8':'#C7C7C7')" class="radius text-white text-xs margin-left-sm" style="padding: 2rpx 4rpx;">{{ item.rest }}</view>
					</view>
					<view class="flex align-center justify-between margin-tb-sm">
						<view class="flex-treble">{{ item.address }}</view>
						<view class="flex-sub text-right">{{ mkm(item.distance) }}</view>
					</view>
					<view class="flex align-center justify-between">
						<view>营业时间：{{ item.opening }}</view>
						<view class="reservation text-white text-center">立即预约</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	export default {
		data() {
			return {
				branchList:[],
				latitude:"",
				longitude:"",
				pageSize:100,
				pageNum:1
			};
		},
		computed:{
			...mapState(["latlong"])
		},
		onLoad() {
			this.getAppletList()
		},
		methods:{
			mkm(distance){
				let m = distance.toFixed(0)
				return m.toString().length>3?((m/1000).toFixed(2)+'km'):m+'m'
			},
			async getAppletList(){
				let that = this;
				let res = await this.$http.appletList({userLatitude:that.latlong.latitude,userLongitude:that.latlong.longitude,pageSize:this.pageSize,pageNum:this.pageNum})
				console.log(res);
				this.branchList = res.rows
			},
			reservation(item){
				uni.navigateTo({
					url:"/pages/reservation/reservation",
					success(e) {
						e.eventChannel.emit("info",item)
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.reservation{
		width: 144rpx;
		height: 54rpx;
		line-height: 54rpx;
		background: #5675D8;
		border-radius: 8rpx;
	}
	.boxShadow{
		box-shadow: 0 6rpx 12rpx 2rpx rgba(0, 0, 0, 0.06);
	}
</style>
