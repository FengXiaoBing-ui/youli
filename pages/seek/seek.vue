<template>
	<view class="content padding-lr-xs">
		<Box title="咨询" :rightIcon="require('@/static/navbar/seek.png')">
			<view class="w100 flex justify-center align-center padding-tb">
				<view class="padding-lr" @click="switchStatus(item,index)" :class="item==status?'active':'noActive'"
					v-for="(item,index) in options" :key="index">{{ item }}</view>
			</view>
			<view class="w100 padding-sm radius bg-white" style="height: 80vh;overflow-y: auto;">
				<view v-show="chatList.length>0" class="flex align-center padding-tb-sm" v-for="citem in chatList"
					@click="goChat(citem)">
					<image style="width: 100rpx;height: 100rpx;" class="radius"
						:src="userInfo.user.userId==citem.userIdTo?citem.fromAvatar:citem.toAvatar" mode="aspectFill">
					</image>
					<view style="width: 500rpx;" class="margin-left-sm">
						<view>{{ gettime(JSON.parse(citem.text).create_time) }}</view>
						<view>{{ userInfo.user.userId==citem.userIdTo?citem.fromNickName:citem.toNickName }}:
							{{ handleText(JSON.parse(citem.text)) }}
						</view>
					</view>
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
	import $T from "@/common/time.js"
	export default {
		data() {
			return {
				chatList: [],
				options: ["咨询中", "已完成"],
				status: "咨询中",
				statusIndex: 0,
				pageSize: 100,
				pageNum: 1
			};
		},
		onShow() {
			if (!uni.getStorageSync('token')) {
				return uni.switchTab({
					url: "/pages/my/my"
				})
			}
			this.allUser()
		},
		computed: {
			...mapState(["latlong", "userInfo"])
		},
		methods: {
			// 人性化时间格式
			gettime(shorttime) {
				shorttime = shorttime.toString().length < 13 ? shorttime * 1000 : shorttime;
				let now = new Date().getTime();
				let cha = (now - parseInt(shorttime)) / 1000;

				if (cha < 43200) {
					// 当天
					return this.dateFormat(new Date(shorttime), "{A} {t}:{ii}");
				} else if (cha < 518400) {
					// 隔天 显示日期+时间
					return this.dateFormat(new Date(shorttime), "{Mon}月{DD}日 {t}:{ii}");
				} else {
					// 隔年 显示完整日期+时间
					return this.dateFormat(new Date(shorttime), "{Y}-{MM}-{DD}");
				}
			},
			dateFormat(date, formatStr) {
				// mons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
				let dateObj = {},
					rStr = /\{([^}]+)\}/,
					mons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12','13','14','15','16','17','18','19','20','21','22','23','24'];

				dateObj["Y"] = date.getFullYear();
				dateObj["M"] = date.getMonth() + 1;
				dateObj["MM"] = this.parseNumber(dateObj["M"]);
				dateObj["Mon"] = mons[dateObj['M'] - 1];
				dateObj["D"] = date.getDate();
				dateObj["DD"] = this.parseNumber(dateObj["D"]);
				dateObj["h"] = date.getHours();
				dateObj["hh"] = this.parseNumber(dateObj["h"]);
				dateObj["t"] = dateObj["h"] > 24 ? dateObj["h"] - 24 : dateObj["h"];
				dateObj["tt"] = this.parseNumber(dateObj["t"]);
				dateObj["A"] = dateObj["h"] > 12 ? '' : '';
				dateObj["i"] = date.getMinutes();
				dateObj["ii"] = this.parseNumber(dateObj["i"]);
				dateObj["s"] = date.getSeconds();
				dateObj["ss"] = this.parseNumber(dateObj["s"]);

				while (rStr.test(formatStr)) {
					formatStr = formatStr.replace(rStr, dateObj[RegExp.$1]);
				}
				return formatStr;
			},
			parseNumber(num) {
				return num < 10 ? "0" + num : num;
			},
			toChat() {
				uni.showLoading({
					title: "正在为你匹配法律顾问...",
					icon: "none"
				})
				let that = this;
				this.$http.onlineUser().then(async userRes => {
					if (userRes.code == 500) {
						const offlineRes = await this.$http.offlineUser()
						await this.$http.saveChatRoom({
							adviserId: offlineRes.data.userId,
							userId: this.userInfo.user.userId
						})
						const res = await this.$http.createChat({
							date: new Date(),
							isRead: 0,
							text: " ",
							type: 10,
							userIdFrom: that.userInfo.user.userId,
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
				})
			},
			switchStatus(item, index) {
				this.status = item
				this.statusIndex = index
				this.allUser()
			},
			async allUser() {
				const res = await this.$http.myChatRoom({
					userId: uni.getStorageSync('userInfo').user.userId,
					pageSize: this.pageSize,
					pageNum: this.pageNum,
					state: this.statusIndex
				})
				res.data.forEach(item => {
					console.log(JSON.parse(item.text));
				})
				this.chatList = res.data
			},
			handleText(text) {
				let msg = ''
				switch (text.type) {
					case 1:
						msg = text.data
						break;
					case '2':
						msg = '[图片]'
						break;
					case '3':
						msg = '[语音]'
						break;
					case 11:
						msg = '[律师推荐]'
						break;
					case 12:
						msg = '[网点推荐]'
					case 'system':
						msg = text.data
						break;
				}
				return msg
			},
			async goChat(item) {
				console.log(7777, item);
				let params = {
					to_id: this.userInfo.user.userId == item.userIdTo ? item.userIdFrom : item.userIdTo,
					to_name: this.userInfo.user.userId == item.userIdTo ? item.fromNickName : item.toNickName,
					to_avatar: this.userInfo.user.userId == item.userIdTo ? item.fromAvatar : item.toAvatar,
					chat_type: "1",
					chatRoomNumber: item.chatRoomNumber
				}
				uni.navigateTo({
					url: "/pages/chat/chat?params=" + encodeURIComponent(JSON.stringify(params))
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.active {
		font-size: 28rpx;
		font-family: PingFang SC-Bold, PingFang SC;
		font-weight: bold;
		color: #212E72;
	}

	.noActive {
		font-size: 28rpx;
		font-family: PingFang SC-Medium, PingFang SC;
		font-weight: 500;
		color: #606060;
	}
</style>