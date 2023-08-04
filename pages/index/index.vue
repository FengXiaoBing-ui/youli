<template>
	<view class="content">
		<view class="bgHeader" :style="'--height:'+(statusBarHeight.top+statusBarHeight.height+90)+'px'">
			<view class="flex align-center"
				:style="'margin-top:'+statusBarHeight.top+'px;height:'+statusBarHeight.height+'px'">
				<image class="margin-left-sm" style="width: 40rpx;height: 40rpx;" src="../../static/index/logo.png"
					mode=""></image>
				<text class="text-white margin-left-sm">有理法律咨询平台</text>
			</view>
		</view>
		<view class="fnList" :style="'--top:'+(statusBarHeight.top+statusBarHeight.height+30)+'px'">
			<view @click="jump(item.path)" class="flex-sub text-center" v-for="(item,index) in fnList" :key="index">
				<image style="width: 100rpx;height: 100rpx;" :src="item.url" mode="aspectFill"></image>
				<view class="text-bold text-lg margin-top-sm">{{ item.name }}</view>
			</view>
		</view>
		<view class="padding-lr-sm w100" style="position: relative;" :style="'top:'+(statusBarHeight.top+statusBarHeight.height+170)+'px'">
			<view @click="cultivate" class="padding-sm w100" style="border-radius: 12rpx;background: #F7F7F7;">
				<view class="text-bold" style="color: #777777;">课程培训</view>
				<view class="margin-top-sm" style="color: #999999;">文案</view>
			</view>
			<view class="branchBox margin-top padding-bottom">
				<view v-for="(item,index) in branchList" :key="index" class="w100 margin-top-sm flex justify-between padding-sm radius" style="background: #F7F8FF;">
					<view class="w100">
						<view class="flex align-center">
							<view>{{ item.branchName }}</view>
							<view :style="'background:'+(item.rest=='营业中'?'#81D3F8':'#C7C7C7')" class="radius text-white text-xs margin-left-sm" style="padding: 2rpx 4rpx;">{{ item.rest }}</view>
						</view>
						<view class="flex align-center justify-between margin-tb-sm">
							<view class="flex-treble">{{ item.address }}</view>
							<view class="flex-sub">{{ item.distance.m }}m</view>
						</view>
						<view class="flex align-center justify-between">
							<view>营业时间：{{ item.opening }}</view>
							<view @click="reservation(item)" class="reservation text-white text-center">立即预约</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBarHeight: this.StatusBarHeight,
				fnList: [
					{
						name: "线上咨询",
						url: require('../../static/index/xianxia.png'),
						path:"/pages/seek/seek"
					},
					{
						name: "线下网点",
						url: require('../../static/index/xianshang.png'),
						path:""
					},
					{
						name: "法律援助",
						url: require('../../static/index/susong.png'),
						path:"/pages/assistApply/assistApply"
					}
				],
				latitude:'',
				longitude:'',
				branchList:[],
				m:""
			}
		},
		onShow() {
			this.getAppletList()
		},
		onLoad() {
			this.getLocation()
			uni.$on("loginSuccess",(res)=>{
				this.getAppletList()
			})
		},
		methods: {
			jump(path){
				uni.navigateTo({
					url:path
				})
			},
			cultivate(){
				uni.navigateTo({
					url:"/pages/cultivate/cultivate"
				})
			},
			reservation(item){
				uni.navigateTo({
					url:"/pages/reservation/reservation",
					success(e) {
						e.eventChannel.emit("info",item)
					}
				})
			},
			getLocation() {
				let that = this;
				uni.getLocation({
					type: "wgs84",
					geocode: true,
					success: res => {
						console.log("获取经纬度成功", res);
						that.latitude = res.latitude;
						that.longitude = res.longitude;
					},
					fail: err => {
						console.log("获取经纬度失败", err);
					},
					complete: err => {},
				});
			},
			async getAppletList(){
				let that = this;
				let res = await this.$http.appletList()
				console.log(res);
				res.rows.forEach(item => {
					item.distance = that.$util.getDistances(that.latitude,that.longitude,item.latitude,item.longitude)
				})
				this.branchList = res.rows
			}
		}
	}
</script>

<style lang="scss" scoped>
	.branchBox{
		width: 100%;
	}
	.reservation{
		width: 144rpx;
		height: 54rpx;
		line-height: 54rpx;
		background: #032466;
		border-radius: 8rpx;
	}
	.bgHeader {
		width: 100%;
		position: fixed;
		z-index: 9;
		top: 0;
		left: 0;
		background-color: #212E72;
		height: var(--height);
	}

	.fnList {
		position: fixed;
		top: var(--top);
		left: 50%;
		transform: translateX(-50%);
		z-index: 9;
		width: 710rpx;
		display: flex;
		justify-content: space-between;
		background: #F9F9F9;
		border-radius: 20rpx;
		box-shadow: 0 6rpx 12rpx rgba(0, 0, 0, 0.16);
		padding: 44rpx 0;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>