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
		<view class="padding-lr-sm w100" style="position: relative;"
			:style="'top:'+(statusBarHeight.top+statusBarHeight.height+170)+'px'">
			<view class="padding-sm w100" style="border-radius: 12rpx;background: #F7F7F7;">
				<view class="text-bold flex justify-between align-center">
					<text>课程培训</text>
					<text class="padding-tb-sm padding-left-sm" @click="cultivate">更多</text>
				</view>
				<view class="flex align-center justify-between">
					<view class="flex flex-direction align-center flex-sub margin-lr-xs" v-for="(item,index) in movieList" :key="index">
						 <video style="width:100%;height: 185rpx;" :src="item.lessonUrl" controls></video>
						 <view class="margin-top-sm text-cut2 w100" style="height: 80rpx;">{{ item.lessonName }}</view>
					</view>
				</view>
				<!-- <view class="margin-top-sm" style="color: #999999;">本课程面向即将就业的高等院校学生及法律职业从业人士，着重提高法律应用实践能力，为从事法律业务的单位、企业、律所等提供参考标准和依据。</view> -->
			</view>
			<view class="branchBox margin-top" style="padding-bottom: 40rpx;">
				<view
					style="font-size: 32rpx;font-family: PingFang SC-Bold, PingFang SC;font-weight: bold;color: #1D1D1D;">
					线下网点
				</view>
				<view v-for="(item,index) in branchList" :key="index"
					class="w100 margin-top-sm flex justify-between padding-sm radius" style="background: #F7F8FF;">
					<view @click="reservation(item)" class="w100">
						<view class="flex align-center">
							<view>{{ item.branchName }}</view>
							<view :style="'background:'+(item.rest=='营业中'?'#81D3F8':'#C7C7C7')"
								class="radius text-white text-xs margin-left-sm" style="padding: 2rpx 4rpx;">
								{{ item.rest }}
							</view>
						</view>
						<view class="flex align-center justify-between margin-tb-sm">
							<view class="flex-treble">{{ item.address }}</view>
							<view class="flex-sub text-right">
								{{ mkm(item.distance) }}
							</view>
						</view>
						<view class="flex align-center justify-between">
							<view>营业时间：{{ item.opening }}</view>
							<view class="reservation text-white text-center">立即预约</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<loginBtn ref="loginBtn"></loginBtn>
	</view>
</template>

<script>
	import loginBtn from "@/components/login"
	import qqMap from "@/qqmap-sdk/qqmap-wx-jssdk.js";

	const qqmapsdk = new qqMap.QQMapWX({
		key: "E7EBZ-RX2CN-JVRFG-SQVDG-FFK66-4BB6T", //你的key
	});
	import {
		mapMutations,
		mapState
	} from "vuex"
	export default {
		components: {
			loginBtn
		},
		data() {
			return {
				statusBarHeight: this.StatusBarHeight,
				fnList: [{
						name: "线上咨询",
						url: require('../../static/index/xianshang.png'),
						path: "/pages/chat/chat"
					},
					{
						name: "线下网点",
						url: require('../../static/index/xianxia.png'),
						path: "/pages/branch/branch"
					},
					{
						name: "诉讼垫款",
						url: require('../../static/index/susong.png'),
						path: "/pages/assistApply/assistApply"
					}
				],
				branchList: [],
				m: "",
				pageSize: 100,
				pageNum: 1,
				movieList:[]
			}
		},
		computed: {
			...mapState(["latlong", "userInfo"])
		},
		onShow() {
			this.getLocation()
			this.lessonList()
		},
		onLoad() {
			if(uni.getStorageSync('token')){
				this.getUserInfo()
			}
		},
		onShareAppMessage() { // 分享到微信好友
			// 更多参数配置，参考文档
			return {
				title: '有理法律咨询',
				path: '/pages/index/index',
				imageUrl: 'https://haojiuxuan-1313422787.cos.ap-chongqing.myqcloud.com/cos/20230628/20230818/7daf19e8715242e291820bc160907eaf.png',
			}
		},
		onShareTimeline() { // 分享到朋友圈
			return {
				title: '有理法律咨询',
				path: '/pages/index/index',
				imageUrl: 'https://haojiuxuan-1313422787.cos.ap-chongqing.myqcloud.com/cos/20230628/20230818/7daf19e8715242e291820bc160907eaf.png',
			}
		},
		methods: {
			...mapMutations(["setLatLong","setUserInfo"]),
			async lessonList(){
				const res = await this.$http.lessonList({pageSize:2,pageNum:1,lessonStatus:0})
				this.movieList = res.rows
			},
			async getUserInfo(){
				const res = await this.$http.appGetInfo({userId:uni.getStorageSync('userInfo').user.userId})
				this.setUserInfo(res)
			},
			mkm(distance) {
				let m = distance.toFixed(0)
				return m.toString().length > 3 ? ((m / 1000).toFixed(2) + 'km') : m + 'm'
			},
			jump(path) {
				let that = this;
				if (!uni.getStorageSync('token')) {
					this.$refs.loginBtn.isToken()
					return
				}
				if (path == '/pages/chat/chat') {
					uni.showLoading({
						title: "正在为你匹配法律顾问...",
						icon: "none"
					})
					this.$http.onlineUser().then(async userRes => {
						if (userRes.code == 500) {
							const offlineRes = await this.$http.offlineUser()
							await this.$http.saveChatRoom({adviserId:offlineRes.data.userId,userId:this.userInfo.user.userId})
							const res = await this.$http.createChat({
								date: new Date(),
								isRead: 0,
								text: " ",
								type: 10,
								userIdFrom: that.userInfo.user.userId,
								userIdTo: offlineRes.data.userId,
							})
							let params = {
								offline:true,
								to_id: offlineRes.data.userId,
								to_name: offlineRes.data.nickName,
								to_avatar: offlineRes.data.avatar,
								chat_type: "1",
								chatRoomNumber: res.data
							}
							uni.hideLoading()
							return uni.navigateTo({
								url: path + "?params=" + encodeURIComponent(JSON.stringify(params))
							})
						}
						this.toChat(userRes)
					})
					return
				}
				uni.navigateTo({
					url: path
				})
			},
			async toChat(userRes) {
				let that = this;
				const res = await this.$http.createChat({
					date: new Date(),
					isRead: 0,
					text: " ",
					type: "-1",
					userIdFrom: that.userInfo.user.userId,
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
			},
			cultivate() {
				if (!uni.getStorageSync('token')) {
					this.$refs.loginBtn.isToken()
					return
				}
				uni.navigateTo({
					url: "/pages/cultivate/cultivate"
				})
			},
			reservation(item) {
				if (!uni.getStorageSync('token')) {
					this.$refs.loginBtn.isToken()
					return
				}
				uni.navigateTo({
					url: "/pages/reservation/reservation",
					success(e) {
						e.eventChannel.emit("info", item)
					}
				})
			},
			async getAppletList(data) {
				let that = this;
				uni.showLoading({
					title: "获取附近网点"
				})
				let res = await this.$http.appletList({
					...data,
					pageSize: this.pageSize,
					pageNum: this.pageNum
				})
				uni.hideLoading()
				this.branchList = res.rows
			},
			getLocation() {
				let that = this;
				uni.getLocation({
					type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回国测局坐标
					geocode: true, //设置该参数为true可直接获取经纬度及城市信息
					isHighAccuracy: true, // 开启高精度定位 微信小程序 (基础库 2.9.0+)
					highAccuracyExpireTime: 4000, // 高精度定位超时时间(ms)，指定时间内返回最高精度，该值3000ms以上高精度定位才有效果
					timeout: 5,
					success: res => {
						uni.showLoading({
							title: "正在获取附近线下网点"
						})
						console.log("获取经纬度成功", res);
						qqmapsdk.reverseGeocoder({
							location: {
								latitude: res.latitude,
								longitude: res.longitude,
							},
							success: function(data) {}
						})
						that.setLatLong({
							latitude: res.latitude,
							longitude: res.longitude
						})
						that.getAppletList({
							userLongitude: res.longitude,
							userLatitude: res.latitude
						})
					},
					fail: err => {
						console.log("获取经纬度失败", err);
						that.getAppletList({
							userLongitude: that.latlong.longitude,
							userLatitude: that.latlong.latitude
						})
					},
					complete: err => {
						console.log('???', err);
					},
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.branchBox {
		width: 100%;
	}

	.reservation {
		width: 144rpx;
		height: 54rpx;
		line-height: 54rpx;
		background: #92A4FE;
		border-radius: 8rpx;
	}

	.bgHeader {
		width: 100%;
		position: fixed;
		z-index: 9;
		top: 0;
		left: 0;
		background-color: #92A4FE;
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